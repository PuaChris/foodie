import {
  createConnection,
  getRepository,
} from 'typeorm';
import Item from './entities/item.entity';
import Restaurant from './entities/restaurant.entity';

export const connectDB = async () => {
  console.log('>> Connecting to database...');

  // Uses details from ormconfig.js
  if (process.env.DB_URL) {
    await createConnection(process.env.CONFIG_NAME as string)
      .then(async () => {
        console.log('\n\n>> Database connected.\n\n');
      }).catch((error) => console.log(error));
  }
};

// * DEFINING CRUD OPERATIONS FOR RESTAURANTS * //

export const getRestaurantList = async () => {
  console.log('>> Loading restaurants from the database...');
  let restList: Restaurant[] = [];
  await getRepository(Restaurant).find().then(
    (result) => {
      if (result) {
        restList = result;
        console.log('>> Loading complete');
      }
    },
  ).catch((e) => console.error(e));

  // Return in order of most recently added restaurants
  return restList.reverse();
};

export const getRestaurant = async (restId: string) => {
  if (restId) {
    console.log(`>> Loading restaurant ${restId} from the database ...`);

    let rest: Restaurant = new Restaurant();
    await getRepository(Restaurant).find({ where: { id: restId } })
      .then(
        (result) => {
          // Empty arrays are not null or undefined
          if (result && result.length > 0) {
            [rest] = result;
            console.log('>> Loading complete');
          }
        },
      ).catch((e) => console.error(e));

    if (rest.id) return rest.getInfo();
    throw new Error(`>> Could not retrieve restaurant profile ${restId}`);
  }
  else throw new Error('>> Undefined restaurant ID');
};

export const addRestaurant = async (newRest: Restaurant): Promise<string> => {
  if (newRest) {
    console.log('>> Inserting a new record into the Restaurant database...');

    // Save Restaurant object in connection
    let id: string = '';
    await getRepository(Restaurant).save(newRest)
      .then((result) => {
        id = result.id;
        console.log(`>> Saved a new restaurant: ${id} --> ${result.name}`);
      })
      .catch((e) => console.error(e));

    // Return new restaurant ID to client-side for confirmation
    if (id) return id;
  }
  throw new Error('>> Could not save restaurant data');
};

// TODO: Only update when data is different from the previous version
export const editRestaurant = async (rest: Restaurant) => {
  if (rest && rest.id) {
    console.log(`>> Editing restaurant: ${rest.id}...`);

    // UPDATE restaurant SET name = ... WHERE id = ...
    await getRepository(Restaurant)
      .update(rest.id, {
        name: rest.name,
        location: rest.location,
        phone: rest.phone,
        emotion: rest.emotion,
        recommend: rest.recommend,
      })
      .then(() => {
        console.log(`>> Updated restaurant: ${rest.id} --> ${rest.name}`);
      })
      .catch((e) => console.error(e));
  }
  else throw new Error('>> Invalid restaurant data; cannot update restaurant');
};

export const deleteRestaurant = async (restId: string) => {
  if (restId) {
    console.log(`>> Deleting restaurant: ${restId}...`);

    await getRepository(Restaurant)
      .delete(restId)
      .then(() => {
        console.log(`>> Deleted restaurant ${restId}`);
      })
      .catch((e) => console.error(e));
  }
  else throw new Error('>> Invalid restaurant ID; cannot delete restaurant');
};

// * DEFINING CRUD OPERATIONS FOR ITEMS * //

export const getItemList = async (restId: string) => {
  if (restId) {
    console.log(`>> Retrieving items for: ${restId}`);

    let itemList: Item[] = [];
    if (restId) {
      await getRepository(Restaurant).findOne(restId, { relations: ['items'] })
        .then((rest) => {
          if (rest) {
            itemList = rest.items;
            console.log('>> Loading complete');
          }
        })
        .catch((e) => console.error(e));
    }

    // Return in order of most recently added items
    if (itemList) return itemList.reverse();
    throw new Error('>> Could not retrieve items');
  }
  throw new Error('>> Invalid restaurant ID; cannot retrieve items');
};

export const addItem = async (restId: string, newItem: Item) => {
  if (restId && newItem) {
    console.log('>> Inserting a new record into the Item database...');

    // Save Restaurant object in connection
    let itemId: string = '';
    await getRepository(Restaurant).findOne(restId)
      .then((result) => {
        if (result) {
          newItem.restaurant = result;
        }
        else {
          throw new Error(`>> Could not find restaurant with ID ${restId}`);
        }
      })
      .catch((e) => console.error(e));

    await getRepository(Item).save(newItem)
      .then((result) => {
        itemId = result.id;
        console.log(`>> Saved a new item: ${itemId} --> ${result.name}`);
      })
      .catch((e) => console.error(e));

    // Return new restaurant ID to client-side for confirmation
    if (itemId) return itemId;
  }
  throw new Error('>> Could not save item data');
};

export const editItem = async (item: Item) => {
  if (item && item.id) {
    console.log(`>> Editing item: ${item.id}...`);

    // UPDATE restaurant SET name = ... WHERE id = ...
    await getRepository(Item)
      .update(item.id, {
        name: item.name,
        price: item.price,
        emotion: item.emotion,
        recommend: item.recommend,
      })
      .then(() => {
        console.log(`>> Updated item: ${item.id} --> ${item.name}`);
      })
      .catch((e) => console.error(e));
  }
  else throw new Error('>> Invalid item data; cannot save into database');
};

// TODO: Not sure if I have to replicate in Restaurant as well (I shouldn't though...)
export const deleteItem = async (itemId: string) => {
  if (itemId) {
    console.log(`>> Deleting item: ${itemId}...`);

    await getRepository(Item)
      .delete(itemId)
      .then(() => {
        console.log(`>> Deleted item ${itemId}`);
      })
      .catch((e) => console.error(e));
  }
  else throw new Error('>> Invalid item ID; could not delete');
};

export const closeDB = () => {

};

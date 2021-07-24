import {
  createConnection,
  getRepository,
} from 'typeorm';
import Item from './entities/item.entity';
import Restaurant from './entities/restaurant.entity';

export const connectDB = async () => {
  console.log('>> Connecting to database...');

  // Uses details from ormconfig.json
  await createConnection('default')
    .then(async () => {
      console.log('\n\n>> Database connected.\n\n');
    }).catch((error) => console.log(error));
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
  if (restList.length > 0) return restList.reverse();
  throw new Error('>> Could not retrieve restaurants');
};

export const getRestaurant = async (restId: string) => {
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
};

export const addRestaurant = async (rest: Restaurant): Promise<string> => {
  console.log('>> Inserting a new record into the Restaurant database...');

  // Save Restaurant object in connection
  let id: string = '';
  await getRepository(Restaurant).save(rest)
    .then((result) => {
      id = result.id;
      console.log(`>> Saved a new restaurant: ${id} --> ${result.name}`);
    })
    .catch((e) => console.error(e));

  // Return new restaurant ID to client-side for confirmation
  if (id) return id;
  throw new Error('>> Could not save restaurant data');
};

// TODO: Only update when data is different from the previous version
export const editRestaurant = async (rest: Restaurant) => {
  console.log(`>> Editing restaurant: ${rest.id}...`);

  if (rest && rest.id) {
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
  else {
    console.error('>> Cannot update invalid restaurant data');
  }
};

export const deleteRestaurant = async (id: string) => {
  console.log(`>> Deleting restaurant: ${id}...`);

  if (id) {
    await getRepository(Restaurant)
      .delete(id)
      .then(() => {
        console.log(`>> Deleted restaurant ${id}`);
      })
      .catch((e) => console.error(e));
  }
  else {
    console.error('>> Invalid restaurant ID; could not delete');
  }
};

// * DEFINING CRUD OPERATIONS FOR ITEMS * //

export const getItemList = async (restId: string) => {
  console.log(`>> Retrieving items for: ${restId}`);

  let itemList: Item[] = [];
  if (restId) {
    await getRepository(Item)
      .createQueryBuilder('item')
      .innerJoinAndSelect('item.restId', 'restaurant')
      .getMany()
      .then((result) => {
        itemList = result;
        console.log('>> Loading complete');
      })
      .catch((e) => console.error(e));
  }

  // Return in order of most recently added items
  if (itemList.length > 0) return itemList.reverse();
  throw new Error('>> Could not retrieve items');
};

// export const addItem = async (newItem: Item) => {
// };

// export const editItem = async (item: Item) => {
// };

// export const deleteItem = async (itemId: string) => {
// };

export const closeDB = () => {

};

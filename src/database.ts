import {
  ConnectionOptions,
  createConnection,
  getRepository,
} from 'typeorm';
import 'reflect-metadata';

import Restaurant from './entities/restaurant.entity';
import Item from './entities/item.entity';

export const connectDB = async () => {
  console.log('>> Connecting to database...');

  const connOptions: ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    logging: true,
    entities: [
      Restaurant,
      Item,
    ],
  };

  if (process.env.NODE_ENV === 'production') {
    // Prod options
    Object.assign(connOptions, {
      host: process.env.DB_HOST_PROD,
      username: process.env.DB_USERNAME_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD,
      synchronize: false,

      // Connect to prod from local using the line below:
      ssl: { rejectUnauthorized: false },
    });
  }
  else {
    // Dev + test options
    Object.assign(connOptions, {
      // host: process.env.DB_HOST_DEV,
      // username: process.env.DB_USERNAME_DEV,
      // password: process.env.DB_PASSWORD_DEV,
      // database: process.env.DB_NAME_DEV,
      host: process.env.DB_HOST_PROD,
      username: process.env.DB_USERNAME_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    });
  }

  console.log(connOptions);

  await createConnection(connOptions)
    .then(async () => {
      console.log('\n\n>> Database connected.\n\n');
    }).catch((error) => {
      console.error(`>> Could not successfully connect to database due to ${error}`);
      throw error;
    });
};

// * DEFINING CRUD OPERATIONS FOR RESTAURANTS * //

export const getRestaurantList = async () => {
  console.log('>> Loading restaurants from the database...');
  let restList: Restaurant[] = [];

  await getRepository('restaurant').find().then(
    (result) => {
      if (result) {
        restList = result as Restaurant[];
        console.log('>> Loading complete');
      }
    },
  ).catch((e) => {
    console.error(e);
    throw new Error('>> Could not successfully retrieve restaurants');
  });

  // Return in order of most recently added restaurants
  return restList.reverse();
};

export const getRestaurant = async (restId: string) => {
  if (restId) {
    console.log(`>> Loading restaurant ${restId} from the database ...`);

    let rest: Restaurant = new Restaurant();
    await getRepository('restaurant').find({ where: { id: restId } })
      .then(
        (result) => {
          // Empty arrays are not null or undefined
          if (result && result.length > 0) {
            [rest] = result as Restaurant[];
            console.log('>> Loading complete');
          }
        },
      ).catch((e) => console.error(e));

    if (rest.id) return rest.getInfo();
    throw new Error(`>> Could not successfully retrieve restaurant profile ${restId}`);
  }
  else throw new Error('>> Undefined restaurant ID');
};

export const addRestaurant = async (newRest: Restaurant): Promise<string> => {
  if (newRest) {
    console.log('>> Inserting a new record into the Restaurant database...');

    // Save Restaurant object in connection
    let id: string = '';
    await getRepository('restaurant').save(newRest)
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
    await getRepository('restaurant')
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
      .catch((e) => {
        console.error(e);
        throw new Error('>> Could not successfully update restaurant');
      });
  }
  else throw new Error('>> Invalid restaurant data; cannot update restaurant');
};

export const deleteRestaurant = async (restId: string) => {
  if (restId) {
    console.log(`>> Deleting restaurant: ${restId}...`);

    await getRepository('restaurant')
      .delete(restId)
      .then(() => {
        console.log(`>> Deleted restaurant ${restId}`);
      })
      .catch((e) => {
        console.error(e);
        throw new Error('>> Could not successfully delete restaurant');
      });
  }
  else throw new Error('>> Invalid restaurant ID; cannot delete restaurant');
};

// * DEFINING CRUD OPERATIONS FOR ITEMS * //

export const getItemList = async (restId: string) => {
  if (restId) {
    console.log(`>> Retrieving items for: ${restId}`);

    let itemList: Item[] = [];
    if (restId) {
      await getRepository('restaurant').findOne(restId, { relations: ['items'] })
        .then((data) => {
          if (data) {
            const rest = data as Restaurant;
            itemList = rest.items as Item[];
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
    await getRepository('restaurant').findOne(restId)
      .then((result) => {
        if (result) {
          newItem.restaurant = result as Restaurant;
        }
        else {
          throw new Error(`>> Could not find restaurant with ID ${restId}`);
        }
      })
      .catch((e) => console.error(e));

    await getRepository('item').save(newItem)
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
    await getRepository('item')
      .update(item.id, {
        name: item.name,
        price: item.price,
        emotion: item.emotion,
        recommend: item.recommend,
      })
      .then(() => {
        console.log(`>> Updated item: ${item.id} --> ${item.name}`);
      })
      .catch((e) => {
        console.error(e);
        throw new Error('>> Could not successfully save item into database');
      });
  }
  else throw new Error('>> Invalid item data; cannot save into database');
};

export const deleteItem = async (itemId: string) => {
  if (itemId) {
    console.log(`>> Deleting item: ${itemId}...`);

    await getRepository('item')
      .delete(itemId)
      .then(() => {
        console.log(`>> Deleted item ${itemId}`);
      })
      .catch((e) => {
        console.error(e);
        throw new Error('>> Could not successfully delete item');
      });
  }
  else throw new Error('>> Invalid item ID; could not delete');
};

export const closeDB = () => {

};

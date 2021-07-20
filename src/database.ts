import {
  createConnection,
  getRepository,
} from 'typeorm';
import Restaurant from './entities/restaurant.entity';

export const connectDB = async () => {
  console.log('>> Connecting to database...');

  // Uses details from ormconfig.json
  await createConnection('default')
    .then(async () => {
      console.log('\n\n>> Database connected.\n\n');
    }).catch((error) => console.log(error));
};

export const getRestaurantList = async () => {
  console.log('>> Loading restaurants from the database...');
  let restList: Restaurant[] = [];
  await getRepository(Restaurant).find().then(
    (result) => {
      restList = result;
    },
  ).catch((e) => console.error(e));

  // Return in order of most recently added restaurants
  if (restList) return restList.reverse();
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
          console.log(`>> ${rest}`);
        }
      },
    ).catch((e) => console.error(e));

  if (rest.id) return rest.getInfo();
  throw new Error(`>> Could not retrieve restaurant profile ${restId}`);
};

export const addRestaurant = async (newRest: Restaurant): Promise<string> => {
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
  throw new Error('>> Could not save restaurant data');
};

// TODO: Only update when data is different from the previous version
export const editRestaurant = async (editRest: Restaurant) => {
  console.log(`>> Editing restaurant: ${editRest.name}`);
  if (editRest) {
    const {
      id,
      name,
      location,
      phone,
      emotion,
      recommend,
    } = editRest;

    // UPDATE restaurant SET name = ... WHERE id = ...
    await getRepository(Restaurant)
      .update(id, {
        name,
        location,
        phone,
        emotion,
        recommend,
      })
      .then(() => {
        console.log(`>> Updated restaurant: ${id} --> ${name}`);
      })
      .catch((e) => console.error(e));
  }
  else {
    console.error('Cannot update invalid restaurant data');
  }
};

export const getItems = async () => {

};

export const addItem = async () => {

};

export const closeDB = () => {

};

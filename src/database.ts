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

export const getRestaurants = async () => {
  console.log('>> Loading restaurants from the database...');
  let restList: Restaurant[] = [];
  await getRepository(Restaurant).find().then(
    (result) => {
      restList = result;
    },
  ).catch((e) => console.error(e));

  // Return in order of most recently added restaurants
  return restList.reverse();
};

export const addRestaurant = async (newRest: Restaurant): Promise<string> => {
  // Here you can start to work with your entities
  console.log('>> Inserting a new record into the Restaurant database...');

  // Save Restaurant object in connection
  const rest = await getRepository(Restaurant).save(newRest);
  console.log(`>> Saved a new restaurant: ${rest.id} --> ${rest.name}`);

  return rest.id;
};

export const getItems = async () => {

};

export const addItem = async () => {

};

export const closeDB = () => {

};

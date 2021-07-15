import {
  createConnection,
  getRepository,
} from 'typeorm';
import Restaurant from './entities/Restaurant';

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
      console.log('>> Loaded restaurants: ', result);
      restList = result;
    },
  ).catch((e) => console.error(e));
  return restList;
};

export const addRestaurant = async () => {
  // Here you can start to work with your entities
  console.log('>> Inserting a new record into the Restaurant database...');

  // Create Restaurant object
  const rest = new Restaurant();
  rest.name = 'anh dao';
  rest.location = 'dundas';
  rest.phone = '123';

  // Save Restaurant object in connection
  await getRepository(Restaurant).save(rest);
  console.log(`>> Saved a new restaurant with name: ${rest.name}`);
};

export const getItems = async () => {

};

export const addItem = async () => {

};

export const closeDB = () => {

};

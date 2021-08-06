import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { deleteRestaurant, editRestaurant, getRestaurant } from '../../../../database';
import Restaurant from '../../../../entities/restaurant.entity';
import initMiddleware from '../../../../helper/init-middleware';

import { IRestaurant } from '../../../../constant';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, PUT and DELETE
    methods: ['GET', 'PUT', 'DELETE'],
  }),
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  const {
    query: { restId },
    method,
  } = req;

  console.log(req.query);

  console.log(`\n\n >> Restaurant ID from query param: ${restId} \n\n`);

  if (restId && typeof restId === 'string') {
    switch (method) {
      // Get restaurant
      case 'GET': {
        const result = await getRestaurant(restId)
          .catch((e) => {
            console.error(e);
            return res.status(400).send(`Error while trying to get restaurant details ${restId}: ${e}`);
          });

        return res.status(200).json(result);
      }

      case 'PUT': {
        // Update restaurant
        const {
          id,
          name,
          location,
          phone,
          emotion,
          recommend,
        } = req.body;

        const editRest = Restaurant.fillInfo({
          id,
          name,
          location,
          phone,
          emotion,
          recommend,
        } as IRestaurant);

        await editRestaurant(editRest)
          .catch((e) => {
            console.error(e);
            return res.status(400).send(`Error while trying to edit restaurant ${id}: ${e}`);
          });

        return res.status(204).send('Successfully updated restaurant.');
      }

      case 'DELETE': {
        // Delete restaurant
        await deleteRestaurant(restId)
          .catch((e) => {
            console.error(e);
            return res.status(400).send(`Error while trying to delete restaurant ${restId}: ${e}`);
          });

        return res.status(204).send('Successfully deleted restaurant');
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} not allowed`);
    }
  }

  else return res.status(400).send('Restaurant ID invalid');
};

export default handler;

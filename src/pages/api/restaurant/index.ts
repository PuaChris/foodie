import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { addRestaurant } from '../../../database';
import Restaurant from '../../../entities/restaurant.entity';
import initMiddleware from '../../../helper/init-middleware';

import { IRestaurant } from '../../../constant';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with POST
    methods: ['POST'],
  }),
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  const { method } = req;

  switch (method) {
    case 'POST': {
      // Add new restaurant
      if (!req.body) return res.status(400).send('Request body is undefined');

      const {
        name,
        location,
        phone,
        emotion,
        recommend,
      } = req.body;

      // Sending new uuid for received restaurant back to client side as confirmation
      const newRest = Restaurant.fillInfo({
        name,
        location,
        phone,
        emotion,
        recommend,
      } as IRestaurant);
      const id = await addRestaurant(newRest).catch((e) => {
        console.error(e);
        return res.status(400).send(e);
      });

      if (id) {
        console.log(id);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ id });
      }
      return res.status(400).send('Returned restaurant ID is undefined');
    }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;

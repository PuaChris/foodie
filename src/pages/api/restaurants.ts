import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { getRestaurantList } from '../../database';
import initMiddleware from '../../helper/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET
    methods: ['GET'],
  }),
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  const { method } = req;

  switch (method) {
    case 'GET': {
      // Get all restaurants
      const result = await getRestaurantList().catch((e) => {
        console.error(e);
        return res.status(400).send(e);
      });
      return res.status(200).json(result);
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} not allowed`);
  }
};

export default handler;

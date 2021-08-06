import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { getItemList } from '../../../../database';
import initMiddleware from '../../../../helper/init-middleware';

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

  const {
    query: { restId },
    method,
  } = req;

  if (restId && typeof restId === 'string') {
    switch (method) {
      case 'GET': {
        // Get all items for restaurant ID
        const result = await getItemList(restId)
          .catch((e) => {
            console.error(e);
            return res.status(400);
          });

        return res.status(200).json(result);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} not allowed`);
    }
  }
  else return res.status(400).send('Restaurant ID invalid');
};

export default handler;

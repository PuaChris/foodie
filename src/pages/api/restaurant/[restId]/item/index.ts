import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { addItem } from '../../../../../database';
import Item from '../../../../../entities/item.entity';
import initMiddleware from '../../../../../helper/init-middleware';

import { IItem } from '../../../../../constant';

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

  const {
    query: { restId },
    method,
  } = req;

  if (restId && typeof restId === 'string') {
    switch (method) {
      case 'POST': {
        const {
          name,
          price,
          emotion,
          recommend,
        } = req.body;

        // Sending new uuid for received item back to client side as confirmation
        const newItem = Item.fillInfo({
          name,
          price,
          emotion,
          recommend,
        } as IItem);
        const itemId = await addItem(restId, newItem).catch((e) => {
          console.error(e);
          return res.status(400).send(e);
        });
        return res.status(200).json({ id: itemId });
      }

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} not allowed`);
    }
  }

  else return res.status(400).send('Restaurant ID invalid');
};

export default handler;

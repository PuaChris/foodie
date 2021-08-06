import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { deleteItem, editItem } from '../../../../../database';
import Item from '../../../../../entities/item.entity';
import initMiddleware from '../../../../../helper/init-middleware';

import { IItem } from '../../../../../constant';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with PUT and DELETE
    methods: ['PUT', 'DELETE'],
  }),
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run cors
  await cors(req, res);

  const {
    query: { restId, itemId },
    method,
  } = req;

  if (
    restId && itemId
    && typeof restId === 'string'
    && typeof itemId === 'string'
  ) {
    switch (method) {
      case 'PUT': {
        const {
          id,
          name,
          price,
          emotion,
          recommend,
        } = req.body;

        const updatedItem = Item.fillInfo({
          id,
          name,
          price,
          emotion,
          recommend,
        } as IItem);

        await editItem(updatedItem)
          .catch((e) => {
            console.error(e);
            return res.status(400).send(`Error while trying to edit restaurant ${id}: ${e}`);
          });

        return res.status(204).send('Successfully updated restaurant.');
      }

      case 'DELETE': {
        // Delete item
        await deleteItem(itemId)
          .catch((e) => {
            console.error(e);
            return res.status(400).send(`Error while trying to delete restaurant ${itemId}: ${e}`);
          });

        return res.status(204).send('Successfully deleted restaurant');
      }

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} not allowed`);
    }
  }

  else return res.status(400).send('Restaurant ID invalid');
};

export default handler;

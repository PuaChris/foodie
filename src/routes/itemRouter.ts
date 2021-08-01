import express from 'express';
import { IItem } from '../constant';
import {
  getItemList,
  addItem,
  editItem,
  deleteItem,
} from '../database';
import Item from '../entities/item.entity';

const ItemRouter = express.Router();

// * DEFINING API ROUTES + HANDLERS:
ItemRouter.route('/restaurant/:restId/items')
  // Get all items for restaurant ID
  .get(async (req, res) => {
    const { restId } = req.params;

    if (restId) {
      const result = await getItemList(restId)
        .catch((e) => {
          console.error(e);
          return res.status(400);
        });

      return res.status(200).json(result);
    }
    return res.status(400);
  });

ItemRouter.route('/restaurant/:restId/item')
  // Add new item
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send('Request body is undefined');

    const { restId } = req.params;

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
  });

ItemRouter.route('/restaurant/:restId/item/:itemId')

  // Edit restaurant
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send('Request body is undefined');

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
  })

  // Delete restaurant
  .delete(async (req, res) => {
    if (!req.params) return res.status(400).send('Request params are undefined');

    const { itemId } = req.params;

    await deleteItem(itemId)
      .catch((e) => {
        console.error(e);
        return res.status(400).send(`Error while trying to delete restaurant ${itemId}: ${e}`);
      });

    return res.status(204).send('Successfully deleted restaurant');
  });

export default ItemRouter;

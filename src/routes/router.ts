import express from 'express';
import { IRestaurant } from '../constant';
import {
  getRestaurants,
  addRestaurant,
  getItems,
  addItem,
} from '../database';
import Restaurant from '../entities/Restaurant';

const router = express.Router();

// * DEFINING API ROUTES + HANDLERS:
router.route('/restaurants')
  // Get all restaurants
  .get(async (req, res) => {
    const result = await getRestaurants().catch((e) => {
      console.error(e);
      return res.status(400);
    });

    return res.status(200).json(result);
  })

  // Add new restaurant
  .post(async (req, res) => {
    console.log(req.body);
    if (!req.body) return res.status(400).send('Request body is undefined');

    const {
      name,
      location,
      phone,
      emotion,
      recommend,
    } = req.body;

    // Sending new uuid for received restaurant back to client side as confirmation
    const newRest = Restaurant.getReqInfo({
      name,
      location,
      phone,
      emotion,
      recommend,
    } as IRestaurant);
    const id = await addRestaurant(newRest).catch((e) => {
      console.error(e);
      return res.status(400);
    });
    return res.status(200).json({ id });
  });

router.route('/items')
  // Get all items for restaurant
  .get(async (req, res) => {
    const result = await getItems();
    return res.status(200).json(result);
  })

  // Add new item for restaurant
  .post((req, res) => {
    addItem();
  });

export default router;

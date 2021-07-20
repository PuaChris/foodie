import express from 'express';
import { IRestaurant } from '../constant';
import {
  getRestaurantList,
  addRestaurant,
  getItems,
  addItem,
  editRestaurant,
  getRestaurant,
} from '../database';
import Restaurant from '../entities/restaurant.entity';

const router = express.Router();

// * DEFINING API ROUTES + HANDLERS:
router.route('/restaurants')
  // Get all restaurants
  .get(async (req, res) => {
    const result = await getRestaurantList().catch((e) => {
      console.error(e);
      return res.status(400);
    });

    return res.status(200).json(result);
  })

  // Add new restaurant
  .post(async (req, res) => {
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
      return res.status(400);
    });
    return res.status(200).json({ id });
  });

router.route('/restaurant/:id')
  .get(async (req, res) => {
    const { id } = req.params;

    if (id) {
      const result = await getRestaurant(id)
        .catch((e) => {
          console.error(e);
          return res.status(400);
        });

      console.log(`Router: ${result}`);
      return res.status(200).json(result);
    }
    return res.status(400);
  })

  // Edit restaurant
  .put(async (req, res) => {
    if (!req.body) return res.status(400).send('Request body is undefined');
    const {
      name,
      location,
      phone,
      emotion,
      recommend,
    } = req.body;

    const editRest = Restaurant.fillInfo({
      name,
      location,
      phone,
      emotion,
      recommend,
    } as IRestaurant);

    await editRestaurant(editRest).catch((e) => {
      console.error(e);
      return res.status(400);
    });
    return res.status(200);
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

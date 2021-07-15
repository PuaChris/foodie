import express from 'express';
import {
  getRestaurants,
  addRestaurant,
  getItems,
  addItem,
} from '../../database';

const router = express.Router();

// * DEFINING API ROUTES + HANDLERS:
router.route('/restaurants')
  .get(async (req, res) => {
    const result = await getRestaurants().catch((e) => console.error(e));

    console.log(result);
    return res.status(200).json(result);
  })
  .post((req, res) => {
    addRestaurant();
    return res.status(200);
  });

router.route('/items')
  .get(async (req, res) => {
    const result = await getItems();
    return res.status(200).json(result);
  })
  .post((req, res) => {
    addItem();
  });

export default router;

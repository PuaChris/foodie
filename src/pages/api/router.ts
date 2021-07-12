import express from 'express';
import { getRestaurant, addRestaurant } from '../../database';

const router = express.Router();

// * DEFINING API ROUTES + HANDLERS:
router.route('/restaurants')
  .get((req, res) => {
    const result = getRestaurant();
    return res.status(200).send(result);
  })
  .post((req, res) => {
    addRestaurant();
  });

export default router;

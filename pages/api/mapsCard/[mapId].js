import { getRestaurant } from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurant = await getRestaurant(req.query.restaurantId);

    res.status(200).json(restaurant);
  } else if (req.method === 'PATCH') {
    // return res.status(200).json(restaurant);
  }
  return res.status(405);
}

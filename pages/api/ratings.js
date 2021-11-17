import { insertRatings } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ratingsData = await insertRatings();

    return res.status(200).json(ratingsData);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyfrominsertrating1', body);
    console.log('bodyfrominsertrating1', body.userId);
    console.log('bodyfrominsertrating1', body.restaurantId);
    console.log('bodyfrominsertrating1', body.ratings);

    const createRatingsData = await insertRatings({
      user_id: req.body.userId,
      restaurant_id: req.body.restaurantId,
      ratings: req.body.ratings,
    });
    console.log('bodyfrominsertrating2', body);
    return res.status(200).json(createRatingsData);
  }
  return res.status(405);
}

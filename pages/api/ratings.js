import { insertRatings } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ratingsData = await insertRatings();

    return res.status(200).json(ratingsData);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyfrominsertrating', body);

    const createRatingsData = await insertRatings({
      user_id: req.body.user_id,
      restaurant_id: req.body.restaurant_id,
      ratings: req.body.ratings,
    });
    console.log('bodyfrominsertrating', body);
    return res.status(200).json(createRatingsData);
  }
  return res.status(405);
}

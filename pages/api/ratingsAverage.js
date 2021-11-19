import { ratingsAverage } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const ratings = await ratingsAverage();

    return res.status(200).json(ratings);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyfrominsertrating1', body);
    console.log('bodyfrominsertrating1', body.userId);
    console.log('bodyfromratingAverageaaaa', body.restaurantId);
    console.log('bodyfrominsertrating1', body.ratings);

    const createRatingsAverageData = await ratingsAverage({
      user_id: req.body.userId,
      restaurant_id: req.body.restaurantId,
      ratings: req.body.ratings,
    });
    console.log('bodyfrominsertrating2', body);
    return res.status(200).json(createRatingsAverageData);
  }
  return res.status(405);
}

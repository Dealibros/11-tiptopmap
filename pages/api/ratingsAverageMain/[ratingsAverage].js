import { ratingsAverage } from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurantId = Number(req.query.ratingsAverage);
    const ratings = await ratingsAverage(restaurantId);

    res.status(200).json(ratings);
  } else if (req.method === 'POST') {
    const body = req.body;
    const createRatingsAverageData = await ratingsAverage({
      user_id: body.userId,
      restaurant_id: body.restaurantId,
      ratings: body.ratings,
    });
    return res.status(200).json(createRatingsAverageData);
  }
  return res.status(405);
}

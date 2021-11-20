import { ratingsAverage } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const body = req.body;
    console.log('bodyfromratingAveragea1', body.restaurantId);
    console.log('bodyfromratingAveragerating1', req.query.restaurantId);
    const ratings = await ratingsAverage(req.query.restaurantId);

    console.log('bodyfromratingAveragea2', body.restaurantId);
    console.log('bodyfromratingAveragerating2', req.query.restaurantId);

    res.status(200).json(ratings);
  } else if (req.method === 'POST') {
    const body = req.body;
    // console.log('bodyfrominsertrating1', body);
    // console.log('bodyfrominsertrating2', body.userId);
    // console.log('bodyfromratingAverageaaaa', body.restaurantId);
    // console.log('bodyfrominsertrating3', body.ratings);

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

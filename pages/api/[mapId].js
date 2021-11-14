// Creating the end point

import { getRestaurant } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurant = await getRestaurant(req.query.restaurantId);

    res.status(200).json(restaurant);
  } else if (req.method === 'PATCH') {
    const body = req.body;

    console.log('from api body', req.body);

    // const updateRestaurantsData = await updateRestaurantById(Number(req.query.restaurantsId),{
    //   restaurantname: body.restaurantName,
    //   addressplace: body.addressPlace,
    //   descriptionplace: body.descriptionpPlace,
    //   photo: body.phoTo,
    //   rating: body.raTing,
    //   price: body.priCe,
    //   website: body.websiTe,
    //   latitude: body.latituDe,
    //   longitude: body.longituDe,
    // });

    // return res.status(200).json(updateCardata);
  }
  return res.status(405);
}

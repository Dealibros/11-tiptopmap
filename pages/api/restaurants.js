import { createRestaurants, getRestaurantsData } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurantsdata = await getRestaurantsData();

    return res.status(200).json(restaurantsdata);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyfromcreaterestaurantData', body);

    const createRestaurantsData = await createRestaurants({
      restaurantname: body.restaurantName,
      addressplace: body.addressPlace,
      descriptionplace: body.descriptionpPlace,
      photo: body.phoTo,
      rating: body.raTing,
      price: body.priCe,
      website: body.websiTe,
      latitude: body.latituDe,
      longitude: body.longituDe,
    });

    return res.status(200).json(createRestaurantsData);
  }
  return res.status(405);
}

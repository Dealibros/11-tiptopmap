// import axios from 'axios';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRestaurants, getRestaurants } from '../../util/database';

// export const getInfo = async () => {
//   try {
//     const url =
//       'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJc-yoiAcHbUcR3YoJUXXn4B4&fields=name%2Crating%2Cformatted_address%2Ctypes%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&';

//     const res = await axios.get(url);

//     const resJson = await res.json();
//     const data = {
//       status: resJson.status,
//       candidates: resJson.candidates.map((item) => {
//         let image = '';

//         if ('photos' in item) {
//           image = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
//         }

//         return {
//           formatted_address: item.formatted_address,
//           icon: item.icon,
//           name: item.name,
//           place_id: item.place_id,
//           // types: item.types,
//           image: image,
//         };
//       }),
//     };
//     console.log(data);
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// getInfo();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurantsdata = await getRestaurants();
    // console.log('from api routes', await getCarsData());

    return res.status(200).json(restaurantsdata);
  } else if (req.method === 'POST') {
    const body = req.body;
    // chek if its from the database or onlymap
    const createRestaurantsData = await createRestaurants({
      restaurantname: body.restaurantname,
      addressplace: body.addressplace,
      descriptionplace: body.descriptionplace,
      photo: body.photo,
      rating: body.rating,
      price: body.price,
      website: body.website,
      openinghours: body.openinghours,
      coordinates: body.coordinates,
    });

    return res.status(200).json(createRestaurantsData);
  }
  return res.status(405);
}

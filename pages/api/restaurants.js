// import axios from 'axios';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRestaurants, getRestaurantsData } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const restaurantsdata = await getRestaurantsData();

    return res.status(200).json(restaurantsdata);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('bodyistoo', body);
    console.log('body-review', body.price);

    // database : onlyMaps
    // chek with the database or onlymap
    const createRestaurantsData = await createRestaurants({
      restaurantname: body.restaurantName,
      addressplace: body.addressPlace,
      descriptionplace: body.descriptionpPlace,
      photo: body.phoTo,
      rating: body.raTing,
      price: body.priCe,
      website: body.websiTe,
      openinghours: body.openingHours,
      coordinates: body.coordinaTes,
    });

    return res.status(200).json(createRestaurantsData);
  }
  return res.status(405);
}

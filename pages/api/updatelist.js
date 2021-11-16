// import axios from 'axios';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getRestaurantsData } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const updateList = await getRestaurantsData();
    console.log('updateList', updateList);

    return res.status(200).json(updateList);
  } else if (req.method === 'POST') {
    const body = req.body;
    console.log('checkthis', body);

    return res.status(200).json(getRestaurantsData);
  }
  return res.status(405);
}

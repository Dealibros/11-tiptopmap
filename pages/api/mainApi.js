import { NextApiRequest, NextApiResponse } from 'next';
// import React, {
//   BrowserRouter as Router,
//   Link,
//   Route,
//   Switch,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
import { search } from '../../components/onlyMap';
import { getParsedCookie, setParsedCookie } from '../../util/cookies';

export default async function GetInfo(req, res) {
  try {
    const idPlace = req.body.idPlace;
    console.log('in', req.body.idPlace);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${idPlace}&fields=name%2Crating%2Cformatted_address%2Cformatted_phone_number%2Cprice_level%2Cwebsite%2Copening_hours/weekday_text%2Cgeometry/location%2Creviews/text%2Cicon%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&`;

    const response = await fetch(url);
    const resJson = await response.json();

    // console.log('hola2', req.body.idPlace);

    res.send(resJson);
    return {
      props: {
        data: {
          status: resJson.status,
          result: resJson.result,
        },
      },
    };
  } catch (error) {
    res.status(405);
    res.send(error);
  }
}
// if ('photos' in item) {
//   image = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
// }

// console.log('result', result);
// const data = {
//   status: resJson.status,
// result: resJson.result.map((item) => {
//   // let image = '';

//   // if ('photos' in item) {
//   //   image = item.photos[0];
//   //   // image = `https:maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
//   // }
//   console.log(item);
//   return {
// item,
// formatted_address: item.formatted_address,
// icon: item.icon,
// name: item.name,
// place_id: item.place_id,
// image: image,
//     };
//   }),
// };
// res.send(data);

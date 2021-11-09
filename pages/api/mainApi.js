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

// const thisCookie = getParsedCookie('idPlaceValue');
// console.log('In the Api', thisCookie);
export default async function GetInfo(req, res) {
  // const [idPlace, setIdPlace] = useState(2);
  // <Route
  //   exact
  //   path="/onlyMap"
  //   render={(props) => <props {...props} title={(idPlace, setIdPlace)} />}
  // />;

  try {
    const url =
      'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJPW270BuobUcREvjre-KPJaY&fields=name%2Crating%2Cformatted_address%2Cformatted_phone_number%2Cprice_level%2Cwebsite%2Copening_hours/weekday_text%2Cgeometry/location%2Creviews/text%2Cicon%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&';

    const response = await fetch(url);
    const resJson = await response.json();

    // const result = array.map((item) => {
    //   console.log(item.reviews);
    //   console.log(item);
    //   return {
    //     restaurantName: item.name,
    //     address: item.formatted_address,
    //     // review: item.reviews[0],
    //     // photo: item.photos[0],
    //     rating: item.rating[0],
    //     price_level: item.price,
    //     website: item.website,
    //     // opening_hours: item.opening_hours,
    //     coordinates: item.geometry.location,
    //     // // };
    //   };
    // });
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
    res.send(resJson);
    // res.send(result);
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
console.log(search);

//   const data = {
//     status: resJson.status,
//     candidates: resJson.candidates.map((item) => {
//       let image = '';

//       if ('photos' in item) {
//         image = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
//       }

//       return {
//         formatted_address: item.formatted_address,
//         icon: item.icon,
//         name: item.name,
//         place_id: item.place_id,
//         // types: item.types,
//         image: image,
//       };
//     }),
//   };
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// };
// console.log(error);

// getInfo();

export default async function GetInfo(req, res) {
  try {
    const idPlace = req.body.idPlace;
    console.log('in', req.body.idPlace);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${idPlace}&fields=name%2Crating%2Cformatted_address%2Cformatted_phone_number%2Cprice_level%2Cwebsite%2Copening_hours/weekday_text%2Cgeometry/location%2Creviews/text%2Ctypes%2Cicon%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&`;

    const response = await fetch(url);
    const resJson = await response.json();

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

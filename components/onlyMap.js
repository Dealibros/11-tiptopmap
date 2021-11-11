import '@reach/combobox/styles.css';
import { css } from '@emotion/react';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import mapStyles from './mapStyles';
import SearchForm from './searchForm';

// /////////////////////////DECLARATIONS///////////////////////////
const minibutton = css`
  border-radius: 0.4rem;
  text-align: center;
  margin-top: 0.5rem;
  padding-right: 2.2rem;
  padding-left: 2.2rem;
  padding-top: 0.2rem;
`;

const miniImg = css`
  height: 50px;
  width: 50px;
`;

const search = css`
  position: absolute;
  padding-top: 1.3rem;
  padding-left: 14rem;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;
`;
const searchInput = css`
  font-family: 'New Tegomin';
  font-weight: 600;
  width: 12rem;
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  border-color: lightgray;
  :focus {
    outline: none;
  }
`;

const inputPopOver = css`
  font-size: 0.8rem;
  font-family: 'New Tegomin';
  color: #848a6b;
  border-radius: 0.4rem;
`;

const infoWindow = css`
  text-align: center;
  width: 260px;
`;

const titleSearch = css`
  font-family: 'New Tegomin';
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const addressSearch = css`
  /* font-style: oblique; */
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
`;
const ratingSearch = css`
  font-weight: 500;
`;

const descriptionSearch = css`
  font-size: 0.7;
  font-weight: 400;
`;

const foodIcon = css`
  font-size: 2rem;
`;

const h4 = css`
  margin: 0;
`;

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '570px',
};
// this centers the map to this coordinates. Vienna
const center = {
  lat: 48.2042154830387,
  lng: 16.368015018501982,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  // zoomControl: false, // remove the bottom-right buttons look how to make them smaller
  // fullscreenControl: false, // remove the top-right button
};

// /////////////////////////MAIN FUNCTION MAP//////////////////////

export default function Map(props, create) {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo',
    libraries,
  });

  // To set up the much needed Markers
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [points, setPoints] = useState();
  const [theAddress, setTheAddress] = useState(5);
  const [info, setInfo] = useState();
  const [places, setPlaces] = useState();
  const [idPlace, setIdPlace] = useState();

  // //////////////////Spot for the database adding/////////////////////
  // same Db
  const [restaurantname, setRestaurantname] = useState('');
  const [addressplace, setAddressplace] = useState('');
  const [descriptionplace, setDescriptionplace] = useState('');
  const [photo, setPhoto] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('a');
  const [website, setWebsite] = useState('');
  const [openinghours, setOpeninghours] = useState('');
  // const [coordinates, setCoordinates] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function create(
    restaurantName,
    addressPlace,
    descriptionpPlace,
    phoTo,
    raTing,
    priCe,
    websiTe,
    openingHours,
    latituDe,
    longituDe,
  ) {
    // check await fetch(`${props.baseUrl}/api/cars`,
    const restaurantsResponse = await fetch(`/api/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        restaurantName,
        addressPlace,
        descriptionpPlace,
        phoTo,
        raTing,
        priCe,
        websiTe,
        openingHours,
        latituDe,
        longituDe,
      }),
    });

    const restaurant = restaurantsResponse.json();
    console.log('check2', restaurant);
  }
  // }, []);

  // Fetch to grab the API Google Places with correct id_Place added
  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch('/api/mainApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idPlace: idPlace,
        }),
      });
      // const res = await fetch('/api/mainApi');
      const resJson = await res.json();
      const result = resJson.result;

      //  console.log('from the Api, missing right idplace', resJson);

      console.log('whats this 2', result);
      console.log('whats this 23', result.photos[0].photo_reference);
      console.log('eoooo', restaurantname);
      console.log('price?', result.Price);

      setRestaurantname(result.name);
      console.log('restaurantname', restaurantname);
      setAddressplace(result.formatted_address);
      setDescriptionplace(result.reviews[1].text);
      setPhoto(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.photos[0].photo_reference}&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&`,
      );

      // `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&sensor=false&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM`;
      // `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.photos[0].photo_reference}&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM`;
      // `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${result.photos[0].photo_reference}`;
      // setPhoto(thePhoto);

      // `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&sensor=false&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM`;
      // https://lh5.googleusercontent.com/p/AF1QipNE09IvEDwYMqsX4GyZ6gjfPnVEo3I4zofeb1QU=w1333-h1445-p-k-no`;

      // https://lh5.googleusercontent.com/p/Aap_uEB0LBj2v9_a5KF2J4lkPffqNwaxhU-pmzctVNHa2nATjbwmFeVT8wSLXGXG9w7yOQUhpDRNqWBv-_zf0h7wiPt4Bsk9tfznm74BjzOevQLJIWBKA2Mn_mbLuXz-o66Pw12SAaCiN5AqqwUSxdwzk2BUAgBASDm9q1R5Uy4vskypQ03t

      //maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM` alt=''/>

      // image = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;

      setRating(result.rating);

      if (result.price_level === 1) {
        setPrice('$');
      } else if (result.price_level === 2) {
        setPrice('$$');
      } else if (result.price_level === 3) {
        setPrice('$$$');
      } else {
        setPrice('$$$$');
      }

      setWebsite(result.website);
      setOpeninghours(result.opening_hours.weekday_text[0]);
      console.log(result.opening_hours.weekday_text);
      // need to correct this format
      // console.log(coordinates); not working, Keep in mind
      // Keeps this for later position the markers.
      console.log('coorde', result.geometry.location.lat);
      console.log('coorde', result.geometry.location.lng);
      setLatitude(result.geometry.location.lat);
      setLongitude(result.geometry.location.lng);

      console.log('coordelat', latitude);
      console.log('coordelong', longitude);

      return {};
    };
    if (idPlace) {
      getInfo();
    }
  }, [idPlace]);

  console.log('a', props.restaurants);
  // Again the UseEffect Issue

  // if (idPlace) {
  //   useEffect(() => {
  //     props.restaurants?.map(
  //       (restaurant, id) => console.log('que hay aca', restaurant),
  //       console.log('b', props.restaurants),
  //       console.log('queEs', props.restaurants),
  //       console.log('queEs2', props.restaurant.latitude),
  //       console.log('queEs3', props.restaurant.longitude),
  //       setMarkers((current) => [
  //         ...current,
  //         {
  //           // lat: props.restaurant.latitude,
  //           // lng: props.restaurant.longitude,
  //         },
  //       ]),
  //     );
  //   }, [props.restaurants, idPlace]);
  // }

  // //////////////////////////////////////////

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    // mapRef.current.setMarkers;
  }, []);

  if (loadError) return 'Error loading Maps';
  if (!isLoaded) return 'Loading Maps';

  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  // /////////////////////////GOOGLE MAP///////////////////////////

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      options={options}
      // onClick={onMapClick}
      onLoad={onMapLoad}
      center={center}
    >
      <Search
        setMarkers={setMarkers}
        panTo={panTo}
        theAddress={theAddress}
        setTheAddress={setTheAddress}
        idPlace={idPlace}
        setIdPlace={setIdPlace}
      />
      <Locate panTo={panTo} />
      {/* Markers for restaurants found through search */}
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
          icon={{
            // to load here a svg instead of the boring google one.
            // Not working, check!!!
            // url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            // url: '/../public/Marker.png', //not working for some reason

            scaledSize: new window.google.maps.Size(parseFloat(30, 30)), // for size
            origin: new window.google.maps.Point(parseFloat(20, 20)),
            anchor: new window.google.maps.Point(parseFloat(10, 15)), // not working?
          }}
        />
      ))}
      {selected ? (
        <InfoWindow
          // css={infowindow}
          position={{ lat: selected.lat, lng: selected.lng }}
          // pixelOffset={new window.google.maps.Size(parseFloat(215, 265))}
          //not working yet, to position the infowindow.
          clickable={true}
          // setSelected={!null}
          infoWindow={open}
          disableAutoPan={true}
          // anchor={null}
          // disableAutoPan
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div css={infoWindow}>
            <label css={titleSearch}>{restaurantname}</label>
            <br />
            <label css={addressSearch} htmlFor>
              {addressplace}
            </label>
            <br />
            <label css={descriptionSearch} htmlFor>
              {descriptionplace}
            </label>
            <br />
            <h4 css={h4}>
              Picture ♥ <br />
              <span role="img" l css={foodIcon}>
                🌮
              </span>
            </h4>
            {/* <img
                // css={miniImg}
                alt="pizza"
                // src="pizzaicon.jpg"
                width="80"
                height="80"
              >
              </img> */}
            <label css={ratingSearch} htmlFor>
              ⭐{rating}
            </label>
            <br />
            <button
              css={minibutton}
              onClick={() =>
                create(
                  restaurantname,
                  addressplace,
                  descriptionplace,
                  photo,
                  rating,
                  price,
                  website,
                  openinghours,
                  latitude,
                  longitude,
                )
              }
            >
              +
            </button>
          </div>
        </InfoWindow>
      ) : null}
      {/* Markers from restaurants saved in the Database */}
      {props.restaurants.map(
        (restaurant) => (
          console.log('insideMarker', props.restaurants),
          console.log('insideMarker2', restaurant),
          (console.log('insideMarker3', restaurant.latitude),
          (
            <Marker
              key={`id-list-${restaurant.id}`}
              position={{
                lat: Number(restaurant.latitude),
                lng: Number(restaurant.longitude),
              }}
              icon={{
                // url: '/marker.png',
                // url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                // url: '/../public/Marker.png', //not working for some reason
                // to load here a svg instead of the boring google one
                scaledSize: new window.google.maps.Size(parseFloat(32, 27)), // for size
                origin: new window.google.maps.Point(parseFloat(0, 0)),
                anchor: new window.google.maps.Point(parseFloat(15, 15)), // not working?
              }}
              onClick={() => {
                {
                  selected ? (
                    <InfoWindow
                      onCloseClick={() => setInfoOpen(true)}
                      //look into this property
                      // css={infowindow}
                      position={{
                        lat: Number(selected.lat),
                        lng: Number(selected.lng),
                      }}
                      clickable={true}
                      // setSelected={!null}
                      infoWindow={open}
                      // anchor={null}
                      // disableAutoPan
                      onCloseClick={() => {
                        setSelected(null);
                      }}
                    >
                      <div css={infoWindow}>
                        <label css={titleSearch}>{restaurantname}</label>
                        <br />
                        <label css={addressSearch} htmlFor>
                          {addressplace}
                        </label>
                        <br />
                        <label css={descriptionSearch} htmlFor>
                          {descriptionplace}
                        </label>
                        <br />
                        <h4 css={h4}>
                          Picture ♥ <br />
                          <span role="img" l css={foodIcon}>
                            🌮
                          </span>
                        </h4>
                        <label css={ratingSearch} htmlFor>
                          ⭐{rating}
                        </label>
                        <br />
                      </div>
                    </InfoWindow>
                  ) : null;
                }
              }}
            />
          ))
        ),
      )}
      ;
      {/* if(typeof(InfoWindow) != 'undefined') {
                      InfoWindow.close();
                  }
                  infowindow.open(map, marker);
                  InfoWindow = infowindow;  */}
      {/* <Marker
          // position={{ panTo }}
          icon={{
            url: image,
            // anchor: new google.maps.Point(5, 58),
          }}
        /> */}
    </GoogleMap>
  );
}

// /////////////////////////Function SEARCH///////////////////////////////////
// ({destructuring props => dont need to write props or call with props.something})
export function Search({
  panTo,
  setMarkers,
  setTheAddress,
  theAddress,
  idPlace,
  setIdPlace,
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 48.2042154830387, lng: () => 16.368015018501982 },
      radius: 200 * 1000,
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    // A try / catch block is basically used to handle errors in JavaScript. You use this when you don't want an error in your script to break your code. ... You put your code in the try block, and immediately if there is an error, JavaScript gives the catch statement control and it just does whatever you say.

    const results = await getGeocode({ address });
    // setTheAddress(address);
    // console.log(theAddress);
    // console.log(results);

    // I need to take this value to the map page, to be able to call the API there with this value. Afterwards I need to bring all this information back here to be able to display it on the map
    // Why I can't put the place_Id into state?
    // Because setState is asynchronous?
    // setIdPlace = results[0].place_id;

    let idPlace = results[0].place_id;

    setIdPlace(idPlace);

    // console.log('this is the IdPLace in search', idPlace);
    // console.log(results); // gives dirrection from place and other properties
    // getLatlng shows the needed coordinates

    const { lat, lng } = await getLatLng(results[0]);
    setMarkers((current) => [
      ...current,
      {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
    ]);
    // after address position 48.1946826 16.3938677

    console.log(panTo({ lat, lng }));

    // console.log(results[0]);

    // console.log(address);
    setTheAddress(address);

    // console.log('newIdPlace', idPlace);
    // const handleClick = () => setTheAddress(address);
    setParsedCookie('idPlaceValue', idPlace);
  };

  return (
    <div css={search}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          css={searchInput}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your place"
        />
        <ComboboxPopover css={inputPopOver}>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={{ id }} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

// /////////////////////////Function LOCATE////////////////////////
// This seems only be useful to center where we are. No much needed
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
        );
      }}
    >
      <img src="/images/compass.png" alt="compass" />
    </button>
  );
}

// to add markers when clicking on the map
// const onMapClick = useCallback((e) => {
//   setMarkers((current) => [
//     ...current,
//     {
//       lat: parseFloat(e.latLng.lat()),
//       lng: parseFloat(e.latLng.lng()),
//     },
//   ]);
// }, []);

// some old coding from getting the api info right
//
// };
// return {
//   // place_id: item.place_id,
// };

// const data = {
//   status: resJson.status,
//   result: resJson.result[1].map((item) => {
//     let image = '';

//     if ('photos' in item) {
//       image = `https:maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
//     }
//     console.log(image);
//     return {
//       formatted_address: item.formatted_address,
//       icon: item.icon,
//       name: item.name,
//       place_id: item.place_id,
//       image: image,
//   };
// }),
// };

// useEffect(() => {
//   getInfo().then((data) => {
//     console.log(data);
//     setPlaces(data);
//   });
// }, []);

// const getIdPlace = await fetch('/api/mainApi', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     idPlace: idPlace,
//   }),
// });

// console.log('here', await getIdPlace.json());

//  getParsedCookie(idPlaceValue);

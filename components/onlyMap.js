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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
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
  padding-top: 1rem;
  padding-left: 15rem;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;
`;

const foodIcon = css`
  font-size: 2rem;
`;

const infoWindow = css`
  text-align: center;
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

const pizza = '<img src="pizza2.jpg">';
const h4 = css`
  margin: 0;
`;

// /////////////////////////MAIN FUNCTION MAP//////////////////////
export default function Map(props) {
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
  console.log(theAddress);

  //  useEffect(() => {
  //    const getInfo = async () => {
  //      const url =
  //        'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJc-yoiAcHbUcR3YoJUXXn4B4&fields=name%2Crating%2Cformatted_address%2Ctypes%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&';

  //      const res = await fetch(url);
  //      const resJson = await res.json();
  //      setInfo(resJson);
  //      const data = {
  //        status: responseJson.status,
  //        result: responseJson.result,
  //      };
  //      console.log(data);
  //      console.log('info here', info);
  //    };
  //    getInfo();
  //  }, []);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: parseFloat(e.latLng.lat()),
        lng: parseFloat(e.latLng.lng()),
      },
    ]);
  }, []);

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
      onClick={onMapClick}
      onLoad={onMapLoad}
      center={center}
    >
      <Search
        setMarkers={setMarkers}
        panTo={panTo}
        theAddress={theAddress}
        setTheAddress={setTheAddress}
      />

      <Locate panTo={panTo} />
      {markers.map((marker) => (
        <Marker
          key={`${marker.lat}-${marker.lng}`}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => {
            setSelected(marker);
          }}
          icon={{
            // url: 'public/icons.png',
            // to load here a svg instead of the boring google one
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
          clickable={true}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div css={infoWindow}>
            <label htmlFor>{theAddress}</label>
            <br />
            <label htmlFor>{}</label>
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
            <label htmlFor>Rating</label>
            <br />
            <button css={minibutton}>+</button>
          </div>
        </InfoWindow>
      ) : null}
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

// export function GetMainApi() {
//   let [info, setInfo] = useState();
//   console.log(info);

//   useEffect(() => {
//     async function getInfo() {
//       const url =
//         'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJc-yoiAcHbUcR3YoJUXXn4B4&fields=name%2Crating%2Cformatted_address%2Ctypes%2Cphoto&key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&';

//       const response = await fetch(url);
//       const responseJson = await response.json();
//       const data = {
//         status: responseJson.status,
//         result: responseJson.result,
//       };
//       setInfo(data);
//       console.log('info here', info);
//     }
//     getInfo();
//   }, []);

//   return {
//     props: {
//       data,
//     },
//   };
// }

// candidates: resJson.candidates,
// let image = '';

// if ('photos' in item)
//   image = `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyAWCz-geuuBdQaGkXM9OnFdvW0e9jIfwYM&maxwidth=400&photoreference=${item.photos[0].photo_reference}`
// }

// return {
//   formatted_address: item.formatted_address,
//   name: item.name,
//   place_id: item.place_id,
//   types: item.types,
//   image: image,
// };
// /////////////////////////Function SEARCH///////////////////////////////////
// ({destructuring props => dont need to write props or call with props.something})
export function Search({ panTo, setMarkers, setTheAddress, theAddress }) {
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
    try {
      const results = await getGeocode({ address });
      // setTheAddress(address);
      console.log(theAddress);
      console.log(results);

      // I need to take this value to the map page, to be able to call the API there with this value. Afterwards I need to bring all this information back here to be able to display it on the map
      // Why I can't put the place_Id into state?
      // Because setState is asynchronous?
      // setIdPlace = results[0].place_id;

      let idPlace = results[0].place_id;

      console.log('this is the IdPLace in search', idPlace);
      console.log(results); // gives dirrection from place and other properties
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

      console.log(results[0]);

      // console.log(address);
      setTheAddress(address);
      // const handleClick = () => setTheAddress(address);
    } catch (error) {}
  };

  return (
    <div css={search}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={{ id }} value={description} />
              ))}
          </ComboboxList>
          <Marker>Here!</Marker>
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

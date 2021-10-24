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
import React, { useEffect, useRef } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import mapStyles from './mapStyles';
import SearchForm from './searchForm';

const search = css`
  position: absolute;
  /* top: 1rem; */
  /* right: 50%; */
  /* left: 13rem; */
  padding-top: 1rem;
  padding-left: 15rem;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  z-index: 10;
`;

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '570px',
};
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
  //
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo',
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading Maps';
  if (!isLoaded) return 'Loading Maps';

  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  {
    /* <Search/> */
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo"
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Search panTo={panTo} />
        {markers.map((marker) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              // url:'' to load here a svg instead of the boring google one
              scaledSize: new window.google.maps.Size(30, 30), //for size
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <label htmlFor>Title</label>
              <br />
              <label htmlFor>Information</label>
              <h4>Picture ♥!</h4>
              <label htmlFor>Rating</label>
              <br />
            </div>
          </InfoWindow>
        ) : null}

        <Marker
          position={{ lat: 48.2042154830387, lng: 16.368015018501982 }}
          icon={{
            url: image,
            anchor: new google.maps.Point(5, 58),
          }}
        />
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

// function Locate({ panTo }) {
//   return (
//     <button
//       className="locate"
//       onClick={() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             panTo({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           () => null,
//         );
//       }}
//     >
//       <img src="/compass.svg" alt="compass" />
//     </button>
//   );
// }

export function Search() {
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
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      console.log(results);
      const { lat, lng } = await getLatLng(results[0]);
      // panTo({ lat, lng });
      console.log(results[0]);
    } catch (error) {
      console.log(address);
    }
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
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

// export default React.memo(Map);
// import { useCallback, useRef, useState } from 'react';
// import {
//   GoogleMap,
//   Marker,
//   withGoogleMap,
//   withScriptjs,
// } from 'react-google-maps';
// import SearchForm from './searchForm';

// const defaultCenter = { lat: 48.2042154830387, lng: 16.368015018501982 };

// const defaultOptions = { scrollwheel: false };

// const RegularMap = withScriptjs(
//   withGoogleMap((props) => (
//     <GoogleMap
//       defaultZoom={20}
//       defaultCenter={defaultCenter}
//       defaultOptions={defaultOptions}
//       zoom={14}
//     >
//       <Marker position={defaultCenter} />
//     </GoogleMap>
//   ))
// );

// //  map = new google.maps.Map(googlemap.current, {
// //         center: {lat: -34.397, lng: 150.644},
// //         zoom: 8,
// //         fullscreenControl: false, // remove the top-right button
// //         mapTypeControl: false, // remove the top-left buttons
// //         streetViewControl: false, // remove the pegman
// //         zoomControl: false, // remove the bottom-right buttons
// //       });
// const loadingElementStyle = { height: "100%" };
// const containerElementStyle = { height: "570px" };
// const mapElementStyle = { height: "100%" };

// export default function GoogleMaps() {
//   return (

//     <RegularMap
//       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo"
//       loadingElement={<div style={loadingElementStyle} />}
//       containerElement={<div style={containerElementStyle} />}
//       mapElement={<div style={mapElementStyle} />}

//     />

//   );
// }

// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import React from 'react';

// const containerStyle = {
//   width: '1020px',
//   height: '570px'
// };

// const center = {
//   lat: 48.2042154830387,
//   lng: 16.368015018501982
// };

// function Map() {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.API_KEY,
//   })

//   const [map, setMap] = React.useState(null)

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map)
//   }, [])

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null)
//   }, [])

//   return isLoaded ? (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//         googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${}process.env.API_KEY}&v=3.exp&libraries=geometry,drawing,places`
//       >
//         <Marker
//         position={{lat: 48.2042154830387, lng: 16.368015018501982 }}
//         // icon={{
//         //     url:image,
//         //     anchor: new google.mapsPoint(5,58)}}
//         />
//       </GoogleMap>
//   ) : <></>
// }

// export default React.memo(Map)

// const MapComponent = withScriptjs(withGoogleMap((props) => (
//     <GoogleMap
//     defaultZoom={14}
//     defaultCenter={{ lat: props.lat, lng: props.long }}
//     center={{ lat: props.lat, lng: props.long }}
//     >
//         {props.isMarkerShown && <Marker shape="rectangle" position={{ lat: props.lat, lng: props.long }} />}
//         {props.attractions.length > 1 && props.attractions.map((attraction, i) => {
//             return <Marker
//                 key={`${attraction.location_id}-${i}`}
//                 position={{lat: Number(attraction.latitude),lng: Number(attraction.longitude)}}
//                 label={attraction.name}
//                 title={attraction.name}
//                 />
//         })}
//     </GoogleMap>
// )))
// const Main = () => {
//     // initializes state
//     let [latitude, setLatitude] = React.useState(-33.7560119)
//     let [longitude, setLongitude] = React.useState(150.6038367)
//     let [attractions, setAttractions] = React.useState([])
//     let [address, setAddress] = React.useState('')
//     let [message, setMessage] = React.useState({})
//     // searchs for new locations
//     const updateCoordinates = (e) => {
//         e.preventDefault()
//         setMessage({text: 'Loading..', variant: 'info'})
//         const data = {
//             address
//         }
//         // fetches data from our api
//         fetch('/api/geocoding', {
//             method: 'POST',
//             mode: 'cors',
//             cache: 'no-cache',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.json())
//         .then(response => {
//             // add data to state
//             setAttractions(response.attractionsList)
//             setLatitude(response.lat)
//             setLongitude(response.long)
//             setMessage({})
//         })
//         .catch(() => setMessage({text: 'Something went wrong..', variant: 'danger'})
//         )
//     }
//     return (
//         <div>
//             <p className={`alert alert-${message.variant}`}>{message.text}</p>
//             <form onSubmit={(e) => updateCoordinates(e)}>
//                 <div className="form-group">
//                     <label htmlFor="address">Address</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="address"
//                         required
//                         aria-describedby="addressHelp"
//                         placeholder="42 Wallaby Way, Sydney"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         />
//                     <small id="addressHelp" className="form-text text-muted">The street address that you want to look-up, in the format used by the national postal service of the country concerned. Additional address elements such as business names and unit, suite or floor numbers should be avoided.</small>
//                 </div>
//                 <button className="btn mb-4 btn-primary" type='submit'>Search Location</button>
//             </form>
//             <MapComponent
//                 lat={latitude}
//                 long={longitude}
//                 attractions={attractions}
//                 isMarkerShown
//                 googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//                 loadingElement={<div style={{ height: `100%` }} />}
//                 containerElement={<div style={{ height: `400px` }} />}
//                 mapElement={<div style={{ height: `100%` }} />}
//                 />
//             <style jsx>{`
//                 form {
//                     margin: 2rem;
//                     background: white;
//                     border-radius: 5px;
//                     padding: 1rem;
//                 }
//                 p {
//                     margin-left: 1rem;
//                     margin-right: 1rem;
//                 }
//             `}</style>
//         </div>
//     )
// }
// export default Main

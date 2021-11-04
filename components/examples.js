const onMapClick = useCallback((e) => {
  setMarkers((current) => [
    ...current,
    {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    },
  ]);
}, []);

// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       panTo({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//     },
//     () => null,
//     options,
//   );
// }, []);

{
  /* <Marker
          position={{ lat: 48.2042154830387, lng: 16.368015018501982 }}
          icon={{
            url: image,
            anchor: new google.maps.Point(5, 58),
          }}
        /> */
}

//   return (
//     <Layout username={props.username}>
//       <Head>
//         <title>Logout</title>
//       </Head>
//       <div>
//         <div>
//           <h1 css={logoutStyle}>You have been logged out!</h1>
//         </div>
//         <div>
//           <h3 css={logoutStyle}>Thank you for visiting!!</h3>
//         </div>
//         <div>
//           <Link href="/">
//             <a css={linkStyle}>Home</a>
//           </Link>
//         </div>
//       </div>
//     </Layout>
//   );
// }

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

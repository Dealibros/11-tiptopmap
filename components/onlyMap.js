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

// /////////////////////////DECLARATIONS///////////////////////////////////
const search = css`
  position: absolute;
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
  //
};

// /////////////////////////MAIN FUNCTION MAP///////////////////////////////////

export default function Map({ setExtra }) {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo',
    libraries,
  });

  // showing as undefined

  // To set up the much needed Markers
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
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

  const panTo = useCallback(({ lat, lng }) => {
    setPoints = mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
    mapRef.current.setMarkers;
  }, []);

  if (loadError) return 'Error loading Maps';
  if (!isLoaded) return 'Loading Maps';

  const image =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  // /////////////////////////GOOGLE MAP///////////////////////////////////

  return (
    <div>
      <GoogleMap
        id="map"
        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCNUiZqrIsqP9MiPrVoqjil8Oz8Nah2CVo"
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        center={center}
      >
        <Search panTo={panTo} setMarkers={setMarkers} />
        <Locate panTo={panTo} />
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              // url:'' to load here a svg instead of the boring google one
              scaledSize: new window.google.maps.Size(30, 30), // for size
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
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
          position={{ panTo }}
          icon={{
            url: image,
            // anchor: new google.maps.Point(5, 58),
          }}
        />
      </GoogleMap>
    </div>
  );
}

// /////////////////////////Function SEARCH///////////////////////////////////

export function Search({ panTo, setMarkers }) {
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
      console.log(results);

      let idPlace = results[0].place_id;
      // I need to take this value to the map page, to be able to call the API there with this value. Afterwards I need to bring all this information back here to be able to display it on the map
      // Why I can't put the place_Id into state?
      // Because setState is asynchronous?
      // setIdPlace = results[0].place_id;

      console.log(idPlace);
      console.log(results); // gives dirrection from place and other properties
      // getLatlng shows the needed coordinates
      const { lat, lng } = await getLatLng(results[0]);
      console.log('this', getLatLng(results[0]));
      let clat = lat;
      let clng = lng;
      setMarkers((current) => [
        ...current,
        {
          lat: clat,
          lng: clng,
        },
      ]);
      console.log(lat, lng, clat, clng); // gives first vienna position lat-lng
      // after address position 48.1946826 16.3938677
      console.log(panTo({ lat, lng }));

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
          <Marker>Here!</Marker>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

// /////////////////////////Function LOCATE///////////////////////////////////
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

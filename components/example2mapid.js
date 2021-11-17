  {/* /* if(typeof(InfoWindow) != 'undefined'){' '} */}
      {
      exports.up = async function up(sql) {
  await sql`
    CREATE TABLE users_restaurants_ratings   (
			user_id integer REFERENCES users(id) ON DELETE CASCADE,
			restaurant_id integer REFERENCES restaurants(id) ON DELETE CASCADE,
			rating_id integer REFERENCES ratings(id) ON DELETE CASCADE,
			PRIMARY KEY (user_id, restaurant_id, rating_id)
		)
  `;
};
// Drop table with ley down
exports.down = async function down(sql) {
  await sql`
    DROP TABLE users_restaurants_ratings
  `;
};











        // InfoWindow.close();
      // }
      // infowindow.open(map, marker); InfoWindow = infowindow; */}
      // {/* <Marker
      //     // position={{ panTo }}
      //     icon={{
      //       url: image,
      //       // anchor: new google.maps.Point(5, 58),
      //     }}
      //   /> */}
      // {console.log('sP', selectedPlaces)}
      {/* {selectedPlaces && (
        <InfoWindow
          position={{
            lat: selectedPlaces.latitude,
            lng: selectedPlaces.longitude,
          }}
          onCloseClick={() => {
            setSelectedPlaces(null);
          }}
        >
          <div>hello</div>
        </InfoWindow>
      )
      } */}



         {/* // onClick={() => (infoWindow = { open })}
          // onClick={() => setInfoOpen(true)}
          // setSelected={!null}
          // anchor={null}
          // disableAutoPan */}
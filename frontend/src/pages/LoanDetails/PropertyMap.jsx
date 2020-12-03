import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const PropertyMap = props => {
  return (
    <Map
      google={props.google}
      zoom={18}
      initialCenter={{ lat: 21.569874, lng: 71.5893798 }}
      style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Marker
          title={'This is sweet home.'}
          name={'Home sweet home!'}
          position={{ lat: 21.569874, lng: 71.5893798 }}></Marker>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA',
})(PropertyMap);

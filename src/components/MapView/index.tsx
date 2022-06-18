import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { memo, useState } from 'react';
import { useGoogleMapContext } from '../../context/GoogleMapContext';
import { useUserContext } from '../../context/UserContext';
import styles from './styles/MapView.module.css';

function MapView(): JSX.Element {
  const { appUser } = useUserContext();
  const { setMap, markers } = useGoogleMapContext();

  const [libs] = useState<('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[]>(
    ['places'],
  );

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libs}>
      <GoogleMap
        mapContainerClassName={styles.mapContainerStyle}
        center={appUser?.location?.locationCoords || { lat: -3.745, lng: -38.523 }}
        zoom={5}
        options={{
          mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {markers?.map((marker, index) => {
          return (
            <Marker
              key={`marker-${index}`}
              position={marker.getPosition() as google.maps.LatLng}
              title={marker.getTitle() as string}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(MapView);

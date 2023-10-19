'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useGoogleMapSearchContext } from 'lib/providers/google/maps';
import { useCallback, useState } from 'react';

const containerStyle = {
  width: '380px',
  height: '250px'
};

function MyGoogleMap() {
  const { lat, lng } = useGoogleMapSearchContext();

  const center = {
    lat,
    lng
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyGoogleMap;

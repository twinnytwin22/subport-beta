'use client'
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useLocationExtractorSingle } from 'lib/hooks/useLocationExtractor';

const containerStyle = {
    width: '380px',
    height: '250px',
    borderRadius: '5px'
};



function EventGoogleMap({ lat, lng, address }: any) {
    const data = useLocationExtractorSingle(address)
    const center = {
        lat: data?.lat || 0 as number,
        lng: data?.lng || 0 as number,
    }

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
    ) : <></>;
}

export default EventGoogleMap;

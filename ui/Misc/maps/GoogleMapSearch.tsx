'use client'
import { useRef } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

export function GoogleMapSearch({ children }: { children: React.ReactNode }) {
    const inputRef = useRef<any>(null);

    const handlePlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            console.log(place.formatted_address),
                console.log(place.geometry.location.lat()),
                console.log(place.geometry.location.lng())
        }
    }


    return (

        <StandaloneSearchBox onLoad={ref => (inputRef.current = ref)} onPlacesChanged={handlePlacesChanged}>
            {children}
        </StandaloneSearchBox>
    );
}

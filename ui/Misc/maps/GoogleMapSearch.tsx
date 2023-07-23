'use client'
import { useRef } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { useGoogleMapSearchContext } from 'lib/providers/google/maps';


export function GoogleMapSearch({ children }: { children: React.ReactNode }) {
    const inputRef = useRef<any>(null);
    const { setLat, setLng, setFormattedAddress } = useGoogleMapSearchContext()

    const handlePlacesChanged = () => {
        const places = inputRef.current.getPlaces();
        if (places && places.length > 0) {
            const place = places[0];
            setFormattedAddress(place.formatted_address),
                setLat(place.geometry.location.lat()),
                setLng(place.geometry.location.lng())
        }
    }


    return (

        <StandaloneSearchBox onLoad={ref => (inputRef.current = ref)} onPlacesChanged={handlePlacesChanged}>
            {children}
        </StandaloneSearchBox>
    );
}

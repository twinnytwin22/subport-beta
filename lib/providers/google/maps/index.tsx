'use client'
import { LoadScript } from '@react-google-maps/api';

const GoogleMapWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={['places']}
        >
            {children}
        </LoadScript>
    );
};

export default GoogleMapWrap;

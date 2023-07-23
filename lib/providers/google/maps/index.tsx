"use client";
import { LoadScript } from "@react-google-maps/api";
import { createContext, useContext, useEffect, useState } from "react";

const GoogleMapSearchContext = createContext<any>(null);

export function useGoogleMapSearchContext() {
    return useContext(GoogleMapSearchContext);
}

const GoogleMapSearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [formattedAddress, setFormattedAddress] = useState<any>(null);
    const [lat, setLat] = useState<any>(0);
    const [lng, setLng] = useState<any>(0);

    useEffect(() => {
        console.log(lat, lng)
    }, [lat, lng])

    const values = {
        formattedAddress,
        lat,
        lng,
        setFormattedAddress,
        setLat,
        setLng,
    };
    return (
        <GoogleMapSearchContext.Provider value={values}>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                libraries={["places"]}
            >
                {children}
            </LoadScript>
        </GoogleMapSearchContext.Provider>
    );
};

export default GoogleMapSearchProvider;

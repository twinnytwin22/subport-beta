'use client'
import Geocode from 'react-geocode';
import { useEffect, useState } from 'react';


export const useLocationExtractorSingle = (text: string) => {
    const [locationData, setLocationData] = useState<any>(null);


    useEffect(() => {
        // Initialize Google Maps Geocoding API with your API key
        Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

        // Call the geocode function to extract location information
        Geocode.fromAddress(text).then(
            (response) => {
                const { lat, lng, formatted_address } = response.results[0].geometry.location;
                const addressComponents = response.results[0].address_components;

                const locationInfo = addressComponents.reduce((acc: any, component: any) => {
                    if (component.types.includes('locality')) {
                        acc.city = component.long_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        acc.state = component.short_name;
                    }
                    return acc;
                }, {});
                // Update the state with the extracted location data
                setLocationData({
                    city: locationInfo?.city,
                    state: locationInfo?.state,
                    lat,
                    lng,
                    formatted_address,
                });
            },

            (error) => {
                console.error('Error:', error);
            }

        );

    }, [text]);

    return locationData;
};


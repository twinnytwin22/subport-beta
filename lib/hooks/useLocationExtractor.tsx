import Geocode from 'react-geocode';
export const useLocationExtractor = async (events: string[]): Promise<any[]> => {
    // Initialize Google Maps Geocoding API with your API key
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

    const locationPromises = events.map(async (text) => {
        try {
            const response = await Geocode.fromAddress(text);
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

            return {
                city: locationInfo?.city,
                state: locationInfo?.state,
                lat,
                lng,
                formatted_address,
            };
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    });

    // Wait for all promises to be resolved
    const locationDataArray = await Promise.all(locationPromises);

    // Filter out null values (failed location extraction)
    const filteredLocationData = locationDataArray.filter((locationData) => locationData !== null);

    return filteredLocationData;
};



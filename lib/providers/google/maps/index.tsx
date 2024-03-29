'use client';
import { Library } from '@googlemaps/js-api-loader';
import { LoadScript } from '@react-google-maps/api';
import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const GoogleMapSearchContext = createContext<any>(null);

export function useGoogleMapSearchContext() {
  return useContext(GoogleMapSearchContext);
}
const libraries: Library[] = ['places'];

const GoogleMapSearchProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [formattedAddress, setFormattedAddress] = useState<any>(null);
  const [lat, setLat] = useState<any>(0);
  const [lng, setLng] = useState<any>(0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const values = {
    formattedAddress,
    lat,
    lng,
    setFormattedAddress,
    setLat,
    setLng
  };
  return (
    mounted && (
      <GoogleMapSearchContext.Provider value={values}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          libraries={libraries}
        >
          <Suspense>{children}</Suspense>
        </LoadScript>
      </GoogleMapSearchContext.Provider>
    )
  );
};

export default GoogleMapSearchProvider;

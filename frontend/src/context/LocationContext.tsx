import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  currentLocation: GeolocationCoordinates | null;
  isLocationLoading: boolean;
  locationError: string | null;
  getCurrentLocation: () => Promise<void>;
  setManualLocation: (lat: number, lng: number) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getCurrentLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocationLoading(true);
    setLocationError(null);

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords);
          setIsLocationLoading(false);
          resolve();
        },
        (error) => {
          let errorMessage = 'Unable to retrieve location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
          }
          setLocationError(errorMessage);
          setIsLocationLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  };

  const setManualLocation = (lat: number, lng: number) => {
    const coords = {
      latitude: lat,
      longitude: lng,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    } as GeolocationCoordinates;
    setCurrentLocation(coords);
    setLocationError(null);
  };

  useEffect(() => {
    // Try to get location on mount
    getCurrentLocation().catch(() => {
      // Silently fail - user can manually enable location later
    });
  }, []);

  const value: LocationContextType = {
    currentLocation,
    isLocationLoading,
    locationError,
    getCurrentLocation,
    setManualLocation,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
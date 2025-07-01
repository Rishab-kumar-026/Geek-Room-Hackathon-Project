import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { useLocation } from '../context/LocationContext';

interface Place {
  id: string;
  name: string;
  category: string;
  distance: number;
  rating: number;
}

interface MapComponentProps {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const { currentLocation, getCurrentLocation } = useLocation();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Simulated map coordinates (in a real app, you'd use actual lat/lng)
  const mapCenter = currentLocation 
    ? { x: 50, y: 50 } 
    : { x: 50, y: 50 };

  // Generate random positions for places around the center
  const getPlacePosition = (place: Place, index: number) => {
    const angle = (index * 360) / places.length;
    const radius = Math.min(place.distance * 8, 40); // Scale distance
    const x = mapCenter.x + radius * Math.cos(angle * Math.PI / 180);
    const y = mapCenter.y + radius * Math.sin(angle * Math.PI / 180);
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      restaurant: '#ef4444', // red
      attraction: '#3b82f6', // blue
      entertainment: '#8b5cf6', // purple
      shopping: '#f59e0b', // amber
      culture: '#10b981', // emerald
      nature: '#22c55e', // green
      nightlife: '#6366f1', // indigo
    };
    return colors[category] || '#6b7280'; // gray default
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* User Location */}
      {currentLocation && (
        <motion.div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${mapCenter.x}%`, top: `${mapCenter.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-white" />
            </div>
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>
        </motion.div>
      )}

      {/* Place Markers */}
      {places.map((place, index) => {
        const position = getPlacePosition(place, index);
        return (
          <motion.div
            key={place.id}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => setSelectedPlace(selectedPlace?.id === place.id ? null : place)}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: getCategoryColor(place.category) }}
              >
                {index + 1}
              </div>
              {selectedPlace?.id === place.id && (
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 border min-w-48 z-30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {place.name}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {place.category} • {place.distance} km away
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-xs font-medium ml-1">{place.rating}</span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={getCurrentLocation}
          className="bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow duration-200"
          title="Get current location"
        >
          <MapPinIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <div className="text-xs font-semibold text-gray-900 mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Recommendations</span>
          </div>
        </div>
      </div>

      {/* No Location Message */}
      {!currentLocation && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <motion.div
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">
              Enable location to see places on the map
            </p>
            <button
              onClick={getCurrentLocation}
              className="btn-primary text-sm px-4 py-2"
            >
              Enable Location
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
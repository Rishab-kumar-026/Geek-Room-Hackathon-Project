import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SunIcon, 
  CloudIcon, 
  BeakerIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { useLocation } from '../context/LocationContext';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  city: string;
  country: string;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const { currentLocation } = useLocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock weather data - in real app, you'd fetch from OpenWeatherMap API
  const mockWeatherData: WeatherData = {
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    city: 'San Francisco',
    country: 'USA',
    icon: '⛅'
  };

  useEffect(() => {
    if (currentLocation) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setWeather(mockWeatherData);
        setLoading(false);
      }, 1000);
    }
  }, [currentLocation]);

  const getWeatherIcon = (condition: string) => {
    const icons: { [key: string]: string } = {
      'clear': '☀️',
      'sunny': '☀️',
      'partly cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'rain': '🌧️',
      'drizzle': '🌦️',
      'snow': '❄️',
      'fog': '🌫️',
      'thunderstorm': '⛈️'
    };
    return icons[condition.toLowerCase()] || '🌤️';
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather || !currentLocation) {
    return (
      <div className="glass-card p-6">
        <div className="text-center py-4">
          <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Enable location to see weather information
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Weather</h3>
        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="w-4 h-4 mr-1" />
          <span>{weather.city}, {weather.country}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Weather */}
        <div className="md:col-span-2">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-gray-600">
                {weather.condition}
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Humidity</span>
            <div className="flex items-center">
              <BeakerIcon className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium">{weather.humidity}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Wind</span>
            <div className="flex items-center">
              <span className="text-sm mr-1">💨</span>
              <span className="text-sm font-medium">{weather.windSpeed} km/h</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              Perfect weather for exploring! 🌟
            </div>
          </div>
        </div>
      </div>

      {/* Weather Suggestion */}
      <motion.div
        className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-start space-x-2">
          <span className="text-lg">💡</span>
          <div>
            <p className="text-sm font-medium text-blue-800">
              Weather Suggestion
            </p>
            <p className="text-sm text-blue-700">
              {weather.temperature > 20 
                ? "Great weather for outdoor activities! Consider visiting parks or outdoor cafés."
                : weather.temperature > 10
                ? "Perfect for museum visits or indoor attractions with occasional outdoor walks."
                : "Ideal for cozy indoor experiences like cafés, museums, or shopping."
              }
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherWidget;
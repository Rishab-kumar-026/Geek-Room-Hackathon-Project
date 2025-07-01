import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  HeartIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import MapComponent from '../components/MapComponent';
import RecommendationCard from '../components/RecommendationCard';
import FilterPanel from '../components/FilterPanel';
import WeatherWidget from '../components/WeatherWidget';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { currentLocation } = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    budget: user?.preferences?.budget || 'medium',
    distance: user?.preferences?.radius || 10,
    openNow: false
  });
  const [loading, setLoading] = useState(true);

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: '1',
      name: 'The Artisan Café',
      category: 'restaurant',
      rating: 4.5,
      reviewCount: 127,
      priceLevel: 2,
      distance: 0.8,
      address: '123 Coffee Street, Downtown',
      photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'],
      description: 'Cozy café with artisanal coffee and fresh pastries',
      openNow: true,
      reason: 'Popular coffee spot matching your preferences',
      estimatedDuration: 45
    },
    {
      id: '2',
      name: 'City Art Museum',
      category: 'attraction',
      rating: 4.8,
      reviewCount: 245,
      priceLevel: 1,
      distance: 1.2,
      address: '456 Culture Avenue, Arts District',
      photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
      description: 'Contemporary art museum featuring local and international artists',
      openNow: true,
      reason: 'Highly rated cultural attraction nearby',
      estimatedDuration: 120
    },
    {
      id: '3',
      name: 'Sunset View Restaurant',
      category: 'restaurant',
      rating: 4.6,
      reviewCount: 89,
      priceLevel: 3,
      distance: 2.1,
      address: '789 Harbor View, Waterfront',
      photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'],
      description: 'Fine dining with panoramic city views and seasonal menu',
      openNow: false,
      reason: 'Perfect for evening dining with great reviews',
      estimatedDuration: 90
    },
    {
      id: '4',
      name: 'Central Park',
      category: 'nature',
      rating: 4.7,
      reviewCount: 312,
      priceLevel: 1,
      distance: 0.5,
      address: 'Central Park Loop, City Center',
      photos: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'],
      description: 'Beautiful urban park with walking trails and gardens',
      openNow: true,
      reason: 'Great for outdoor activities and relaxation',
      estimatedDuration: 60
    }
  ];

  useEffect(() => {
    // Simulate loading recommendations
    setLoading(true);
    setTimeout(() => {
      setRecommendations(mockRecommendations as any);
      setLoading(false);
    }, 1500);
  }, [filters, currentLocation]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const getPriceSymbol = (level: number) => {
    return '$'.repeat(level);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      restaurant: '🍽️',
      attraction: '🎯',
      entertainment: '🎭',
      shopping: '🛍️',
      culture: '🏛️',
      nature: '🌲',
      nightlife: '🌙'
    };
    return icons[category] || '📍';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding amazing places for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Discover amazing places near you based on your preferences
          </p>
        </motion.div>

        {/* Weather and Location Info */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="lg:col-span-2">
            <WeatherWidget />
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <FunnelIcon className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="w-full btn-glass text-center">
                Save Current Location
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recommendations */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
              <span className="text-sm text-gray-500">
                {recommendations.length} places found
              </span>
            </div>

            <div className="space-y-4">
              {recommendations.map((place: any, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <RecommendationCard place={place} />
                </motion.div>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="text-center py-12">
                <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No recommendations found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or location settings
                </p>
              </div>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="glass-card p-4 h-[600px]">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Map View
              </h3>
              <MapComponent places={recommendations} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
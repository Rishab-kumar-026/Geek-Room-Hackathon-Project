import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  HeartIcon,
  ShareIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
  distance: number;
  address: string;
  photos: string[];
  description: string;
  openNow: boolean;
  reason: string;
  estimatedDuration: number;
  phone?: string;
  website?: string;
}

interface RecommendationCardProps {
  place: Place;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ place }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically call an API to save/unsave the place
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: place.description,
        url: window.location.href,
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      className="glass-card overflow-hidden card-hover"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/3 relative">
          <div className="aspect-w-16 aspect-h-12 md:aspect-none md:h-48">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg" />
            )}
            <img
              src={place.photos[0]}
              alt={place.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              <span className="mr-1">{getCategoryIcon(place.category)}</span>
              {place.category}
            </span>
          </div>

          {/* Open/Closed Badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              place.openNow 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {place.openNow ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {place.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{place.rating}</span>
                  <span className="ml-1">({place.reviewCount})</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                  <span>{getPriceSymbol(place.priceLevel)}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{place.distance} km away</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title={isSaved ? 'Remove from saved' : 'Save place'}
              >
                {isSaved ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Share place"
              >
                <ShareIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {place.description}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span>{place.address}</span>
          </div>

          {/* AI Recommendation Reason */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div className="ml-2">
                <p className="text-sm text-primary-800 font-medium">
                  AI Recommendation
                </p>
                <p className="text-sm text-primary-700">
                  {place.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>~{place.estimatedDuration} min visit</span>
            </div>

            <div className="flex items-center space-x-2">
              {place.phone && (
                <a
                  href={`tel:${place.phone}`}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <PhoneIcon className="w-3 h-3 mr-1" />
                  Call
                </a>
              )}
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <GlobeAltIcon className="w-3 h-3 mr-1" />
                  Website
                </a>
              )}
              <button className="btn-primary text-xs px-4 py-1.5">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
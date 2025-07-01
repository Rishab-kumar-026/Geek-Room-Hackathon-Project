import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  filters: {
    category: string;
    budget: string;
    distance: number;
    openNow: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌟' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'attraction', name: 'Attractions', icon: '🎯' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙' }
  ];

  const budgetOptions = [
    { id: 'low', name: 'Budget', symbol: '$' },
    { id: 'medium', name: 'Moderate', symbol: '$$' },
    { id: 'high', name: 'Premium', symbol: '$$$' }
  ];

  const handleFilterUpdate = (key: string, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => onFilterChange({
            category: 'all',
            budget: 'medium',
            distance: 10,
            openNow: false
          })}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterUpdate('category', category.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                  filters.category === category.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Budget
          </label>
          <div className="space-y-2">
            {budgetOptions.map((budget) => (
              <button
                key={budget.id}
                onClick={() => handleFilterUpdate('budget', budget.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200 ${
                  filters.budget === budget.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium">{budget.name}</span>
                <span className="text-sm font-bold">{budget.symbol}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-3">
            Distance: {filters.distance} km
          </label>
          <div className="space-y-3">
            <input
              id="distance"
              type="range"
              min="1"
              max="50"
              value={filters.distance}
              onChange={(e) => handleFilterUpdate('distance', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${(filters.distance / 50) * 100}%, #e5e7eb ${(filters.distance / 50) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 km</span>
              <span>25 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Options
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.openNow}
                onChange={(e) => handleFilterUpdate('openNow', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Open now</span>
            </label>
            
            <div className="pt-2">
              <button
                onClick={() => handleFilterUpdate('category', 'all')}
                className="w-full btn-secondary text-sm py-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
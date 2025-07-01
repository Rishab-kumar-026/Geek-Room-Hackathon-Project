import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: 'medium' as 'low' | 'medium' | 'high',
    categories: [] as string[],
    radius: 10
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'attraction', name: 'Attractions', icon: '🎯' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
    { id: 'transport', name: 'Transport', icon: '🚌' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    setIsLoading(true);

    try {
      await register({
        ...formData,
        preferences: {
          ...preferences,
          language: 'en',
          currency: 'USD',
          notifications: {
            email: true,
            push: true,
            recommendations: true,
            events: true
          }
        }
      });
      toast.success('Welcome to Local Explorer! 🎉');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? 'Create Account' : 'Your Preferences'}
            </h2>
            <p className="text-gray-600">
              {step === 1 ? 'Join the Local Explorer community' : 'Help us personalize your experience'}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {step === 1 ? (
              <>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="input-field pl-10"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input-field pl-10"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="input-field pl-10 pr-10"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="input-field pl-10 pr-10"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Budget Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setPreferences(prev => ({ ...prev, budget: budget as any }))}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                          preferences.budget === budget
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium capitalize">{budget}</div>
                        <div className="text-xs text-gray-500">
                          {budget === 'low' ? '$' : budget === 'medium' ? '$$' : '$$$'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interests (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          preferences.categories.includes(category.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Radius */}
                <div>
                  <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Radius: {preferences.radius} km
                  </label>
                  <input
                    id="radius"
                    type="range"
                    min="1"
                    max="50"
                    value={preferences.radius}
                    onChange={(e) => setPreferences(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>50 km</span>
                  </div>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex space-x-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 btn-glass"
                >
                  Back
                </button>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span>{step === 1 ? 'Continue' : 'Create Account'}</span>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Sign In Link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
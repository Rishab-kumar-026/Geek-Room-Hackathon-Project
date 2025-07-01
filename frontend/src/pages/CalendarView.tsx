import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  category: string;
  description?: string;
}

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Visit Art Museum',
      date: '2025-01-03',
      time: '10:00',
      duration: 120,
      location: 'City Art Museum',
      category: 'culture',
      description: 'Explore contemporary art collection'
    },
    {
      id: '2',
      title: 'Lunch at Artisan Café',
      date: '2025-01-03',
      time: '13:00',
      duration: 60,
      location: 'The Artisan Café',
      category: 'restaurant',
      description: 'Try their famous coffee and pastries'
    },
    {
      id: '3',
      title: 'Central Park Walk',
      date: '2025-01-04',
      time: '16:00',
      duration: 90,
      location: 'Central Park',
      category: 'nature',
      description: 'Relaxing walk in the urban park'
    }
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      restaurant: 'bg-red-100 text-red-800 border-red-200',
      attraction: 'bg-blue-100 text-blue-800 border-blue-200',
      culture: 'bg-purple-100 text-purple-800 border-purple-200',
      nature: 'bg-green-100 text-green-800 border-green-200',
      entertainment: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      shopping: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      restaurant: '🍽️',
      attraction: '🎯',
      culture: '🏛️',
      nature: '🌲',
      entertainment: '🎭',
      shopping: '🛍️'
    };
    return icons[category] || '📍';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setSelectedDate(dateStr);
    setShowAddEvent(true);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === formatDate(new Date());

      days.push(
        <motion.div
          key={day}
          className={`p-2 min-h-24 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
            isToday ? 'bg-primary-50 border-primary-200' : ''
          }`}
          onClick={() => handleDateClick(day)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded border ${getCategoryColor(event.category)} truncate`}
                title={event.title}
              >
                <span className="mr-1">{getCategoryIcon(event.category)}</span>
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 px-2">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Travel Calendar</h1>
              <p className="text-gray-600 mt-1">Plan and organize your adventures</p>
            </div>
            <button
              onClick={() => setShowAddEvent(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </motion.div>

        {/* Calendar Header */}
        <motion.div
          className="glass-card p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {weekdays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
            {renderCalendarDays()}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map(event => (
                <motion.div
                  key={event.id}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  whileHover={{ y: -2 }}
                >
                  <div className="text-2xl">{getCategoryIcon(event.category)}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{event.time} ({event.duration} min)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setEvents(events.filter(e => e.id !== event.id))}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </motion.div>
              ))}
            {events.length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No events scheduled yet</p>
                <button
                  onClick={() => setShowAddEvent(true)}
                  className="btn-primary mt-4"
                >
                  Add Your First Event
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Event</h3>
              <button
                onClick={() => setShowAddEvent(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Event creation modal would be implemented here with form fields for title, date, time, location, etc.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddEvent(false)}
                className="btn-glass flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddEvent(false)}
                className="btn-primary flex-1"
              >
                Add Event
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
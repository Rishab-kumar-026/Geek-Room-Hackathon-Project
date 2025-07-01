import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CalendarView from './pages/CalendarView';
import ChatBot from './components/ChatBot';

// Context
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<CalendarView />} />
            </Routes>
            <ChatBot />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className="toast-container"
            />
          </div>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;

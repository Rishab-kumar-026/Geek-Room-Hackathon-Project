import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { 
  PaperAirplaneIcon, 
  MapPinIcon, 
  BuildingStorefrontIcon,
  CameraIcon,
  HeartIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import Globe3D from '../components/Globe3D';

const LandingPage: React.FC = () => {
  const floatingIcons = [
    { Icon: PaperAirplaneIcon, delay: 0, x: '10%', y: '20%' },
    { Icon: MapPinIcon, delay: 0.5, x: '80%', y: '30%' },
    { Icon: BuildingStorefrontIcon, delay: 1, x: '15%', y: '70%' },
    { Icon: CameraIcon, delay: 1.5, x: '85%', y: '60%' },
    { Icon: HeartIcon, delay: 2, x: '50%', y: '15%' },
    { Icon: ChatBubbleLeftIcon, delay: 2.5, x: '60%', y: '80%' },
  ];

  const features = [
    {
      title: 'AI-Powered Suggestions',
      description: 'Get personalized recommendations based on your location, preferences, and time.',
      icon: '🤖',
    },
    {
      title: 'Real-Time Information',
      description: 'Access up-to-date information about restaurants, attractions, and events.',
      icon: '⚡',
    },
    {
      title: 'Smart Planning',
      description: 'Automatically organize your itinerary with optimal routes and timing.',
      icon: '📅',
    },
    {
      title: 'Voice Assistant',
      description: 'Ask questions and get instant answers through our voice-powered AI.',
      icon: '🎤',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas className="three-canvas">
          <Suspense fallback={null}>
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Globe3D />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Travel Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute z-10 text-white/30"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 1 }}
        >
          <motion.div
            className="floating-icon"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3 + index * 0.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                Discover Your
                <br />
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Perfect Adventure
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                Your AI-powered city companion for personalized travel recommendations, 
                real-time suggestions, and seamless trip planning.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
                >
                  Start Exploring
                </Link>
                <Link
                  to="/dashboard"
                  className="btn-glass text-lg px-8 py-4"
                >
                  Explore Nearby
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose Local Explorer?
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Experience the future of travel with our cutting-edge AI technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-card p-6 text-center card-hover"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Join thousands of travelers who trust Local Explorer for their adventures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Sign Up Now
                </Link>
                <button className="btn-glass text-lg px-8 py-4 flex items-center justify-center space-x-2">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span>Try AI Assistant</span>
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
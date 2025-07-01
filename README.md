# 🚀 Local Explorer - Your AI-Powered City Companion

A modern travel app that provides real-time, personalized suggestions for food, sightseeing, and events using AI technology, location services, and comprehensive APIs.

## ✨ Features

### 🎨 Frontend (React + TypeScript)
- **3D Interactive Landing Page** with animated globe and floating travel icons
- **Glassmorphism UI Design** with warm sunset gradients and smooth animations
- **Authentication System** with Google OAuth integration
- **Interactive Dashboard** with personalized recommendations
- **AI Chatbot** with voice input support (Web Speech API)
- **Calendar Integration** for trip planning and itinerary management
- **Interactive Maps** with POI markers and real-time location
- **Weather Widget** with travel suggestions
- **Responsive Design** optimized for all devices

### 🔧 Backend (Node.js + Express + MongoDB)
- **RESTful API** with comprehensive endpoints
- **JWT Authentication** with secure user management
- **Real-time Recommendations** using multiple APIs:
  - Google Places API
  - OpenTripMap API
  - Foursquare Places API
- **AI Chat Integration** with OpenAI GPT-4
- **Calendar Sync** with Google Calendar API
- **Rate Limiting** and security middleware
- **MongoDB Integration** with Mongoose ODM

## 🏗️ Project Structure

```
local-explorer/
├── frontend/                   # React TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Globe3D.tsx
│   │   │   ├── ChatBot.tsx
│   │   │   ├── MapComponent.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   └── WeatherWidget.tsx
│   │   ├── pages/              # Main application pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── CalendarView.tsx
│   │   ├── context/            # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   └── LocationContext.tsx
│   │   ├── services/           # API service functions
│   │   │   └── authService.ts
│   │   ├── types/              # TypeScript type definitions
│   │   │   ├── User.ts
│   │   │   └── Place.ts
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                    # Node.js Express Backend
│   ├── src/
│   │   ├── models/             # MongoDB schemas
│   │   │   └── User.ts
│   │   ├── routes/             # API route handlers
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── recommendations.ts
│   │   │   ├── calendar.ts
│   │   │   └── ai.ts
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── notFound.ts
│   │   ├── controllers/        # Business logic
│   │   ├── services/           # External API integrations
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- API Keys for external services

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd local-explorer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables

Create `.env` files with the following variables:

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/local-explorer
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_PLACES_API_KEY=your-google-places-api-key
OPENWEATHER_API_KEY=your-openweather-api-key
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAPBOX_TOKEN=your-mapbox-access-token
```

## 📱 Core Features

### 🎯 Personalized Recommendations
- AI-powered suggestions based on user preferences
- Real-time location and weather consideration
- Multi-source data aggregation (Google Places, OpenTripMap, Foursquare)
- Smart filtering by category, budget, distance, and availability

### 🗣️ AI Chatbot & Voice Assistant
- Natural language processing for travel queries
- Voice input using Web Speech API
- Contextual responses with location awareness
- Integration with Omni Dimension AI widget for enhanced capabilities

### 🗓️ Smart Calendar Integration
- Google Calendar-style interface
- Automated itinerary generation
- Event suggestions based on optimal timing
- Sync with Google Calendar API

### 🗺️ Interactive Maps
- Real-time location tracking
- Animated POI markers with category color coding
- Click-to-explore functionality
- Route optimization and directions

### 🌤️ Weather Integration
- Current weather conditions and forecasts
- Weather-based activity suggestions
- Location-aware weather data

## 🔧 Technology Stack

### Frontend Technologies
- **React 18** with TypeScript
- **TailwindCSS** for styling with custom animations
- **Framer Motion** for smooth animations
- **Three.js & React Three Fiber** for 3D graphics
- **React Router** for navigation
- **Axios** for API communication
- **React Context** for state management

### Backend Technologies
- **Node.js & Express** for server framework
- **MongoDB & Mongoose** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet & CORS** for security
- **Rate Limiting** for API protection

### External APIs & Services
- **Google Places API** - POI data and details
- **OpenTripMap API** - Tourist attractions
- **Google Calendar API** - Calendar integration
- **OpenWeather API** - Weather data
- **OpenAI GPT-4** - AI chatbot capabilities
- **Web Speech API** - Voice recognition

## 🔐 Security Features

- JWT-based authentication with secure token handling
- Password hashing with bcryptjs
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Helmet.js for security headers
- Input validation with Joi
- Error handling middleware

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations
- `POST /api/recommendations/filter` - Filter recommendations

### Calendar
- `GET /api/calendar/events` - Get user events
- `POST /api/calendar/add` - Add new event
- `PUT /api/calendar/:id` - Update event
- `DELETE /api/calendar/:id` - Delete event

### AI Chat
- `POST /api/ai/chat` - Send message to AI assistant

### User Management
- `GET /api/user/preferences` - Get user preferences
- `PUT /api/user/preferences` - Update preferences
- `GET /api/user/saved` - Get saved places
- `POST /api/user/save` - Save a place

## 🎨 Design System

### Color Palette
- **Primary**: Warm oranges (#ff6b35, #ff8a4c, #ed5a2b)
- **Secondary**: Ocean teals (#14b8a6, #2dd4bf, #0d9488)
- **Neutral**: Clean grays for text and backgrounds
- **Gradients**: Sunset-inspired gradients for backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading sizes with proper spacing
- **Readability**: High contrast ratios for accessibility

### Animations
- **Framer Motion** for page transitions and micro-interactions
- **Custom CSS animations** for floating elements
- **Three.js animations** for 3D globe interactions
- **Loading states** with skeleton screens

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy to Railway or Render
```

### Database (MongoDB Atlas)
- Set up MongoDB Atlas cluster
- Configure connection string in environment variables

## 🔄 Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm start`
3. **Access Application**: `http://localhost:3000`
4. **API Health Check**: `http://localhost:5000/health`

## 📈 Future Enhancements

- [ ] Real-time collaborative trip planning
- [ ] Social features (trip sharing, reviews)
- [ ] Offline mode with local storage
- [ ] Push notifications for events and recommendations
- [ ] Multi-language support
- [ ] Advanced analytics and insights
- [ ] Integration with booking platforms
- [ ] Augmented reality features for POI discovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email support@localexplorer.com or join our Discord community.

---

**Local Explorer** - Discover your perfect adventure with AI-powered travel intelligence! 🌟✈️




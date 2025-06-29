# Geek-Room-Hackathon-Project

# 🌍 Local Explorer – AI-Powered Travel Companion Web App

> ✈️ Discover your city like never before. Get personalized sightseeing, food, and event suggestions from an AI travel assistant — powered by Omni Dimension AI.

## Local Explorer Hero
![Image](https://github.com/user-attachments/assets/67d17289-842c-471b-84d9-24e9ea6d2c5f)

---

## 📽️ Demo Video

Watch the walkthrough here 👉 : (https://drive.google.com/file/d/1W9ZpGYMQgIOfj_HWMVQPhi_wUQvVAMTt/view?usp=sharing)

---

## 🌐 Live Preview

Visit the deployed app here 👉 (https://imaginative-fudge-ceeb95.netlify.app)

---

## 🔗 Omni Dimension AI Integration

> Huge thanks to [**Omni Dimension AI**](https://omnidim.io) for enabling voice + chat-based travel planning.

We integrated their web widget with this snippet:

```html
<script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=YOUR_SECRET_KEY"></script>

```

## 📌 About the Project

**Local Explorer** is a fully responsive, AI-integrated travel assistant web application that helps tourists:

- Discover nearby attractions, food, and events
- Plan their itinerary with a calendar sync
- Get real-time suggestions via chat or voice from an AI assistant
- Enjoy a beautiful 3D background experience across every page

All of this is wrapped in a smooth, modern UI designed for both desktop and mobile travelers.

---

## 🧠 Features

### ✅ Intelligent AI Chatbot (Omni Dimension)
- Fully integrated AI chatbot powered by **Omni Dimension AI**
- Voice-based interaction using speech recognition
- Suggests places, estimates trip costs, and adds to itinerary

### ✅ 3D Animated Background
- Built using **Three.js** / Spline
- Seamless animations across all pages
- Parallax effects for immersive travel vibes

### ✅ User Authentication
- JWT-based login and register
- Google OAuth support

### ✅ Personalized Dashboard
- Real-time food, sightseeing, and events recommendations
- Filters for budget, distance, and time
- Cards with "Add to Calendar" and "Map" buttons

### ✅ Explore by City
- Select a city to view tourist places, food spots, and detailed info
- Includes city description, ratings, maps, and entry costs
- Data fetched from free APIs and mock backend

---

## 🧰 Tech Stack

| Frontend | Backend | APIs & Services |
|----------|---------|-----------------|
| React.js + Tailwind CSS | Node.js + Express.js | OpenTripMap API |
| Three.js (3D background) | MongoDB (Mongoose) | Google Places API |
| Framer Motion (animations) | JWT Auth | Google Calendar API |
| Omni Dimension AI Widget | REST APIs | GeoDB / Teleport API |

---

🚀 Step-by-Step: Run Local Explorer Locally
✅ 1. Clone the Repository
Open your terminal and run:

bash
Copy
Edit
git clone https://github.com/your-username/local-explorer.git
cd local-explorer
✅ 2. Set Up the Backend
📁 Navigate to backend folder:
bash
Copy
Edit
cd backend
📦 Install dependencies:
bash
Copy
Edit
npm install
🗝️ Create .env file in /backend:
bash
Copy
Edit
touch .env
Paste the following variables and replace with your actual values:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
▶️ Start the backend server:
bash
Copy
Edit
npm run dev
The backend will now be running at: http://localhost:5000

✅ 3. Set Up the Frontend
📁 Open a new terminal and go to frontend:
bash
Copy
Edit
cd ../frontend
📦 Install frontend dependencies:
bash
Copy
Edit
npm install
🗝️ Create .env file in /frontend:
bash
Copy
Edit
touch .env
Paste the following environment variables:

env
Copy
Edit
VITE_BACKEND_URL=http://localhost:5000
VITE_OMNI_DIMENSION_KEY=your_widget_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
Update the API keys with real ones from Google Cloud Console and Omni Dimension AI.

▶️ Start the frontend:
bash
Copy
Edit
npm run dev
The frontend will now be running at: http://localhost:5173

✅ 4. Visit the Application
Open your browser and go to:

arduino
Copy
Edit
http://localhost:5173
You should see the Local Explorer landing page with:

🧭 3D animated background

🗣️ Omni Dimension AI chatbot (bottom right)

🗺️ City explorer interface

🔐 Login and Register options

✅ 5. Test Functionalities
✅ Register/Login

✅ Select a city and view tourist places

✅ Try chatting with the Omni AI assistant

✅ Add locations to itinerary/calendar

✅ Explore routes on the map

🧪 Optional: Connect to MongoDB Atlas (Cloud)
If you don’t want to use local MongoDB, go to MongoDB Atlas, create a free cluster, and update your .env file in the backend with the cloud connection string.

🛠️ Troubleshooting Tips
Problem	Solution
Blank screen	Check browser console for component or route errors
Omni AI not responding	Ensure HTTPS or localhost is used; allow microphone access
Backend not connecting	Check CORS and VITE_BACKEND_URL in frontend .env
Calendar not syncing	Ensure Google API credentials are set properly

Made with ❤️ for Hackathons, Travelers, and Explorers ✈️




🌦️ Weather Search App (React)

A responsive React application that allows users to search for cities and view real-time weather data using a public API. The app includes debounced search input and infinite scrolling for a smooth user experience.

🚀 Features

    🔍 Search cities with real-time suggestions
    ⏳ Debounced input to reduce unnecessary API calls
    🌦️ Fetch weather data from OpenWeather API
    ♾️ Infinite scrolling for loading more results
    📱 Responsive UI using Tailwind CSS
    ⚡ Optimized performance with React Hooks

🛠️ Tech Stack
    React JS (Hooks)
    JavaScript (ES6+)
    Tailwind CSS
    OpenWeatherMap API

📁 Project Structure
src/
├── components/
│   ├── SearchBar.jsx
│   ├── WeatherCard.jsx
│   └── Loader.jsx
├── functions/
│   └── debounce.js
├── pages/
│   └── Home.jsx
├── services/
│   └── weatherApi.js
├── App.jsx
├── main.jsx
└── index.css

⚙️ Installation & Setup

1. Clone the repository
git clone https://github.com/ThahiraSherin/weather_task1.git
2. Navigate to project folder
cd weather-search-app
3. Install dependencies
npm install
4. Start development server
npm run dev
5. 🔑 Environment Variables

Create a .env file in the root directory and add:

VITE_WEATHER_API_KEY = dc559c80d7d86681857912772eaec06a

Then update API file:

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


🌐 API Used
OpenWeatherMap API
Endpoint:
https://api.openweathermap.org/data/2.5/find?q={city}&appid={API_KEY}&units=metric

🧠 Key Concepts Implemented

🔹 Debouncing

Used setTimeout inside a custom hook to delay API calls until the user stops typing.

🔹 Infinite Scrolling

Implemented using window scroll event to load more results dynamically.

🔹 Error Handling

Used try-catch blocks and optional chaining (?.) to prevent runtime crashes.

⚠️ Limitations

OpenWeather "find" API does not support real pagination
Infinite scroll is simulated by appending results

👩‍💻 Author

Thahira Sherin

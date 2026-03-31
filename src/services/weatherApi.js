const API_KEY = 'dc559c80d7d86681857912772eaec06a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
  

const fetchWeather = async (city) => {
      try {
        const res = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        if (!res.ok) {
            return { list: [] }; 
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch weather error:", error);
        return { list: [] };
    }
};

export default fetchWeather;
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Loader from '../components/Loader';
import useDebounce from '../functions/debounce';
import fetchWeather from '../services/weatherApi';

const Home = () => {
  
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);


  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(false);

  const [allForecasts, setAllForecasts] = useState([]);

  const ITEMS_PER_PAGE = 5;

  // Fetch data whenever debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setAllForecasts([]);
      setHasMore(false);
      setPage(1);
      return;
    }

    const getData = async () => {
      setLoading(true);
      try {
        const cities = query.split(',').map(city => city.trim()).filter(city => city.length > 0);
        let combinedForecasts = [];

        for (let city of cities) {
          const data = await fetchWeather(city);
          if (data.list && data.list.length > 0) {
            // Add city name to each forecast for clarity
            const forecastsWithCity = data.list.map(f => ({ ...f, city: data.city.name }));
            combinedForecasts = combinedForecasts.concat(forecastsWithCity);
          }
        }
        setAllForecasts(combinedForecasts);

        setResults(combinedForecasts.slice(0, ITEMS_PER_PAGE));
        setHasMore(combinedForecasts.length > ITEMS_PER_PAGE);
        setPage(1);
      } catch (error) {
        console.error(error);
        setResults([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [debouncedQuery]);

    // Load more results when page changes
    useEffect(() => {
        const handleScroll = () => {
            if (!hasMore || loading) return;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

            if( window.innerHeight + scrollTop >= scrollHeight - 100) {
                const nextPage = page + 1;
                const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
                const endIndex = nextPage * ITEMS_PER_PAGE;
                const nextResults = allForecasts.slice(startIndex, endIndex);
                setResults(prev => [...prev, ...nextResults]);
                setHasMore(endIndex < allForecasts.length);
                setPage(nextPage);
            }
    };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, hasMore, loading, allForecasts]);

  return (
    <div className="p-5 max-w-xl mx-auto">
      <SearchBar query={query} setQuery={setQuery} />

      <div className="mt-4 space-y-3">
        {results.map((item, index) => (
          <WeatherCard key={index} data={item} />
        ))}

        {!loading && !results.length && debouncedQuery && (
          <div className="text-center text-gray-500">
            No results found for “{debouncedQuery}”.
          </div>
        )}

        {!loading && !debouncedQuery && (
          <div className="text-center text-gray-500">
            Start typing a city name to search weather.
          </div>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default Home;
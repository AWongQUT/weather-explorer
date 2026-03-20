import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import WeatherCard from '../components/WeatherCard';

const cities = [
    { name: 'Brisbane', latitude: -27.4679, longitude: 153.0281, timezone: 'Australia/Brisbane' },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
    { name: 'Melbourne', latitude: -37.8136, longitude: 144.9631, timezone: 'Australia/Melbourne' },
];

async function fetchCityWeather(latitude, longitude, timezone) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=UTC`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    if (!data.current_weather) {
        throw new Error('No current weather data found');
    }

    return data.current_weather;
}

function Weather() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // useEffect re-runs whenever its dependency array values change.
    // refreshCount has no other purpose — changing it forces a fresh fetch of all cities.
    const [refreshCount, setRefreshCount] = useState(0);

    const refreshCity = async (cityName) => {
        setLocations((prev) =>
            prev.map((item) =>
                item.city === cityName ? { ...item, loading: true, error: null } : item
            )
        );

        const city = cities.find((c) => c.name === cityName);
        if (!city) return;

        try {
            const weather = await fetchCityWeather(city.latitude, city.longitude, city.timezone);
            setLocations((prev) =>
                prev.map((item) =>
                    item.city === cityName
                        ? { ...item, weather, error: null, loading: false }
                        : item
                )
            );
        } catch (err) {
            setLocations((prev) =>
                prev.map((item) =>
                    item.city === cityName
                        ? {
                            ...item,
                            error: err.message || 'Failed to load this city',
                            loading: false,
                        }
                        : item
                )
            );
        }
    };

    useEffect(() => {
        // Prevents state updates if the component is removed from the page mid-fetch
        let mounted = true;

        Promise.all(
            cities.map((city) =>
                fetchCityWeather(city.latitude, city.longitude, city.timezone)
                    .then((weather) => ({ city: city.name, timezone: city.timezone, weather, loading: false, error: null }))
                    .catch((err) => ({ city: city.name, timezone: city.timezone, error: err.message || 'Fetch error', loading: false }))
            )
        )
            .then((results) => {
                if (mounted) {
                    setLocations(results);
                    setError(null);
                }
            })
            .catch((err) => {
                if (mounted) {
                    setError(err.message || 'Failed to fetch cities');
                }
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            // Cleanup: tells the above check to stop any pending state updates
            mounted = false;
        };
    }, [refreshCount]);

    return (
        <Box className="weather-page">
            <Typography variant="h4" className="hero-title" sx={{ textAlign: 'center' }}>
                Current Weather
            </Typography>

            <Box className="section-center">
                <Button
                    variant="contained"
                    onClick={() => {
                        setRefreshCount((count) => count + 1);
                        setLoading(true);
                        setError(null);
                    }}
                >
                    Refresh City Weather
                </Button>
            </Box>

            {loading && (
                <Box className="loading-card">
                    <CircularProgress size={36} />
                </Box>
            )}

            {error && (
                <Typography color="error" className="error-card">
                    {error}
                </Typography>
            )}

            <Box className="weather-grid">
                {locations.map((item) => (
                    <WeatherCard
                        key={item.city}
                        city={item.city}
                        weather={item.weather}
                        timezone={item.timezone}
                        loading={item.loading || false}
                        error={item.error}
                        onRefresh={() => refreshCity(item.city)}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default Weather;

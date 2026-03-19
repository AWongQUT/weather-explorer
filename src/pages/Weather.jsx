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
    const tz = timezone ? encodeURIComponent(timezone) : 'Australia%2FBrisbane';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${tz}`;
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
    const [refreshCount, setRefreshCount] = useState(0);

    useEffect(() => {
        let mounted = true;

        Promise.all(
            cities.map((city) =>
                fetchCityWeather(city.latitude, city.longitude, city.timezone)
                    .then((weather) => ({ city: city.name, weather }))
                    .catch((err) => ({ city: city.name, error: err.message || 'Fetch error' }))
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
            mounted = false;
        };
    }, [refreshCount]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                Current Weather
            </Typography>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress size={36} />
                </Box>
            )}

            {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {locations.map((item) => (
                    <WeatherCard
                        key={item.city}
                        city={item.city}
                        weather={item.weather}
                        loading={loading}
                        error={item.error}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default Weather;

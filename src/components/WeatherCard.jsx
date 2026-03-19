import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FoggyIcon from '@mui/icons-material/BlurOn';

function weatherCodeText(code) {
    const map = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        80: 'Rain showers',
        81: 'Moderate showers',
        82: 'Violent showers',
        95: 'Thunderstorm',
        99: 'Hail thunderstorm',
    };
    return map[code] || 'Unknown';
}

function weatherCodeIcon(code) {
    if ([0, 1].includes(code)) {
        return <WbSunnyIcon sx={{ color: '#fdd835', mr: 1 }} />;
    }

    if ([2, 3].includes(code)) {
        return <CloudIcon sx={{ color: '#90a4ae', mr: 1 }} />;
    }

    if ([45, 48].includes(code)) {
        return <FoggyIcon sx={{ color: '#8d99ae', mr: 1 }} />;
    }

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        return <GrainIcon sx={{ color: '#4fc3f7', mr: 1 }} />;
    }

    if ([95, 99].includes(code)) {
        return <ThunderstormIcon sx={{ color: '#3949ab', mr: 1 }} />;
    }

    return <CloudIcon sx={{ color: '#90a4ae', mr: 1 }} />;
}

export default function WeatherCard({ city, weather, loading, error, onRefresh }) {
    return (
        <Card className="card-root" sx={{ minWidth: 280, maxWidth: 360 }}>
            <CardContent>
                <Typography gutterBottom className="card-content-title" variant="h6">
                    {city}
                </Typography>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <CircularProgress size={26} />
                    </Box>
                )}

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                {weather && !loading && !error && (
                    <Box>
                        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            {weatherCodeIcon(weather.weathercode)} {weather.temperature}°C
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            {weatherCodeIcon(weather.weathercode)} {weatherCodeText(weather.weathercode)}
                        </Typography>
                        <Typography variant="body2">Wind: {weather.windspeed} km/h</Typography>
                        <Typography variant="body2">Direction: {weather.winddirection}°</Typography>
                        <Typography variant="body2">Time: {weather.time}</Typography>
                    </Box>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onRefresh} disabled={loading}>
                    Refresh
                </Button>
            </CardActions>
        </Card>
    );
}

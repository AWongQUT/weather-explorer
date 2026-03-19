import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Home() {
	return (
		<Box className="home-page">
			<Box className="hero">
				<Typography variant="h3" className="hero-title">
					Weather Explorer
				</Typography>
				<Typography variant="h6" className="hero-subtitle">
					Get up-to-date weather conditions for Brisbane, Sydney, and Melbourne with responsive cards and local timezone data.
				</Typography>
				<Button href="/weather" variant="contained" size="large">
					View Live Weather
				</Button>
			</Box>

			<Box className="feature-grid">
				<Card className="card-root">
					<CardContent>
						<Typography variant="h6" className="card-content-title">
							Real-time API data
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Data is pulled from Open-Meteo for each city with automatic refresh support.
						</Typography>
					</CardContent>
				</Card>

				<Card className="card-root">
					<CardContent>
						<Typography variant="h6" className="card-content-title">
							Local timezone support
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Each city request uses its local timezone so you can read local time directly in the card.
						</Typography>
					</CardContent>
				</Card>

				<Card className="card-root">
					<CardContent>
						<Typography variant="h6" className="card-content-title">
							Mobile-friendly design
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Responsive layout adapts to desktop and mobile screens.
						</Typography>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
}

export default Home
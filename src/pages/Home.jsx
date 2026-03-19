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
		<Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
			<Box sx={{ maxWidth: 1200, mx: 'auto' }}>
				<Box sx={{ mb: 4, textAlign: 'center' }}>
					<Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
						Weather Explorer
					</Typography>
					<Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
						Get up-to-date weather conditions for Brisbane, Sydney, and Melbourne with responsive cards and local timezone data.
					</Typography>
					<Button href="/weather" variant="contained" size="large">
						View Live Weather
					</Button>
				</Box>

				<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
					<Card sx={{ p: 2 }}>
						<CardContent>
							<Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
								Real-time API data
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Data is pulled from Open-Meteo for each city with automatic refresh support.
							</Typography>
						</CardContent>
					</Card>

					<Card sx={{ p: 2 }}>
						<CardContent>
							<Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
								Local timezone support
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Each city request uses its local timezone so you can read local time directly in the card.
							</Typography>
						</CardContent>
					</Card>

					<Card sx={{ p: 2 }}>
						<CardContent>
							<Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
								Mobile-friendly design
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Responsive layout adapts to desktop and mobile screens with cards and grid behavior.
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Box>
		</Box>
	);
}

export default Home
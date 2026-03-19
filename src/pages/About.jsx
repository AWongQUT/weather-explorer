import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function About() {
    return (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: 700 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        About Weather Explorer
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        This demo app shows how to use React and Material UI alongside an external weather API.
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Features
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Live API Fetches" secondary="Open-Meteo current weather data for 3 cities." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Responsive Cards" secondary="MUI layout adapts to screen size." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Error Handling" secondary="Displays network errors per city gracefully." />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
}

export default About
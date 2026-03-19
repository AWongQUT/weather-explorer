# IFN666 React Example App

A small React + Vite demo app for IFN666 that shows:

- fetching API data from Open-Meteo
- rendering multiple city weather cards in a dashboard
- using Material UI component library
- handling loading and error states with React hooks

## Features

- `Home` landing page with app overview
- `Weather` page with Brisbane, Sydney, and Melbourne current weather
- each city requests local timezone data from Open-Meteo
- reusable `WeatherCard` component with weather code label + icon

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite, then navigate to `/weather`.

## Tips

- Change refresh behavior via the `Refresh City Weather` button
- Validate timezone behavior by inspecting the API request `timezone` parameter
- This project is intended as a simple learning template for React + fetch + UI components.


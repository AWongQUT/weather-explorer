import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

const isGitHubPages = window.location.pathname.startsWith('/weather-explorer')
const basename = isGitHubPages ? '/weather-explorer' : '/'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter basename={basename}>
			<App />
		</BrowserRouter>
	</StrictMode>,
)

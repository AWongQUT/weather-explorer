import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router'

const isGitHubPages = window.location.hostname.includes('github.io')

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{isGitHubPages ? (
			<HashRouter>
				<App />
			</HashRouter>
		) : (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)}
	</StrictMode>,
)

import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Weather from './pages/Weather'
import Layout from "./Layout"

function App() {

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="weather" element={<Weather />} />
			</Route>
		</Routes>
	)
}

export default App

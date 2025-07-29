import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"
import SignIn from "./components/SignIn";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}> </Route>
				<Route path="/sign-in" element={<SignIn />}> </Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App

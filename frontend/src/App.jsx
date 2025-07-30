import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPage from "./components/AdminPage";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Orders from "./components/Orders";
import Footer from "./components/Footer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Navbar />
							<HomePage />
							<Footer />
						</>
					}
				>
					{" "}
				</Route>
				<Route
					path="/sign-in"
					element={
						<>
							<Navbar />
							<SignIn />
							<Footer />
						</>
					}
				>
					{" "}
				</Route>
				<Route
					path="/sign-up"
					element={
						<>
							<Navbar />
							<SignUp />
							<Footer />
						</>
					}
				>
					{" "}
				</Route>
				<Route
					path="/admin"
					element={
						<>
							<Navbar user='Admin' />
							<AdminPage />
							<Footer />
						</>
					}
				>
					{" "}
				</Route>
				<Route
					path="/admin/orders"
					element={
						<>
							<Navbar user='Admin' />
							<Orders />
							<Footer />
						</>
					}
				>
					{" "}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

import Carousel from "./Carousel";
import { useState } from "react";
import OrderModal from "./OrderModal";
import SearchBar from "./SearchBar";
import PastOrders from "./PastOrders";

function HomePage() {
	const [isOrderDialogOpen, setOrderDialog] = useState(false);
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const restaurants = [
		{
			id: 1,
			name: "Butt Biryani",
			menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
		},
		{
			id: 2,
			name: "Hazara Hotel",
			menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
		},
		{
			id: 3,
			name: "Chacha Samosa",
			menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
		},
	];

	const handleSubmit = (data) => {
		console.log('Submitted:', data);
	};

	const openModal = (restaurantName) => {
		setSelectedRestaurant(restaurantName);
		setOrderDialog(true);
	};

	// Filter restaurants based on search query
	const filteredRestaurants = restaurants.filter(restaurant =>
		restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-gray-100">
			<section className="bg-white shadow-md py-16 px-6 text-center">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to QLunch</h1>
				<p className="mt-4 text-gray-600 text-lg">Order fresh and delicious lunches with just a few clicks.</p>
			</section>

			<section className="py-12 px-6 max-w-4xl mx-auto">
				<h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Restaurants</h2>

				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
					{filteredRestaurants.map((restaurant) => (
						<div key={restaurant.id} className="bg-white rounded-lg shadow border border-gray-200">
							<Carousel images={restaurant.menu} />
							<div className="p-5">
								<h5 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h5>
								<button onClick={() => openModal(restaurant.name)} aria-label={`Order from ${restaurant.name}`} className="mt-2 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" >
									Order Now
								</button>
								{selectedRestaurant === restaurant.name && (
									<OrderModal
										isOpen={isOrderDialogOpen}
										onClose={() => {
											setOrderDialog(false);
											setSelectedRestaurant(null);
										}}
										onSubmit={handleSubmit}
										restaurantName={restaurant.name}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			<h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Past Orders</h2>
			<PastOrders />

		</div>
	);
}

export default HomePage;
import { useState } from "react";
import OrderModal from "./OrderModal";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";

function Restaurants({ user = null }) {
	const [isOrderDialogOpen, setOrderDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

    const openRestaurantEditModal = () => {

    }

    const deleteSelectedRestaurant = () => {

    }

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">

            <section className="py-12 px-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Restaurants</h2>

                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                    {filteredRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white rounded-lg shadow border border-gray-200">
                            <Carousel images={restaurant.menu} />
                            <div className="p-5">
                                <h5 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h5>
                                {
                                    user === "Admin" ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => openRestaurantEditModal()} aria-label={`Order from ${restaurant.name}`} className="mt-2 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" >
                                                Edit
                                            </button>
                                            <button onClick={() => deleteSelectedRestaurant()} aria-label={`Order from ${restaurant.name}`} className="mt-2 w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700" >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <>
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
                                                // order={{
                                                // 	name: 'Muhammad Ali Mustafa',
                                                // 	items: [
                                                // 		{
                                                // 			value: 'Biryani',
                                                // 		},
                                                // 		{
                                                // 			value: 'Pulao'
                                                // 		}
                                                // 	],
                                                // 	restaurantName: 'Hazara Hotel',
                                                // 	instructions: 'Nonee'
                                                // }}
                                                />
                                            )}
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Restaurants
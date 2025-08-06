import React, { useState, useEffect } from "react";
import { OrderModal } from "./OrderModal";
import { SearchBar } from "./SearchBar";
import { Carousel } from "./Carousel";

type MenuImage = {
    id: number;
    image: string;
    uploaded_at: string;
};

type Restaurant = {
    id: number;
    name: string;
    date_created: string;
    date_updated: string;
    menu_images: MenuImage[];
};

export function Restaurants({ user = null }) {
    const [isOrderDialogOpen, setOrderDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/`);
                if (!response.ok) throw new Error("Failed to fetch restaurants");
                const data: Restaurant[] = await response.json();
                setRestaurants(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const handleSubmit = (data: any) => {
        console.log('Submitted:', data);
    };

    const openModal = (restaurantName: string) => {
        setSelectedRestaurant(restaurantName);
        setOrderDialog(true);
    };

    const openRestaurantEditModal = () => {
        // Implement edit modal logic here
    }


    const deleteSelectedRestaurant = () => {
        // Implement delete logic here
    }

    const filteredRestaurants = restaurants.filter((restaurant: Restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="py-12 px-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Restaurants</h2>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                        {filteredRestaurants.map((restaurant) => (
                            <div key={restaurant.id} className="bg-white rounded-lg shadow border border-gray-200">
                                <Carousel images={restaurant.menu_images?.map(img => `${import.meta.env.VITE_BACKEND_URL}${img.image}`) || []} />
                                <div className="p-5">
                                    <h5 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h5>
                                    {user === "Admin" ? (
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
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
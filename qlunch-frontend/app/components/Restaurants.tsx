import { useState, useEffect } from "react";
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

export function Restaurants() {
    const [isOrderDialogOpen, setOrderDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/?page=${currentPage}`);
                if (!response.ok) throw new Error("Failed to fetch restaurants");
                const data = await response.json();
                setRestaurants(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
                if (data.count && data.results.length > 0) {
                    setTotalPages(Math.ceil(data.count / data.results.length));
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, [currentPage]);

    const handleSubmit = (data: any) => {
        console.log("Submitted:", data);
    };

    const openModal = (restaurantName: string) => {
        setSelectedRestaurant(restaurantName);
        setOrderDialog(true);
    };

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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                            {filteredRestaurants.map((restaurant) => (
                                <div key={restaurant.id} className="bg-white rounded-lg shadow border border-gray-200">
                                    {restaurant.menu_images && restaurant.menu_images.length > 0 ? (
                                        <Carousel images={restaurant.menu_images.map((img) => img.image)} />
                                    ) : (
                                        <div className="w-full h-112 flex items-center justify-center text-gray-500 text-lg border-b border-gray-200">
                                            Menu not available
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h5 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h5>
                                        <button
                                            onClick={() => openModal(restaurant.name)}
                                            aria-label={`Order from ${restaurant.name}`}
                                            className="mt-2 w-full px-4 py-2 text-white bg-[#2173ea] rounded hover:bg-blue-700"
                                        >
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
                                                restaurantId={restaurant.id}
                                                restaurantName={restaurant.name}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                disabled={!prevPage}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className={`px-4 py-2 rounded ${
                                    prevPage
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} {totalPages > 1 && `of ${totalPages}`}
                            </span>

                            <button
                                disabled={!nextPage}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className={`px-4 py-2 rounded ${
                                    nextPage
                                        ? "bg-[#2173ea] text-white hover:bg-blue-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
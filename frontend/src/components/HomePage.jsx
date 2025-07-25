function HomePage() {
    const restaurants = [
        {
            name: "Butt Biryani",
            menu: [
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
            ],
        },
        {
            name: "Hazara Hotel",
            menu: [
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
            ],
        },
        {
            name: "Chacha Samosa",
            menu: [
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
            ],
        },
        {
            name: "Ghar ka Khana",
            menu: [
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
                '/vite.svg',
            ],
        },
    ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-white shadow-md py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to QLunch
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Order fresh and delicious lunches with just a few clicks.
        </p>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Popular Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.map((restaurant, index) => (
                <div key={index} className="bg-white rounded shadow p-4">
                <h3 className="text-xl font-medium text-gray-800">{restaurant.name}</h3>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {restaurant.menu.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt="Menu item"
                        className="rounded mb-2 h-20 w-full object-cover"
                    />
                    ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Order
                </button>
                </div>
                ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
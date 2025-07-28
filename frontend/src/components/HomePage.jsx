import Carousel from "./Carousel";

function HomePage() {
  const restaurants = [
    {
      name: "Butt Biryani",
      menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
    },
    {
      name: "Hazara Hotel",
      menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
    },
    {
      name: "Chacha Samosa",
      menu: ['/vite.svg', '/vite.svg', '/vite.svg'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-white shadow-md py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to QLunch</h1>
        <p className="mt-4 text-gray-600 text-lg">Order fresh and delicious lunches with just a few clicks.</p>
      </section>

      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="bg-white rounded-lg shadow border border-gray-200">
              <Carousel images={restaurant.menu} />
              <div className="p-5">
                <h5 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h5>
                <button className="mt-2 w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
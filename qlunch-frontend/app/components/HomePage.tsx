import { Restaurants } from "./Restaurants";
import { PastOrders } from "./PastOrders";

export function HomePage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<section className="bg-white shadow-md py-16 px-6 text-center">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to QLunch</h1>
				<p className="mt-4 text-gray-600 text-lg">Order fresh and delicious lunches with just a few clicks.</p>
			</section>

			<Restaurants />

			<h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Past Orders</h2>
			<PastOrders />

		</div>
	);
}
import { OrderDetailsModal } from "./OrderDetailsModal";
import { useState } from "react";

export function PastOrders() {
    const [isOrderDetailsModalOpen, setOrderDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openOrderDetailsModal = (order) => {
        setSelectedOrder(order);
        setOrderDetailsModal(true);
    };

    const orders = [
        {
            id: 1,
            name: "Muhammad Ali Mustafa",
            bill: -1,
            timestamp: 1753765042319,
            isEditable: true,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ],
            instructions: "",
            restaurantName: "Butt Biryani"
        },
        {
            id: 2,
            name: "Muhammad Ali Mustafa",
            bill: 500,
            timestamp: 1753708239334,
            isEditable: false,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ],
            instructions: "",
            restaurantName: "Chacha Samosa"
        },
        {
            id: 3,
            name: "Muhammad Ali Mustafa",
            bill: 500,
            timestamp: 1753708239334,
            isEditable: false,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ],
            instructions: "",
            restaurantName: "Hazara Hotel"
        },
        {
            id: 4,
            name: "Muhammad Ali Mustafa",
            bill: 500,
            timestamp: 1753708239334,
            isEditable: false,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ],
            instructions: "",
            restaurantName: "Butt Biryani"
        },
        {
            id: 5,
            name: "Muhammad Ali Mustafa",
            bill: 500,
            timestamp: 1753708239334,
            isEditable: false,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ],
            instructions: "",
            restaurantName: "Butt Biryani"
        }
    ];

    const getReadableDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <section className="pb-12 px-6 max-w-4xl mx-auto" id="past-orders">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Full Name
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Total Bill
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Timestamp
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit/View</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {order.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.bill}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getReadableDateTime(order.timestamp)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {!order.isEditable && (selectedOrder?.id === order.id) && (
                                            <OrderDetailsModal
                                                isOpen={isOrderDetailsModalOpen}
                                                onClose={() => {
                                                    setOrderDetailsModal(false);
                                                    setSelectedOrder(null);
                                                }}
                                                order={order}
                                            />
                                        )}
                                        <button onClick={() => openOrderDetailsModal(order)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            {order.isEditable ? 'Edit' : 'View'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}
import OrderDetailsModal from "./OrderDetailsModal";
import { useState } from "react";

function PastOrders() {
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
            bill: 500,
            timestamp: 1753765042319,
            isEditable: true,
            items: [
                {
                    value: "Biryani",
                },
                {
                    value: "Dahi BHallay"
                }
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
                                    <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Total Bill
                                    <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Timestamp
                                    <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                    </svg></a>
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

export default PastOrders
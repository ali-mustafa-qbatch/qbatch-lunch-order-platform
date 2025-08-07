import { OrderDetailsModal } from "./OrderDetailsModal";
import { useState, useEffect } from "react";
import { z } from "zod";
import axios from "axios";

const pastOrderSchema = z.object({
    id: z.number(),
    items: z.array(z.object({ value: z.string() })),
    total_price: z.number(),
    status: z.string(),
    instructions: z.string(),
    date_created: z.string(),
    date_updated: z.string(),
    restaurant: z.string(),
    customer: z.string(),
});

export const PastOrdersResponseSchema = z.array(pastOrderSchema);
export type PastOrder = z.infer<typeof pastOrderSchema>;

export function PastOrders() {
    const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);
    const [isOrderDetailsModalOpen, setOrderDetailsModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<PastOrder | null>(null);

    const openOrderDetailsModal = (order: PastOrder) => {
        setSelectedOrder(order);
        setOrderDetailsModal(true);
    };

    const getReadableDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    };

    useEffect(() => {
        const fetchPastOrders = async (): Promise<PastOrder[]> => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                let data = response.data;
                if (!Array.isArray(data)) {
                    data = [data];
                }
                const parsed = PastOrdersResponseSchema.safeParse(data);
                if (parsed.success) {
                    return parsed.data;
                } else {
                    console.error("Schema validation failed", parsed.error);
                    return [];
                }
            } catch (err) {
                console.error("Failed to fetch past orders data.", err);
                return [];
            }
        };

        const loadPastOrders = async () => {
            const data = await fetchPastOrders();
            setPastOrders(data);
        };

        loadPastOrders();
    }, []);

    return (
        <section className="pb-12 px-6 max-w-4xl mx-auto" id="past-orders">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Total Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Created</th>
                            <th scope="col" className="px-6 py-3">Instructions</th>
                            <th scope="col" className="px-6 py-3">Restaurant</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">View</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastOrders.map((order) => (
                            <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.id}
                                </th>
                                <td className="px-6 py-4">{order.total_price}</td>
                                <td className="px-6 py-4">{order.status}</td>
                                <td className="px-6 py-4">{getReadableDateTime(order.date_created)}</td>
                                <td className="px-6 py-4">{order.instructions}</td>
                                <td className="px-6 py-4">{order.restaurant}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4 text-right">
                                    {(selectedOrder?.id === order.id) && (
                                        <OrderDetailsModal
                                            isOpen={isOrderDetailsModalOpen}
                                            onClose={() => {
                                                setOrderDetailsModal(false);
                                                setSelectedOrder(null);
                                            }}
                                            order={order}
                                        />
                                    )}
                                    <button
                                        onClick={() => openOrderDetailsModal(order)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
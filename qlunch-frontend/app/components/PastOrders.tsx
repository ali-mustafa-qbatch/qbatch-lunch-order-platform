import { OrderDetailsModal } from "./OrderDetailsModal";
import { useState, useEffect } from "react";
import { z } from "zod";
import axiosInstance from "~/utils/axiosInstance";
import { OrderModal } from "./OrderModal";

const pastOrderSchema = z.object({
    id: z.number(),
    items: z.array(z.object({ value: z.string() })),
    total_price: z.number(),
    status: z.string(),
    instructions: z.string(),
    date_created: z.string(),
    date_updated: z.string(),
    restaurant: z.string(),
    restaurant_id: z.number(),
    customer: z.string(),
});

export const PastOrdersResponseSchema = z.array(pastOrderSchema);
export type PastOrder = z.infer<typeof pastOrderSchema>;

export function PastOrders() {
    const [pastOrders, setPastOrders] = useState<PastOrder[]>([]);
    const [isOrderDetailsModalOpen, setOrderDetailsModal] = useState(false);
    const [isOrderModalOpen, setOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<PastOrder | null>(null);

    const openOrderDetailsModal = (order: PastOrder) => {
        setSelectedOrder(order);
        setOrderDetailsModal(true);
    };

    const openOrderModal = (order: any) => {
        setSelectedOrder(order);
        setOrderModal(true);
    };

    const getReadableDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    };

    const isOrderEditable = (status: string): boolean => {
        const now = new Date();
        return (status === 'pending' && now.getHours() < 12);
    }

    useEffect(() => {
        const fetchPastOrders = async (): Promise<PastOrder[]> => {
            try {
                const response = await axiosInstance.get(`/api/orders/`);
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

    const deleteOrder = async (order: PastOrder) => {
        try {
            const response = await axiosInstance.delete(`/api/orders/${order.id}/`);
            if (response.status === 204) {
                alert("Order deleted successfully.");
                setPastOrders((prev) => prev.filter((o) => o.id !== order.id));
            } else {
                alert("Unexpected response from server.");
            }
        } catch (err: any) {
            if (err.response) {
                alert(`Failed to delete order. ${err.response.data.detail || "Unknown error"}`);
            } else {
                console.error("Failed to delete order", err);
                alert("Failed to delete order. Please try again.");
            }
        }
    };

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
                            <th scope="col" className="px-6 py-3">Actions</th>
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
                                <td className="px-6 py-4">{order?.instructions ? order.instructions : "-"}</td>
                                <td className="px-6 py-4">{order.restaurant}</td>
                                <td className="px-6 py-4">{order.customer}</td>
                                <td className="px-6 py-4 text-right">
                                    {(selectedOrder?.id === order.id && isOrderEditable(order.status)) ? (
                                        <OrderModal
                                            isOpen={isOrderModalOpen}
                                            onClose={() => {
                                                setOrderModal(false);
                                                setSelectedOrder(null);
                                            }}
                                            onSubmit={(updatedOrder) => {
                                                setPastOrders((prev) =>
                                                    prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
                                                );
                                            }}
                                            restaurantId={order.restaurant_id}
                                            restaurantName={order.restaurant}
                                            order={
                                                {
                                                    id: order.id,
                                                    items: order.items,
                                                    instructions: order.instructions,
                                                    restaurant: order.restaurant_id,
                                                }
                                            }
                                        />
                                    ) : (
                                        <OrderDetailsModal
                                            isOpen={isOrderDetailsModalOpen}
                                            onClose={() => {
                                                setOrderDetailsModal(false);
                                                setSelectedOrder(null);
                                            }}
                                            order={order}
                                        />
                                    )}
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => 
                                                (isOrderEditable(order.status)) ? openOrderModal(order) : openOrderDetailsModal(order)
                                            }
                                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            {
                                                (isOrderEditable(order.status)) ? "Edit" : "View"
                                            }
                                        </button>
                                        {isOrderEditable(order.status) && (
                                            <>
                                                <span className="mr-2">|</span>
                                                <button
                                                    onClick={() => deleteOrder(order)}
                                                    className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
type OrderItem = {
    value: string;
    [key: string]: any;
};

type OrderType = {
    items: OrderItem[];
    instructions: string;
    total_price: number;
    status: string;
    restaurant: string | number;
};

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderType;
}

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={!isOpen} className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden" >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Order Details <i>({order.restaurant})</i>
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left" >
                                Items
                            </label>
                            {order.items.map((item: OrderItem, index: number) => (
                                <div key={index} className='flex my-2'>
                                    <input disabled type="text" value={item.value} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                </div>
                            ))}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left" >
                                Special Instructions
                            </label>
                            <textarea disabled id="instructions" name="instructions" rows={4} value={order.instructions} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left" >
                                Total Price:
                            </label>
                        </div>
                        <div className="col-span-1">
                            <div className="text-right">
                                {order.total_price} PKR
                            </div>
                        </div>
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left" >
                                Status:
                            </label>
                        </div>
                        <div className="col-span-1">
                            <div className="text-right">
                                {order.status}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from 'react';
import axiosInstance from '~/utils/axiosInstance';

type ItemField = { value: string };
type OrderFormData = {
    items: ItemField[];
    instructions: string;
    restaurant: number;
};

type OrderModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (order: any) => void;
    restaurantId: number;
    restaurantName: string;
    order?: {
        id: number;
        items?: ItemField[];
        instructions?: string;
        restaurant?: number;
    } | null;
};

export function OrderModal({ isOpen, onClose, onSubmit, restaurantId, restaurantName, order = null }: OrderModalProps) {
    const [inputFields, setInputFields] = useState<ItemField[]>([{ value: '' }]);
    const [formData, setFormData] = useState<OrderFormData>({
        items: [],
        instructions: '',
        restaurant: restaurantId
    });

    const handleAddFields = () => {
        setInputFields([...inputFields, { value: '' }]);
    };

    const handleRemoveFields = (index: number) => {
        const list = [...inputFields];
        list.splice(index, 1);
        setInputFields(list);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const payload = {
            ...formData,
            items: [...inputFields],
            restaurant: restaurantId,
        };
        try {
            let response;
            if (order) {
                response = await axiosInstance.put(`/api/orders/${order.id}/`, payload);
            } else {
                response = await axiosInstance.post(`/api/orders/`, payload);
            }
            const data = response.data;
            onSubmit(data);
            setFormData({ items: [], instructions: '', restaurant: restaurantId });
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.detail || err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const list = [...inputFields];
        list[index].value = value;
        setInputFields(list);
    };

    useEffect(() => {
        if (isOpen) {
            setInputFields(order?.items ? [...order.items] : [{ value: '' }]);
            setFormData({
                items: order?.items ? [...order.items] : [],
                instructions: order?.instructions || '',
                restaurant: order?.restaurant || restaurantId,
            });
        }
    }, [isOpen, order, restaurantId]);

    if (!isOpen) {
        return null;
    }

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={!isOpen} className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden" >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Order Details ({restaurantName})
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white" >
                                    Items
                                </label>
                                {inputFields.map((field, index) => (
                                    <div key={index} className='flex my-2'>
                                        <input type="text" value={field.value} onChange={(e) => handleInputFieldChange(e, index)} placeholder={"item " + (index + 1)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                        {inputFields.length > 1 && (
                                            <button className="font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleRemoveFields(index)}>
                                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v10a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-5V3a1 1 0 00-1-1h-2zm3 4H8v9h4V6z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={handleAddFields} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>Add Input Field</button>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left" >
                                    Special Instructions (Optional)
                                </label>
                                <textarea id="instructions" name="instructions" rows={4} value={formData.instructions} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write instructions here" />
                            </div>
                        </div>
                        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                        <button type="submit" disabled={loading} className="w-full justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            {loading ? "Submitting..." : (order ? "Edit Order" : "Confirm Order")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
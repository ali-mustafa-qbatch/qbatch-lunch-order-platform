import { useState } from 'react';

function OrderModal({ isOpen, onClose, onSubmit, restaurantName }) {
    const [inputFields, setInputFields] = useState([{ value: '' }]);

    const handleAddFields = () => {
        setInputFields([...inputFields, { value: '' }]);
    };

    const handleRemoveFields = (index) => {
        const list = [...inputFields];
        list.splice(index, 1); 
        setInputFields(list);
    };

    const [formData, setFormData] = useState({
        name: '',
        items: [],
        instructions: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.items = [...inputFields];
        onSubmit(formData);
        setFormData({ name: '', items: [], instructions: '' }); 
        onClose();
    };

    const handleInputFieldChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputFields];
        list[index].value = value;
        setInputFields(list);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div id="crud-modal" tabIndex="-1" aria-hidden={!isOpen} className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden" >
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                    Full Name
                                </label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your full name" required />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                    Items
                                </label>
                                {inputFields.map((field, index) => (
                                    <div key={index} className='flex my-2'>
                                        <input type="text" value={field.value} onChange={(e) => handleInputFieldChange(e, index)} placeholder={"item " + (index + 1)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                        {inputFields.length > 1 && ( 
                                            <button className="font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handleRemoveFields(index)}>
                                                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v10a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-5V3a1 1 0 00-1-1h-2zm3 4H8v9h4V6z" clip-rule="evenodd"/>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button onClick={handleAddFields} className='bg-grey-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>Add Input Field</button>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                    Special Instructions (Optional)
                                </label>
                                <textarea id="instructions" name="instructions" rows="4" value={formData.instructions} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write instructions here" />
                            </div>
                        </div>
                        <button type="submit" className="w-full justify-center text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Confirm Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderModal;
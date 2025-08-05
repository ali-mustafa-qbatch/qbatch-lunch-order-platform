import pic from '../../public/ali.jpg'

export function Orders() {
    const ordersList = [
        {
            id: 1,
            name: "Muhammad Ali Mustafa",
            email: "ali.mustafa@qbatch.com",
            amount: 1000,
            status: "Delivered",
            timestamp: 1753765042319,
            image: 'ali.jpg'
        },
        {
            id: 2,
            name: "Muhammad Huzaifa",
            email: "huzaifa.saqib@qbatch.com",
            amount: 800,
            status: "Active",
            timestamp: 1753765042319,
            image: 'ali.jpg'
        }
    ];

    const getReadableDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    const getStatusBg = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-red-300';
            case 'Delivered':
                return 'bg-gray-300';
            default:
                return 'bg-green-300';
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">

                <div className="min-h-screen p-6 overflow-scroll px-10">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Orders</h2>
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Order ID <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Employee <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Amount <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Status <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Timestamp <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                    </svg>
                                    </p>
                                </th>
                                <th className="cursor-pointer border-y border-slate-900 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                    <p className="antialiased font-sans text-sm text-slate-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">Items</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList.map((order) => (
                                <tr key={order.id}>
                                    <td className="p-4 border-b border-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <p className="block antialiased font-sans text-sm leading-normal text-slate-900 font-normal">{order.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-900">
                                        <div className="flex items-center gap-3">
                                            <img src={pic} alt={order.name} className="inline-block relative object-cover object-center !rounded-full w-9 h-9" />
                                            <div className="flex flex-col">
                                                <p className="block antialiased font-sans text-sm leading-normal text-slate-900 font-normal">{order.name}</p>
                                                <p className="block antialiased font-sans text-sm leading-normal text-slate-900 font-normal opacity-70">{order.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-900">
                                        <div className="flex flex-col">
                                            <p className="block antialiased font-sans text-sm leading-normal text-slate-900 font-normal">{order.amount}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-900">
                                        <div className="w-max">
                                            <div className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap ${getStatusBg(order.status)} px-2 text-xs rounded-md`}>
                                                <select value={order.status} name="country-code" className="text-slate-700 text-sm px-2 py-3 text-center">
                                                    <option className=''>Active</option>
                                                    <option className=''>Delivered</option>
                                                    <option className=''>Payment Received</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-slate-900">
                                        <p className="block antialiased font-sans text-sm leading-normal text-slate-900 font-normal">{getReadableDateTime(order.timestamp)}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-900">
                                        <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-slate-900 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
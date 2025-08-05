import { useState } from 'react';
import { Link } from 'react-router';

export const Navbar = ({ user=null }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-b shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to={user === 'Admin' ? "/admin" : "/"}>
                            <img src='Qbatch_logo.svg' alt="Qbatch Logo" className="h-8 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        {
                            user === 'Admin' ? (
                                <>
                                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
                                    <Link to="/admin/orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Orders</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                                    <a href="/#past-orders" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Past Orders</a>
                                    <Link to="/sign-in" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Sign In</Link>
                                    <Link to="/sign-up" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Get Started</Link>
                                </>
                            )
                        }
                    </div>

                    <div className="md:hidden">
                        <button type="button" onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-controls="mobile-menu" aria-expanded={isOpen} aria-label="Toggle navigation menu" >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu" >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b shadow-sm">
                    {
                        user === 'Admin' ? (
                            <>
                                <Link to="/admin" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Dashboard
                                </Link>
                                <Link to="/admin/orders" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Orders
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Home
                                </Link>
                                <a href="/#past-orders" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Past Orders
                                </a>
                                <Link to="/sign-in" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Sign In
                                </Link>
                                <Link to="/sign-up" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)} >
                                    Get Started
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav >
    );
};
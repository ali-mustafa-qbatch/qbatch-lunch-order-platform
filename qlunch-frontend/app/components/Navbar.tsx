import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext.js';
import axiosInstance from "~/utils/axiosInstance";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isAuthenticated, user, logout: authLogout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/api/users/logout/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            authLogout();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // Adjust threshold as needed
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/30 backdrop-blur-md shadow-md'
                : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src='/Qbatch_logo.svg' alt="Qbatch Logo" className="h-8 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-100 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</Link>
                        <a href="/#past-orders" className="text-gray-100 hover:text-gray-900 px-3 py-2 text-sm font-medium">Past Orders</a>
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(prev => !prev)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
                                        {user?.username?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                    <span className="text-gray-100 font-medium">{user?.username}</span>
                                </button>

                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                                        <button
                                            onClick={() => {
                                                logout();
                                                setProfileMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-900"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/sign-in" className="text-gray-100 hover:text-gray-900 px-3 py-2 text-sm font-medium">Sign In</Link>
                                <Link to="/sign-up" className="text-gray-100 hover:text-gray-900 px-3 py-2 text-sm font-medium">Get Started</Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation menu"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
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

            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent border-b shadow-sm">
                    <Link to="/" className="block text-gray-100 hover:text-gray-900 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <a href="/#past-orders" className="block text-gray-100 hover:text-gray-900 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                        Past Orders
                    </a>
                    {isAuthenticated ? (
                        <button className="block text-gray-900 hover:text-gray-900 px-3 py-2 text-base font-medium" onClick={() => { setIsOpen(false); logout(); }}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/sign-in" className="block text-gray-100 hover:text-gray-900 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                            <Link to="/sign-up" className="block text-gray-100 hover:text-gray-900 px-3 py-2 text-base font-medium" onClick={() => setIsOpen(false)}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
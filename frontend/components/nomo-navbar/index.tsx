import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="md:flex md:items-center md:justify-between">
                    <a href="/">
                        <img className="w-auto h-6 sm:h-7" src='../../favicon.ico' alt="Vitalis Logo" />
                    </a>

                    <div className="flex items-center">
                        {/* Mobile menu button */}
                        <div className="flex md:hidden mr-4">
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                {!isOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="hidden md:flex md:items-center">
                            {pathname === "/doctor" && (
                                <a href="/doctor" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Consultation</a>
                            )}
                            {(pathname === "/patient" || pathname === "/patient/registers") && (
                                <>
                                    <a href="/patient/registers" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">History</a>
                                    <a href="/patient" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Consultation</a>
                                </>
                            )}
                            <button className="mx-4 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none" aria-label="show notifications">
                                {/* SVG Icon here */}
                            </button>
                            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                </div>
                                <h3 className="mx-2 text-gray-700 dark:text-gray-200 md:hidden">Khatab wedaa</h3>
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {isOpen && (
                            <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:hidden">
                                {/* Your mobile menu items go here */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

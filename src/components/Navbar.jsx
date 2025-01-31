import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function Navbar() {
    const [preferredPage, setPreferredPage] = useState(() => {
        return localStorage.getItem("preferredPage") || '/'; 
    });

    const handlePageChange = (e) => {
        const value = e.target.value;
        localStorage.setItem("preferredPage", value);
        setPreferredPage(value);
        toast.success(`Default page set to ${value === '/' ? 'Home' : 'Paste'} 🎯`, {
            className: 'font-medium text-gray-700',
            position: 'top-center', 
        });
    };

    return (
        <div className='flex flex-row mx-4 sm:mx-4 lg:mx-[26%] font-medium pt-4 pb-3 text-blue-500 
            justify-between items-center gap-4 sm:gap-8 md:gap-12 text-base sm:text-[1.5rem]'>
            
            {/* Navigation Links */}
            <div className='flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-shrink-0'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-500 text-white cursor-default'
                            : 'text-gray-600 hover:bg-gray-200'
                        } text-sm sm:text-base`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/paste'
                    className={({ isActive }) =>
                        `px-3 py-1 sm:px-4 sm:py-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-500 text-white cursor-default'
                            : 'text-gray-600 hover:bg-gray-200'
                        } text-sm sm:text-base`
                    }
                >
                    Paste
                </NavLink>
            </div>

            {/* Preferred Page Selector */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className="text-lg sm:text-sm text-gray-600 hidden sm:inline-block">
                    Preferred Default Page:
                </span>
                <div className="relative">
                    <select
                        value={preferredPage}
                        onChange={handlePageChange}
                        className="appearance-none pl-3 pr-6 py-1 sm:pl-4 sm:pr-8  rounded-lg bg-gray-300 text-gray-700 cursor-pointer
                            border-2 border-blue-500 hover:border-blue-600 focus:outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-200 shadow-sm text-xs sm:text-base w-28 sm:w-36"
                    >
                        <option value="/">Home</option>
                        <option value="/paste">Paste</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 sm:px-2 text-blue-500">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
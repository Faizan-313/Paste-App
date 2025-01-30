import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import { DarkModeContext } from '../App'

function Navbar() {
    // const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

    return (
        <div className='flex flex-row sm:mx-[25%] mx-[4%] font-medium pt-4 pb-3 text-blue-500 place-content-between gap-40 sm:text-[1.5rem] text-xl '>
            <div className='flex gap-4 md:gap-6 lg:gap-8'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-500 text-white cursor-default'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/paste'
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-500 text-white cursor-default'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`
                    }
                >
                    Paste
                </NavLink>
            </div>
            {/* <div
                className={`sm:w-10 sm:h-10 h-8 w-8 flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-200' : 'dark:hover:bg-gray-400'}  `}
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Dark Mode' : 'Light Mode'}
            >
                <img
                    src={isDarkMode ? '/src/assets/dark-mode.png' : '/src/assets/light-mode.png'}
                    alt="Mode Toggle"
                    className="w-7 h-7 object-contain transition-transform duration-300 hover:rotate-[30deg]"
                />
            </div> */}
        </div>
    )
}

export default Navbar

import React from 'react';
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <>
            <div className="flex flex-wrap bg-gray-600 text-white w-screen fixed z-10">
                <nav className="flex justify-between container mx-auto">
                    <div className=" py-2 flex w-full items-center">
                        <NavLink to="/" className="text-3xl font-bold font-heading" >
                            <img src="https://localhost:5001/images/logo.png" alt="" className="h-16"/>
                        </NavLink>
                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                            <li><NavLink to={'/'} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-blue-200" : ""
                            }>Home</NavLink></li>
                            <li><NavLink to={'shop'} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-blue-200" : ""
                            }>Shop</NavLink></li>
                            <li><NavLink to={'contact'} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-blue-200" : ""
                            }>Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className={'flex items-center'}>
                        <a href="/" role="button" className="relative flex">
                            <svg className="flex-1 w-8 h-8 fill-current mr-6 text-black" viewBox="0 0 24 24">
                                <path
                                    d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                            </svg>
                            <span className="absolute right-5 top-[-5px] rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm leading-tight text-center">5</span>
                        </a>
                        <button
                            type="button"
                            className="h-12 bg-indigo-500 text-white rounded-md px-4 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="h-12 bg-gray-400 text-white whitespace-nowrap rounded-md px-4 m-2 transition duration-500 ease select-none hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                        >
                            Sign up
                        </button>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header;
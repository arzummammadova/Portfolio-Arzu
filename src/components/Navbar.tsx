'use client'
import React from 'react';
import Image from 'next/image';
import { ChevronRight, MenuIcon } from 'lucide-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='container mx-auto px-4 flex justify-between items-center'>
            <div className="flex items-center">
                <Image src="/images/portfolio-logo.png" alt="Portfolio Logo" width={40} height={40} />
            </div>

            <div className="flex items-center gap-3">
             <a href='/'  className="border hover:bg-black transition hover:text-white text-xl justify-center items-center rounded-xl px-5  py-2 flex gap-3 ">Let's talk
                <ChevronRight />
            
             </a>

            <div className="md:order-last border px-5 py-2 rounded-xl">

                <MenuIcon size={28} onClick={toggleMenu} className="cursor-pointer text-gray-800 hover:text-gray-600 transition-colors" />
            </div>    
            </div>
           

            <div
                className={`fixed top-0 right-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <ul className='flex flex-col p-8 space-y-4 text-xl mt-16'>
                    <li>
                        <a href="/" onClick={toggleMenu} className="block text-gray-800 hover:text-blue-600 transition-colors text-2xl font-semibold">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/letstalk" onClick={toggleMenu} className="block text-gray-800 hover:text-blue-600 transition-colors text-2xl font-semibold">
                            Let's Talk
                        </a>
                    </li>
                </ul>
            </div>

            {menuOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black opacity-50 z-40"
                ></div>
            )}
        </div>
    );
};

export default Navbar;
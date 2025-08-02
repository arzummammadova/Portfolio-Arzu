'use client';
import React from 'react';
import Image from 'next/image';
import { ChevronRight, MenuIcon, FileText } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    const cvDownloadLink = "/ArzuMammadovaCV.pdf";


  return (
    <div className='container mx-auto px-4 flex justify-between items-center py-6 relative z-50'>
      <Link href='/' className="flex items-center">
        <Image src="/images/portfolio-logo.png" alt="Portfolio Logo" width={28} height={28} />
      </Link>

      <div className="flex items-center gap-3">
        {/* CV Download Icon */}
        <a
  href={cvDownloadLink} // Local path from public folder          download="ArzuMammadova.pdf" // You can change the downloaded file name here
          className="flex border text-black bg-white text-xl justify-center items-center rounded-xl px-5 py-2 gap-3 hover:bg-black hover:text-white transition"
        >
          <FileText size={20} /> {/* CV Icon */}
          CV
        </a>

        <Link
          href="/letstalk"
          className="hidden sm:flex border text-black bg-white text-xl justify-center items-center rounded-xl px-5 py-2 gap-3 hover:bg-black hover:text-white transition"
        >
          Let's talk <ChevronRight />
        </Link>


        <div className="md:order-last border px-5 py-2 rounded-xl">
          <MenuIcon
            size={28}
            onClick={toggleMenu}
            className="cursor-pointer text-gray-800 hover:text-gray-600 transition-colors"
          />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full bg-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <ul className='flex flex-col p-8 space-y-4 text-xl mt-16'>
          <li>
            <Link href="/" onClick={toggleMenu} className="block text-gray-800 hover:text-blue-600 text-2xl font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/letstalk" onClick={toggleMenu} className="block text-gray-800 hover:text-blue-600 text-2xl font-semibold">
              Let's Talk
            </Link>
          </li>
          {/* CV Download Icon in mobile menu */}
          <li>
            <a
              href="https://drive.google.com/file/d/1XpIGzk3bAj9eJWRDhZwpML5c7Mqt_t1J/view?usp=drive_link"
              download="Your_CV_Name.pdf"
              onClick={toggleMenu}
              className="block text-gray-800 hover:text-blue-600 text-2xl font-semibold flex items-center gap-2"
            >
              <FileText size={24} /> {/* CV Icon for mobile */}
              CV
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
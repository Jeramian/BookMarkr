'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-black text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-lg font-bold">BookMarkr</h1>
              </div>
              <div className="md:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                  </svg>
                </button>
              </div>
              <ul className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'} md:block px-4 mx-auto font-semibold font-heading space-x-12`}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/bookShelf">Book Shelf</Link>
                </li>
              </ul>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default NavBar;

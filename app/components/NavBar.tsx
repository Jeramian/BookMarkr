'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="header">
      <div className="flex flex-wrap place-items-center">
        <section className="relative mx-auto">
          <nav className="flex justify-between bg-black text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
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
              <div className="hidden xl:flex items-center space-x-5 items-center">
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default NavBar;

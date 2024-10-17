"use client";
import React, { useEffect, useState } from 'react';

const BookShelf = () => {
    const [shelf, setShelf] = useState([]);

    useEffect(() => {
        const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setShelf(savedShelf);
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>Caitlin&apos;s Book Shelf</h2>
            <ul className="mt-6 space-y-4">
                {shelf.length > 0 ? (
                    shelf.map((book, index) => (
                        <li key={index} className="border rounded-lg shadow-md p-4 bg-white">
                            <h3 className="text-lg font-semibold text-pink-300">{book.volumeInfo.title}</h3>
                            <p className="text-gray-700">Authors: {book.volumeInfo.authors?.join(', ')}</p>
                            <p className="text-gray-600">Page Count: {book.volumeInfo.pageCount || 'N/A'}</p>
                            <p className="text-gray-600">Genre: {book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No books in your shelf.</p>
                )}
            </ul>
        </div>
    );
};

export default BookShelf;
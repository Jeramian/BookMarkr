"use client";
import React, { useEffect, useState } from 'react';

const BookShelf = () => {
    const [shelf, setShelf] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setShelf(savedShelf);

        const savedCurrentBook = localStorage.getItem('currentBook');
        if (savedCurrentBook) {
            setCurrentBook(JSON.parse(savedCurrentBook));
        }
    }, []);

    const removeFromShelf = (bookId) => {
        const updatedShelf = shelf.filter(book => book.id !== bookId);
        setShelf(updatedShelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedShelf));
        console.log('Book removed from shelf:', bookId);
    };

    const setAsCurrentBook = (book) => {
        setCurrentBook(book);
        localStorage.setItem('currentBook', JSON.stringify(book));
        console.log('Current book set to:', book.volumeInfo.title);
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>Caitlin&apos;s Book Shelf</h2>
            {currentBook && (
                <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold text-pink-300">Currently Reading:</h3>
                    <p className="text-gray-700">{currentBook.volumeInfo.title}</p>
                </div>
            )}
            <ul className="mt-6 space-y-4">
                {shelf.length > 0 ? (
                    shelf.map((book) => (
                        <li key={book.id} className="border rounded-lg shadow-md p-4 bg-white">
                            <h3 className="text-lg font-semibold text-pink-300">{book.volumeInfo.title}</h3>
                            <p className="text-gray-700">Authors: {book.volumeInfo.authors?.join(', ')}</p>
                            <p className="text-gray-600">Page Count: {book.volumeInfo.pageCount || 'N/A'}</p>
                            <p className="text-gray-600">Genre: {book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
                            <div className="mt-4 flex space-x-2">
                                <button 
                                    onClick={() => removeFromShelf(book.id)} 
                                    className="bg-red-300 text-white rounded p-2 hover:bg-red-400 transition duration-200"
                                >
                                    Remove from Shelf
                                </button>
                                <button 
                                    onClick={() => setAsCurrentBook(book)} 
                                    className="bg-green-300 text-white rounded p-2 hover:bg-green-400 transition duration-200"
                                >
                                    Set as Current Book
                                </button>
                            </div>
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
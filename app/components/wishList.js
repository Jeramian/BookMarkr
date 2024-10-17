"use client";
import React, { useEffect, useState } from 'react';

const WishList = () => {
    const [wish, setWish] = useState([]);
    const [shelf, setShelf] = useState([]);

    useEffect(() => {
        const savedWish = JSON.parse(localStorage.getItem('wishList')) || [];
        setWish(savedWish);
        const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setShelf(savedShelf);
    }, []);

    const removeFromWishList = (bookId) => {
        const updatedWish = wish.filter(book => book.id !== bookId);
        setWish(updatedWish);
        localStorage.setItem('wishList', JSON.stringify(updatedWish));
        console.log('Book removed from wishlist:', bookId);
    };

    const addToShelf = (book) => {
        const updatedShelf = [...shelf, book];
        setShelf(updatedShelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedShelf));
        console.log('Book added to shelf:', book);
        removeFromWishList(book.id); // Remove from wishlist after adding to shelf
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>Caitlin&apos;s Book Wish List</h2>
            <ul className="mt-6 space-y-4">
                {wish.length > 0 ? (
                    wish.map((book, index) => (
                        <li key={index} className="border rounded-lg shadow-md p-4 bg-white">
                            <h3 className="text-lg font-semibold text-pink-300">{book.volumeInfo.title}</h3>
                            <p className="text-gray-700">Authors: {book.volumeInfo.authors?.join(', ')}</p>
                            <p className="text-gray-600">Page Count: {book.volumeInfo.pageCount || 'N/A'}</p>
                            <p className="text-gray-600">Genre: {book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
                            <div className="mt-4">
                                <button 
                                    onClick={() => addToShelf(book)} 
                                    className="bg-pink-300 text-white rounded p-2 hover:bg-pink-400 transition duration-200"
                                >
                                    Move to Book Shelf
                                </button>
                                <button 
                                    onClick={() => removeFromWishList(book.id)} 
                                    className="ml-2 bg-red-300 text-white rounded p-2 hover:bg-red-400 transition duration-200"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No books in your wishlist.</p>
                )}
            </ul>
        </div>
    );
};

export default WishList;
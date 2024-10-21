"use client";
import React, { useEffect, useState } from 'react';

const WishList = () => {
    const [shelf, setShelf] = useState([]);
    const [message, setMessage] = useState(null); // For feedback messages

    // Fetch books from Google Sheet on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/getBooksWish'); // Endpoint to fetch books from the Google Sheet
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setShelf(data.books); // Assuming data.books is the array of books
            } catch (error) {
                console.error('Error fetching books:', error);
                setMessage('Failed to load books.');
            }
        };

        fetchBooks();
    }, []);

    const removefromWishSheet = async (bookId) => {
        try {
            const response = await fetch('/api/removeBookWish', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error('Failed to remove book from sheet');
            }
    
            const data = await response.json();
            console.log('Remove response:', data); // Log the successful response
            setMessage(data.message || 'Book removed successfully!');
            // Update the local shelf state
            setShelf(prevShelf => prevShelf.filter(book => book.id !== bookId));
        } catch (error) {
            console.error('Error removing book:', error);
            setMessage('Failed to remove book from the sheet.');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>Caitlin&apos;s Wish List</h2>
            {message && (
                <div className="text-center mt-4">
                    <p className="text-red-500">{message}</p>
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
                                    onClick={() => removefromWishSheet(book.id)} // Call the API to remove from sheet
                                    className="bg-red-300 text-white rounded p-2 hover:bg-red-400 transition duration-200"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No books in your wish list.</p>
                )}
            </ul>
        </div>
    );
};

export default WishList;
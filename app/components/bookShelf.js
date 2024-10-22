"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const BookShelf = () => {
    const [shelf, setShelf] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/getBooks');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setShelf(data.books || []);
            } catch (error) {
                console.error('Error fetching books:', error);
                toast.error(setMessage('Failed to load books.'));
            }
        };

        fetchBooks();
    }, []);

    const removeBookFromSheet = async (bookId) => {
        // Optimistically update the UI first
        const updatedShelf = shelf.filter(book => book.id !== bookId);
        setShelf(updatedShelf);
        localStorage.setItem('bookshelfData', JSON.stringify(updatedShelf));

        try {
            const response = await fetch('/api/removeBook', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove book from sheet');
            }

            const data = await response.json();
            toast.success(data.message || 'Book removed!');
        } catch (error) {
            console.error('Error removing book:', error);
            // If the removal failed, add the book back to the shelf
            setShelf(prevShelf => [...prevShelf, shelf.find(book => book.id === bookId)]);
            localStorage.setItem('bookshelfData', JSON.stringify(shelf)); // Restore local storage
            toast.error(setMessage('Failed to remove book from the sheet. Restored to shelf.'));
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>Caitlin&apos;s Book Shelf</h2>
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
                                    onClick={() => removeBookFromSheet(book.id)}
                                    className="bg-red-300 text-white rounded p-2 hover:bg-red-400 transition duration-200"
                                >
                                    Remove from Shelf
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
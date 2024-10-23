"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter for navigation
import { toast } from 'react-hot-toast';

const WishList = () => {
    const [shelf, setShelf] = useState([]);
    const [message, setMessage] = useState(null);
    const [username, setUsername] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        } else {
            const userData = JSON.parse(user); // Parse the user data
            setUsername(userData.username); // Set the username
            fetchBooks(userData.username); // Fetch books for the specific user
        }
    }, [router]);

    const fetchBooks = async (username) => {
        try {
            const response = await fetch(`/api/getBooksWish?username=${username}`); // Fetch using the username
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            console.log('Fetched books:', data.books); // Log fetched books for debugging
            setShelf(data.books || []); // Set shelf to the filtered books
        } catch (error) {
            console.error('Error fetching books:', error);
            toast.error('Failed to load books.');
        }
    };

    const removeFromWishSheet = async (bookId) => {
        const updatedShelf = shelf.filter(book => book.id !== bookId);
        setShelf(updatedShelf);
        localStorage.setItem('wishlistData', JSON.stringify(updatedShelf));

        try {
            const response = await fetch('/api/removeBookWIsh', {
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
            localStorage.setItem('wishlistData', JSON.stringify(shelf)); // Restore local storage
            toast.error('Failed to remove book from the sheet. Restored to wish list.');
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className='text-center pt-5 text-2xl font-bold text-gray-800'>{username}&apos;s Wish List</h2>
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
                                    onClick={() => removeFromWishSheet(book.id)}
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
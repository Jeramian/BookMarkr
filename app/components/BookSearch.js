"use client";
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../lib/googleBooksApi';
import { toast } from 'react-hot-toast';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [shelf, setShelf] = useState([]);
    const [wish, setWish] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setShelf(savedShelf);

        const savedWish = JSON.parse(localStorage.getItem('wishList')) || [];
        setWish(savedWish);
    }, []);

    const handleSearch = async () => {
        if (!query) return;
        const results = await fetchBooks(query);
        setBooks(results || []);
        console.log(results);
    };

    const addToShelf = async (book) => {
      const updatedShelf = [...shelf, book];
      setShelf(updatedShelf);
      localStorage.setItem('bookshelfData', JSON.stringify(updatedShelf));
      console.log('Book added to shelf:', book);
  
      // Send the book to Google Sheets
      await addBookToSheet(book);
      
      // Trigger the shelfUpdated event
      window.dispatchEvent(new Event('shelfUpdated'));
  };

  
    const addToWishList = async (book) => {
        const updatedWish = [...wish, book];
        setWish(updatedWish);
        localStorage.setItem('wishList', JSON.stringify(updatedWish));
        console.log('Book added to wishlist:', book);

        // Emit event to update other components
        window.dispatchEvent(new Event('wishUpdated'));

        // Optionally send the book to Google Sheets if needed
        await addBooktoWishSheet(book);
    };

    const addBooktoWishSheet = async (book) => {
      try {
        const response = await fetch('/api/addBookWish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book }),
        });

        if (!response.ok) {
            throw new Error('Failed to add book to Google Sheets');
        }

        const data = await response.json();
        toast.success(setMessage(data.message || 'Book added to Google Sheets successfully!'));
    } catch (error) {
        console.error('Error adding book:', error);
        toast.error(setMessage('Failed to add book to Google Sheets.'));
    }
    }

    const addBookToSheet = async (book) => {
        try {
            const response = await fetch('/api/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ book }),
            });

            if (!response.ok) {
                throw new Error('Failed to add book to Google Sheets');
            }

            const data = await response.json();
            toast.success(setMessage(data.message || 'Book added to Google Sheets successfully!'));
        } catch (error) {
            console.error('Error adding book:', error);
            toast.error(setMessage('Failed to add book to Google Sheets.'));
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books"
                className="border rounded p-2"
            />
            <button onClick={handleSearch} className="ml-2 bg-pink-300 text-white rounded p-2">
                Search
            </button>

            <div className="mt-4">
                {books.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <li key={book.id} className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                                <h3 className="font-bold text-lg text-pink-300">{book.volumeInfo.title}</h3>
                                <p className="text-gray-700">{book.volumeInfo.authors?.join(', ')}</p>
                                <div className="mt-4">
                                    <button 
                                        onClick={() => addToShelf(book)} 
                                        className="bg-pink-300 text-white rounded p-2 hover:bg-pink-400 transition duration-200"
                                    >
                                        Add to Book Shelf
                                    </button>
                                    <button 
                                        onClick={() => addToWishList(book)} 
                                        className="ml-2 bg-pink-300 text-white rounded p-2 hover:bg-pink-400 transition duration-200"
                                    >
                                        Add to Wishlist
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='pt-3'>Search for a book, Results will be shown here!</p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;
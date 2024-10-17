"use client";
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../lib/googleBooksApi';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [shelf, setShelf] = useState([]);
    const [wish, setWish] = useState([]);

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

    const addToShelf = (book) => {
        const updatedShelf = [...shelf, book];
        setShelf(updatedShelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedShelf));
        console.log('Book added to shelf:', book);
    };

    const addToWishList = (book) => {
      const updatedWish = [...wish, book];
      setWish(updatedWish);
      localStorage.setItem('wishList', JSON.stringify(updatedWish));
      console.log('Book added to wishlist', book)
    }

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
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;
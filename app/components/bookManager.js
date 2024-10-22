"use client";
import React, { useEffect, useState } from 'react';
import BookShelf from './bookShelf'; // Adjust the path as necessary
import BookSearch from './bookShelf'; // Adjust the path as necessary
import WishList from './wishList'; // Adjust the path as necessary

const BookManager = () => {
    const [shelf, setShelf] = useState([]);
    const [wish, setWish] = useState([]);

    // Load shelf and wishlist from localStorage on mount
    useEffect(() => {
        const savedShelf = JSON.parse(localStorage.getItem('bookshelfData')) || [];
        const savedWish = JSON.parse(localStorage.getItem('wishlistData')) || [];
        setShelf(savedShelf);
        setWish(savedWish);
    }, []);

    const updateShelf = (newShelf) => {
        setShelf(newShelf);
        localStorage.setItem('bookshelfData', JSON.stringify(newShelf));
    };

    const updateWish = (newWish) => {
        setWish(newWish);
        localStorage.setItem('wishlistData', JSON.stringify(newWish));
    };

    return (
        <div>
            <BookSearch updateShelf={updateShelf} updateWish={updateWish} />
            <BookShelf shelf={shelf} updateShelf={updateShelf} />
            <WishList wish={wish} updateWish={updateWish} />
        </div>
    );
};

export default BookManager;
"use client";
import React, { useEffect, useState } from 'react';
import { totalBooksCalculator } from '../lib/totalBooksCalc';

const TotalBooks = () => {
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        const books = totalBooksCalculator();
        setTotalBooks(books);
    }, []);

    return (
        <div>
            <p>{totalBooks}</p>
        </div>
    );
};

export default TotalBooks;
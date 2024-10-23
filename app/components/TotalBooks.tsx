"use client";
import React, { useEffect, useState } from 'react';

interface TotalBooksProps {
    username: string | null;
}

const TotalBooks: React.FC<TotalBooksProps> = ({ username }) => {
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        if (username) {
            fetchTotalBooks(username);
        }
    }, [username]);

    const fetchTotalBooks = async (username: string) => {
        try {
            const response = await fetch(`/api/getBooksCount?username=${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch total books');
            }
            const data = await response.json();
            setTotalBooks(data.count || 0); // Update totalBooks state
        } catch (error) {
            console.error('Error fetching total books:', error);
        }
    };

    return (
        <div>
            <p>{totalBooks}</p>
        </div>
    );
};

export default TotalBooks;

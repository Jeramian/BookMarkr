"use client"; // Ensure this is a client component
import React, { useEffect, useState } from 'react';

interface TotalPagesCountProps {
    username: string | null; // Specify that username can be a string or null
}

const TotalPagesCount: React.FC<TotalPagesCountProps> = ({ username }) => {
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchTotalPages = async () => {
            if (username) {
                try {
                    const response = await fetch(`/api/getTotalPages?username=${username}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch total pages');
                    }
                    const data = await response.json();
                    setTotalPages(data.totalPages || 0);
                } catch (error) {
                    console.error('Error fetching total pages:', error);
                } finally {
                    setLoading(false); // Set loading to false after fetch
                }
            } else {
                setLoading(false); // If no username, stop loading
            }
        };

        fetchTotalPages();
    }, [username]);

    if (loading) {
        return <p>Loading...</p>; // Optional loading message
    }

    return (
        <div>
            <p>{totalPages}</p>
        </div>
    );
};

export default TotalPagesCount;
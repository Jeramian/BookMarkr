"use client"; // Ensure this is a client component
import React, { useEffect, useState } from 'react';
import { totalPagesCalculator } from '../lib/totalPagesCalc';

const TotalPages = () => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const pages = totalPagesCalculator();
        setTotalPages(pages);
    }, []);

    return (
        <div>
            <p>{totalPages}</p>
        </div>
    );
};

export default TotalPages;
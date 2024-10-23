"use client"; // Ensure this is at the top
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BookSearch from './components/BookSearch';
import TotalPagesCount from './components/totalPages'; // Ensure correct case
import TotalBooks from './components/totalBooks'; // Ensure correct case

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        pageCount?: number;
        categories?: string[];
    };
}

export default function Home() {
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            router.push('/login'); // Redirect to login if not authenticated
        } else {
            const parsedUser = JSON.parse(user);
            setUsername(parsedUser.username); // Assuming the user object has a 'username' property
        }
        setLoading(false); // Set loading to false after check
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // Optionally, show a loading indicator
    }

    return (
        <div className='container mx-auto px-4 text-center'>
            <h1 className='text-3xl font-bold pt-5 pb-5 text-gray-800'>Welcome Back, {username}!</h1>
            <BookSearch />

            {/* Wrap all these in a single parent div */}
            <div className="flex justify-center mt-10 space-x-6">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Pages You Have Read:</h2>
                    <div className="text-4xl font-bold text-pink-300 pt-3">
                        <TotalPagesCount username={username} /> {/* Pass username here */}
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Books You Have Completed:</h2>
                    <div className="text-4xl font-bold text-pink-300 pt-3">
                        <TotalBooks username={username} /> {/* Pass username here */}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Current Book You Are Reading</h2>
                    <div className="text-4xl font-bold text-pink-300 pt-5">
                        {currentBook ? `"${currentBook.volumeInfo.title}"` : "No book currently being read."}
                    </div>
                </div>
            </div>
        </div>
    );
}
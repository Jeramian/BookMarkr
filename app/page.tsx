"use client"; // Ensure this is at the top
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing
import BookSearch from './components/BookSearch';
import TotalPages from './components/TotalPages';
import TotalBooks from './components/TotalBooks';

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
  const router = useRouter();

  useEffect(() => {
    const savedCurrentBook = localStorage.getItem('currentBook');
    const user = localStorage.getItem('user');

    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      if (savedCurrentBook) {
        setCurrentBook(JSON.parse(savedCurrentBook));
      }
    }
  }, [router]);

  return (
    <div className='container mx-auto px-4 text-center'>
      <h1 className='text-3xl font-bold pt-5 pb-5 text-gray-800'>Welcome Back!</h1>
      <BookSearch />
      
      <div className="flex justify-center mt-10 space-x-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Pages You Have Read:</h2>
          <div className="text-4xl font-bold text-pink-300 pt-3">
            <TotalPages />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Books You Have Completed:</h2>
          <div className="text-4xl font-bold text-pink-300 pt-3">
            <TotalBooks />
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
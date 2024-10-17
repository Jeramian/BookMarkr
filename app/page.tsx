"use client"
import { useEffect, useState } from 'react';
import BookSearch from './components/BookSearch';
import TotalPages from './components/totalPages';
import TotalBooks from './components/totalBooks';

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

  useEffect(() => {
    const savedCurrentBook = localStorage.getItem('currentBook');
    if (savedCurrentBook) {
      setCurrentBook(JSON.parse(savedCurrentBook));
    }
  }, []);

  return (
    <div className='container mx-auto px-4 text-center'>
      <h1 className='text-3xl font-bold pt-5 pb-5 text-gray-800'>Welcome Back, Caitlin!</h1>
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
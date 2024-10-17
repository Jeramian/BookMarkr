import { AppProps } from 'next/app';
import BookSearch from './components/BookSearch';
import TotalPages from './components/totalPages';

export default function Home() {
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
          <h2 className="text-xl font-semibold text-gray-700">Total Book You have Completed:</h2>
          <div className="text-4xl font-bold text-pink-300 pt-3">
            {/* Replace with actual count of completed books */}
            5 
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Current Book You Are Reading</h2>
          <div className="text-4xl font-bold text-pink-300 pt-5">
            {/* Replace with actual current book title */}
            &quot;The Great Gatsby&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
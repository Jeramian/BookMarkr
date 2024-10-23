"use client"; // Ensure this is at the top
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID; // Use NEXT_PUBLIC_ prefix
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY; // Use NEXT_PUBLIC_ prefix
const RANGE = 'users!D:E'; // Adjust this based on your sheet name and columns

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
      const data: { values: (string | undefined)[][] } = await response.json();

      const rows = data.values || [];

      const user: [string, string] | undefined = rows.find((row): row is [string, string] => {
        return row.length === 2 && row[0] === username && row[1] === password;
      });

      if (user) {
        localStorage.setItem('user', JSON.stringify({ username })); // Store the username
        router.push('/'); // Redirect to the index page
      } else {
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      toast.error('An error has occurred, try again later');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl mb-6">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-pink-300 text-white py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
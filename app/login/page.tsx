"use client"; // Ensure this is at the top
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for routing

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Specify the type of the event parameter
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Example login logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ username }));
      router.push('/'); // Redirect to the index page
    } else {
      alert('Invalid credentials');
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
        <button type="submit" className="bg-blue-500 text-white py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
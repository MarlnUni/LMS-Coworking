import React, { useState } from 'react';
import { users } from '../mock/users';

const LOGO_URL = 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/marlnLogo.jpeg';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        <img src={LOGO_URL} alt="Marln Corp Logo" className="w-24 h-24 mb-6 rounded-full shadow-lg border-4 border-blue-200 dark:border-blue-300" />
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white mb-1 tracking-tight">Marln Corp</h1>
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-8 tracking-wide">LMS Coworking</h2>
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 font-medium shadow-sm transition"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
          <input
            className="px-4 py-3 rounded-xl border border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 font-medium shadow-sm transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 dark:text-red-400 text-sm font-semibold text-center">{error}</div>}
          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-blue-800 hover:to-blue-600 transition-transform duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-xs text-blue-500 dark:text-blue-400 font-medium opacity-80 text-center">
          © {new Date().getFullYear()} Marln Corp. All rights reserved.
        </div>
      </div>
    </div>
  );
} 
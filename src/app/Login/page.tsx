"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to control link navigation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login validation logic here
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulate successful login for this example
    if (email && password) {
      setIsAuthenticated(true); // Set as authenticated
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlue font-sans">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          {isAuthenticated ? (
            <Link href="/Dashboard">
              <button type="button" className="w-full bg-primaryPurple text-gray p-2 rounded mt-4 hover:bg-blue">
                Login
              </button>
            </Link>
          ) : (
            <button type="submit" className="w-full bg-primaryPurple text-gray p-2 rounded mt-4 hover:bg-blue">
              Login
            </button>
          )}
        </form>
        <p className="text-center text-white mt-4">
          Do not have an account?{' '}
          <Link href="/Register" className="text-primaryPurple hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;

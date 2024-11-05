"use client";

import React, { useState } from 'react';
import Link from 'next/link';


function SignInPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Preferred Language:', preferredLanguage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlue font-sans">
      <div className="bg-primaryBlue p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              required
            />
          </div>
          <div>
            <select
              id="preferredLanguage"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded mt-1 text-black ${
                preferredLanguage === '' ? 'text-gray-400' : 'text-black'
              }`}
              required
            >
              <option value="" disabled>Select Preferred Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              {/* Add more languages as needed */}
            </select>
          </div>
          <button type="submit" className="w-full bg-primaryPurple text-white p-2 rounded mt-4 hover:bg-darkBlue">
            Sign In
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <Link href="/Login" className="text-primaryPurple hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;

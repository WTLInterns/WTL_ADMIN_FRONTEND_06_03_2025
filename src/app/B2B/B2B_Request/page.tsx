// src/app/b2b/request/page.tsx
'use client';
import Navbar from "../../../container/components/Navbar";
import React, { useState } from 'react';

const RequestB2B = () => {
  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add your form submission logic here
    alert('Request Sent');
  };

  // Handle form reset
  const handleReset = () => {
    setVendorName('');
    setEmail('');
  };

  return (
    <div className='flex'>
      <Navbar children={undefined}/>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Request B2B Registration</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
          <input
            type="text"
            id="vendorName"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Vendor Name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email ID"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-200"
          >
            Send Request
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="bg-red-400 text-white py-2 px-6 rounded-full hover:bg-red-500 transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RequestB2B;
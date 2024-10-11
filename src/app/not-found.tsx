"use client";

import Image from 'next/image';
import image from '../assets/404.png'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">We're sorry, but the page you were looking for doesn't exist.</p>
                <Image 
                    src={image} 
                    alt="Not Found" 
                    width={500} 
                    height={300} 
                    className="w-2/3 md:w-1/2 mx-auto mb-6"
                />
                <button 
                    onClick={() => window.location.href = '/'} 
                    className="mt-4 py-2 px-4 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-300 hover:to-red-500 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;

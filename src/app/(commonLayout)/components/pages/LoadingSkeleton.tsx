// components/LoadingSkeleton.tsx

import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-4 p-4 border rounded-md">
                    <div className="w-1/3 h-24 bg-gray-300 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;

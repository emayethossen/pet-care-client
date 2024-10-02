"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    {
        name: "Tips",
        image: "https://via.placeholder.com/300x200?text=Tips",
    },
    {
        name: "Stories",
        image: "https://via.placeholder.com/300x200?text=Stories",
    },
    {
        name: "Health",
        image: "https://via.placeholder.com/300x200?text=Health",
    },
    {
        name: "Nutrition",
        image: "https://via.placeholder.com/300x200?text=Nutrition",
    },
    {
        name: "Training",
        image: "https://via.placeholder.com/300x200?text=Training",
    },
];

const CategorySlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to show the next category
    const nextCategory = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === categories.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to show the previous category
    const prevCategory = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="container mx-auto">
            <div className="relative w-80 h-60 bg-[#FFF9F3] overflow-hidden rounded-lg shadow-lg mx-auto">
                {/* Displaying the current category image */}
                <div className="flex justify-center items-center">
                    <img
                        src={categories[currentIndex].image}
                        alt={categories[currentIndex].name}
                        className="w-40 h-30 object-cover rounded-xl"
                    />
                </div>

                {/* Category name in the bottom left corner */}
                <div className="absolute bottom-12 left-4 bg-black bg-opacity-50 text-white py-2 px-4 rounded">
                    <h2 className="text-xl font-semibold">{categories[currentIndex].name}</h2>
                </div>

                {/* Arrow buttons in the bottom right corner */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    {/* Left arrow button */}
                    <button
                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                        onClick={prevCategory}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right arrow button */}
                    <button
                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                        onClick={nextCategory}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;

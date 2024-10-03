"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    {
        name: "Tips",
        image: "https://i.ibb.co.com/pKzvj7t/view-cats-dogs-being-friends.jpg",
    },
    {
        name: "Stories",
        image: "https://i.ibb.co.com/TmvV7sp/adorable-portrait-pets-surrounded-by-flowers.jpg",
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
        <div className="container mx-auto bg-[#FFF9F3] border border-red-200 p-4 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-2 ml-4">Categories</h1>
            <div className="overflow-hidden rounded-lg mx-auto space-y-8 p-4">
                {/* Displaying the current category image */}
                <div className="flex justify-center items-center">
                    <img
                        src={categories[currentIndex].image}
                        alt={categories[currentIndex].name}
                        className="w-full h-40 object-cover rounded-xl"
                    />
                </div>

               <div className="flex justify-between">
                 {/* Category name in the bottom left corner */}
                 <div className="bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white py-2 px-4 rounded">
                    <h2 className="text-xl font-semibold">{categories[currentIndex].name}</h2>
                </div>

                {/* Arrow buttons in the bottom right corner */}
                <div className="flex space-x-2">
                    {/* Left arrow button */}
                    <button
                        className="bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white p-2 rounded-full hover:bg-opacity-75 transition"
                        onClick={prevCategory}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right arrow button */}
                    <button
                        className="bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white p-2 rounded-full hover:bg-opacity-75 transition"
                        onClick={nextCategory}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
               </div>
            </div>
        </div>
    );
};

export default CategorySlider;

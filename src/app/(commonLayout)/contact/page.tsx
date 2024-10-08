import { toast } from "react-toastify";

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="lg:w-3/5 bg-[#FFF9F3] mx-auto p-6 sm:p-8 rounded-lg shadow-md">
                <section className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
                    <p className="text-lg lg:w-2/3 mx-auto font-semibold text-gray-700">
                    Feel free to <span className="font-bold">send a message,</span> just fill the form belowand i will <span className="font-bold">reply</span> you shortly! 👍
                    </p>
                </section>

                {/* Form Section */}
                <form className="space-y-6 md:px-8 mx-auto">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            required
                            placeholder="Enter your message"
                            rows={4}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md hover:from-red-200 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;

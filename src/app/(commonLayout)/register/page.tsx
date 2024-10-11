"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios'; 

const Register = () => {
    const router = useRouter(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for empty fields
        if (!name || !email || !password || !phone) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        const role = 'user';
        try {
            const response = await axios.post('https://pet-care-server-three.vercel.app/api/auth/signup', {
                name,
                email,
                password,
                phone,
                role
            });

            // Check if registration is successful
            if (response.status === 201) {
                setSuccessMessage('User registered successfully');

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="grid lg:grid-cols-2 shadow-2xl lg:px-36 lg:py-16 p-6 bg-[#ffe5ea]">
            <div className="md:flex hidden flex-col justify-between bg-cover bg-center lg:p-10 relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 flex items-center gap-2">
                    <button
                        className="p-2 rounded text-white bg-green-500 font-semibold"
                        onClick={() => router.push('/')} 
                    >
                        Home
                    </button>
                </div>

                <div className="relative z-10 text-white mb-6">
                    <h2 className="text-2xl font-semibold">Pet Love</h2>
                    <p className="mt-2">
                        Discover expert tips, heartwarming stories, and essential advice to ensure your pets live a happy, healthy life. Join our community for the best in pet care and companionship.
                    </p>
                </div>
            </div>

            <div className="lg:border w-full lg:p-14 p-6 bg-white">
                <h2 className="md:text-3xl text-xl font-bold text-center uppercase">Pet Love</h2>
                <p className="md:text-xl text-lg mb-6 font-bold text-center">Create An Account</p>
                {/* Social Login Buttons */}
                <div className="grid grid-cols-4 md:w-1/2 w-3/4 mx-auto justify-center items-center gap-2">
                    <button className="btn btn-outline w-[32px] md:w-[48px] rounded flex justify-center items-center h-[32px] md:h-[48px] bg-red-500">
                        <FontAwesomeIcon icon={faGoogle} className="text-white" />
                    </button>
                    <button className="btn btn-outline w-[32px] md:w-[48px] rounded flex justify-center items-center h-[32px] md:h-[48px] bg-blue-600">
                        <FontAwesomeIcon icon={faFacebookF} className="text-white" />
                    </button>
                    <button className="btn btn-outline w-[32px] md:w-[48px] rounded flex justify-center items-center h-[32px] md:h-[48px] bg-blue-400">
                        <FontAwesomeIcon icon={faTwitter} className="text-white" />
                    </button>
                    <button className="btn btn-outline w-[32px] md:w-[48px] rounded flex justify-center items-center h-[32px] md:h-[48px] bg-blue-700">
                        <FontAwesomeIcon icon={faLinkedinIn} className="text-white" />
                    </button>
                </div>

                {/* Separator Line */}
                <div className="flex items-center justify-center my-6">
                    <hr className="w-full border-gray-300" />
                    <span className="px-4 text-gray-500">OR</span>
                    <hr className="w-full border-gray-300" />
                </div>

                <form className="form-control space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input py-2 px-4 rounded bg-gray-100 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input py-2 px-4 rounded bg-gray-100 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input py-2 px-4 rounded bg-gray-100 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="input py-2 px-4 rounded bg-gray-100 w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}
                    <input
                        type="submit"
                        value="Register"
                        className="p-2 rounded text-white bg-green-500 font-semibold w-full"
                    />
                    <p className="mt-2 text-center">
                        Already have an account?{' '}
                        <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/login')}>
                            Login here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;

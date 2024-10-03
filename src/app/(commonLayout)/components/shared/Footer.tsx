// import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
// import Image from 'next/image';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LatestPost from '../pages/LatestPost';
import nextImage from '../../../../assets/logo.png'
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-[#FFF9F3] py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-6 text-center md:text-left">
                <div className="container mx-auto p-4 space-y-6 md:space-y-8">
                    <div className='flex justify-center md:justify-start'>
                        <Image src={nextImage} alt="Prt logo" width={120} height={60} />
                    </div>
                    <p className='font-semibold'>Discover expert tips, heartwarming stories, and essential advice to ensure your pets live a happy, healthy life. Join our community for the best in pet care and companionship.</p>
                    <form className="max-w-md  mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            className="py-3 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Subscribe
                        </button>

                    </form>
                </div>
                <div className='container mx-auto p-4 md:ml-16'>
                    <h1 className="text-2xl font-bold mb-4">Further Links</h1>
                    <ul className='font-semibold'>
                        <li className="py-1">Term & Condition</li>
                        <li className="py-1">News</li>
                        <li className="py-1">Term & Condition</li>
                        <li className="py-1">News</li>
                        <li className="py-1">Term & Condition</li>
                        <li className="py-1">News</li>
                    </ul>
                </div>
                <div>
                    <LatestPost />
                </div>
            </div>
            <div className="text-center font-semibold mt-6">
                <p>Copyright © 2024 PetLove | Powered by PetLove</p>
            </div>
        </footer>
    );
};

export default Footer;

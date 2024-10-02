import { faEnvelope, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import bikeLogo from '../../public/images/bike-logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-500 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 px-6 text-center md:text-left">
                <div className="md:col-span-2 space-y-6 md:space-y-4">
                    <div className='flex justify-center md:justify-start'>
                        {/* <Image src={bikeLogo} alt="Bike Logo" width={120} height={60} />  */}
                    </div>
                    <p className='md:w-3/4'>Experience freedom on the road with our convenient, affordable bike rentals, suited for every rider.</p>
                </div>
                <div>
                    <h2 className="font-semibold text-lg mb-2">Service</h2>
                    <ul>
                        <li className="py-1">Rental</li>
                        <li className="py-1">Delivery</li>
                        <li className="py-1">Apps</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-lg mb-2">Further Links</h2>
                    <ul>
                        <li className="py-1">Term & Condition</li>
                        <li className="py-1">News</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-lg mb-2">Get In Touch</h2>
                    <p className="py-1"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 w-6" />2443 Oak Ridge Omaha, QA 45065</p>
                    <p className="py-1"><FontAwesomeIcon icon={faPhoneAlt} className="mr-2 w-6" />207-8767-452</p>
                    <p className="py-1">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-6" />support@site.com
                    </p>
                </div>
            </div>
            <div className="text-center mt-6">
                <p>Copyright © 2024 AutoBike | Powered by AutoBike</p>
            </div>
        </footer>
    );
};

export default Footer;

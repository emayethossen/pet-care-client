import Image from 'next/image';
import nextImage from '../../../assets/content.jpg'
import nextImage1 from '../../../assets/community.jpg'
import nextImage2 from '../../../assets/expert.jpg'

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Pet Care Tips & Stories</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to Pet Care Tips & Stories, your one-stop platform for discovering expert pet care
          advice and heartwarming stories from fellow pet lovers. Whether you're a seasoned pet
          parent or just starting, we've got something for everyone!
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our mission is to provide valuable tips and insights to help you take the best care of
          your furry friends while creating a space for the community to share their personal pet
          stories. From health advice to fun experiences, our content is crafted to keep you
          informed and entertained.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <Image
              src={nextImage2}
              alt="Expert Advice"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Advice</h3>
            <p className="text-gray-600">
              Our expert tips cover everything from nutrition to grooming, making sure your pet is
              healthy and happy.
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <Image
              src={nextImage1}
              alt="Community Stories"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Stories</h3>
            <p className="text-gray-600">
              Read and share heartfelt stories about the incredible bond between humans and their
              pets.
            </p>
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <Image
              src={nextImage}
              alt="Premium Content"
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Content</h3>
            <p className="text-gray-600">
              Unlock exclusive content for advanced pet care techniques and personalized guidance.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet the Team</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our team consists of passionate pet lovers, experienced veterinarians, and pet care
            specialists who are dedicated to helping you become the best pet parent.
          </p>
        </div>

        <div className="flex flex-col items-center mt-12">
          <Image
            src={nextImage2}
            alt="Our Team"
            width={256}
            height={256}
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <h3 className="text-2xl font-bold text-gray-800 mt-6">Pet Care Tips & Stories Team</h3>
          <p className="text-gray-600 mt-2">
            United by a love for animals and a mission to make pet care accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

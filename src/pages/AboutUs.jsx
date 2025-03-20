import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gray-800 py-16 px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg lg:text-xl max-w-3xl mx-auto">
          Discover who we are and what drives us. We're passionate about creating meaningful connections and delivering exceptional experiences.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className=" container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <p className="text-lg text-center max-w-2xl mx-auto leading-relaxed">
          We are dedicated to making a positive impact in the world through innovation, collaboration, and inclusivity. Our goal is to empower people with the tools and knowledge to succeed.
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-gray-700 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 container mx-auto px-6">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://m.media-amazon.com/images/I/41f7VaXK7AL._SY445_SX342_.jpg"
              alt="Team Member 1"
              className="rounded-full mb-4 w-36 h-36 object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">Ashwatthama</h3>
            <p className="text-sm text-gray-300">Founder & CEO</p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://m.media-amazon.com/images/I/61y-LndVRWL._SY466_.jpg"
              alt="Team Member 2"
              className="rounded-full mb-4 w-36 h-36 object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-sm text-gray-300">Chief Technology Officer</p>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://m.media-amazon.com/images/I/710ADM+glUL._SY466_.jpg"
              alt="Team Member 3"
              className="rounded-full mb-4 w-36 h-36 object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">Alice Brown</h3>
            <p className="text-sm text-gray-300">Lead Designer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Have questions or want to collaborate? Reach out to us, and let's create something amazing together.
        </p>
        <a
          href="https://www.linkedin.com/in/vijay-singh-saud/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-gray-900 px-6 py-2 text-lg font-medium rounded-lg hover:bg-yellow-500 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

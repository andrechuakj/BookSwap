import { CustomNavMenu } from "@/components/custom/CustomNavMenu";
import NavBar from "@/components/custom/NavBar";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div>
        {/* Hero section */}
        <section className="hero bg-gray-900 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Join us in preventing Book Waste!
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Over 320 million books go to waste yearly. Let's change that
              together!
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg">
              Get Started
            </button>
          </div>
        </section>

        {/* Features section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Book Recommendations powered by AI
                </h3>
                <p className="text-gray-700">
                  Get personalized book recommendations tailored to your reading
                  preferences, powered by advanced artificial intelligence
                  algorithms. Discover new books that match your interests and
                  expand your reading horizons.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  Ratings and Reviews
                </h3>
                <p className="text-gray-700">
                  Share your thoughts and experiences by rating and reviewing
                  books you've exchanged. Help other users make informed
                  decisions and contribute to building a trusted community of
                  book lovers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Geolocation</h3>
                <p className="text-gray-700">
                  Find book exchange opportunities near you with the geolocation
                  feature. Discover exchanges happening in your local area and
                  connect with other users for convenient and efficient book
                  swaps.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;

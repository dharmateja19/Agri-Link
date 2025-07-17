import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaHandshake, FaShieldAlt, FaChartLine } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-12 bg-green-50 min-h-screen flex flex-col items-center pt-[70px]">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">Welcome to AgriLink</h1>
        <p className="text-lg text-gray-700">
          AgriLink is a digital bridge between farmers and buyers — enabling transparent trade, real-time communication, and a smarter agricultural supply chain.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 max-w-6xl w-full">
        <FeatureCard
          icon={<FaSeedling size={30} className="text-green-700" />}
          title="Direct Farmer-Buyer Connection"
          description="Farmers can list crops and buyers can purchase directly—cutting out middlemen."
        />
        <FeatureCard
          icon={<FaHandshake size={30} className="text-green-700" />}
          title="Fair Pricing"
          description="Ensures transparency in pricing by letting sellers set and buyers negotiate."
        />

        <FeatureCard
          icon={<FaShieldAlt size={30} className="text-green-700" />}
          title="Controlled Mobile Access"
          description="Mobile numbers are shared only after farmer approval, promoting privacy and trust."
        />

        <FeatureCard
          icon={<FaChartLine size={30} className="text-green-700" />}
          title="Track Orders & Listings"
          description="Farmers can manage their listings while buyers can track their purchases easily."
        />
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-gray-800 mb-4">Get started today!</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-white border border-green-600 text-green-700 px-6 py-2 rounded-full hover:bg-green-100 transition"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

// FeatureCard Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center">
    <div className="mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default LandingPage;

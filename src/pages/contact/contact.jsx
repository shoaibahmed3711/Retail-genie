import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    interests: {
      softwareDev: false,
      blockchainDev: false,
      forexEA: false,
      aiDev: false,
      uxDesign: false,
      other: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        interests: {
          ...formData.interests,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Dotted background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Contact our team
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Got any questions about the product or scaling on our platform? We're here to help.
            Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-16 items-start justify-between">
          {/* Form Section */}
          <div className="w-full lg:w-2/3 bg-white p-8 rounded-2xl  border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 "
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 "
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3  border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 "
                  placeholder="you@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">+1</span>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3  border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 "
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3  border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 "
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6  font-medium text-lg hover:from-blue-700 hover:to-indigo-800 transition duration-300 transform hover:-translate-y-1 shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="w-full lg:w-1/3 space-y-12">
            {/* Chat Section */}
            <div className="bg-white p-8 rounded-2xl  border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Chat with us</h3>
              <ul className="space-y-5">
                {[
                  { name: "WhatsApp", icon: "/contact/w.svg", color: "bg-green-50 text-green-700" },
                  { name: "Skype", icon: "/contact/s.svg", color: "bg-blue-50 text-blue-700" },
                  { name: "Gmail", icon: "/contact/m.svg", color: "bg-red-50 text-red-700" }
                ].map((channel) => (
                  <li key={channel.name}>
                    <Link className="flex items-center gap-4 p-3  hover:bg-gray-50 transition duration-200 group">
                      <div className={`p-2 rounded-full ${channel.color}`}>
                        <img className="w-8 h-8 object-contain" src={channel.icon} alt={channel.name} />
                      </div>
                      <span className="text-lg font-medium group-hover:text-blue-600 transition duration-200">
                        {channel.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Call Section */}
            <div className="bg-white p-8 rounded-2xl  border border-gray-100">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Call us</h3>
              <p className="text-gray-600 mb-6">
                Our team is available Monday through Friday from 8am to 5pm Eastern Time.
              </p>
              <Link href="tel:+15550000000" className="flex items-center gap-4 p-4 bg-blue-50  hover:bg-blue-100 transition duration-200">
                <div className="bg-white p-2 rounded-full ">
                  <img className="w-8 h-8 object-contain" src="/contact/c.svg" alt="Phone" />
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Call our support team</span>
                  <span className="text-lg font-medium text-blue-700">+1 (555) 000-0000</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
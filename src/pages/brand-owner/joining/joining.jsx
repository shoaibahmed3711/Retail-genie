import React from 'react';
import {
    Target,
    CheckCircle,
    BarChart2,
    Package,
    MessageSquare,
    Search,
    ClipboardCheck,
    MousePointer,
    Bell,
    LayoutGrid
} from 'lucide-react';

const FeatureIcon = ({ Icon, color }) => (
    <div className={`flex-shrink-0 w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110`}>
        <Icon className="w-6 h-6 text-white" />
    </div>
);

const JoinSection = () => {
    return (
        <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Wave Background */}
            <div className="absolute inset-0 z-0">
                <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#3B82F6"
                        fillOpacity="0.05"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>

            <div className="relative z-10 container-fluid  px-4 py-24">
                {/* Main Heading */}
                <div className="text-center mb-24">
                    <h2 className="text-[28px] font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
                        Why Join Retail Genie?
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-br from-blue-600 to-blue-800 mx-auto rounded-full"></div>
                </div>

                {/* Brand Owners Section */}
                <div className="flex md:flex-row flex-col items-center justify-between gap-16 mb-24">
                    <div className="space-y-4">
                        <div className="">
                            <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-3">
                                For Brand Owners & Managers
                                <div className="h-1 flex-1 bg-blue-600/20 rounded-full"></div>
                            </h3>
                            <p className="text-gray-600 text-lg">Empower your brand with cutting-edge tools and direct access to retailers.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Target} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Get Discovered by Retail Buyers</h4>
                                    <p className="text-gray-600">Increase visibility and secure retail shelf space.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={CheckCircle} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Ensure Retail-Ready Compliance</h4>
                                    <p className="text-gray-600">Verify packaging, labeling, and product specs to meet retailer standards.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={BarChart2} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">AI-Powered Insights & Forecasting</h4>
                                    <p className="text-gray-600">Optimize pricing, sales projections, and market strategies.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Package} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Streamline Listing & Sample Management</h4>
                                    <p className="text-gray-600">Automate paperwork and track sample requests with ease.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={MessageSquare} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Direct Buyer Engagement & Feedback</h4>
                                    <p className="text-gray-600">Receive inquiries, schedule meetings, and gain retail insights.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                Sign Up Now
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl transform rotate-3"></div>
                        <img
                            src="/hero.svg"
                            alt="Brand Management Dashboard"
                            className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Retail Buyers Section */}
                <div className="flex md:flex-row flex-col items-center justify-between gap-16 mb-24">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl transform -rotate-3"></div>
                        <img
                            src="/hero.svg"
                            alt="Retail Buyers Dashboard"
                            className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>

                    <div className="space-y-10 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-3">
                                For Retail Buyers
                                <div className="h-1 flex-1 bg-blue-600/20 rounded-full"></div>
                            </h3>
                            <p className="text-gray-600 text-lg">Streamline your product discovery and evaluation process.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Search} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Discover Pre-Vetted, Retail-Ready Brands</h4>
                                    <p className="text-gray-600">Find compliant products, reducing listing risks.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={ClipboardCheck} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Effortless Product Evaluation</h4>
                                    <p className="text-gray-600">Access key product details, certifications, and pricing in one place.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={MousePointer} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">One-Click Sample Requests & Sell Sheets</h4>
                                    <p className="text-gray-600">Quickly request samples and download product information.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Bell} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Stay Ahead with Real-Time Product Updates</h4>
                                    <p className="text-gray-600">Get notified about new SKUs, price adjustments, and packaging changes.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={LayoutGrid} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Track & Organize Brands with Ease</h4>
                                    <p className="text-gray-600">Save, compare, and maintain a history of shortlisted brands.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                Sign Up Now
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center justify-between gap-16 mb-24">
                    <div className="space-y-4">
                        <div className="">
                            <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-3">
                                For Brand Owners & Managers
                                <div className="h-1 flex-1 bg-blue-600/20 rounded-full"></div>
                            </h3>
                            <p className="text-gray-600 text-lg">Empower your brand with cutting-edge tools and direct access to retailers.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Target} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Get Discovered by Retail Buyers</h4>
                                    <p className="text-gray-600">Increase visibility and secure retail shelf space.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={CheckCircle} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Ensure Retail-Ready Compliance</h4>
                                    <p className="text-gray-600">Verify packaging, labeling, and product specs to meet retailer standards.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={BarChart2} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">AI-Powered Insights & Forecasting</h4>
                                    <p className="text-gray-600">Optimize pricing, sales projections, and market strategies.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Package} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Streamline Listing & Sample Management</h4>
                                    <p className="text-gray-600">Automate paperwork and track sample requests with ease.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={MessageSquare} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Direct Buyer Engagement & Feedback</h4>
                                    <p className="text-gray-600">Receive inquiries, schedule meetings, and gain retail insights.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                Sign Up Now
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl transform rotate-3"></div>
                        <img
                            src="/hero.svg"
                            alt="Brand Management Dashboard"
                            className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Retail Buyers Section */}
                <div className="flex md:flex-row flex-col items-center justify-between gap-16">
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl transform -rotate-3"></div>
                        <img
                            src="/hero.svg"
                            alt="Retail Buyers Dashboard"
                            className="relative rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
                        />
                    </div>

                    <div className="space-y-10 order-1 lg:order-2">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-blue-600 flex items-center gap-3">
                                For Retail Buyers
                                <div className="h-1 flex-1 bg-blue-600/20 rounded-full"></div>
                            </h3>
                            <p className="text-gray-600 text-lg">Streamline your product discovery and evaluation process.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Search} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Discover Pre-Vetted, Retail-Ready Brands</h4>
                                    <p className="text-gray-600">Find compliant products, reducing listing risks.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={ClipboardCheck} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Effortless Product Evaluation</h4>
                                    <p className="text-gray-600">Access key product details, certifications, and pricing in one place.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={MousePointer} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">One-Click Sample Requests & Sell Sheets</h4>
                                    <p className="text-gray-600">Quickly request samples and download product information.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={Bell} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Stay Ahead with Real-Time Product Updates</h4>
                                    <p className="text-gray-600">Get notified about new SKUs, price adjustments, and packaging changes.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start ">
                                <FeatureIcon Icon={LayoutGrid} color="bg-blue-600" />
                                <div>
                                    <h4 className="font-semibold text-xl text-gray-900 mb-2">Track & Organize Brands with Ease</h4>
                                    <p className="text-gray-600">Save, compare, and maintain a history of shortlisted brands.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                Sign Up Now
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinSection;
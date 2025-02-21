import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiSolidMessageRounded } from "react-icons/bi";
import { motion } from "framer-motion";

const PricingCards = () => {
  const [isYearly, setIsYearly] = useState(false);


  const pricingData = [
    {
      name: "Free",
      icon: <CiHome className="text-3xl text-gray-600" />,
      monthlyPrice: "0",
      yearlyPrice: "0",
      description: "Perfect for individual brand starters",
      subDescription: "Single Brand & Single Product",
      buttonText: "Start Free",
      buttonStyle: "text-white bg-gradient-to-r from-blue-600 to-blue-700",
      isPopular: false,
      plusText: "",
      features: [
        "Product Verification",
        "Upgrade Option"
      ],
      gradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Professional",
      icon: <HiOutlineBuildingStorefront className="text-3xl text-blue-500" />,
      monthlyPrice: "29",
      yearlyPrice: "24",
      description: "Ideal for growing brands",
      subDescription: "Single Brand & 10 Products",
      buttonText: "Get Started",
      buttonStyle: "text-white bg-gradient-to-r from-blue-600 to-blue-700",
      isPopular: true,
      plusText: "Everything in Free +",
      features: [
        "Product Verification & Centralize Management",
        "Buyer Discovery Access",
        "Create New Team Members & Assign access",
        "Quick access to all products, retailers and resources",
        "Sell sheets & Presentations creation",
        "Product Evaluation & Potential",
        "Team Management",
        "Extend more Brands and Products (additional fee)",
        "Build customized Forecasts",
        "Centralized Retail CRM",
        "Manage Sample Requests",
        "Automate Listing paperwork"
      ],
      gradient: "from-blue-600/10 to-blue-800/10"
    },
    {
      name: "Business",
      icon: <HiOutlineBuildingOffice className="text-3xl text-blue-500" />,
      monthlyPrice: "99",
      yearlyPrice: "82",
      description: "For multiple brand management",
      subDescription: "10 Brands & 10 Products per Brand",
      buttonText: "Get Started",
      buttonStyle: "text-white bg-gradient-to-r from-blue-600 to-blue-700",
      isPopular: false,
      plusText: "Everything in Professional +",
      features: [
        "AI Assisted",
        "Product Verification & Centralize Management",
        "Buyer Discovery Access",
        "Create New Team Members & Assign access",
        "Quick access to all products, retailers and resources",
        "Sell sheets & Presentations creation",
        "Product Evaluation & Potential",
        "Extended customized Forecasts",
        "Team Management",
        "Centralized Retail CRM",
        "Manage Sample Requests",
        "Automate Listing paperwork"
      ],
      gradient: "from-blue-600/10 to-blue-800/10"
    },
    {
      name: "Enterprise",
      icon: <HiOutlineBuildingOffice2 className="text-3xl text-blue-500" />,
      specialIcon: <BiSolidMessageRounded className="text-5xl text-blue-500" />,
      monthlyPrice: null,
      yearlyPrice: null,
      description: "For large-scale operations",
      subDescription: "Unlimited Brands & Products",
      buttonText: "Contact Sales",
      buttonStyle: "text-white bg-gradient-to-r from-blue-600 to-blue-700",
      isPopular: false,
      plusText: "Everything in Business +",
      features: [
        "Product Verification & Centralize Management",
        "Buyer Discovery Access",
        "Create New Team Members & Assign access",
        "Quick access to all products, retailers and resources",
        "Sell sheets & Presentations creation",
        "Product Evaluation & Potential",
        "Extend more Brands and Products as needed",
        "Build customized Forecasts",
        "Centralized Retail CRM",
        "Manage Sample Requests",
        "Automate Listing paperwork"
      ],
      gradient: "from-blue-600/10 to-blue-800/10"
    }
  ];

  return (
    <div className="container-fluid px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-24">
        <h2 className="text-[28px] font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
          Choose Your Plan
        </h2>
        <div className="w-32 h-1 bg-gradient-to-br from-blue-600 to-blue-800 mx-auto rounded-full"></div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingData.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`relative bg-gradient-to-b ${plan.gradient} border border-gray-200 rounded-xl p-6 flex flex-col transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                Most Popular
              </span>
            )}

            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-4">
              {plan.icon}
              <h1 className="text-2xl font-bold text-gray-900">{plan.name}</h1>
            </div>

            {/* Pricing */}
            {plan.monthlyPrice ? (
              <motion.div
                className="flex items-baseline gap-2 mb-4"
                key={isYearly ? "yearly" : "monthly"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl font-bold text-gray-900">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-600">/month</span>
              </motion.div>
            ) : (
              <div className="mb-4">{plan.specialIcon}</div>
            )}

            {/* Description */}
            <p className="text-gray-700 font-medium mb-2">{plan.description}</p>
            <p className="text-sm text-gray-500 mb-6">{plan.subDescription}</p>

            {/* Button */}
            <button
              className={`${plan.buttonStyle} py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 w-full`}
            >
              {plan.buttonText}
            </button>

            {/* Features */}
            <div className="mt-6">
              {plan.plusText && (
                <h3 className="text-sm font-semibold text-gray-600 mb-3">{plan.plusText}</h3>
              )}
              <ul className="space-y-3 text-gray-700 text-sm">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <GoDotFill className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
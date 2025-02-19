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

  const togglePricing = () => {
    setIsYearly(!isYearly);
  };

  const pricingData = [
    {
      name: "Free",
      icon: <CiHome />,
      monthlyPrice: "0",
      yearlyPrice: "0",
      description: "For individuals to organize personal projects and life",
      buttonText: "Sign up",
      buttonStyle: "bg-white py-2 font-semibold w-full rounded-lg cursor-pointer text-[18px] shadow-sm",
      isPopular: false,
      plusText: "",
      features: [
        "Collaborative workspace",
        "Integrate with Slack, GitHub & more",
        "Basic page analytics",
        "7 day page history",
        "Invite 10 guests"
      ]
    },
    {
      name: "Plus",
      icon: <HiOutlineBuildingStorefront />,
      monthlyPrice: "12",
      yearlyPrice: "10",
      description: "For small teams and professionals to work together",
      buttonText: "Get Started",
      buttonStyle: "bg-blue-400 text-white hover:bg-blue-500 py-2 font-semibold w-full rounded-lg cursor-pointer text-[18px] shadow-sm",
      isPopular: true,
      plusText: "Everything in Free +",
      features: [
        "Unlimited blocks for teams",
        "Unlimited file uploads",
        "30 day page history",
        "Invite 100 guests",
        "Synced databases with 3rd party apps",
        "Custom websites",
        "Custom automations",
        "Charts & dashboards"
      ]
    },
    {
      name: "Business",
      icon: <HiOutlineBuildingOffice />,
      monthlyPrice: "18",
      yearlyPrice: "15",
      description: "For growing businesses to streamline teamwork",
      buttonText: "Get Started",
      buttonStyle: "py-2 font-semibold w-full rounded-lg bg-white cursor-pointer text-[18px] shadow-sm",
      isPopular: false,
      plusText: "Everything in Free +",
      features: [
        "SAML SSO",
        "Private teamspaces",
        "Bulk PDF export",
        "Advanced page analytics",
        "90 day page history",
        "Invite 250 guests"
      ]
    },
    {
      name: "Enterprise",
      icon: <HiOutlineBuildingOffice2 />,
      specialIcon: <BiSolidMessageRounded className="text-5xl" />,
      monthlyPrice: null,
      yearlyPrice: null,
      description: "For organizations to operate with scalability, control, and security",
      buttonText: "Contact Sales",
      buttonStyle: "py-2 font-semibold w-full bg-white rounded-lg cursor-pointer text-[18px] shadow-sm",
      isPopular: false,
      plusText: "Everything in Business +",
      features: [
        "User provisioning (SCIM)",
        "Advanced security & controls",
        "Audit log",
        "Customer success manager",
        "Workspace analytics",
        "Unlimited page history",
        "Security & Compliance integrations",
        "Invite 250 guests"
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-4 mt-15">
      <div className="text-[16px] flex justify-between items-center">
        <h1 className="text-[#7C736F] text-[15px] font-semibold">Price in USD</h1>
        <div className="flex gap-2 bg-[#efeeee] border border-gray-300 p-1 rounded-3xl">
          <button
            className={`px-5 py-1 font-semibold rounded-2xl cursor-pointer transition-colors duration-300 ${!isYearly ? "bg-white" : ""}`}
            onClick={() => setIsYearly(false)}
          >
            Pay monthly
          </button>
          <button
            className={`px-5 py-1 font-semibold rounded-2xl cursor-pointer transition-colors duration-300 ${isYearly ? "bg-white" : ""}`}
            onClick={togglePricing}
          >
            Pay yearly <span className="text-blue-500">save 20%</span>
          </button>
        </div>
        <h1 className="text-[#7C736F] text-[15px] font-semibold">Add AI Noble</h1>
      </div>
      <div className="container flex justify-between">
        {pricingData.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="bg-[#F6F5F4] hover:bg-blue-100 hover:border-blue-500 duration-300 hover:transition-colors border border-gray-200 w-[280px] p-5 flex flex-col gap-6 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <h1 className="text-[24px] font-semibold"> {plan.icon}</h1>
              <h1 className="text-[24px] font-semibold">
                {plan.name}
              </h1>
              {plan.isPopular && (
                <div className="bg-blue-500 text-white font-semibold text-[14px] mt-6 px-2 rounded-xl w-fit">
                  Popular
                </div>
              )}
            </div>

            {plan.monthlyPrice ? (
              <motion.div
                className="flex items-end gap-1"
                key={isYearly ? "yearly" : "monthly"}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-5xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </h2>
                <p className="text-[18px] font-semibold">per seat/month</p>
              </motion.div>
            ) : (
              plan.specialIcon
            )}

            <p className="text-[16px] leading-none text-[#31302E]">
              {plan.description}
            </p>

            <button className={plan.buttonStyle}>
              {plan.buttonText}
            </button>

            {plan.plusText && (
              <h1 className="text-[18px] font-semibold">{plan.plusText}</h1>
            )}

            <ul className="flex flex-col gap-3 tracking-tighter leading-none text-[#31302E] text-[16px]">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-2">
                  <GoDotFill /> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
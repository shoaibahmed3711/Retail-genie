import React from 'react';
import { FaBuilding, FaPhone, FaFax, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';

const Footer = () => {
    return (
        <div>
            <div className="w-full text-center py-3 text-gray-400 text-sm">
                MEMBER: BSE LTD. SEBI REGN.NO. INZ000302836, TRADING CODE: 6561
            </div>

            <section className='bg-black'>
                <div className=''>
                    <div className=" container-fluid grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                        {/* About section */}
                        <div className="bg-[#1a1a1a] relative pb-6">
                            <div className="absolute top-[-8px] left-0 right-0 h-2 bg-[#e31e24]" />
                            <div className="p-10">
                                <h3 className="text-[16px] text-white font-bold mb-5">About VLS Finance</h3>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    VLS Finance is guided by a strong and professional Board of Directors comprising Bankers, Chartered
                                    Accountants and Bureaucrats. It has an excellent blend of the old world wisdom, derived from its
                                    conservative policy makers at the board level, combined with a modern approach at the operational level,
                                    courtesy its young and dynamic management team.
                                </p>
                            </div>
                        </div>

                        {/* Important Links */}
                        <div className="md:pl-8">
                            <h3 className=" font-bold mb-5">Important Links</h3>
                            <nav className="flex flex-col space-y-3 ">
                                <h1 className='text-white font-bold'>Important Links</h1>
                                {['Home','KYC', 'Policy', 'Payment to VLS', 'Contact Us'].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 group">
                                        <span className="text-[#e31e24] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">›</span>
                                        <a href="#" className="text-white border-b-[1px] pb-2 w-full border-gray-800 font-bold hover:text-gray-300 transition-transform group-hover:translate-x-1">
                                            {item}
                                        </a>
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* Registered Office */}
                        <div >
                            <h3 className=" text-white font-bold mb-5">Registered Office :</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <FaBuilding className="mt-1 text-gray-400" />
                                    <p className="text-gray-400">
                                        VLS Finance Ltd. Ground Floor, 90, Okhla Industrial Estate, Phase III, New Delhi – 110020
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaPhone className="text-gray-400" />
                                    <p className="text-gray-400">+91-011-46656666</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaFax className="text-gray-400" />
                                    <p className="text-gray-400">+91-011-46656699</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="text-gray-400" />
                                    <a href="mailto:vls@vlsfinance.com" className="text-white underline hover:text-gray-300">
                                        vls@vlsfinance.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom copyright bar */}
                    <div className="bg-[#1A1A1A] border-t border-gray-800">
                        <div className="container-fluid mx-auto px-4 py-8">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
                                <p>Copyright © 2020 VLS Finance Ltd. All Rights Reserved.</p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <a href="#" className="hover:text-white">Privacy Policy</a>
                                    <a href="#" className="hover:text-white">Terms & Conditions</a>
                                    <a href="#" className="hover:text-white">Disclaimer</a>
                                    <a href="#" className="hover:text-white">Refund Policy</a>
                                </div>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="p-2 border border-white hover:border-white transition-colors"
                                    aria-label="Scroll to top"
                                >
                                    <MdOutlineKeyboardArrowUp className='h-6 w-6 text-white' />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scroll to top button */}
                    <div className=" right-8">
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;

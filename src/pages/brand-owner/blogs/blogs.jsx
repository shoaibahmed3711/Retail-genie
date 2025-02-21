import React from "react";

export function BlogSection() {
  const blogs = [
    {
      date: "April 12, 2024",
      author: "Rostislav Aškadauch",
      title: "Announcement: Telematics & Connected Mobility Conference",
      description: "Join us for an exclusive industry conference hosted by StartIn in Vilnius, September 2024. Explore the latest innovations in telematics and connected mobility solutions.",
      image: "/hero.svg",
      readTime: "3 minutes",
    },
    {
      date: "November 29, 2024",
      author: "Veronika Pasetyuk",
      title: "Insights on Fuel Monitoring with Fuelguard",
      description: "Discover a step-by-step guide to implementing Fuelguard with comprehensive GPS monitoring features for efficient fuel level tracking.",
      image: "/hero.svg",
      readTime: "2 minutes",
    },
    {
      date: "November 14, 2024",
      author: "Tatsiaina Rasolonjatovo",
      title: "How to Connect and Configure Sinotrack Trackers",
      description: "Learn how to seamlessly connect and configure Sinotrack trackers on GPS Trace with detailed step-by-step instructions and key insights.",
      image: "/hero.svg",
      readTime: "6 minutes",
    },
  ];

  return (
    <section className="container-fluid mx-auto px-4 py-12">
      <div className="text-center mb-24">
        <h2 className="text-[28px] font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
          Latest Blogs Posts
        </h2>
        <div className="w-32 h-1 bg-gradient-to-br from-blue-600 to-blue-800 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <article
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span>{blog.date}</span>
                <span className="mx-2">•</span>
                <span>{blog.author}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {blog.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {blog.readTime} read
                </span>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Explore More Topics
        </button>
      </div>
    </section>
  );
}
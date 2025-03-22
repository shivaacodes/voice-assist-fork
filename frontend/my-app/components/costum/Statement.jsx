import React from "react";
import { motion } from "framer-motion";

const Statement = () => {
  const technologies = [
    {
      name: "Python",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1z0LC70CF3lPE1Xe-Uka4Y5sSlLzrAVHCQg&s",
    },
    {
      name: "Humeai",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjtByF9WRy2rHfc0IaVlphxJjUepVZ5pmeXA&s",
    },
    {
      name: "Supabase",
      logo: "https://getlogo.net/wp-content/uploads/2020/11/supabase-logo-vector.png",
    },
    {
      name: "Next.js",
      logo: "https://cdn.freelogovectors.net/wp-content/uploads/2023/09/next-js-logo-freelogovectors.net_.png",
    },
    {
      name: "TailwindCSS",
      logo: "https://images.icon-icons.com/2699/PNG/512/tailwindcss_logo_icon_170649.png",
    },
  ];

  return (
    <div className="w-full py-12 flex flex-col items-center text-center">
      <div className="container mx-auto px-4 mb-16">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-8 leading-snug">
          Effortless Access to <br /> Student Information via
        </h1>
        <motion.h2
          className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-600 to-green-900 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI-Powered Voice Assistance
        </motion.h2>

        <p className="text-xl text-gray-700 leading-relaxed mt-8 max-w-4xl mx-auto">
          Finding important academic details shouldn’t feel like solving a
          puzzle. Students often struggle with slow portals, endless FAQs, and
          confusing navigation. Our solution? A voice-enabled AI assistant that
          simplifies it all. Just ask your question, and our intelligent
          assistant—powered by NLP—fetches the answers in seconds. No more
          scrolling, no more frustration—just fast, accurate responses, right
          when you need them. The system integrates with Supabase, ensuring a
          seamless experience.
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-8 rounded-xl">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-10%"] }}
          transition={{ x: { duration: 12, repeat: Infinity, ease: "linear" } }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center h-20 min-w-40"
              whileHover={{
                scale: 1.4,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <img
                src={tech.logo}
                alt={`${tech.name} logo`}
                className={`object-contain transition-transform ${
                  tech.name === "Python" ? "h-16" : "h-24"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Statement;

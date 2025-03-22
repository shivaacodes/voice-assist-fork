import React from "react";
import { motion } from "framer-motion";

const Statement = () => {
  const technologies = [
    { name: "Python", logo: "/python-logo.png" },
    { name: "Humeai", logo: "/humeai-logo.png" },
    { name: "Supabase", logo: "/supabase-logo.png" },
    { name: "Next.js", logo: "/nextjs-logo.png" },
    { name: "TailwindCSS", logo: "/tailwindcss-logo.png" },
  ];

  return (
    <div className="w-full py-12 flex flex-col items-center text-center">
      <div className="container mx-auto px-4 mb-16">
        {/* Headings */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-6">
          Effortless Access to Student Information via
        </h1>
        <motion.h2
          className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-600 to-green-900"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          AI-Powered Voice Assistance
        </motion.h2>

        {/* Catchier Paragraph */}
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

      {/* Tech Stack Animation */}
      <div className="relative w-full overflow-hidden py-8 rounded-xl">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 18, repeat: Infinity, ease: "linear" } }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 min-w-40"
            >
              <img
                src={tech.logo}
                alt={`${tech.name} logo`}
                className="h-12 object-contain transition-transform hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Statement;

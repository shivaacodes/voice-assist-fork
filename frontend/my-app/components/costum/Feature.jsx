"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Feature = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-gray-800 mb-4 font-urbanist relative">
            Meet{" "}
            <span className="text-blue-600 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text font-extrabold">
              Zuhi
            </span>
          </h2>

          <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-6 font-urbanist">
            Your Personal Helpdesk Assistant
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Zuhi streamlines your entire admission process with intelligent
            guidance every step of the way. From application submissions to
            document verification, she's designed to make your campus journey
            smooth and stress-free.
          </p>
          <ul className="space-y-3">
            {[
              "24/7 instant responses to your admission queries",
              "Step-by-step guidance through application procedures",
              "Document submission tracking and updates",
              "Personalized deadline reminders",
              "Campus resources and department connections",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </motion.li>
            ))}
          </ul>
          <a href="#main">
            <motion.button
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 animate-pulse"
              whileHover={{ backgroundPosition: "200% 0" }}
              whileTap={{ scale: 0.95 }}
            >
              Ask me 🚀
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex justify-center items-center mt-20  h-[200px] w-[300px]">
              <video src="/zuhivid.mp4" autoPlay loop></video>
            </div>
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm max-w-[200px] text-center font-medium"
                >
                  Worried about admissions? I got you covered!
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute -bottom-12 right-20 bg-blue-700 text-white italic px-4 py-2 rounded-lg shadow-lg animate-out border-1 border-white">
              <span className="font-bold">AI-Powered</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feature;

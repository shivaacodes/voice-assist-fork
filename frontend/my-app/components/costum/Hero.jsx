"use client";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="mt-16 ml-12 max-w-6xl">
      <h1 className="pointer-events-none leading-[1.2] sm:leading-[1.4] bg-white/30 w-full z-50 text-left text-5xl sm:text-7xl font-semibold font-urbanist">
        <div className="flex items-center">
          <span className="text-gray-800">VoiceAssist</span>
          <img
            src="/images/microphone.png"
            alt="CampusVoice Icon"
            className="ml-4 w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </div>

        <motion.span
          className="mt-4 sm:mt-6 block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.19, 1.0, 0.22, 1.0], // Custom easing (cubic-bezier)
            delay: 0.3,
          }}
        >
          Seamless Admissions, Smart Solutions – Your Campus IT Wingman!
        </motion.span>
      </h1>
    </div>
  );
};

export default Hero;

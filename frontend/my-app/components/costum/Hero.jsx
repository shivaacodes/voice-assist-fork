"use client";
import { useRouter } from "next/navigation";
import { FileText, Mic } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-20 max-w-[90%] flex items-start justify-between mx-auto">
      {/* Left Content */}
      <div className="flex-1">
        <h1 className="pointer-events-none leading-[1.2] sm:leading-[1.4] w-full z-50 text-left text-5xl sm:text-7xl font-semibold">
          <div className="flex items-center">
            <span className="text-gray-800 font-extrabold">VoiceAssist</span>
            <img
              src="/images/microphone.png"
              alt="CampusVoice Icon"
              className="ml-4 w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </div>

          <span className="mt-4 sm:mt-6 block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 bg-clip-text text-transparent font-bold">
            Seamless Admissions, Smart Solutions – Your Campus IT Wingman!
          </span>
        </h1>
      </div>

      {/* Right Side Buttons */}
      <div className="flex flex-col gap-8 mt-48">
        <button
          onClick={() => scrollToSection("main")} // Use lowercase "main"
          className="px-6 py-3 rounded-xl font-bold text-white text-lg sm:text-xl
          bg-blue-600 hover:bg-blue-700 transition-all duration-150
          flex items-center justify-center shadow-md"
        >
          <Mic className="w-6 h-6 mr-2" />
          Ask Zuhi
        </button>

        <button
          onClick={() => scrollToSection("aifeature")} // Use lowercase "aifeature"
          className="px-6 py-3 rounded-xl font-bold text-white text-lg sm:text-xl
          bg-green-600 hover:bg-green-700 transition-all duration-150
          flex items-center justify-center shadow-md"
        >
          <FileText className="w-6 h-6 mr-2" />
          Generate Application
        </button>
      </div>
    </div>
  );
};

export default Hero;

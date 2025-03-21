"use client";
import { useState,useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Main = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  
    if (!isRecording) {
      // Start listening
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    } else {
      // Stop listening
      SpeechRecognition.stopListening();
      console.log(transcript);
    }
    
  };
  
    const [textInput, setTextInput] = useState('');  // To store the transcript or manual input
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

useEffect(() => {
  setTextInput(transcript);
}, [transcript]);  // Whenever the transcript updates, update the text area

  return (
    <div className="w-full py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left side with image and button */}
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="relative flex justify-center items-center">
            {/* Sound propagation waves fix */}
            {isRecording && (
              <div className="absolute inset-0 flex justify-center items-center z-10">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-blue-400"
                    style={{
                      width: `${100 + i * 40}px`,
                      height: `${100 + i * 40}px`,
                    }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 9 }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* The image container with hover animation */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src="/images/zuhi.png"
                alt="Zuhi Assistant"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <Separator className="w-full my-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              onClick={toggleRecording}
              className={`relative flex items-center gap-3 px-12 py-6 text-2xl font-bold text-white rounded-full shadow-lg transition-all duration-300 overflow-hidden border-2 border-transparent 
                ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              <img
                src="/images/microphone.png"
                alt="Microphone"
                className="w-8 h-8 object-contain z-10"
              />
              <span className="relative z-10">
                {isRecording ? "Stop " : "Start Talking"}
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Right side with textarea */}
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-8 rounded-xl relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Conversation with Zuhi
            </h3>
            <div className="relative">
              <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)} 
                placeholder="Type your message to Zuhi here..."
                className="min-h-[400px] text-lg text-gray-700 bg-white border border-blue-600 rounded-lg p-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300"
              />
              <button className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all">
                <Send size={24} />
              </button>
            </div>
            <Separator className="w-full my-6" />
            <div className="mt-6 text-gray-700 text-lg">
              <p>
                Ask Zuhi about admission procedures, required documents,
                deadlines, or any campus-related questions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Main;

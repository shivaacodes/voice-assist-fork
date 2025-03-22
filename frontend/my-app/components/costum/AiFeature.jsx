"use client";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const AiFeature = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      submitAnswer(transcript);
      resetTranscript(); // Clear transcript after submission
    }
  }, [listening]);

  const startApplication = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/start-application",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      const data = await response.json();
      if (data.session_id) {
        setSessionId(data.session_id);
        setMessages([data.message]);
        const audio = new Audio(data.audio);
        audio.play();
      }
    } catch (error) {
      console.error("Error starting application:", error);
      setMessages([
        {
          sender: "Zuhi",
          text: "Error starting application.",
          position: "left",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (answer) => {
    if (!answer.trim() || !sessionId) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, answer }),
      });
      const data = await response.json();
      if (data.messages) {
        setMessages((prev) => [...prev, ...data.messages]);
        if (data.audio) {
          new Audio(data.audio).play();
        }
        if (data.completed) {
          setCompleted(true);
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Zuhi", text: "Error submitting answer.", position: "left" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/generate-application-pdf",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `application_${sessionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessages([]);
      setSessionId(null);
      setCompleted(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Zuhi", text: "Error generating PDF.", position: "left" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-transparent p-4">
      <div className="w-full max-w-6xl">
        <h2
          className="text-[3rem] md:text-[3.5rem] lg:text-[6rem] font-bold text-center mb-8 
          bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent 
          animate-gradient"
        >
          Generate Application
        </h2>

        {/* Chat UI */}
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.position === "right" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-lg px-4 py-2">
                <div className="font-extrabold text-gray-600 text-2xl md:text-xl mb-1">
                  {message.sender}:
                </div>
                <div className="text-xl md:text-xl">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Start Application Button with Loader */}
        {!sessionId && (
          <div className="p-4 flex justify-center mt-8">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full flex items-center text-lg md:text-xl"
              onClick={startApplication}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : null}
              Start Application
            </button>
          </div>
        )}

        {/* Speech Recognition Input */}
        {sessionId && !completed && (
          <div className="p-4 flex flex-col items-center mt-8">
            <button
              className={`bg-${listening ? "red" : "blue"}-600 hover:bg-${
                listening ? "red" : "blue"
              }-700 text-white font-bold py-3 px-8 rounded-full flex items-center text-lg md:text-xl`}
              onClick={
                listening
                  ? SpeechRecognition.stopListening
                  : SpeechRecognition.startListening
              }
              disabled={isLoading}
            >
              {listening ? "Stop Listening" : "Speak Your Answer"}
            </button>
          </div>
        )}

        {/* Generate PDF Button */}
        {completed && (
          <div className="p-4 flex justify-center mt-8">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full flex items-center text-lg md:text-xl"
              onClick={generatePDF}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Generate PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiFeature;

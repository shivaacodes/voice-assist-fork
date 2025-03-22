import React from "react";
import jsPDF from "jspdf"; // Import jsPDF library

const AiFeature = () => {
  const messages = [
    { sender: "Zuhi", text: "What is your name?", position: "left" },
    { sender: "You", text: "Shiva Sajay", position: "right" },
    { sender: "Zuhi", text: "Please say your email", position: "left" },
    { sender: "You", text: "shiva.sajay@example.com", position: "right" },
    {
      sender: "Zuhi",
      text: "Thank you for providing your information!",
      position: "left",
    },
    {
      sender: "You",
      text: "You're welcome. What can you help me with today?",
      position: "right",
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Chat Transcript", 10, 10);

    let yPosition = 20;
    messages.forEach((message) => {
      doc.text(`${message.sender}: ${message.text}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save("chat-transcript.pdf");

    console.log("PDF generated. Add your custom logic here later.");
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

        <div className="flex flex-col space-y-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.position === "right" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-lg px-6 py-3">
                <div className="font-bold text-gray-400 text-xl md:text-2xl mb-1">
                  {message.sender}:
                </div>
                <div className="text-lg md:text-xl">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex justify-center mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full flex items-center text-lg md:text-xl"
            onClick={generatePDF} // Call the generatePDF function
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
      </div>
    </div>
  );
};

export default AiFeature;

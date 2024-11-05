"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { FaHome, FaMicrophone, FaSearch, FaBook, FaQuestionCircle, FaMicrophoneAlt, FaUpload, FaTimes } from 'react-icons/fa';

function Sidebar() {
  const [activeItem, setActiveItem] = useState("All Transcription");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(0); // Timer state
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store selected file

  const menuItems = [
    { name: "All Transcription", icon: <FaHome className="w-5 h-5 mr-2" /> },
    { name: "Live Transcription", icon: <FaMicrophone className="w-5 h-5 mr-2" /> },
    { name: "Query Transcription", icon: <FaSearch className="w-5 h-5 mr-2" /> },
    { name: "User Guide", icon: <FaBook className="w-5 h-5 mr-2" /> },
    { name: "FAQ", icon: <FaQuestionCircle className="w-5 h-5 mr-2" /> },
  ];

  useEffect(() => {
    if (isModalOpen && !mediaRecorder) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };
          setMediaRecorder(recorder);
        })
        .catch((error) => {
          console.error("Microphone access denied:", error);
        });
    }
  }, [isModalOpen, mediaRecorder]);

  const handleStartRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "recording") {
      mediaRecorder.start();
      setIsRecording(true);
      setAudioChunks([]); // Reset audio chunks
      setSeconds(0); // Reset timer
      const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
      setTimer(interval); // Start timer
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
      if (timer) clearInterval(timer); // Stop timer
    }
  };

  const handleModalClose = () => {
    handleStopRecording(); // Stop recording when closing modal
    setIsModalOpen(false);
    setSeconds(0); // Reset timer
    if (timer) clearInterval(timer); // Clear timer
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null); // Store file
  };

  return (
    <div className="min-h-screen flex font-sans relative">
      {/* Sidebar */}
      <aside className="bg-darkBlue text-white w-64 p-6 flex flex-col space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img src="/logo.png" alt="Logo" className="w-28 h-18 object-contain" />
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`flex items-center p-2 w-full text-lg rounded-lg ${
                activeItem === item.name ? "bg-primaryPurple text-white" : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-primaryPurple-100">
        {/* Top Right Buttons */}
        <div className="flex justify-end mb-6 space-x-4">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center bg-primaryPurple text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FaMicrophoneAlt className="w-5 h-5 mr-2" /> Record
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)} 
            className="flex items-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray"
          >
            <FaUpload className="w-5 h-5 mr-2" /> Upload
          </button>
        </div>

        {/* Page Content */}
        <h1 className="text-3xl font-bold mb-6">Welcome to Orato Dashboard</h1>
        <p className="text-lg text-gray-700">
          Select a menu item from the sidebar to get started with transcription features.
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">{activeItem}</h2>
          <p className="text-gray-600 mt-2">
            Content related to {activeItem} will appear here.
          </p>
        </div>
      </main>

      {/* Modal for Recording */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative text-center">
            {/* Close Icon at the top-right */}
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-black">Audio Recording</h3>

            <p className="text-gray-700 mb-4">Press the button below to start recording your audio.</p>
            <div className="text-lg font-semibold mb-4 text-black">Timer: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</div>
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`px-4 py-2 rounded-lg mb-4 ${isRecording ? 'bg-red-600' : 'bg-primaryPurple'} text-white`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>
      )}

      {/* Modal for Upload */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative text-center">
            {/* Close Icon at the top-right */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4 text-black">Upload Audio</h3>
            <p className="text-gray-700 mb-4">Select an audio file to upload.</p>
            <div className="flex justify-center items-center mb-4">
              <label className="bg-gray-200 text-black px-4 py-2 rounded-lg cursor-pointer">
                {selectedFile?.name || "No file chosen"}
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {selectedFile ? (
              <Link
                href={{
                  pathname: '/Transcription',
                  query: { fileName: selectedFile.name }
                }}
                className="bg-primaryPurple text-white px-4 py-2 rounded-lg inline-block"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Upload & Transcribe
              </Link>
            ) : (
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                Upload & Transcribe
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;

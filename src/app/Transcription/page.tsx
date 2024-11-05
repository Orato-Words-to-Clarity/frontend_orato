"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function TranscriptionPage() {
  const [transcription, setTranscription] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName"); // Extract file name from query

  useEffect(() => {
    const transcribeAudio = async () => {
      // Placeholder for actual transcription API call
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: JSON.stringify({ fileName }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setTranscription(data.transcription);
    };

    if (fileName) {
      transcribeAudio();
    }
  }, [fileName]);

  return (
    <div className="min-h-screen bg-darkBlue p-6 flex flex-col">
      {/* Top-left heading */}
      <h1 className="text-3xl font-bold mb-6 text-white self-start">Transcripted Text</h1>
      
      {/* Centered transcription content */}
      <div className="flex-1 flex items-center justify-center">
        {transcription ? (
          <p className="text-lg text-gray-200 text-center">{transcription}</p>
        ) : (
          <p className="text-gray-400 text-center">Loading transcription...</p>
        )}
      </div>
    </div>
  );
}

export default TranscriptionPage;

import React from 'react';
// src/app/page.tsx
// src/app/page.tsx
export default function Home() {
  return (
    <div className="bg-darkBlue min-h-screen flex items-center justify-center">
      {/* Full Dark Blue Box */}
      <div className="bg-darkBlue w-[1430px] h-[620px] flex flex-col items-center justify-center text-center rounded-md">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Orato</h1>
        <p className="text-lg text-white px-4">
          Orato is an innovative platform designed to transform the way you interact with digital content.
        </p>
      </div>
    </div>
  );
}


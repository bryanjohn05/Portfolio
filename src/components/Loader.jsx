import React, { useState, useEffect } from 'react';
import logo from '/logo2.png';  // Update with the correct path

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 5 seconds
    setTimeout(() => {
      setIsLoading(false); // After 5 seconds, hide the loader and show the main content
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-[#114B5F] to-[#0c3542]">
      {/* Top text */}
      <h1 className="text-4xl font-bold mb-4 animate-fadeInDown">            Loading...
      </h1>
      
      {/* Logo container */}
      <div className="relative w-48 h-48">
        {/* Grayscale underlay */}
        <img
          src={logo}
          alt="Logo (grayscale)"
          className="absolute top-0 left-0 w-full h-full object-contain filter grayscale"
        />
        
        {/* Color overlay with bottom-up fill animation */}
        <img
          src={logo}
          alt="Logo (color)"
          className="absolute top-0 left-0 w-full h-full object-contain animate-fillFromBottom"
        />
      </div>

      {/* Bottom text */}
      <p className="mt-4 text-2xl font-semibold animate-fadeInUp">
      Welcome to My Portfolio!      </p>
    </div>
  );
};

export default Loader;

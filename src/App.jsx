import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Loader from './components/Loader.jsx'
import { ThemeProvider } from './components/ThemeContext'
import ParticleBackground from './components/ParticleBackground'
import Portfolio from './components/Portfolio.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 5-second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup if needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
  
    <ThemeProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ParticleBackground />
        <Navbar />
        <Portfolio />
      </div>
    </ThemeProvider>
    )}
    </Router>
  );
}

export default App


import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Guestbook from './pages/Guestbook';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    // Set page title
    document.title = '🎂 Happy Birthday Aghni! 🎉';
  }, []);

  return (
    <Router>
      <div className="font-poppins">
        <Navigation />
        <MusicPlayer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
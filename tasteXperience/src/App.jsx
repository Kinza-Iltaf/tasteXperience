// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Help from './Pages/Help';
import Feedback from './Pages/Feedback';
import Menu from './Pages/Menu';
import headerVideo from './assets/header.mp4';




import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer';

import Contact from './Pages/contactUs'; // Adjusted path if it's src/pages/Contact.jsx
// You can also import Home component if you split it

function Home() {
  return (
    <>
      {/* Main Hero Video with Tagline */}
      <div className="video-header">
        <video autoPlay loop muted className="background-video">
     <source src={headerVideo} type="video/mp4" />

        </video>

        <div className="video-overlay">
          <div className="tagline-box">
            <h1>Taste Your Food Virtually</h1>
            <p>Step into a new world where you can taste before you buy powered by innovation and flavor!</p>
          </div>
        </div>
      </div>
    </>
  );
}



function App() {
  return (
    <Router>
      <div className="fullscreen-background">
        <header className="navbar">
          <div className="menu-section">
            <HamburgerMenu />
          </div>

          <div className="logo-section">
            <div className="logo">TasteXperience</div>
          </div>
          <div className="search-section">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for items..."
            />



          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/menu" element={<Menu />} />
          

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
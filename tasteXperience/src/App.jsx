// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Help from './Pages/Help';
import Feedback from './Pages/Feedback';
import Menu from './Pages/Menu';



import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer';

import Contact from './Pages/contactUs'; // Adjusted path if it's src/pages/Contact.jsx
// You can also import Home component if you split it

function Home() {
  return (
    <>
      <main className="center-content">
        <div className="tagline-box">
          <h1>Taste Before You Buy</h1>
          <p>Experience the flavor before the order!</p>
        </div>
      </main>
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
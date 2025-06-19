import React from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer';

function App() {
  return (
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


      <main className="center-content">
        <div className="tagline-box">
          <h1>Taste Before You Buy</h1>
          <p>Experience the flavor before the order!</p>
        </div>
      </main>
        <Footer />
    </div>
  );
}

export default App;

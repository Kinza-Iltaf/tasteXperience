import React, { useState, useEffect, useRef } from 'react';
import './HamburgerMenu.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null); // ← new ref for hamburger

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // If click is outside the sidebar AND not on the hamburger icon
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger icon */}
      <div ref={hamburgerRef} className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </div>

      {/* Sidebar menu */}
      <div ref={sidebarRef} className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <span className="close-btn" onClick={toggleMenu}>&times;</span>
          <h3>Menu</h3>
        </div>
        <nav className="menu-links">
          <a href="#help">Help</a>
          <a href="#contact">Contact Us</a>
          <a href="#menu">Menu</a>
          <a href="#feedback">Feedback</a>
        </nav>
      </div>
    </>
  );
}

export default HamburgerMenu;

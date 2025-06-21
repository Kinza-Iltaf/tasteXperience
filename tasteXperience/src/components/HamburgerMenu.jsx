import React, { useState, useEffect, useRef } from 'react';
import './HamburgerMenu.css';

import { Link } from 'react-router-dom';


function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
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
             <Link to="/help" onClick={toggleMenu}>Help</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>

          <Link to="/menu" onClick={toggleMenu}>Menu</Link>
        <Link to="/feedback" onClick={toggleMenu}>Feedback</Link>
        </nav>
      </div>
    </>
  );
}

export default HamburgerMenu;

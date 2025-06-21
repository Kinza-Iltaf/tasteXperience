// src/pages/Menu.jsx
import React, { useState, useRef } from 'react';
import './Menu.css';
import ItemModal from '../components/ItemModal';

import periPeriImg from '../assets/Peri Peri.jpg';
import CalzoneChunksImg from '../assets/Calzone-Chunks.jpeg';
import CheeseSticks from '../assets/Cheese Sticks.jpg';
import FlamingWingsImg from '../assets/Flaming Wings.png';
import OvenBakedChickenWingsImg from '../assets/Oven-Baked Chicken Wings.jpg';
import FajitaFajitaChickenPizzaImg from '../assets/FajitaFajita Chicken Pizza.jpg';
import chickentikkaImg from '../assets/chicken-tikka.jpg';

const menuItems = [
  {
    id: 1,
    name: 'Peri Peri Pizza',
    image: periPeriImg,
    desc: 'A bold, tangy, and spicy delight infused with our special Cheezious sauce.'
  },
  {
    id: 2,
    name: 'Calzone Chunks',
    image: CalzoneChunksImg,
    desc: 'Freshly baked bread filled with the yummiest Cheese blend to satisfy your cravings.'
  },
  {
    id: 3,
    name: 'Cheese Sticks',
    image: CheeseSticks,
    desc: 'Fresh Oven baked wings served with Dip Sauce.'
  },
  {
    id: 4,
    name: 'Flaming Wings',
    image: FlamingWingsImg,
    desc: 'Fresh oven baked wings tossed in hot Peri Peri Sauce and served with Dip Sauce.'
  },
  {
    id: 5,
    name: 'Oven Baked Chicken Wings',
    image: OvenBakedChickenWingsImg,
    desc: '4 pcs Stuffed Calzone Chunks served with Sauce & Fries.'
  },
  {
    id: 6,
    name: 'Chicken Tikka',
    image: chickentikkaImg,
    desc: '4 pcs Arabic Rolls stuffed with the yummiest mix served with sauce.'
  },
  {
    id: 7,
    name: 'Chicken Fajita',
    image: FajitaFajitaChickenPizzaImg,
    desc: '4 pcs Behari Rolls stuffed with the yummiest mix served with sauce.'
  },
];

function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">Explore the Menu</h1>
      <p className="menu-subtitle">Click an item to taste it virtually!</p>

      <div className="carousel-wrapper">
        <button className="carousel-btn left" onClick={() => scroll('left')}>❮</button>

        <div className="menu-slider no-scrollbar" ref={sliderRef}>
          {menuItems.map(item => (
            <div key={item.id} className="menu-flip-card">
              <div className="menu-flip-inner">
                <div className="menu-flip-front">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                </div>
                <div className="menu-flip-back">
                  <p>{item.desc}</p>
                  <button onClick={() => setSelectedItem(item)}>Taste It</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn right" onClick={() => scroll('right')}>❯</button>
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default Menu;

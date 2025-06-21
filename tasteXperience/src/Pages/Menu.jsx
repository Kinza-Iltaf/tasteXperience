// src/pages/Menu.jsx
import React, { useState } from 'react';
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
    name: 'Calzone Chunks',
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
//   {
//     id: 8,
//     name: 'Chicken Tikka',
//     image: './assets/bg-food.png',
//     desc: 'Tender chunks of Marinated Grilled Chicken with Savory Onion.'
//   },
//   {
//     id: 9,
//     name: 'Chicken Fajita',
//     image:FajitaFajitaChickenPizzaImg,
//     desc: 'An authentic taste of fajita marinated Chicken, Onion and Bell Peppers.'
//   },
//   {
//     id: 10,
//     name: 'Chicken Lover',
//     image: './assets/bg-food.png',
//     desc: 'Extreme quantity of Chicken and Onion with rich Mozzarella Cheese.'
//   },
//   {
//     id: 11,
//     name: 'Chicken Tandoori',
//     image: './assets/bg-food.png',
//     desc: 'Traditionally developed Tandoori Chicken with Onion, Olives, Jalapeno and Tomatoes.'
//   },
//   {
//     id: 12,
//     name: 'Hot n Spicy',
//     image: './assets/bg-food.png',
//     desc: 'Hot and Spicy Chicken Onion with Jalapeno.'
//   },
//   {
//     id: 13,
//     name: 'Vegetable Pizza',
//     image: './assets/bg-food.png',
//     desc: 'Vegetables with Pizza Sauce and Cheese.'
//   },
//   {
//     id: 14,
//     name: 'Euro Pizza',
//     image: './assets/bg-food.png',
//     desc: 'Specially Marinated Smoked Chicken with Bell Pepper, Olives and lots of Cheese.'
//   },
//   {
//     id: 15,
//     name: 'Chicken Supreme',
//     image: './assets/bg-food.png',
//     desc: 'Three Flavors of Chicken, Black Olives, Mushrooms, Bell Pepper and Cheese.'
//   },
//   {
//     id: 16,
//     name: 'Black Pepper Tikka',
//     image: './assets/bg-food.png',
//     desc: 'A Blend of Marinated Black Pepper Chicken, Onion and Bell Pepper.'
//   },
//   {
//     id: 17,
//     name: 'Sausage Pizza',
//     image: './assets/bg-food.png',
//     desc: 'Chicken Sausages, Pizza Sauce, and Cheese.'
//   },
//   {
//     id: 18,
//     name: 'Cheese Lover Pizza',
//     image: './assets/bg-food.png',
//     desc: 'Yummiest Blend of Cheese and Pizza Sauce.'
//   },
//   {
//     id: 19,
//     name: 'Chicken Pepperoni',
//     image: './assets/bg-food.png',
//     desc: 'Chicken Pepperoni, Pizza Sauce and Cheese.'
//   },
//   {
//     id: 20,
//     name: 'Chicken Mushroom',
//     image: './assets/bg-food.png',
//     desc: 'Grilled Chicken Tikka, Mushrooms, Onion and Tomatoes.'
//   },
];


function Menu() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="menu-container">
      <h1 className="menu-title">Explore the Menu</h1>
      <p className="menu-subtitle">Click an item to taste it virtually!</p>

      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-card" onClick={() => setSelectedItem(item)}>
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default Menu;

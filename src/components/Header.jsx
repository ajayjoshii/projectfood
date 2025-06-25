import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartCount }) {
  return (
    <header className="flex justify-between p-4 bg-yellow-400">
      <h1 className="text-xl font-bold">🍴 FoodieApp</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/search">🔍</Link>
        <Link to="/cart">🛒 ({cartCount})</Link>
      </nav>
    </header>
  );
}

export default Header;

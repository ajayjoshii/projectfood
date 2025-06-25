import { foodItems } from '../data/data';
import React from 'react';

function Home({ addToCart }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {foodItems.map(item => (
        <div key={item.id} className="border rounded-lg p-5 shadow">
          <img src={item.image} alt={item.name} className="h-70 w-full object-cover rounded" />
          <h2 className="font-bold">{item.name}</h2>
          <p>Rs. {item.price}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-green-500 text-white p-1 mt-2 w-full rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

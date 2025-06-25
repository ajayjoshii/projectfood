import React, { useState } from 'react';
import { foodItems } from '../data/data';

function Search({ addToCart }) {
  const [query, setQuery] = useState("");

  // Filter items by query
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {/* If no results */}
      {query && filteredItems.length === 0 && (
        <p className="text-gray-500">No matching items found.</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="border rounded-lg p-2 shadow">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
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
    </div>
  );
}

export default Search;

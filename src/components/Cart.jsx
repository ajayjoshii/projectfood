import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <p className="font-bold mt-2">Total: Rs. {total}</p>
        </>
      )}
    </div>
  );
}

export default Cart;

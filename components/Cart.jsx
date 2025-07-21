import { FaPlusCircle, FaMinusCircle, FaTrash, FaBroom, FaMoneyBillWave } from 'react-icons/fa';

export default function Cart({ cart, total, updateQty, deleteItem, clearCart, submitOrder, handlePayment }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-md" />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <FaMinusCircle onClick={()=>updateQty(item.id, -1)} className="cursor-pointer text-red-500" />
                    <span>{item.qty}</span>
                    <FaPlusCircle onClick={()=>updateQty(item.id, +1)} className="cursor-pointer text-green-500" />
                  </div>
                </div>
                <span className="font-semibold">NPR {item.qty * item.price}</span>
                <FaTrash onClick={()=> deleteItem(item.id)} className="cursor-pointer text-gray-500 hover:text-red-600 ml-4" />
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <button onClick={clearCart} className="flex items-center text-gray-600 hover:text-red-600">
              <FaBroom className="mr-1" /> Clear Cart
            </button>
            <span className="text-xl font-bold">Total: NPR {total}</span>
          </div>
          <div className="flex space-x-4 mt-6">
            <button onClick={submitOrder} className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600">
              Place Order
            </button>
            <button onClick={handlePayment} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center">
              <FaMoneyBillWave className="mr-2" /> Pay with eSewa
            </button>
          </div>
        </>
      )}
    </div>
  );
}

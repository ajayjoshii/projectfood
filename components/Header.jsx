import { FaShoppingCart } from 'react-icons/fa';

export default function Header({ setPage, user, cart, province }) {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-5 flex flex-wrap justify-between items-center shadow-lg">
      <h1
        className="text-3xl font-extrabold cursor-pointer"
        onClick={() => setPage('Home')}
      >
        FoodOrderNP
      </h1>
      <nav className="flex space-x-6">
        {['Home','Cart','About','Contact'].map(p => (
          <button key={p} onClick={() => setPage(p)} className="hover:text-yellow-300">
            {p}
          </button>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        {user ? <span>Hello, {user.name}</span> :
          <button onClick={()=>setPage('Login')} className="bg-white text-red-500 px-3 py-1 rounded">Login</button>
        }
        <button onClick={()=>setPage('Cart')} className="relative">
          <FaShoppingCart size={24} />
          {cart.length>0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>
      {province && (
        <div className="w-full text-center mt-2 font-semibold">
          Province: {province}
        </div>
      )}
    </header>
  );
}

export default function Header({ setPage, user, cart, submitOrder, province }) {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-5 flex flex-col md:flex-row md:justify-between items-center shadow-md">
      <h1
        className="text-3xl font-extrabold cursor-pointer mb-4 md:mb-0"
        onClick={() => setPage('Home')}
      >
        FoodOrderNP
      </h1>
      <nav className="flex space-x-8 text-lg font-semibold">
        {['Home', 'About', 'Contact'].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className="hover:text-yellow-300 transition"
          >
            {p}
          </button>
        ))}
      </nav>
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        {user ? (
          <span className="text-lg font-medium">Welcome, {user.name}</span>
        ) : (
          <button
            onClick={() => setPage('Login')}
            className="bg-white text-red-500 font-bold px-4 py-2 rounded shadow hover:bg-yellow-400 hover:text-white transition"
          >
            Login
          </button>
        )}
        {cart.length > 0 && (
          <button
            onClick={submitOrder}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow font-semibold transition"
          >
            Order Now ({cart.length})
          </button>
        )}
      </div>
      {province && (
        <div className="mt-3 md:mt-0 text-yellow-100 font-semibold">
          Province Selected: {province}
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Login from '../components/Login';


const PROVINCES = [
  'Province 1',
  'Province 2',
  'Bagmati',
  'Gandaki',
  'Province 5',
  'Karnali',
  'Sudurpashchim'
];

export default function App() {
  const [page, setPage] = useState('Home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [province, setProvince] = useState('');
  const [recs, setRecs] = useState([]);

  const addToCart = (item) => {
    if (!user) {
      setPage('Login'); // Show login first
    } else if (!province) {
      alert('Please select your province first!');
    } else {
      setCart([...cart, item]);
    }
  };

  const onLogin = (u) => {
    setUser(u);
    setPage('Home');
  };

  const onRegister = (u) => {
    setUser(u);
    setPage('Home');
  };

  const submitOrder = async () => {
    if (!province) {
      alert('Please select your province before ordering.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/order/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, items: cart, province }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.msg);
        setRecs(data.recs);
        setCart([]);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert('Error submitting order');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        setPage={setPage}
        user={user}
        cart={cart}
        submitOrder={submitOrder}
        province={province}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {page === 'Home' && (
          <Home
            addToCart={addToCart}
            province={province}
            setProvince={setProvince}
            provinces={PROVINCES}
            recs={recs}
          />
        )}
        {page === 'About' && <About />}
        {page === 'Contact' && <Contact />}
        {page === 'Login' && <Login onLogin={onLogin} onRegister={onRegister} />}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        &copy; 2025 FoodOrderNP. All rights reserved.
      </footer>
    </div>
  );
}

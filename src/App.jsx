import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Home from '../components/Home';
import Login from '../components/Login';
import About from '../components/About';
import Contact from '../components/Contact';
import Cart from '../components/Cart';
 

const PROVINCES = [
  'Province 1','Province 2','Bagmati','Gandaki','Province 5','Karnali','Sudurpashchim'
];

export default function App() {
  const [page, setPage] = useState('Home');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [province, setProvince] = useState('');
  const [recs, setRecs] = useState([]);


useEffect(() => {
  if (user) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        let prov = '';

        if (lat >= 26.7 && lat <= 28.3 && lng >= 87.0 && lng <= 88.3) {
          prov = 'Province 1';
        } else if (lat >= 26.4 && lat <= 27.0 && lng >= 85.0 && lng <= 86.9) {
          prov = 'Province 2';
        } else if (lat >= 27.3 && lat <= 28.5 && lng >= 85.0 && lng <= 85.8) {
          prov = 'Bagmati';
        } else if (lat >= 27.5 && lat <= 28.3 && lng >= 83.5 && lng <= 85.5) {
          prov = 'Gandaki';
        } else if (lat >= 27.5 && lat <= 28.0 && lng >= 82.5 && lng <= 83.8) {
          prov = 'Lumbini';
        } else if (lat >= 28.3 && lat <= 30.0 && lng >= 80.5 && lng <= 82.5) {
          prov = 'Karnali';
        } else if (lat >= 28.7 && lat <= 30.0 && lng >= 80.0 && lng <= 81.5) {
          prov = 'Sudurpashchim';
        } else {
          prov = 'Unknown';
        }

        setProvince(prov);
        setSelectedProvince(prov);
        alert(`Location allowed. Detected province: ${prov}`);
      },
      () => {
        setProvince('');
        setSelectedProvince('');
        alert('Location access denied. Please select province manually.');
      }
    );
  }
}, [user]);


  const addToCart = item => {
    if (!user) return setPage('Login');
    if (!province) return alert('📍 Please allow or select province first.');
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty+1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1, price: item.price }]);
    }
  };

  const updateQty = (id, delta) =>
    setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty+delta >=1 ? c.qty+delta : 1 } : c));

  const deleteItem = id => setCart(cart.filter(c => c.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((s,c) => s + c.qty * c.price, 0);

  const submitOrder = async () => {
    if (!user) return alert('Login required');
    if (!province) return alert('Province needed');
    if (cart.length === 0) return alert('Cart empty');
    const res = await fetch('http://localhost:5000/api/order/submit', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ user, items:cart, province })
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.msg);
      setRecs(data.recs);
      setPage('Cart');
    } else alert(data.msg);
  };

  const handlePayment = async () => {
    const res = await fetch('http://localhost:5000/api/order/pay', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ orderId:'temp123', amount: total, esewaRef:'ESEWA123' })
    });
    const data = await res.json();
    if (data.success) {
      alert(data.msg);
      clearCart();
      setPage('Home');
    } else alert('Payment error');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        setPage={setPage}
        user={user}
        cart={cart}
        province={province}
      />
      <main className="flex-grow container mx-auto p-6">
        {page === 'Home' && (
          <Home
            addToCart={addToCart}
            province={province}
            setProvince={setProvince}
            provinces={PROVINCES}
            recs={recs}
          />
        )}
        {page === 'Cart' && (
          <Cart
            cart={cart}
            total={total}
            updateQty={updateQty}
            deleteItem={deleteItem}
            clearCart={clearCart}
            submitOrder={submitOrder}
            handlePayment={handlePayment}
          />
        )}
        {page === 'Login' && <Login onLogin={setUser} onRegister={setUser} />}
        {page === 'About' && <About />}
        {page === 'Contact' && <Contact />}
      </main>
      <footer className="text-center py-4 text-gray-500">&copy; 2025 FoodOrderNP</footer>
    </div>
  );
}

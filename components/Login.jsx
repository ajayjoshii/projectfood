import { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^9\d{9}$/; // Nepali mobile: starts with 9 + 9 digits
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // min 6 chars, letters+digits

export default function Login({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const validateRegister = () => {
    if (!name) return 'Name is required.';
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (!phoneRegex.test(phone)) return 'Invalid Nepali phone number.';
    if (!passwordRegex.test(password)) return 'Password must be 6+ chars with letters and numbers.';
    return null;
  };

  const validateLogin = () => {
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (!password) return 'Password is required.';
    return null;
  };

  const submit = async () => {
    if (mode === 'register') {
      const err = validateRegister();
      if (err) return alert(err);

      // Call backend register API
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful');
        onRegister(data.user);
      } else alert(data.message || 'Registration failed');
    } else {
      const err = validateLogin();
      if (err) return alert(err);

      // Call backend login API
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login successful');
        onLogin(data.user);
      } else alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'login' ? 'Login' : 'Register'}</h2>
      {mode === 'register' && (
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full p-2 border rounded focus:ring-2"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-full p-2 border rounded focus:ring-2"
      />
      {mode === 'register' && (
        <input
          placeholder="Phone (e.g. 98xxxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4 w-full p-2 border rounded focus:ring-2"
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6 w-full p-2 border rounded focus:ring-2"
      />
      <button
        onClick={submit}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
      <p className="text-sm text-center">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setMode('register')}
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already registered?{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setMode('login')}
            >
              Login
            </span>
          </>
        )}
      </p>
    </div>
  );
}

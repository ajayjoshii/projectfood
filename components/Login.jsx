import { useState } from 'react';

export default function Login({ onLogin, onRegister }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const submit = () => {
    if (mode === 'register') {
      if (!name || !email || !phone) return alert('Fill all fields');
      onRegister({ name, email, phone });
      alert('Registration successful!');
    } else {
      if (!email || !phone) return alert('Fill all fields');
      onLogin({ name: name || 'User', email, phone });
      alert('Login successful!');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'login' ? 'Login' : 'Register'}</h2>
      {mode === 'register' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-6 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
      <button
        onClick={submit}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition"
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
      <p className="mt-4 text-center text-gray-600">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button className="text-red-500 underline" onClick={() => setMode('register')}>
              Register here
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button className="text-red-500 underline" onClick={() => setMode('login')}>
              Login here
            </button>
          </>
        )}
      </p>
    </div>
  );
}

import React, { useState } from "react";

const LoginRegisterModal = ({ onLoginSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [message, setMessage] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!loginEmail || !loginPassword) {
      setMessage("Please enter email and password");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful");
        onLoginSuccess(data.user);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!regName || !regEmail || !regAddress || !regPhone || !regPassword) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          address: regAddress,
          phone: regPhone,
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful, please login");
        setIsLogin(true);
        setRegName("");
        setRegEmail("");
        setRegAddress("");
        setRegPhone("");
        setRegPassword("");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-4 border-b-4 ${
              isLogin ? "border-blue-600 font-bold" : "border-transparent"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-4 border-b-4 ${
              !isLogin ? "border-blue-600 font-bold" : "border-transparent"
            }`}
          >
            Register
          </button>
        </div>

        {message && (
          <div className="mb-4 p-2 text-center bg-yellow-100 text-yellow-800 rounded">
            {message}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border rounded"
              value={regAddress}
              onChange={(e) => setRegAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterModal;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile-selection');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/US-en-20240226-popsignuptwelve-perspective_alpha_website_large.jpg')] bg-center bg-cover">
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="absolute top-8 left-8">
        <h1 className="text-red-600 font-bold text-4xl tracking-tighter">NETFLIX</h1>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 bg-black/75 p-16 rounded-md w-full max-w-[450px]"
      >
        <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>
        {error && <div className="bg-orange-700 text-white p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email or phone number"
            className="w-full bg-[#333] rounded px-5 py-4 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full bg-[#333] rounded px-5 py-4 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded font-bold hover:bg-red-700 transition-colors mt-6"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="remember" className="accent-gray-400" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <p className="hover:underline cursor-pointer">Need help?</p>
        </div>

        <div className="mt-12">
          <p className="text-gray-500">
            New to Netflix? <Link to="/signup" className="text-white hover:underline">Sign up now.</Link>
          </p>
          <p className="text-gray-400 text-xs mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <button className="text-blue-500 hover:underline">Learn more.</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

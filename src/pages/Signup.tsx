import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { motion } from 'motion/react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/profile-selection');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
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
        <h2 className="text-white text-3xl font-bold mb-8">Sign Up</h2>
        {error && <div className="bg-orange-700 text-white p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username"
            className="w-full bg-[#333] rounded px-5 py-4 text-white focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full bg-[#333] rounded px-5 py-4 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Add a password"
            className="w-full bg-[#333] rounded px-5 py-4 text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center gap-4 text-white text-sm">
            <span>Role:</span>
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} />
              User
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
              Admin
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 text-white py-4 rounded font-bold hover:bg-red-700 transition-colors mt-6"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-12 text-gray-500">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign in now.</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

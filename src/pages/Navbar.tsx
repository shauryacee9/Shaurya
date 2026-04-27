import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { Search, Bell, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const { user, selectedProfile, logout, token } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!token || !selectedProfile) return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-5 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-4 md:gap-10">
        <Link to="/" className="text-[#E50914] font-black text-2xl tracking-tighter md:text-3xl">NETFLIX</Link>
        <div className="hidden lg:flex items-center gap-5 text-sm font-light">
          <Link to="/" className="font-bold hover:text-white transition-colors">Home</Link>
          <Link to="/tvshows" className="text-gray-300 hover:text-white transition-colors">TV Shows</Link>
          <Link to="/movies" className="text-gray-300 hover:text-white transition-colors">Movies</Link>
          <Link to="/anime" className="text-gray-300 hover:text-white transition-colors">Anime</Link>
          <Link to="/new-popular" className="text-gray-300 hover:text-white transition-colors">New & Popular</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center">
          <motion.div 
            initial={false}
            animate={{ 
              width: isSearchOpen ? '250px' : '0px',
              opacity: isSearchOpen ? 1 : 0
            }}
            className="overflow-hidden flex items-center bg-black/60 border border-white/50 rounded"
          >
            <Search className="w-5 h-5 text-white ml-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Titles, people, genres"
              className="bg-transparent border-none outline-none text-white px-3 py-1.5 w-full text-sm placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
                } else {
                  navigate('/');
                }
              }}
              onBlur={() => {
                if (!searchQuery) setIsSearchOpen(false);
              }}
              autoFocus={isSearchOpen}
            />
          </motion.div>
          {!isSearchOpen && (
            <Search 
              className="w-5 h-5 text-gray-300 cursor-pointer hover:scale-110 transition-transform" 
              onClick={() => setIsSearchOpen(true)}
            />
          )}
        </div>
        <span className="hidden md:block text-xs text-gray-300 uppercase tracking-widest cursor-pointer">Kids</span>
        <Bell className="w-5 h-5 text-gray-300 cursor-pointer hover:scale-110 transition-transform" />
        
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={selectedProfile?.avatar} 
              alt="Profile" 
              className="w-8 h-8 rounded"
            />
            <motion.div 
              animate={{ rotate: showDropdown ? 180 : 0 }}
              className="border-t-4 border-x-4 border-x-transparent border-t-white w-0 h-0"
            />
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-4 w-48 bg-black/90 border border-gray-800 rounded shadow-xl py-2 overflow-hidden"
              >
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin-dashboard" 
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 text-sm transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Shield className="w-4 h-4" /> Admin Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile-selection" 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 text-sm transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <UserIcon className="w-4 h-4" /> Switch Profile
                </Link>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 text-sm transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign out of Netflix
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

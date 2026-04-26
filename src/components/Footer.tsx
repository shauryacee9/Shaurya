import React from 'react';
import { Youtube, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="px-4 md:px-12 py-10 bg-[#141414] border-t border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-8 text-[11px] text-gray-500 uppercase tracking-wider font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Audio Description</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help Centre</span>
            <span className="hover:text-white cursor-pointer transition-colors">Gift Cards</span>
            <span className="hover:text-white cursor-pointer transition-colors">Media Centre</span>
            <span className="hover:text-white cursor-pointer transition-colors underline underline-offset-4">Investor Relations</span>
          </div>
          <div className="text-[11px] text-gray-500 border border-gray-600 px-3 py-1 uppercase tracking-widest hover:text-white hover:border-white cursor-pointer transition-all">
            Service Code
          </div>
        </div>
        <p className="text-[10px] text-gray-600 font-light">&copy; 1997-2026 Netflix, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;

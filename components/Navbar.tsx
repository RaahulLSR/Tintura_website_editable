
import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  activeCategory: Category | 'ALL' | 'ADMIN' | string;
  onCategoryChange: (cat: Category | 'ALL' | 'ADMIN' | string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'ALL', value: 'ALL' },
    { label: 'CASUALS', value: 'CASUALS' },
    { label: 'SPORTZ', value: 'SPORTZ' },
    { label: 'LITE', value: 'LITE' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onCategoryChange('ALL')}>
            <div className="bg-tintura-black text-white px-3 py-1 font-display font-bold text-2xl tracking-tighter transform -skew-x-12">
              TINTURA
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-widest text-tintura-red leading-none">CASUALS</span>
              <span className="text-xs font-bold tracking-widest text-tintura-black leading-none">& SPORTZ</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onCategoryChange(item.value)}
                className={`font-display font-medium tracking-wide text-lg transition-colors duration-200 ${
                  activeCategory === item.value 
                    ? 'text-tintura-red border-b-2 border-tintura-red' 
                    : 'text-gray-600 hover:text-tintura-black'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => onCategoryChange('ADMIN')}
              className={`p-2 rounded-full transition-colors ${
                activeCategory === 'ADMIN' ? 'bg-tintura-red text-white' : 'text-gray-400 hover:text-tintura-black'
              }`}
              title="Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
           {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onCategoryChange(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 font-display font-bold text-xl uppercase ${
                   activeCategory === item.value ? 'text-tintura-red bg-red-50' : 'text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onCategoryChange('ADMIN');
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-3 font-display font-bold text-xl ${
                 activeCategory === 'ADMIN' ? 'text-tintura-red bg-red-50' : 'text-gray-800'
              }`}
            >
              ADMIN PANEL
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

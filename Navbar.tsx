
import React from 'react';
import { ViewMode } from '../types';
import { Home, Layers, PlusCircle, Heart, Palette } from 'lucide-react';

interface NavbarProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: ViewMode.EXPLORE, icon: Home, label: 'Explore' },
    { id: ViewMode.COLLECTIONS, icon: Layers, label: 'Collections' },
    { id: ViewMode.CREATE, icon: PlusCircle, label: 'Create', highlight: true },
    { id: ViewMode.FAVORITES, icon: Heart, label: 'Liked' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 md:top-0 md:bottom-0 md:left-0 md:right-auto md:w-20 md:flex-col md:border-t-0 md:border-r md:px-0 md:py-8 flex justify-between items-center transition-all">
      <div className="hidden md:flex flex-col items-center mb-12">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Palette className="text-white w-6 h-6" />
        </div>
      </div>

      <div className="flex w-full md:flex-col justify-between md:justify-center md:gap-10 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center transition-all ${
                item.highlight 
                  ? 'bg-gradient-to-tr from-purple-600 to-pink-600 p-3 rounded-full md:rounded-2xl -mt-8 md:mt-0 shadow-lg shadow-purple-500/20' 
                  : ''
              } ${isActive && !item.highlight ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              <Icon className={`${item.highlight ? 'text-white' : 'w-6 h-6'} ${isActive && !item.highlight ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
              {!item.highlight && <span className="text-[10px] mt-1 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block" />
    </nav>
  );
};

export default Navbar;


import React from 'react';
import { Wallpaper } from '../types';
import { Download, Heart, Sparkles } from 'lucide-react';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onClick: (w: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onClick }) => {
  return (
    <div 
      onClick={() => onClick(wallpaper)}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 transition-transform duration-300 active:scale-95"
    >
      <img 
        src={wallpaper.url} 
        alt={wallpaper.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-semibold text-sm truncate">{wallpaper.title}</h3>
        <p className="text-neutral-400 text-[10px] uppercase tracking-wider">{wallpaper.author}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
              <Heart className="w-4 h-4 text-white" />
            </button>
            <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
          {wallpaper.isAiGenerated && (
            <div className="bg-purple-500/80 backdrop-blur-md p-1 rounded-md">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Badges for persistent identification */}
      {wallpaper.isAiGenerated && (
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full group-hover:hidden">
          <Sparkles className="w-3 h-3 text-purple-400" />
        </div>
      )}
    </div>
  );
};

export default WallpaperCard;

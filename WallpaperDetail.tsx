
import React, { useState } from 'react';
import { Wallpaper } from '../types';
// Added Layers to the imports from lucide-react
import { X, Download, Heart, Smartphone, Info, Share2, Layers } from 'lucide-react';

interface WallpaperDetailProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

const WallpaperDetail: React.FC<WallpaperDetailProps> = ({ wallpaper, onClose }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center justify-center h-full overflow-y-auto pt-16 md:pt-0">
        
        {/* Main Image View */}
        <div className="relative w-full md:w-[450px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/5 group">
          <img 
            src={wallpaper.url} 
            alt={wallpaper.title}
            className="w-full h-full object-cover"
          />
          
          {/* Preview Simulator Overlay */}
          {isPreviewMode && (
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 pointer-events-none animate-in fade-in slide-in-from-top-4">
              <span className="text-7xl font-light text-white drop-shadow-xl">21:45</span>
              <span className="text-lg font-medium text-white/90 mt-2 drop-shadow-lg">Monday, October 24</span>
              
              <div className="mt-auto mb-16 flex gap-12">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm opacity-60" />
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full opacity-60" />
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/60 backdrop-blur-xl text-white rounded-full border border-white/10 flex items-center gap-2 hover:bg-black/80 transition-all shadow-xl group-hover:scale-105"
          >
            <Smartphone className="w-5 h-5" />
            {isPreviewMode ? 'Hide Preview' : 'Preview Screen'}
          </button>
        </div>

        {/* Info Sidebar */}
        <div className="flex-1 flex flex-col gap-8 w-full md:max-w-md">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white leading-tight">{wallpaper.title}</h2>
            <p className="text-xl text-neutral-400">Created by <span className="text-purple-400">{wallpaper.author}</span></p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-neutral-500 mb-1">
                <Info className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Resolution</span>
              </div>
              <p className="text-white font-medium">{wallpaper.resolution}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-neutral-500 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Category</span>
              </div>
              <p className="text-white font-medium">{wallpaper.category}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors shadow-xl active:scale-[0.98]">
              <Download className="w-6 h-6" />
              Download Wallpaper
            </button>
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                <Heart className="w-5 h-5" />
                Save to Liked
              </button>
              <button className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Vibrant', 'Retina', 'OLED Ready', 'HD', 'Artistic'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-neutral-400 rounded-full text-sm border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;

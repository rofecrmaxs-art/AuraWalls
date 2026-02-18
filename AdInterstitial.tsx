
import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface AdInterstitialProps {
  onClose: () => void;
}

const AdInterstitial: React.FC<AdInterstitialProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute top-6 right-6">
        {timeLeft > 0 ? (
          <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm">
            {timeLeft}
          </div>
        ) : (
          <button 
            onClick={onClose}
            className="p-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 px-4 font-bold"
          >
            <X className="w-5 h-5" />
            Close Ad
          </button>
        )}
      </div>

      <div className="w-full max-w-lg aspect-[9/16] bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center p-12 text-center bg-gradient-to-b from-purple-500/10 to-transparent">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-2xl mx-auto flex items-center justify-center">
              <ExternalLink className="text-purple-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Interstital Ad Content</h2>
            <p className="text-neutral-400">This simulates a full-screen ad experience before your high-quality wallpaper is ready.</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border-t border-white/10">
          <button className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl">Learn More</button>
        </div>
      </div>
      
      <p className="mt-8 text-[10px] text-neutral-600 uppercase tracking-[0.2em]">Premium Advertisement Content</p>
    </div>
  );
};

export default AdInterstitial;

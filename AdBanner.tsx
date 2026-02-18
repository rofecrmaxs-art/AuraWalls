
import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="w-full bg-neutral-900/50 border-t border-white/5 py-2 flex flex-col items-center justify-center overflow-hidden">
      <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Advertisement</span>
      <div className="w-full max-w-[728px] h-[90px] bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/10 group">
        {/* Aqui entraria o script: <ins class="adsbygoogle" ... /> */}
        <p className="text-neutral-500 text-xs italic group-hover:text-neutral-400 transition-colors">
          Google AdSense Banner Area
        </p>
      </div>
    </div>
  );
};

export default AdBanner;

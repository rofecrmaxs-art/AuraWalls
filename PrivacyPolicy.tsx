
import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl rounded-[2rem] max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-purple-400 w-5 h-5" />
            <h2 className="text-xl font-bold">Privacy Policy</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
        </div>
        <div className="p-8 overflow-y-auto text-neutral-400 space-y-4 text-sm leading-relaxed">
          <p className="text-white font-medium">AuraWalls is committed to your privacy.</p>
          <h3 className="text-white font-semibold">1. Data Collection</h3>
          <p>We do not collect personal identifiable information. Image generation prompts are processed via Google Gemini API to create your wallpapers.</p>
          <h3 className="text-white font-semibold">2. Image Usage</h3>
          <p>Wallpapers generated are for personal use. We do not store your generated images on our servers; they exist locally in your session or gallery once downloaded.</p>
          <h3 className="text-white font-semibold">3. AI Content</h3>
          <p>This app uses Artificial Intelligence. Content generated should comply with safety guidelines and not be used for illegal purposes.</p>
          <h3 className="text-white font-semibold">4. Permissions</h3>
          <p>The app requires storage access only to save downloaded wallpapers to your device.</p>
          <p className="pt-4 text-[10px] opacity-50">Last updated: October 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

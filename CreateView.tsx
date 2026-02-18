
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Sparkles, Wand2, Loader2, ArrowRight, RefreshCcw, Image as ImageIcon } from 'lucide-react';

interface CreateViewProps {
  onAddGeneratedWallpaper: (url: string, prompt: string) => void;
}

const CreateView: React.FC<CreateViewProps> = ({ onAddGeneratedWallpaper }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const url = await geminiService.generateWallpaper(prompt);
      setGeneratedImage(url);
    } catch (error) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getSuggestions = async () => {
    if (!prompt.trim()) return;
    setIsSuggesting(true);
    try {
      const res = await geminiService.suggestPrompts(prompt);
      setSuggestions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestionClick = (p: string) => {
    setPrompt(p);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400 font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Powered by Gemini 2.5
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Create your Aura</h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto">Turn your imagination into a high-resolution wallpaper in seconds.</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="bg-white/5 p-4 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10 group-hover:bg-purple-500/20 transition-all duration-700" />
          
          <div className="relative">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block">Your Prompt</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A cyberpunk forest with glowing purple mushrooms and neon rain..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all resize-none h-32 text-lg"
                />
                <button 
                  onClick={getSuggestions}
                  disabled={isSuggesting || !prompt}
                  className="absolute bottom-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
                  title="Improve prompt with AI"
                >
                  {isSuggesting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 text-purple-400" />}
                </button>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="md:w-32 py-4 bg-white text-black font-black rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isGenerating ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    <span className="text-xs uppercase">Create</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 mb-3 block">Enhanced Suggestions</label>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-4 py-2 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/30 border border-white/5 rounded-full text-xs text-neutral-400 hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center min-h-[400px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
              <div className="w-[300px] aspect-[9/16] bg-neutral-900 rounded-3xl flex items-center justify-center border border-white/5">
                <Loader2 className="w-12 h-12 text-neutral-700 animate-spin" />
              </div>
              <p className="text-neutral-500 text-sm font-medium">Brewing your artistic vision...</p>
            </div>
          ) : generatedImage ? (
            <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-[300px] md:w-[350px] aspect-[9/16] bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-500/20 border-4 border-white/10 relative group">
                <img src={generatedImage} alt="Generated Art" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => onAddGeneratedWallpaper(generatedImage, prompt)}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Add to Gallery
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleGenerate}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full flex items-center gap-2 transition-all"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-600 border-2 border-dashed border-white/5 rounded-[2.5rem] w-full max-w-sm px-10 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-neutral-400 font-medium">No wallpaper yet</p>
              <p className="text-sm mt-2 opacity-60">Describe what you want and let Aura AI do the magic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateView;

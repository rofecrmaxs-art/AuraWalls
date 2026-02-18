
import React, { useState, useMemo } from 'react';
import { ViewMode, Wallpaper, Category } from './types';
import { MOCK_WALLPAPERS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import WallpaperCard from './components/WallpaperCard';
import WallpaperDetail from './components/WallpaperDetail';
import CreateView from './components/CreateView';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdBanner from './components/AdBanner';
import AdInterstitial from './components/AdInterstitial';
import { Search, SlidersHorizontal, Sparkles, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.EXPLORE);
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(MOCK_WALLPAPERS);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter(w => {
      const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || w.category === activeCategory;
      const matchesFavorites = activeView !== ViewMode.FAVORITES; 
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [wallpapers, searchQuery, activeCategory, activeView]);

  const triggerAdAndAction = (action: () => void) => {
    // 50% chance of showing an ad to not annoy users too much
    if (Math.random() > 0.5) {
      setPendingAction(() => action);
      setShowInterstitial(true);
    } else {
      action();
    }
  };

  const addGeneratedWallpaper = (url: string, prompt: string) => {
    const action = () => {
      const newWall: Wallpaper = {
        id: Date.now().toString(),
        url: url,
        title: prompt.slice(0, 20) + (prompt.length > 20 ? '...' : ''),
        author: 'Aura AI',
        category: 'Abstract',
        isAiGenerated: true,
        resolution: '2160x3840'
      };
      setWallpapers(prev => [newWall, ...prev]);
      setActiveView(ViewMode.EXPLORE);
      setSelectedWallpaper(newWall);
    };
    
    triggerAdAndAction(action);
  };

  const closeAd = () => {
    setShowInterstitial(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row select-none">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 pb-32 md:pb-8 md:pl-20">
        
        {activeView === ViewMode.CREATE ? (
          <CreateView onAddGeneratedWallpaper={addGeneratedWallpaper} />
        ) : (
          <div className="max-w-[1400px] mx-auto px-6 pt-8 md:pt-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                  {activeView === ViewMode.EXPLORE ? 'Explore' : 
                   activeView === ViewMode.COLLECTIONS ? 'Collections' : 'Favorites'}
                </h1>
                <p className="text-neutral-500 text-lg">Curated premium backdrops.</p>
              </div>

              <div className="relative group flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search aesthetics..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
              <button onClick={() => setActiveCategory('All')} className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border ${activeCategory === 'All' ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/5'}`}>All</button>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/5'}`}>{cat}</button>
              ))}
            </div>

            {filteredWallpapers.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredWallpapers.map(wall => (
                  <WallpaperCard key={wall.id} wallpaper={wall} onClick={setSelectedWallpaper} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center text-neutral-500 font-medium">No wallpapers found.</div>
            )}

            <footer className="mt-20 py-10 border-t border-white/5 flex flex-col items-center gap-4">
              <p className="text-neutral-600 text-sm">© 2024 AuraWalls AI Studio</p>
              <button onClick={() => setShowPrivacy(true)} className="flex items-center gap-2 text-neutral-500 hover:text-white text-xs transition-colors">
                <Shield className="w-3 h-3" />
                Privacy Policy
              </button>
            </footer>
          </div>
        )}
        
        {/* Banner Ad always at the bottom of the feed */}
        {activeView === ViewMode.EXPLORE && <div className="mt-8 px-6"><AdBanner /></div>}
      </main>

      {selectedWallpaper && <WallpaperDetail wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showInterstitial && <AdInterstitial onClose={closeAd} />}
    </div>
  );
};

export default App;

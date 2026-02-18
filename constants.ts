
import { Wallpaper, Category } from './types';

export const CATEGORIES: Category[] = [
  'Minimal', 'Abstract', 'Nature', 'Sci-Fi', 'Architecture', 'Geometric', 'Amoled'
];

export const MOCK_WALLPAPERS: Wallpaper[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
    title: 'Flowing Waves',
    author: 'Aura Studio',
    category: 'Abstract',
    isAiGenerated: false,
    resolution: '2160x3840'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000',
    title: 'Gradient Horizon',
    author: 'Elena Vance',
    category: 'Minimal',
    isAiGenerated: false,
    resolution: '1440x3120'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1000',
    title: 'Mist Mountain',
    author: 'Jack Frost',
    category: 'Nature',
    isAiGenerated: false,
    resolution: '2160x3840'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000',
    title: 'Cyber Circuit',
    author: 'Neo G',
    category: 'Sci-Fi',
    isAiGenerated: true,
    resolution: '1080x2400'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1449156059431-787c5d7139b9?auto=format&fit=crop&q=80&w=1000',
    title: 'Urban Geometry',
    author: 'Arch Visuals',
    category: 'Architecture',
    isAiGenerated: false,
    resolution: '2160x3840'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000',
    title: 'Deep Void',
    author: 'Amoled King',
    category: 'Amoled',
    isAiGenerated: false,
    resolution: '1440x3120'
  }
];

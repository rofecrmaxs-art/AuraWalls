
export interface Wallpaper {
  id: string;
  url: string;
  title: string;
  author: string;
  category: string;
  isAiGenerated: boolean;
  resolution: string;
}

export enum ViewMode {
  EXPLORE = 'explore',
  COLLECTIONS = 'collections',
  CREATE = 'create',
  FAVORITES = 'favorites'
}

export type Category = 'Minimal' | 'Abstract' | 'Nature' | 'Sci-Fi' | 'Architecture' | 'Geometric' | 'Amoled';

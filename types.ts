

export enum Category {
  CASUALS = 'CASUALS',
  SPORTZ = 'SPORTZ',
  LITE = 'LITE',
  BOYS = 'BOYS'
}

export type GarmentType = 'MENS' | 'BOYS';

export type IconType = 'shield' | 'drop' | 'wind' | 'sun' | 'feather' | 'stretch' | 'bacteria' | 'water' | 'smell' | 'spark' | 'atom' | 'iron' | 'diamond' | 'fabric' | 'layers';

export interface Feature {
  id: string;
  name: string;
  iconType: IconType;
  description: string;
}

export interface Product {
  id: string;
  style_code: string;
  name: string;
  category: string;
  garment_type: string;
  description: string;
  features: string[]; 
  image_url?: string; // Kept for legacy compatibility
  // Fix: Made image_urls optional to accommodate products defined in constants.ts that only have image_url
  image_urls?: string[]; // New: support for multiple images
  color?: string;
  available_sizes?: string;
  fabric_type?: string;
  isNew?: boolean;
  created_at?: string;
}

export enum Category {
  CASUALS = 'CASUALS',
  SPORTZ = 'SPORTZ',
  LITE = 'LITE',
  // Fix: Added BOYS category to match usage in constants.ts
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
  category: string; // Changed to string to support dynamic options
  garment_type: string; // Changed to string to support dynamic options
  description: string;
  features: string[]; 
  image_url: string;
  color?: string;
  available_sizes?: string;
  fabric_type?: string;
  isNew?: boolean;
  created_at?: string;
}
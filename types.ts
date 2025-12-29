
export enum Category {
  CASUALS = 'CASUALS',
  SPORTZ = 'SPORTZ',
  BOYS = 'BOYS',
  LITE = 'LITE'
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
  category: Category;
  garment_type: GarmentType;
  description: string;
  features: string[]; // IDs or dynamic values
  image_url: string;
  color?: string;
  isNew?: boolean;
}

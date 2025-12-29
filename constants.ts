import { Category, Product, Feature } from './types';

// --- SUPABASE CONFIGURATION ---
// Project ID extracted from: db.xxwlkcpxoojpejiwyzzv.supabase.co
const SUPABASE_PROJECT_URL = "https://xxwlkcpxoojpejiwyzzv.supabase.co"; 

// Storage Bucket paths
// UPDATED: Bucket name is 'Products' (Capital P) based on user verification.
// Structure: Products/casuals/01.webp, Products/lite/01.webp
const IMG_BASE_CASUALS = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/Products/casuals/`;
const IMG_BASE_LITE = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/Products/lite/`;

// Cache buster to force browser to re-fetch images if they were previously cached as 404 or old format
const VER = "?v=2";

export const FEATURES: Record<string, Feature> = {
  'biowash': { id: 'biowash', name: 'Special BioWash', iconType: 'drop', description: 'Enzyme treated for extra softness and longevity.' },
  'dryfit': { id: 'dryfit', name: 'Dry Fit', iconType: 'wind', description: 'Keeps you dry and comfortable.' },
  'supershield': { id: 'supershield', name: 'Super Shield', iconType: 'shield', description: 'Anti-Microbial protection.' },
  'superwick': { id: 'superwick', name: 'Super Wick', iconType: 'drop', description: 'Superior moisture management.' },
  'coolrush': { id: 'coolrush', name: 'Cool Rush', iconType: 'wind', description: 'Breathable fabric technology.' },
  'stretch': { id: 'stretch', name: 'Stretch Fabric', iconType: 'stretch', description: 'Freedom of movement.' },
  'softfeel': { id: 'softfeel', name: 'Soft Feel', iconType: 'feather', description: 'Extra soft fabric for enhanced touch.' },
  'uv': { id: 'uv', name: 'UV Protection', iconType: 'sun', description: 'Protects skin from harmful rays.' },
  'antistatic': { id: 'antistatic', name: 'Anti Static', iconType: 'spark', description: 'Reduces static cling.' },
  'antiodour': { id: 'antiodour', name: 'Anti Odour', iconType: 'smell', description: 'Prevents odour build up.' },
  'waterrepellant': { id: 'waterrepellant', name: 'Water Repellant', iconType: 'water', description: 'Resists water penetration.' },
  'graphene': { id: 'graphene', name: 'Graphene Finish', iconType: 'atom', description: 'Advanced material finish.' },
  'wrinklefree': { id: 'wrinklefree', name: 'Wrinkle Free', iconType: 'iron', description: 'Resists creasing.' },
  'staydry': { id: 'staydry', name: 'Stay Dry', iconType: 'drop', description: 'Remains dry during activity.' },
  'stayfresh': { id: 'stayfresh', name: 'Stay Fresh', iconType: 'diamond', description: 'Long lasting freshness.' },
  'denimfabric': { id: 'denimfabric', name: 'Denim Fabric', iconType: 'fabric', description: 'Durable denim construction.' },
  'frenchterry': { id: 'frenchterry', name: 'French Terry', iconType: 'fabric', description: 'Soft french terry fabric.' },
  'nspoly': { id: 'nspoly', name: 'NS Poly Fabric', iconType: 'layers', description: 'Durable non-stretch polyester.' },
  'micropoly': { id: 'micropoly', name: 'Micro Poly', iconType: 'fabric', description: 'Fine textured polyester for comfort.' },
  'lycra': { id: 'lycra', name: '4-Way Lycra', iconType: 'stretch', description: 'Premium stretch for maximum flexibility.' },
};

export const PRODUCTS: Product[] = [
  // --- CASUALS & SPORTZ ---
  {
    id: '1004',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1004',
    name: 'T-Shirts Printed',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Single Jersey Fabric. Bio Wash Premium Quality. "Ride" & "Future" prints.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}01.webp${VER}`,
    color: 'Red / Black / Blue'
  },
  {
    id: '1005',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1005',
    name: 'T-Shirts Plain',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Single Jersey Fabric. Bio Wash Premium Quality. Essential solids.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}02.webp${VER}`,
    color: 'Maroon / Black / Blue'
  },
  {
    id: '1009',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1009',
    name: 'Collar T-Shirt',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Pique Fabric. Bio Wash Premium Quality. Classic Polo.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}03.webp${VER}`,
    color: 'Maroon / Black / Yellow / Red'
  },
  {
    id: '1010',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1010',
    name: 'Urban Knit Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric. With Zipper.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_CASUALS}04.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1011',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1011',
    name: 'Fashion Knit Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric. With Piping & Zip.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}05.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1012',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1012',
    name: 'Classic Knit Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric. With Zip Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}06.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1013',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1013',
    name: 'Joggers Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric. Trendy New Arrival.',
    features: ['frenchterry', 'biowash'],
    image_url: `${IMG_BASE_CASUALS}07.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1014',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1014',
    name: 'Urban Track Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric With Zip.',
    features: ['frenchterry', 'biowash'],
    image_url: `${IMG_BASE_CASUALS}08.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1015',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1015',
    name: 'Fashion Track Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey fabric. With Piping & Zip.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}09.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1016',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1016',
    name: 'Joggers Pant with Print',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric. With Side Print.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}10.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1017',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1017',
    name: 'Cut & Sew Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric. With Zip.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}11.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '1018',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1018',
    name: 'Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear - Dry Fit. Genuine Tintura Comfort.',
    features: ['dryfit', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}12.webp${VER}`,
    color: 'Grey / Black / Navy'
  },
  {
    id: '1019',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1019',
    name: 'Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear - Dry Fit. Genuine Tintura Comfort.',
    features: ['dryfit', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}13.webp${VER}`,
    color: 'Grey / Black / Navy'
  },
  {
    id: '1022',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1022',
    name: 'Tank Top',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Tank Top. "Let\'s Go Play" prints.',
    features: ['dryfit'],
    image_url: `${IMG_BASE_CASUALS}14.webp${VER}`,
    color: 'Red / Black / Navy / Blue'
  },
  {
    id: '1023',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1023',
    name: 'Striped Collar T-shirt',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Pique Fabric Bio Wash Premium Quality.',
    features: ['biowash', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}15.webp${VER}`,
    color: 'Black / Red / Navy / Cool Blue'
  },
  {
    id: '1024',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1024',
    name: 'Men’s Polo T-shirts',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. Standout Style.',
    features: ['coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}16.webp${VER}`,
    color: 'Black / Red / Navy / Cool Blue / Grey'
  },
  {
    id: '1025',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1025',
    name: 'Men’s T-shirts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. Research and Develop.',
    features: ['coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}17.webp${VER}`,
    color: 'Grey Melange / Black / Navy'
  },
  {
    id: '1026',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1026',
    name: 'Men’s T-shirts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. Top Trend.',
    features: ['coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}18.webp${VER}`,
    color: 'Grey Melange / Black / Navy'
  },
  {
    id: '1027',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1027',
    name: 'Men’s Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. 4 Way Lycra Casuals.',
    features: ['coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh', 'lycra'],
    image_url: `${IMG_BASE_CASUALS}19.webp${VER}`,
    color: 'Grey / Black / Navy / Carbon'
  },
  {
    id: '1028',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1028',
    name: 'AOP Men’s T-shirt',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Military Print Dry Fit Polyester Fabric. For Everyone.',
    features: ['dryfit', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}20.webp${VER}`,
    color: 'Black / Red / Navy / Cool Blue'
  },
  {
    id: '1029',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1029',
    name: 'Men’s Denim Shorts',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Jeans Fabric. Cool Rush Technology.',
    features: ['denimfabric', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}21.webp${VER}`,
    color: 'Grey / Black / Navy / Carbon'
  },
  {
    id: '1030',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1030',
    name: 'Men’s Denim Pant',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Jeans Fabric. Comfortable fit.',
    features: ['denimfabric', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}22.webp${VER}`,
    color: 'Grey / Black / Navy / Carbon'
  },
  {
    id: '1031',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1031',
    name: 'Men’s Dry Fit Shorts',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. Never Quit.',
    features: ['dryfit', 'coolrush', 'softfeel', 'wrinklefree', 'antistatic', 'staydry', 'stayfresh'],
    image_url: `${IMG_BASE_CASUALS}23.webp${VER}`,
    color: 'Grey / Black / Navy / Carbon'
  },
  {
    id: '1032',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1032',
    name: 'Men’s T-shirts',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Single Jersey Bio Wash Premium Quality. Textured pattern.',
    features: ['biowash'],
    image_url: `${IMG_BASE_CASUALS}24.webp${VER}`,
    color: 'Brown / Grey / Olive / Yellow'
  },
  {
    id: '1033',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1033',
    name: 'Men’s Micro Poly Pant',
    category: Category.SPORTZ,
    garment_type: 'MENS',
    description: 'Premium Quality Sports Wear. Shape Your Body.',
    features: ['micropoly', 'stretch'],
    image_url: `${IMG_BASE_CASUALS}25.webp${VER}`,
    color: 'Grey / Black / Navy / Carbon / Airforce'
  },
  {
    id: '1034',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1034',
    name: 'Men’s Cargo Pant',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Knitted Cool Polyester Premium 4 way Lycra Fabric. Comfortable All Day Long.',
    features: ['lycra', 'coolrush'],
    image_url: `${IMG_BASE_CASUALS}26.webp${VER}`,
    color: 'Navy / Black / Olive / Blue / Beige'
  },
  {
    id: '1035',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '1035',
    name: 'Men’s Cargo Shorts',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'Knitted Cool Polyester Premium 4 way Lycra Fabric.',
    features: ['lycra', 'coolrush'],
    image_url: `${IMG_BASE_CASUALS}27.webp${VER}`,
    color: 'Navy / Black / Olive / Blue / Beige'
  },
  {
    id: '510',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '510',
    name: 'Men’s Slim Fit Shorts',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: '100% Polyester Stretch Printed Fabric. Camo Print.',
    features: ['stretch', 'dryfit'],
    image_url: `${IMG_BASE_CASUALS}28.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '511',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '511',
    name: 'Men’s Slim Fit Pant',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: '100% Polyester Stretch Printed Fabric. Camo Print.',
    features: ['stretch', 'dryfit'],
    image_url: `${IMG_BASE_CASUALS}29.webp${VER}`,
    color: 'Anthra / Black / Navy / Charcoal'
  },
  {
    id: '514',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '514',
    name: 'Men’s Cargo Pant',
    category: Category.CASUALS,
    garment_type: 'MENS',
    description: 'NS Poly Fabric. Comfortable All The Long.',
    features: ['nspoly'],
    image_url: `${IMG_BASE_CASUALS}30.webp${VER}`,
    color: 'Navy / Black / Olive / Blue / Beige'
  },
  {
    id: '128',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '128',
    name: 'Boy’s Cargo Pant',
    category: Category.BOYS,
    garment_type: 'BOYS',
    description: 'NS Poly Fabric.',
    features: ['nspoly'],
    image_url: `${IMG_BASE_CASUALS}31.webp${VER}`,
    color: 'Navy / Black / Olive / Blue / Beige'
  },
  {
    id: '901',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '901',
    name: 'Boy’s Joggers Pant',
    category: Category.BOYS,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric. Grey Melange.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_CASUALS}32.webp${VER}`,
    color: 'Grey / Black / Navy'
  },
  {
    id: '902',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '902',
    name: 'Boy’s Track Pant',
    category: Category.BOYS,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_CASUALS}33.webp${VER}`,
    color: 'Grey / Black / Navy'
  },
  {
    id: '903',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '903',
    name: 'Boy’s Shorts',
    category: Category.BOYS,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_CASUALS}34.webp${VER}`,
    color: 'Grey / Black / Navy'
  },
  {
    id: '904',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '904',
    name: 'Boy’s Cargo Pant',
    category: Category.BOYS,
    garment_type: 'BOYS',
    description: 'Polyester Fabric.',
    features: ['dryfit'],
    image_url: `${IMG_BASE_CASUALS}35.webp${VER}`,
    color: 'Navy / Black / Olive / Blue / Beige'
  },

  // --- TINTURA LITE ---
  {
    id: 'lite-101',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '101',
    name: 'Boy’s Joggers',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric. Comfortable everyday wear.',
    features: ['frenchterry', 'softfeel'],
    image_url: `${IMG_BASE_LITE}01.webp${VER}`,
    color: 'Black / Navy / Melange'
  },
  {
    id: 'lite-102',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '102',
    name: 'Boy’s Cut & Sew Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric. Stylish cut and sew design.',
    features: ['biowash', 'softfeel'],
    image_url: `${IMG_BASE_LITE}02.webp${VER}`,
    color: 'Black / Navy / Melange'
  },
  {
    id: 'lite-103',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '103',
    name: 'Boy’s Cross Pocket Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric with Cross Pocket.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}03.webp${VER}`,
    color: 'Black / Navy / Melange'
  },
  {
    id: 'lite-104',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '104',
    name: 'Boy’s Cross Pocket Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric with Cross Pocket.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}04.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-105',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '105',
    name: 'Boy’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric with Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}05.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-108',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '108',
    name: 'Boy’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric with Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}06.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-109',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '109',
    name: 'Boy’s Cut & Sew Pants',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}07.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-110',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '110',
    name: 'Boy’s Dry Fit Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric. Sporty look.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}08.webp${VER}`,
    color: 'Blue / Black / Olive'
  },
  {
    id: 'lite-112',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '112',
    name: 'Boy’s Dry Fit Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric. Sport Season.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}09.webp${VER}`,
    color: 'Blue / Black / Olive'
  },
  {
    id: 'lite-113',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '113',
    name: 'Boy’s Piping Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}10.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-114',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '114',
    name: 'Boy’s Piping Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}11.webp${VER}`,
    color: 'Black / Navy / Brown / Grey'
  },
  {
    id: 'lite-115',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '115',
    name: 'Boy’s Shorts with Print',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric. "Limit Power" Print.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}12.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-117',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '117',
    name: 'Boy’s Pant with Print',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton Single Jersey Fabric. Special Edition.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}13.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-119',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '119',
    name: 'Boy’s Polyester Short',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Dry Fit Polyester Fabric with Piping.',
    features: ['dryfit'],
    image_url: `${IMG_BASE_LITE}14.webp${VER}`,
    color: 'Black / Navy / Grey'
  },
  {
    id: 'lite-120',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '120',
    name: 'Boy’s Polyester Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Dry Fit Polyester Fabric with Piping.',
    features: ['dryfit'],
    image_url: `${IMG_BASE_LITE}15.webp${VER}`,
    color: 'Black / Navy'
  },
  {
    id: 'lite-121',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '121',
    name: 'Boy’s Short with AOP',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: '100% Polyester Stretch Printed Fabric.',
    features: ['stretch', 'dryfit'],
    image_url: `${IMG_BASE_LITE}16.webp${VER}`,
    color: 'Camo'
  },
  {
    id: 'lite-122',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '122',
    name: 'Boy’s Pant with AOP',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: '100% Polyester Stretch Printed Fabric.',
    features: ['stretch', 'dryfit'],
    image_url: `${IMG_BASE_LITE}17.webp${VER}`,
    color: 'Camo'
  },
  {
    id: 'lite-123',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '123',
    name: 'Boy’s Joggers with Print',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}18.webp${VER}`,
    color: 'Black / Navy / Brown'
  },
  {
    id: 'lite-124',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '124',
    name: 'Boy’s Denim Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Jeans Fabric. Performance in every step.',
    features: ['denimfabric'],
    image_url: `${IMG_BASE_LITE}19.webp${VER}`,
    color: 'Blue / Black / Grey'
  },
  {
    id: 'lite-125',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '125',
    name: 'Boy’s Denim Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Jeans Fabric. Performance in motion.',
    features: ['denimfabric'],
    image_url: `${IMG_BASE_LITE}20.webp${VER}`,
    color: 'Blue / Black / Grey'
  },
  {
    id: 'lite-126',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '126',
    name: 'Boy’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}21.webp${VER}`,
    color: 'Blue / Black / Grey'
  },
  {
    id: 'lite-127',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '127',
    name: 'Boy’s Joggers with Zip',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric. Hi Performance Blend.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}22.webp${VER}`,
    color: 'Black / Navy / Blue'
  },
  {
    id: 'lite-128',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '128',
    name: 'Boy’s Cargo Pants',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric with Zipper.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}23.webp${VER}`,
    color: 'Black / Grey / Beige'
  },
  {
    id: 'lite-129',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '129',
    name: 'Boy’s 3/4 Piping Pant',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Dry Fit Polyester Fabric.',
    features: ['dryfit'],
    image_url: `${IMG_BASE_LITE}24.webp${VER}`,
    color: 'Black / Grey / White'
  },
  {
    id: 'lite-130',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '130',
    name: 'Boy’s Fancy Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Micro Poly Fabric. Trendy Comfort.',
    features: ['micropoly'],
    image_url: `${IMG_BASE_LITE}25.webp${VER}`,
    color: 'Prints'
  },
  {
    id: 'lite-131',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '131',
    name: 'Boy’s 3/4 Cotton Shorts',
    category: Category.LITE,
    garment_type: 'BOYS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}26.webp${VER}`,
    color: 'Black / Grey'
  },
  {
    id: 'lite-501',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '501',
    name: 'Men’s Joggers',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}27.webp${VER}`,
    color: 'Black / Grey / Blue'
  },
  {
    id: 'lite-502',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '502',
    name: 'Men’s Cut & Sew Pant',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric with Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}28.webp${VER}`,
    color: 'Black / Grey / Blue'
  },
  {
    id: 'lite-504',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '504',
    name: 'Men’s Piping Pant',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric with Piping.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}29.webp${VER}`,
    color: 'Black / Grey / Blue'
  },
  {
    id: 'lite-505',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '505',
    name: 'Men’s Piping Shorts',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric with Piping.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}30.webp${VER}`,
    color: 'Black / Grey / Blue'
  },
  {
    id: 'lite-506',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '506',
    name: 'Men’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric with Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}31.webp${VER}`,
    color: 'Black / Grey / Blue'
  },
  {
    id: 'lite-507',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '507',
    name: 'Men’s Cut & Sew Pant',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}32.webp${VER}`,
    color: 'Black / Grey'
  },
  {
    id: 'lite-508',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '508',
    name: 'Men’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric with Cut & Sew.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}33.webp${VER}`,
    color: 'Black / Blue'
  },
  {
    id: 'lite-509',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '509',
    name: 'Men’s Slim Fit Pants',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}34.webp${VER}`,
    color: 'Black / Blue / Grey'
  },
  {
    id: 'lite-512',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '512',
    name: 'Men’s Cut & Sew Shorts',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}35.webp${VER}`,
    color: 'Black / Grey'
  },
  {
    id: 'lite-513',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '513',
    name: 'Men’s 3/4 Piping Pants',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton Single Jersey Fabric.',
    features: ['biowash'],
    image_url: `${IMG_BASE_LITE}36.webp${VER}`,
    color: 'Black / Blue / Teal'
  },
  {
    id: 'lite-514',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '514',
    name: 'Men’s Cargo Pants',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Rich Cotton French Terry Fabric. All the long.',
    features: ['frenchterry'],
    image_url: `${IMG_BASE_LITE}37.webp${VER}`,
    color: 'Beige / Black / Blue'
  },
  {
    id: 'lite-515',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '515',
    name: 'Men’s Micro Poly Shorts',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Dry Fit Polyester Fabric. Game On.',
    features: ['dryfit', 'micropoly'],
    image_url: `${IMG_BASE_LITE}38.webp${VER}`,
    color: 'Grey / Blue'
  },
  {
    id: 'lite-516',
    // Fix: Removed invalid imageUrl property and ensured image_url is used.
    style_code: '516',
    name: 'Men’s Micro Poly Pant',
    category: Category.LITE,
    garment_type: 'MENS',
    description: 'Dry Fit Polyester Fabric. Trendy Track Pant.',
    features: ['dryfit', 'micropoly'],
    image_url: `${IMG_BASE_LITE}39.webp${VER}`,
    color: 'Grey / Blue'
  },
];
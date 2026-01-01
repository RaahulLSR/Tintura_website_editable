
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Zap, Droplets, Shield, ImageIcon } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Use the first image from image_urls, or fallback to legacy image_url
  const displayImage = (product.image_urls && product.image_urls.length > 0) 
    ? product.image_urls[0] 
    : product.image_url;

  const imageCount = product.image_urls?.length || 0;

  const techBadge = (type: string) => {
      if (type === 'dryfit') return <div className="bg-blue-600 text-white p-1 rounded-sm" title="Dry Fit"><Zap className="w-3 h-3" /></div>;
      if (type === 'biowash') return <div className="bg-green-600 text-white p-1 rounded-sm" title="Bio Wash"><Droplets className="w-3 h-3" /></div>;
      if (type === 'supershield') return <div className="bg-gray-800 text-white p-1 rounded-sm" title="Super Shield"><Shield className="w-3 h-3" /></div>;
      return null;
  };

  return (
    <div 
      className="group relative bg-white cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 z-10 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%' }}></div>
          </div>
        )}

        {displayImage ? (
          <img 
            src={displayImage} 
            alt={product.name}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-[10px] uppercase font-bold">No Preview</span>
          </div>
        )}
        
        {/* BIG STYLE CODE OVERLAY */}
        <div className="absolute top-0 right-0 z-20 bg-tintura-black text-white px-4 py-2 font-display font-bold text-2xl tracking-tighter opacity-90 group-hover:bg-tintura-red transition-colors duration-300">
          #{product.style_code}
        </div>

        {imageCount > 1 && (
          <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 flex items-center gap-1 shadow-sm">
            <ImageIcon className="w-3 h-3" />
            {imageCount} VIEWS
          </div>
        )}

        <div className="absolute bottom-0 right-0 z-20">
          <button className="bg-tintura-black text-white p-4 hover:bg-tintura-red transition-colors duration-300 shadow-lg translate-y-full group-hover:translate-y-0 transition-transform">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-12 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0 z-20">
            {product.features?.slice(0, 3).map(f => (
                <div key={f}>{techBadge(f)}</div>
            ))}
        </div>

        <div className="absolute top-0 left-0 z-20">
             {product.isNew && (
                <span className="inline-block bg-tintura-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                    New
                </span>
            )}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between border-t border-gray-100">
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-tintura-red uppercase">{product.category}</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{product.garment_type}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2 leading-none group-hover:text-tintura-red transition-colors uppercase">
            {product.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-light">
                {product.description}
            </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
            <div className="flex flex-wrap gap-2">
                {product.features?.slice(0, 2).map(f => (
                    <span key={f} className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                        {f.replace('super', '').replace('fabric','')}
                    </span>
                ))}
            </div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;

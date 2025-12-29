
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import AdminView from './components/AdminView';
import { supabase } from './lib/supabase';
import { FEATURES } from './constants';
import { Product, Category } from './types';
import { X, Check, Filter, Loader2 } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL' | 'ADMIN'>('ALL');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Supabase
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) console.error(error);
      else setProducts(data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = products;

    if (activeCategory !== 'ALL' && activeCategory !== 'ADMIN') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeFeature) {
        result = result.filter(p => p.features?.includes(activeFeature));
    }

    setFilteredProducts(result);
  }, [activeCategory, activeFeature, products]);

  const handleCategoryChange = (cat: Category | 'ALL' | 'ADMIN') => {
      setActiveCategory(cat);
      setActiveFeature(null);
  };

  if (activeCategory === 'ADMIN') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <AdminView />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      
      <main>
        <Hero />

        <section id="collection" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <span className="text-tintura-red font-bold tracking-widest uppercase">Our Collections</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">
                {activeCategory === 'ALL' ? 'LATEST ARRIVALS' : activeCategory}
              </h2>
            </div>
            
            <div className="text-right mt-4 md:mt-0">
               <div className="text-gray-500 font-medium mb-2">
                  Showing {filteredProducts.length} Styles
              </div>
            </div>
          </div>

          <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-2">
                  <div className="flex items-center text-gray-400 mr-2">
                      <Filter className="w-4 h-4 mr-1" />
                      <span className="text-xs font-bold uppercase tracking-wider">Tech Filter:</span>
                  </div>
                  <button 
                    onClick={() => setActiveFeature(null)}
                    className={`px-4 py-1 text-sm font-bold uppercase tracking-wider transition-all border ${
                        activeFeature === null 
                        ? 'bg-tintura-black text-white border-tintura-black' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    All
                  </button>
                  {Object.values(FEATURES).map(feat => (
                      <button
                        key={feat.id}
                        onClick={() => setActiveFeature(activeFeature === feat.id ? null : feat.id)}
                        className={`px-4 py-1 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                            activeFeature === feat.id 
                            ? 'bg-tintura-red text-white border-tintura-red' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                          {feat.name}
                      </button>
                  ))}
              </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-tintura-red" />
                <span className="font-display font-bold tracking-widest text-gray-400">LOADING COLLECTION...</span>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={setSelectedProduct} 
                />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
             <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-xl font-display">No styles found matching your criteria.</p>
                <button 
                    onClick={() => { setActiveCategory('ALL'); setActiveFeature(null); }}
                    className="mt-4 text-tintura-red font-bold hover:underline"
                >
                    Clear Filters
                </button>
             </div>
          )}
        </section>

        <FeaturesSection />

      </main>

      <Footer />

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-1/2 bg-gray-100 relative group">
              <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover min-h-[400px]"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Style Code: {selectedProduct.style_code}
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-auto">
                <div className="flex items-center space-x-2 text-sm font-bold text-gray-400 mb-2">
                    <span className="uppercase">{selectedProduct.category}</span>
                    <span>&bull;</span>
                    <span className="uppercase text-tintura-accent">{selectedProduct.garment_type}</span>
                    <span>&bull;</span>
                    <span className="text-tintura-red">IN STOCK</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b pb-2">Tech Specs</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedProduct.features.map(featId => {
                         const feat = FEATURES[featId];
                         return (
                           <div key={featId} className="flex items-center space-x-3 text-gray-700">
                              <div className="w-6 h-6 rounded-full bg-red-100 text-tintura-red flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                              </div>
                              <span className="font-medium">{feat?.name || featId}</span>
                           </div>
                         );
                      })}
                    </div>
                  </div>
                )}
                
                {selectedProduct.color && (
                    <div className="mb-8">
                         <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-wider text-sm">Available Colors</h4>
                         <p className="text-gray-600">{selectedProduct.color}</p>
                    </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <button className="w-full bg-tintura-black text-white font-bold py-4 hover:bg-tintura-red transition-colors duration-300 uppercase tracking-widest shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Contact to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

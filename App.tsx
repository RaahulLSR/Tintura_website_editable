
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import AdminView from './components/AdminView';
import { supabase } from './lib/supabase';
import { Product } from './types';
import { X, Check, Filter, Loader2, Tag, Ruler, Box, Lock, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState<string | 'ALL' | 'ADMIN'>('ALL');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  
  // Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const ADMIN_EMAIL = 'raahullsr@gmail.com';

  useEffect(() => {
    // FORCE OTP ON REFRESH:
    // We explicitly sign out and do NOT check for an existing session on mount.
    // This ensures that refreshing the page always resets the admin access.
    const clearSessionAndFetch = async () => {
      await supabase.auth.signOut();
      setIsAdminAuthenticated(false);
      await fetchAll();
    };
    
    clearSessionAndFetch();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
      const allFeats = data?.reduce((acc: string[], p: any) => {
        if (p.features) return [...acc, ...p.features];
        return acc;
      }, []) || [];
      setAvailableFeatures(Array.from(new Set(allFeats)));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleCategoryChange = (cat: string | 'ALL' | 'ADMIN') => {
      setActiveCategory(cat);
      setActiveFeature(null);
      // Reset local UI state when entering admin area
      if (cat === 'ADMIN') {
        setOtpSent(false);
        setOtpCode('');
        setAuthError(null);
      }
  };

  const handleRequestOtp = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: ADMIN_EMAIL,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setOtpSent(true);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send code. Check your Supabase configuration.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otpCode.length !== 6) return;
    
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: ADMIN_EMAIL,
        token: otpCode,
        type: 'email', // type 'email' handles 6-digit tokens for signInWithOtp
      });
      
      if (error) throw error;
      
      if (data.session) {
        setIsAdminAuthenticated(true);
        setOtpSent(false);
        setOtpCode('');
      } else {
        throw new Error("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setAuthError(err.message || 'Invalid code. Please check your email.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInquiryToPurchase = () => {
    setSelectedProduct(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  if (activeCategory === 'ADMIN') {
    if (!isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar activeCategory={'ADMIN'} onCategoryChange={handleCategoryChange as any} />
          
          <div className="flex-grow flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white border-2 border-tintura-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(26,26,26,0.1)]">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-20 h-20 bg-tintura-red/5 rounded-full flex items-center justify-center mb-6">
                  {otpSent ? <Mail className="w-10 h-10 text-tintura-red" /> : <Lock className="w-10 h-10 text-tintura-black" />}
                </div>
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-tintura-black">
                  {otpSent ? 'Enter Passcode' : 'Admin Access'}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {otpSent 
                    ? `Check ${ADMIN_EMAIL} for the 6-digit code.`
                    : 'Security verification required to manage inventory.'}
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold uppercase border-l-4 border-red-500">
                  {authError}
                </div>
              )}

              {!otpSent ? (
                <button 
                  onClick={handleRequestOtp}
                  disabled={authLoading}
                  className="w-full bg-tintura-black text-white font-black py-4 hover:bg-tintura-red transition-all flex items-center justify-center space-x-3 group disabled:opacity-70"
                >
                  {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  <span className="tracking-widest">SEND 6-DIGIT CODE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div>
                    <input 
                      autoFocus
                      type="text"
                      maxLength={6}
                      placeholder="· · · · · ·"
                      className="w-full text-center text-4xl font-display font-bold tracking-[0.5em] border-b-4 border-tintura-black py-4 outline-none focus:border-tintura-red transition-colors placeholder:text-gray-200"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={authLoading || otpCode.length !== 6}
                    className="w-full bg-tintura-red text-white font-black py-4 hover:bg-tintura-black transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    <span className="tracking-widest uppercase">VERIFY PASSCODE</span>
                  </button>
                  <button 
                    type="button"
                    disabled={authLoading}
                    onClick={() => { setOtpSent(false); setAuthError(null); }}
                    className="w-full text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-tintura-black transition-colors"
                  >
                    Resend Code
                  </button>
                </form>
              )}
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Navbar activeCategory={'ADMIN'} onCategoryChange={handleCategoryChange as any} />
        <AdminView />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeCategory={activeCategory as any} onCategoryChange={handleCategoryChange as any} />
      
      <main>
        <Hero />

        <section id="collection" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <span className="text-tintura-red font-bold tracking-widest uppercase">Our Collections</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2 uppercase">
                {activeCategory === 'ALL' ? 'LATEST ARRIVALS' : activeCategory}
              </h2>
            </div>
            <div className="text-right mt-4 md:mt-0 text-gray-500 font-medium">
              Showing {filteredProducts.length} Styles
            </div>
          </div>

          <div className="mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-2">
                  <div className="flex items-center text-gray-400 mr-2">
                      <Filter className="w-4 h-4 mr-1" />
                      <span className="text-xs font-bold uppercase tracking-wider">Refine:</span>
                  </div>
                  <button onClick={() => setActiveFeature(null)} className={`px-4 py-1 text-sm font-bold uppercase tracking-wider transition-all border ${!activeFeature ? 'bg-tintura-black text-white' : 'bg-white text-gray-600'}`}>All</button>
                  {availableFeatures.slice(0, 10).map(feat => (
                      <button key={feat} onClick={() => setActiveFeature(activeFeature === feat ? null : feat)} className={`px-4 py-1 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${activeFeature === feat ? 'bg-tintura-red text-white' : 'bg-white text-gray-600'}`}>{feat}</button>
                  ))}
              </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-tintura-red" />
                <span className="font-display font-bold tracking-widest text-gray-400 uppercase">Syncing Lookbook...</span>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
             <div className="text-center py-20 bg-gray-50">
                <p className="text-gray-500 font-display">No styles found.</p>
             </div>
          )}
        </section>
        <FeaturesSection />
      </main>
      <Footer />

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-white/50 p-2 rounded-full hover:bg-white"><X className="w-6 h-6" /></button>

            <div className="w-full md:w-1/2 bg-gray-100"><img src={selectedProduct.image_url} alt="" className="w-full h-full object-cover min-h-[500px]" /></div>

            <div className="w-full md:w-1/2 p-8 md:p-12">
                <div className="flex items-center space-x-2 text-[10px] font-black text-tintura-red mb-2 uppercase tracking-widest">
                    <span>{selectedProduct.category}</span>
                    <span>/</span>
                    <span className="text-tintura-accent">{selectedProduct.garment_type}</span>
                    <span>/</span>
                    <span>CODE: {selectedProduct.style_code}</span>
                </div>
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-4 uppercase leading-none">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed font-light">{selectedProduct.description}</p>

                <div className="space-y-6 mb-8">
                    {selectedProduct.fabric_type && (
                        <div className="flex items-center space-x-3">
                            <Box className="w-5 h-5 text-tintura-red" />
                            <div><p className="text-[10px] font-black uppercase text-gray-400">Fabric Composition</p><p className="font-bold">{selectedProduct.fabric_type}</p></div>
                        </div>
                    )}
                    {selectedProduct.available_sizes && (
                        <div className="flex items-center space-x-3">
                            <Ruler className="w-5 h-5 text-tintura-red" />
                            <div><p className="text-[10px] font-black uppercase text-gray-400">Available Sizes</p><p className="font-bold">{selectedProduct.available_sizes}</p></div>
                        </div>
                    )}
                    {selectedProduct.color && (
                        <div className="flex items-center space-x-3">
                            <Tag className="w-5 h-5 text-tintura-red" />
                            <div><p className="text-[10px] font-black uppercase text-gray-400">Available Colors</p><p className="font-bold">{selectedProduct.color}</p></div>
                        </div>
                    )}
                </div>

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-8 border-t pt-6">
                    <h4 className="font-black text-[10px] uppercase text-tintura-red mb-4 tracking-widest">Performance Specs</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map(f => (
                         <div key={f} className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>{f}</span>
                         </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleInquiryToPurchase}
                  className="w-full bg-tintura-black text-white font-black py-4 hover:bg-tintura-red transition-all uppercase tracking-widest text-sm"
                >
                  Inquiry to Purchase
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

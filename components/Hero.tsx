import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-tintura-black flex flex-col justify-center">
      {/* Background Geometric Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-80 z-10"></div>
        <img 
            src="https://images.unsplash.com/photo-1610384104075-e05c8cf25148?auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 object-top"
        />
        {/* Red Triangles/Lines inspired by PDF Page 1 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none z-20">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d="M0 100 L40 0 L100 100 Z" fill="none" stroke="#E31E24" strokeWidth="0.5" />
                <path d="M20 100 L60 20 L80 100 Z" fill="none" stroke="#E31E24" strokeWidth="0.5" />
                <path d="M-20 80 L30 30 L50 100 Z" fill="none" stroke="#E31E24" strokeWidth="0.5" />
            </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 z-30 relative grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-white space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-block bg-tintura-red text-white px-4 py-1 text-sm font-bold tracking-widest mb-4">
                #SUMMERLOOKBOOK
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-none uppercase tracking-tighter shadow-black drop-shadow-lg">
                Urban<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Legacy</span>
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-lg border-l-4 border-tintura-red pl-4 bg-black/30 p-2 backdrop-blur-sm">
                The ultimate collection. Blending high-performance technology with urban aesthetics.
            </p>
            <div className="pt-8">
                <button 
                  onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth'})}
                  className="group flex items-center space-x-3 bg-white text-tintura-black px-8 py-4 font-bold tracking-wider hover:bg-tintura-red hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                >
                    <span>DISCOVER NOW</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>

      {/* Marquee Banner at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 bg-tintura-red text-white py-3 z-40 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_20s_linear_infinite] font-display font-bold text-lg tracking-[0.2em]">
            NEW ARRIVALS • BIO WASH TECHNOLOGY • DRY FIT PERFORMANCE • PREMIUM COTTON • TINTURA SPORTZ • SUMMER COLLECTION • 
            NEW ARRIVALS • BIO WASH TECHNOLOGY • DRY FIT PERFORMANCE • PREMIUM COTTON • TINTURA SPORTZ • SUMMER COLLECTION •
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
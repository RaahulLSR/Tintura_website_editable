import React from 'react';
import { Shield, Droplets, Wind, Sun, Feather, Zap, Activity, Atom, Shirt, Sparkles, Umbrella } from 'lucide-react';
import { FEATURES } from '../constants';
import { IconType } from '../types';

const FeaturesSection: React.FC = () => {
  const getIcon = (type: IconType) => {
    switch (type) {
      case 'shield': return <Shield className="w-8 h-8" />;
      case 'drop': return <Droplets className="w-8 h-8" />;
      case 'wind': return <Wind className="w-8 h-8" />;
      case 'sun': return <Sun className="w-8 h-8" />;
      case 'feather': return <Feather className="w-8 h-8" />;
      case 'stretch': return <Activity className="w-8 h-8" />;
      case 'bacteria': return <Zap className="w-8 h-8" />;
      case 'atom': return <Atom className="w-8 h-8" />;
      case 'fabric': return <Shirt className="w-8 h-8" />;
      case 'spark': return <Zap className="w-8 h-8" />;
      case 'water': return <Umbrella className="w-8 h-8" />;
      case 'iron': return <Shirt className="w-8 h-8" />;
      case 'diamond': return <Sparkles className="w-8 h-8" />;
      case 'smell': return <Wind className="w-8 h-8" />;
      default: return <Shield className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-gray-100 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-tintura-red/5 rotate-45 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 uppercase tracking-tighter">
            Innovation <span className="text-tintura-red">&</span> Tech
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Tintura Sportz & Casuals are engineered with cutting-edge fabric technology.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.values(FEATURES).map((feature) => (
            <div key={feature.id} className="bg-white p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-b-2 border-transparent hover:border-tintura-red">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-tintura-black group-hover:text-tintura-red transition-colors">
                {getIcon(feature.iconType)}
              </div>
              <h3 className="text-sm font-bold font-display uppercase mb-1 text-gray-900 tracking-wider">{feature.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;

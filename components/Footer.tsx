
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const logoUrl = "https://xxwlkcpxoojpejiwyzzv.supabase.co/storage/v1/object/public/Products/TINTURA%20CASUALS%20LOGO_edited.jpg";

  return (
    <footer id="contact-section" className="bg-tintura-black text-white pt-16 pb-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="mb-6">
                <img 
                  src={logoUrl} 
                  alt="TINTURA" 
                  className="h-20 w-auto object-contain mb-4"
                />
            </div>
            <p className="text-gray-400 mb-6">
                The secret of great styles is to feel good in what we wear. Unleash the athlete within.
            </p>
          </div>

          {/* Contact */}
          <div>
             <h3 className="text-xl font-display font-bold mb-6 border-b border-gray-800 pb-2">CONTACT US</h3>
             <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3 group cursor-pointer">
                    <MapPin className="w-5 h-5 text-tintura-red flex-shrink-0 mt-1" />
                    <a href="https://maps.app.goo.gl/fXAxY1wMRxm26VBD6" target="_blank" rel="noopener noreferrer" className="hover:text-tintura-red transition-colors">
                        <p className="font-bold text-white">SREYEAS CREATIONS</p>
                        <p>48C, KVP Layout, Karuvampalayam</p>
                        <p>Tirupur - 641 604. INDIA</p>
                    </a>
                </div>
                <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-tintura-red" />
                    <p>+91 9944001777 / 94422 10932</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-tintura-red" />
                    <p>sreyeascreation@gmail.com</p>
                </div>
             </div>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h3 className="text-xl font-display font-bold mb-6 border-b border-gray-800 pb-2">STAY CONNECTED</h3>
            <div className="flex space-x-4 mb-8">
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-tintura-red transition-colors">
                    <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/tintura.official/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-tintura-red transition-colors">
                    <Instagram className="w-5 h-5" />
                </a>
            </div>
            <div className="bg-gray-900 p-4 border border-gray-800">
                <p className="text-sm text-gray-500 mb-2">Scan for location</p>
                <div className="w-24 h-24 bg-white mx-auto">
                    {/* Placeholder for QR Code */}
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SreyeasCreations" alt="QR Code" className="w-full h-full" />
                </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Sreyeas Creations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

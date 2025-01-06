import React from 'react';
import { BsPinMap, BsTwitter, BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Jagger's Butchery</h3>
            <p className="text-red-100">
              Your trusted butcher. Providing premium cuts, expert advice, delicious recipes, and exceptional service to our community.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="hover:text-red-200 transition-colors">Premium Cuts</a></li>
              <li><a href="#contact" className="hover:text-red-200 transition-colors">Catering Services</a></li>
              <li><a href="#contact" className="hover:text-red-200 transition-colors">Bulk Orders</a></li>
              <li><a href="#contact" className="hover:text-red-200 transition-colors">Special Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="tel:+2349069942948" className="hover:text-red-200 transition-colors">(234) 90-699-42948</a></li>
              <li><a href="mailto:neche.bless@gmail.com" className="hover:text-red-200 transition-colors">neche.bless@gmail.com</a></li>
              <li className="flex items-center space-x-2">
                <BsPinMap size={20} />
                <span>123 Butcher Street, Meatville, ST 12345</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <BsTwitter size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
              <BsFacebook size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
              <BsInstagram size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
              <BsWhatsapp size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-yellow-700 mt-8 pt-8 text-center text-red-100">
          <p>Copyright 2024 Jagger's Butchery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





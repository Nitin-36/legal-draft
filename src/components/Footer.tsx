import React from 'react';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold">LegalDocs Pro</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for professional legal document preparation. 
              We make legal documentation accessible, affordable, and efficient for everyone.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-5 w-5" />
                <span>support@legaldocspro.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">Contact</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-yellow-500 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Document Types</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Power of Attorney</span></li>
              <li><span className="text-gray-300">Rental Agreements</span></li>
              <li><span className="text-gray-300">Affidavits</span></li>
              <li><span className="text-gray-300">NDAs</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 LegalDocs Pro. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">MicroFinance Mentor</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering financial literacy and inclusion for underbanked communities through AI-powered mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/learning" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Learning Center</Link></li>
              <li><Link to="/tools" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Financial Tools</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-primary" />
                <span className="text-gray-600 dark:text-gray-400">info@microfinancementor.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-base font-medium mb-2 text-gray-900 dark:text-white">Subscribe to our newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MicroFinance Mentor. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
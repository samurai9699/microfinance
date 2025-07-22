import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Financial Advisor</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
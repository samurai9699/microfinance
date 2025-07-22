import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, Book, Users, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: PieChart, label: 'Budget', path: '/budget' },
    { icon: CreditCard, label: 'Transactions', path: '/transactions' },
    { icon: Book, label: 'Learning', path: '/learning' },
    { icon: Users, label: 'Community', path: '/community' },
  ];
  
  const bottomMenuItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/support' },
    { icon: LogOut, label: 'Logout', path: '/logout' },
  ];
  
  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <Link
        to={path}
        className={cn(
          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
        <span className="font-medium">{label}</span>
        {isActive && (
          <span className="ml-auto w-1.5 h-5 bg-primary rounded-full"></span>
        )}
      </Link>
    );
  };
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-gray-200 bg-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <span className="text-xl font-bold text-gray-900">MicroFinance</span>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200">
              {/* User avatar placeholder */}
            </div>
            <div>
              <p className="font-medium text-gray-900">Alex Johnson</p>
              <p className="text-sm text-gray-500">Free Plan</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Account Level</span>
              <span className="text-xs font-medium text-primary">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full"
                style={{ width: '25%' }}
              ></div>
            </div>
            <button className="mt-2 text-primary text-xs font-medium hover:text-primary/80">
              Upgrade to Pro
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="space-y-1">
          {bottomMenuItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
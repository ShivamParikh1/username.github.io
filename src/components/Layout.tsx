import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, Target, TrendingUp, Phone } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive('/') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>
          
          <Link
            to="/habits"
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive('/habits') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <Target size={20} />
            <span className="text-xs mt-1 font-medium">Habits</span>
          </Link>
          
          <Link
            to="/progress"
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive('/progress') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <TrendingUp size={20} />
            <span className="text-xs mt-1 font-medium">Progress</span>
          </Link>
          
          <Link
            to="/hotline"
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              isActive('/hotline') 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <Phone size={20} />
            <span className="text-xs mt-1 font-medium">Hotline</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Wrench, Menu, X, User, Settings, Zap, TestTube, UserPlus, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: '首頁', href: '/' },
    { name: '用戶中心', href: '/user' },
    { name: '師傅中心', href: '/artisan' },
    { name: '立即預約', href: '/book' },
    { name: '🚀 功能演示', href: '/demo' },
    { name: '🧪 功能測試', href: '/test' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">師傅快手</span>
              <span className="block text-xs text-gray-600">Professional Artisan Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                } ${item.name.includes('🚀') ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' : ''} ${item.name.includes('🧪') ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <Link
              to="/user/auth"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>用戶登入</span>
            </Link>
            <Link
              to="/artisan/auth"
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>師傅註冊</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  } ${item.name.includes('🚀') ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : ''} ${item.name.includes('🧪') ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/user/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>用戶登入</span>
                </Link>
                <Link
                  to="/artisan/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>師傅註冊</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
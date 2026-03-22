import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, Menu, X, LogOut, LogIn, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  const getNavLinks = () => {
    if (!user) return [{ name: 'Home', path: '/' }];
    switch (user.role) {
      case 'CITIZEN':
        return [
          { name: 'My Reports', path: '/citizen' },
          { name: 'Report Issue', path: '/citizen/new' }
        ];
      case 'MANAGER':
        return [{ name: 'Manager Portal', path: '/manager' }];
      case 'COLLECTOR':
        return [{ name: 'My Tasks', path: '/collector' }];
      case 'ADMIN':
        return [{ name: 'Admin Dashboard', path: '/admin' }];
      default:
        return [{ name: 'Home', path: '/' }];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-emerald-300" />
            <span className="font-bold text-xl tracking-tight">EcoSolution</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-emerald-900 text-white'
                      : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center text-emerald-100 text-sm font-medium">
                  <User className="w-4 h-4 mr-1" />
                  {user.firstName} {user.lastName}
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-600 focus:outline-none transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-emerald-900 text-white'
                    : 'text-emerald-100 hover:bg-emerald-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

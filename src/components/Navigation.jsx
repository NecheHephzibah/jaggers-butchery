import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, UserGroupIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { GiMeat } from "react-icons/gi";
import { Menu, X, UserCircle } from "lucide-react";
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Our Meat", href: "/shop", icon: GiMeat },
    { name: "About", href: "/about", icon: UserGroupIcon },
    { name: "Contact", href: "/contact", icon: PhoneIcon },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-3xl font-lobster bg-gradient-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent">
                Jagger's
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "text-yellow-700"
                    : "text-black hover:text-yellow-700",
                  "flex flex-col items-center px-3 py-2 text-sm font-light group transition-colors duration-200"
                )}
              >
                <item.icon
                  className={classNames(
                    "h-4 w-4 mb-1 transition-transform duration-200 group-hover:scale-110",
                    location.pathname === item.href ? "text-yellow-700" : "text-black group-hover:text-yellow-700"
                  )}
                />
                <span className="text-sm font-light">{item.name}</span>
              </Link>
            ))}

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="flex items-center justify-center px-3 py-2 rounded-full bg-yellow-50 text-black hover:bg-yellow-100 transition-colors duration-200" 
            >
              <ShoppingBagIcon className="h-6 w-6" /> 
            </Link>

            {/* Login/Register Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-50 text-black hover:bg-yellow-100 transition-colors duration-200"
              >
                <span className="text-sm font-light">Sign in</span>
                <UserCircle className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-colors duration-200"
              >
                <span className="text-sm font-light">Register</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-black hover:bg-yellow-50 transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "text-yellow-700 bg-yellow-50"
                      : "text-black hover:bg-yellow-50",
                    "flex items-center px-3 py-2 rounded-md text-base font-light"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Cart Link */}
              <Link
                to="/cart"
                className="flex items-center px-3 py-2 rounded-md text-base font-light hover:bg-yellow-50"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-3" />
                Cart
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center rounded-md bg-yellow-50 text-black hover:bg-yellow-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
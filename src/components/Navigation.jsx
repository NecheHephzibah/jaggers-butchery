import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, UserGroupIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { GiMeat } from "react-icons/gi";
import { Menu, X, UserCircle, NewspaperIcon } from "lucide-react";
import { BookOpen, FileText, ScrollText, NotebookText } from 'lucide-react';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Our Meat", href: "/shop", icon: GiMeat },
    { name: "About", href: "/about", icon: UserGroupIcon },
    { name: "Blog", href: "/blog", icon: NewspaperIcon },
    { name: "Contact", href: "/contact", icon: PhoneIcon },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full py-3 px-4">
          {/* Logo - Left side */}
          <div className="flex items-center pr-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <h1 className="text-3xl font-lobster bg-gradient-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-110">
                Jagger's
              </h1>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "text-yellow-700"
                    : "text-black hover:text-yellow-700",
                  "flex flex-col items-center px-4 py-2 text-sm font-light group transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                )}
              >
                <item.icon
                  className={classNames(
                    "h-5 w-5 mb-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                    location.pathname === item.href ? "text-yellow-700" : "text-black group-hover:text-yellow-700"
                  )}
                />
                <span className="text-sm font-light transition-transform duration-300 group-hover:font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Actions - Right side */}
          <div className="flex items-center space-x-4 pl-4">
            <Link
              to="/api/cart"
              className="flex items-center justify-center px-3 py-2 rounded-full bg-yellow-50 text-black hover:bg-yellow-100 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg"
            >
              <ShoppingBagIcon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
            </Link>

            <Link
              to="/api/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-yellow-50 text-black hover:bg-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <span className="text-sm font-light transition-all duration-300 group-hover:font-medium">Login</span>
              <UserCircle className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-black hover:bg-yellow-50 transition-all duration-300 hover:scale-110"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-all duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-all duration-300 hover:rotate-180" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "text-yellow-700 bg-yellow-50"
                    : "text-black hover:bg-yellow-50",
                  "flex items-center px-3 py-2 rounded-md text-base font-light transition-all duration-300 hover:scale-105",
                )}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <item.icon className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
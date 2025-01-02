import React, { useState } from 'react';
import { GiCow, GiGoat, GiChicken } from 'react-icons/gi';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ name, category, price, description, quality, imageUrl }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src="/api/placeholder/400/300" 
            alt={name}
            className={`w-full h-64 object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
        <div className="absolute top-4 right-4 bg-yellow-700 text-white px-3 py-1 rounded-full text-sm animate-fadeIn">
          {quality}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {category === 'Beef' && <GiCow className="text-red-600 w-5 h-5" />}
          {category === 'Goat' && <GiGoat className="text-red-600 w-5 h-5" />}
          {category === 'Chicken' && <GiChicken className="text-red-600 w-5 h-5" />}
          <span className="text-gray-600 text-sm">{category}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
            ))}
          </div>
          <span className="text-2xl font-bold text-yellow-700">₦{price}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform ${
            isAdded 
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-orange-500 text-white hover:bg-orange-700'
          } flex items-center justify-center gap-2`}
        >
          {isAdded ? (
            <>
              <CheckIcon className="w-5 h-5 animate-bounce" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Beef', 'Goat', 'Chicken'];
  
  const products = [
    {
      name: "Premium Beef Tenderloin",
      category: "Beef",
      price: "12,500/kg",
      description: "Ultra-tender, lyophilized beef tenderloin. Perfect for steaks and premium dishes.",
      quality: "Premium Cut",
      imageUrl: "/beef-tenderloin.jpg"
    },
    {
      name: "Lean Goat Meat",
      category: "Goat",
      price: "8,500/kg",
      description: "Fresh, carefully processed goat meat. Ideal for pepper soup and grilling.",
      quality: "Select Cut",
      imageUrl: "/goat-meat.jpg"
    },
    {
      name: "Whole Chicken",
      category: "Chicken",
      price: "5,500/kg",
      description: "Farm-fresh chicken, professionally processed and preserved.",
      quality: "Premium Quality",
      imageUrl: "/chicken.jpg"
    },
    {
      name: "Beef Short Ribs",
      category: "Beef",
      price: "9,500/kg",
      description: "Well-marbled, flavorful beef ribs. Perfect for slow cooking and grilling.",
      quality: "Choice Cut",
      imageUrl: "/beef-ribs.jpg"
    },
    {
      name: "Goat Legs",
      category: "Goat",
      price: "7,500/kg",
      description: "Premium goat legs, perfect for special occasions and traditional dishes.",
      quality: "Premium Cut",
      imageUrl: "/goat-legs.jpg"
    },
    {
      name: "Chicken Wings",
      category: "Chicken",
      price: "4,500/kg",
      description: "Fresh chicken wings, ideal for grilling and frying.",
      quality: "Select Quality",
      imageUrl: "/chicken-wings.jpg"
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 animate-fadeIn">
          Buy Meat
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeIn">
          Get the finest cuts of meat, processed and preserved using state-of-the-art technology 
          to maintain peak freshness and nutritional value.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
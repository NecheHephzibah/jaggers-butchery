import React, { useState } from 'react';
import { GiCow, GiGoat, GiChicken } from 'react-icons/gi';
import { StarIcon } from '@heroicons/react/24/solid';
import { BsBasket, BsCheckLg } from 'react-icons/bs';


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
        {/* <div className="absolute top-4 right-4 bg-yellow-700 text-white px-3 py-1 rounded-full text-sm animate-fadeIn">
          {quality}
        </div> */}
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
          {/* <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
            ))}
          </div> */}
          <span className="text-2xl font-medium text-black-700">₦{price}</span>


          <button
            onClick={handleAddToCart}
            className={`px-3 py-1.5 rounded-lg font-bold text-sm transition-all duration-300 transform ${
              isAdded 
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-yellow-700 text-white hover:bg-yellow-900'
            } flex items-center justify-center gap-1.5`}
          >
            {isAdded ? (
              <>
                <BsCheckLg className="w-4 h-4 animate-bounce" />
                Added to Basket
              </>
            ) : (
              <>
                <BsBasket className="w-4 h-4" />
                Add to Basket
              </>
            )}
          </button>

        </div>

        
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
      quality: "Premium Cut",
      imageUrl: "/beef-tenderloin.jpg"
    },
    {
      name: "Lean Goat Meat",
      category: "Goat",
      price: "8,500/kg",
      quality: "Select Cut",
      imageUrl: "/goat-meat.jpg"
    },
    {
      name: "Whole Chicken",
      category: "Chicken",
      price: "5,500/kg",
      quality: "Premium Quality",
      imageUrl: "/chicken.jpg"
    },
    {
      name: "Beef Short Ribs",
      category: "Beef",
      price: "9,500/kg",
      quality: "Choice Cut",
      imageUrl: "/beef-ribs.jpg"
    },
    {
      name: "Goat Legs",
      category: "Goat",
      price: "7,500/kg",
      quality: "Premium Cut",
      imageUrl: "/goat-legs.jpg"
    },
    {
      name: "Chicken Wings",
      category: "Chicken",
      price: "4,500/kg",
      quality: "Select Quality",
      imageUrl: "/chicken-wings.jpg"
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50" id='products'>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-center text-gray-900 mb-4 animate-fadeIn">
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
import React, { useState, useEffect } from 'react';
import { GiCow, GiPig, GiChicken, GiDeer } from 'react-icons/gi';
import { BsBasket, BsCheckLg } from 'react-icons/bs';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';


const ProductsSection = ({ products = [], showAsSection = true }) => {
  const [productsList, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const categories = ['All', 'Beef', 'Chicken', 'Pork', 'Venison'];

  const filteredProducts = selectedCategory === 'All'
    ? productsList
    : productsList.filter(product => product.category === selectedCategory);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Cannot get access to load products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          setError('Cannot get access to load products');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      navigate('/checkout');
    }, 1000);
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'beef': return <GiCow className="text-red-600 w-5 h-5" />;
      case 'chicken': return <GiChicken className="text-red-600 w-5 h-5" />;
      case 'pork': return <GiPig className="text-red-600 w-5 h-5" />;
      case 'venison': return <GiDeer className="text-red-600 w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className={`w-full ${showAsSection ? 'py-16' : 'pt-24 pb-16'} px-4 sm:px-6 lg:px-8`} id="shop">
      <div className="max-w-7xl mx-auto mt-[50px]">
        {showAsSection && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Welcome to Abuja's independent butcher</h2>
            <p className="mt-4 text-lg text-gray-500">Offering quality free-range meats sourced from Northern private farms with high standards of husbandry and care. </p>
          </div>
        )}

        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${selectedCategory === category
                    ? 'bg-yellow-500 text-white'
                    : 'hover:bg-yellow-100'
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    console.error('Image load error:', e.target.src);
                    e.target.src = '/assets/rib.jpg';
                  }}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === product.id ? 'scale-110' : 'scale-100'
                    }`}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(product.category)}
                  <span className="text-gray-600 text-sm">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">NGN{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                <button
                  className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
                  onClick={() => handleAddToCart(product)}
                >
                  {isAdded ? <BsCheckLg className="mr-2" /> : <BsBasket className="mr-2" />}
                  {isAdded ? 'Added' : 'Add to Basket'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
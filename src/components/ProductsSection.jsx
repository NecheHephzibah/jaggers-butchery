import React, { useState } from 'react';
import { GiCow, GiPig, GiChicken, GiDeer } from 'react-icons/gi';
import { BsBasket, BsCheckLg } from 'react-icons/bs';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductsSection = ({ products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const categories = ['All', 'Beef', 'Chicken', 'Pork', 'Venison'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = async (product) => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id })
      });

      const data = await response.json();

      if (response.ok) {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      } else {
        if (response.status === 401) {
          navigate('/login');
        } else {
        setError(data.message || 'Failed to add to basket');
      }
    }
    } catch (err) {
      setError('Network error. Please try again.');
    }
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
    <div>
      <div className="flex justify-center mb-4">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-64 object-cover transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(product.category)}
                <span className="text-gray-600 text-sm">{product.category}</span>
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleAddToCart(product)}
              >
                {isAdded ? <BsCheckLg className="inline-block mr-2" /> : <BsBasket className="inline-block mr-2" />}
                {isAdded ? 'Added' : 'Add to Basket'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
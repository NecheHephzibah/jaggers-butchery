import React, { useState, useEffect } from 'react';
import { GiCow, GiGoat, GiChicken } from 'react-icons/gi';
import { BsBasket, BsCheckLg } from 'react-icons/bs';
import { Alert, AlertDescription } from './ui/alert';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); //getting user id from local storage
      
      if (!token || !userId) {
        // Redirect to auth page if user is not logged in
        navigate('/auth', { 
          state: { 
            redirectAfterAuth: '/checkout',
              message: 'Please login or register to add items to your basket' 
            } 
          });
          return; // Add return to prevent further execution
        }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity: 1,
          total_price: parseFloat(product.price.replace(/[^\d.]/g, ''))
        })
      });

      if (response.ok) {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
        onAddToCart(product);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add to basket');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={product.imageUrl || "/api/placeholder/400/300" }
            alt={product.name}
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
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Product added to cart:', product);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-gray-50" id="products">
      {/* Rest of the ProductsSection JSX remains the same */}
    </section>
  );
};

export default ProductsSection;
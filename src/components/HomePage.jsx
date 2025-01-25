import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import About from './About';
import FeaturesSection from './FeaturesSection';
import ProductsSection from './ProductsSection';
import Testimonials from './Testimonials';
import Partners from './Partners';
import Contact from './Contact';
import Footer from './Footer';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <HeroSection />
      <About showAsSection={true} />
      <FeaturesSection />
      <ProductsSection products={products} showAsSection={true} />
      <Testimonials />
      <Partners />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
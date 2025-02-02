import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage';
import About from "./components/About";
import ProductsSection from "./components/ProductsSection";
import Checkout from './components/Checkout';
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Home page component containing all sections
const HomePage_a = () => (
  <>
    <HomePage />
    {/* <HeroSection /> */}
    {/* <About showAsSection={true} /> */}
    {/* <FeaturesSection /> */}
    {/* <ProductsSection showAsSection={true} /> */}
    {/* <Testimonials /> */}
    {/* <Partners /> */}
    {/* <Contact /> */}
    {/* <Footer /> */}
  </>
);

// Standalone pages with navigation
const AboutPage = () => (
  <>
    <About showAsSection={false} />
    <Footer />
  </>
);

const ContactPage = () => (
  <>
    <Contact />
    <Footer />
  </>
);

const ShopPage = () => {
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
      <ProductsSection products={products} showAsSection={false} />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>

      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage_a />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      

    </Router>
  );
};

export default App;


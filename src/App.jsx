import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AuthForms from './components/AuthForms';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';


const HomePage = () => (
  <>
    <HeroSection />
    <About />
    <FeaturesSection />
    <ProductsSection />
    <Testimonials />
    <Partners />
    <Contact />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForms />} />
      </Routes>
    </Router>
  );
};

const Checkout = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthForms />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add a route for order confirmation if needed */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default Checkout;
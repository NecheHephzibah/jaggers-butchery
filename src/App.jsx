import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
      <Navigation />
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
};

export default App;

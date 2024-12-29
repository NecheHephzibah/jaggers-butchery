import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import FeaturesSection from "./components/FeaturesSection";
import ProductsSection from "./components/ProductsSection";


const App = () => {
  return (
    <>
      <Navigation />
      <HeroSection />
      <About />
      <FeaturesSection />
      <ProductsSection />
    </>
  );
};

export default App;

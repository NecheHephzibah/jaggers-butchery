import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  const slides = [
    {
      image: "../assets/b2.jpg",
      title: "From Farm to Fork, Every Step Matters.",
      subtitle: "Experience the finest cuts of meat, carefully selected and prepared for your dining pleasure.",
      overlayOpacity: "0"
    },
    {
      image: "../assets/b1.jpg",
      title: "Premium Quality Meat",
      subtitle: "State-of-the-art processing and preservation techniques for the best taste and nutrition.",
      overlayOpacity: "0"
    },
    {
      image: "../assets/img3.jpg",
      title: "Hygiene First",
      subtitle: "Experience meat processing redefined with our sterile and modern facilities.",
      overlayOpacity: "0"
    }
  ];

  // Preload images
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  const handleSlideChange = useCallback((direction) => {
    setIsFading(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
      setIsFading(false);
    }, 500);
  }, [slides.length]);

  useEffect(() => {
    let timer;
    if (isPlaying && !isHovering) {
      timer = setInterval(() => {
        handleSlideChange('next');
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, handleSlideChange, isHovering]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        handleSlideChange('next');
      } else {
        handleSlideChange('prev');
      }
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSlideChange('prev');
      } else if (e.key === 'ArrowRight') {
        handleSlideChange('next');
      } else if (e.key === ' ') {
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleSlideChange]);

  const Slide = ({ slide, isActive, index }) => {
    const isLoaded = loadedImages[index];
    
    return (
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } mt-[80px]`}
        id='hero'
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <img
          src={slide.image}
          alt={slide.title}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{ opacity: parseInt(slide.overlayOpacity) / 100 }}
        />

        <div className={`absolute inset-0 flex items-center justify-center ${
          isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        } transition-all duration-700`}>
          <div className="max-w-7xl px-6 text-center">
            <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8 transform transition-all duration-700 hover:scale-105">
              {slide.title}
            </h2>
            <p className="text-lg font-medium text-gray-200 sm:text-xl/8 max-w-3xl mx-auto transform transition-all duration-500 hover:text-white">
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-white transition-all duration-[5000ms] ease-linear"
          style={{ 
            width: isPlaying && !isHovering ? '100%' : '0%',
            transitionProperty: 'width',
          }}
        />
      </div>

      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <Slide 
            key={index} 
            slide={slide} 
            isActive={currentSlide === index}
            index={index}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className={`transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => handleSlideChange('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={() => handleSlideChange('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </button>

        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
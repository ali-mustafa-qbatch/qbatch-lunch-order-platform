import { useState, useRef } from 'react';

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    } 
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) {
      nextSlide();
    }
    else if (delta < -50) {
      prevSlide()
    };
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-lg" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i}`} className="w-full h-56 object-cover flex-shrink-0" />
        ))}
      </div>

      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full">
        ‹
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full">
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${current === i ? 'bg-blue-500' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
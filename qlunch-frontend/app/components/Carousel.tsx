import { useState, useRef } from 'react';

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [rotation, setRotation] = useState(0); 
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setRotation(0); 
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setRotation(0); 
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) {
      nextSlide();
    } else if (delta < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <div
        className="relative w-full h-112 overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-112 object-cover flex-shrink-0 cursor-pointer"
              onClick={() => {
                setIsPreviewOpen(true);
                setRotation(0);
              }}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
        >
          ›
        </button>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                current === i ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
          <img
            src={images[current]}
            alt="Preview"
            className="max-w-full max-h-[80vh] object-contain transition-transform duration-300"
            style={{ transform: `rotate(${rotation}deg)` }}
          />

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setRotation((r) => r - 90)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              ⟲ Rotate Left
            </button>
            <button
              onClick={() => setRotation((r) => r + 90)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              ⟳ Rotate Right
            </button>
          </div>

          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
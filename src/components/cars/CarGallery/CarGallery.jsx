// car-rental-platform/src/components/cars/CarGallery/CarGallery.jsx

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import "../CarGallery/CarGallery.scss";

const CarGallery = ({ car }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images =
    car.images?.length > 0
      ? car.images
      : [car.image];

  const nextImage = () => {
    setActiveIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  return (
    <div className="car-gallery">
      <div className="car-gallery__main">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={`${car.name} view ${activeIndex + 1}`}
            initial={{
              opacity: 0,
              scale: 1.03,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
            }}
          />
        </AnimatePresence>

        <div className="car-gallery__overlay" />

        <div className="car-gallery__counter">
          <span>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>

          <i>/</i>

          <span>
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        <button
          type="button"
          className="car-gallery__expand"
          aria-label="View image"
        >
          <Maximize2 size={17} />
        </button>

        {images.length > 1 && (
          <div className="car-gallery__arrows">
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}
      </div>

      <div className="car-gallery__thumbs">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={
              activeIndex === index
                ? "is-active"
                : ""
            }
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={image}
              alt={`${car.name} thumbnail ${index + 1}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;
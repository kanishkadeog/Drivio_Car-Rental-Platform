// car-rental-platform/src/components/home/Testimonials/Testimonials.jsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";

import testimonials from "../../../data/testimonials";
import "../Testimonials/Testimonials.scss";

const AUTO_PLAY_DURATION = 6000;

const slideVariants = {
  enter: {
    opacity: 0,
    x: 35,
  },
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -35,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const goToNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-top">
          <div className="testimonials-eyebrow">
            <span />
            DRIVER STORIES
          </div>

          <div className="testimonials-top-copy">
            <span className="testimonials-index">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          className="testimonials-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="testimonial-quote-mark">
            <Quote size={42} strokeWidth={1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeTestimonial.id}
              className="testimonial-slide"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="testimonial-copy">
                <div className="testimonial-rating">
                  {Array.from({ length: activeTestimonial.rating }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        size={15}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    )
                  )}
                </div>

                <blockquote>
                  “{activeTestimonial.quote}”
                </blockquote>

                <div className="testimonial-person">
                  <div className="testimonial-avatar">
                    {activeTestimonial.initials}
                  </div>

                  <div>
                    <strong>{activeTestimonial.name}</strong>

                    <span>
                      {activeTestimonial.role} ·{" "}
                      {activeTestimonial.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="testimonial-number">
                <span>0{activeIndex + 1}</span>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="testimonials-controls">
          <div className="testimonial-progress">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                className={`testimonial-progress-item ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
              >
                <span className="testimonial-progress-number">
                  0{index + 1}
                </span>

                <span className="testimonial-progress-track">
                  {index === activeIndex && !isPaused && (
                    <motion.span
                      className="testimonial-progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTO_PLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="testimonial-arrows">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="testimonials-footer">
          <span>
            Rated <strong>4.9/5</strong> by drivers who chose to go further.
          </span>

          <span className="testimonials-footer-line" />

          <span>YOUR JOURNEY. YOUR CAR.</span>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
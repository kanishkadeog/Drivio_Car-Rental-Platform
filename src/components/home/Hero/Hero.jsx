// car-rental-platform/src/components/home/Hero/Hero.jsx

import { motion } from "motion/react";

import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import heroCar from "../../../assets/images/hero-car.png";

import "../Hero/Hero.scss";

const headlineLines = [
  "DRIVE",
  "BEYOND",
  "ORDINARY.",
];

function Hero() {

  

const handleExplore = (event) => {
  event.preventDefault();

  const fleetSection = document.getElementById("fleet");

  if (fleetSection) {
    fleetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__background">
        <motion.img
          src={heroCar}
          alt="Premium car available for rental"
          initial={{
            scale: 1.12,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Cinematic overlays */}
      <div className="hero__overlay" />
      <div className="hero__gradient" />

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__topline">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hero__location"
          >
            <MapPin size={15} />

            <span>
              Premium mobility · India
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="hero__availability"
          >
            <span className="hero__availability-dot" />
            Cars available today
          </motion.div>
        </div>

        <div className="hero__main">
          <div className="hero__headline">
            {headlineLines.map((line, index) => (
              <div
                className="hero__headline-line"
                key={line}
              >
                <motion.span
                  initial={{
                    y: "110%",
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.25 + index * 0.11,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            className="hero__description"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.7,
              duration: 0.7,
            }}
          >
            <p>
              Premium cars, flexible rentals and
              journeys designed around you.
            </p>

            <div className="hero__trust">
              <ShieldCheck size={17} />

              <span>
                Verified vehicles · Flexible cancellation
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom area */}
           <motion.div
              className="hero__bottom"
               initial={{
                 opacity: 0,
                 y: 20,
               }}
               animate={{
                 opacity: 1,
                 y: 0,
               }}
               transition={{
                 delay: 0.8,
                 duration: 0.7,
                 ease: [0.22, 1, 0.36, 1],
               }}
            >
          
          <button
            type="button"
            className="hero__explore"
            onClick={handleExplore}
           >
            <span>Explore the fleet</span>

            <span className="hero__explore-icon">
              <ArrowUpRight size={19} />
            </span>
          </button>

          <div className="hero__scroll">
            <span>Scroll to explore</span>

            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown size={17} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative index */}
      <div className="hero__index">
        <span>01</span>
        <span>/</span>
        <span>04</span>
      </div>
    </section>
  );
}

export default Hero;
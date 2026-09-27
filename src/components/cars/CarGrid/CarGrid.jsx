// car-rental-platform/src/components/cars/CarGrid/CarGrid.jsx

import { motion } from "motion/react";

import CarCard from "../CarCard/CarCard";
import "../CarGrid/CarGrid.scss";

const CarGrid = ({ cars }) => {
  return (
    <motion.div
      className="car-grid"
      layout
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {cars.map((car) => (
        <motion.div
          key={car.id}
          layout
          variants={{
            hidden: {
              opacity: 0,
              y: 24,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <CarCard car={car} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CarGrid;
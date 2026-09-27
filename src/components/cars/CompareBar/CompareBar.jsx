// car-rental-platform/src/components/cars/CompareBar/CompareBar.jsx


import { Scale, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import cars from "../../../data/cars";
import { useCompare } from "../../../context/CompareContext";

import "../CompareBar/CompareBar.scss";

const CompareBar = () => {
  const navigate = useNavigate();

  const {
    compareIds,
    compareCount,
    clearCompare,
  } = useCompare();

  if (compareCount === 0) {
    return null;
  }

  const selectedCars = compareIds
    .map((id) =>
      cars.find(
        (car) => car.id === id
      )
    )
    .filter(Boolean);

  return (
    <motion.div
      className="compare-bar"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 100,
      }}
    >
      <div className="compare-bar__inner">
        <div className="compare-bar__title">
          <Scale size={17} />

          <div>
            <strong>
              Compare vehicles
            </strong>

            <span>
              {compareCount} of 3 selected
            </span>
          </div>
        </div>

        <div className="compare-bar__cars">
          {selectedCars.map((car) => (
            <div
              className="compare-bar__car"
              key={car.id}
            >
              <img
                src={car.images?.[0]}
                alt={car.name}
              />

              <span>{car.name}</span>
            </div>
          ))}
        </div>

        <div className="compare-bar__actions">
          <button
            type="button"
            onClick={clearCompare}
            className="compare-bar__clear"
          >
            <X size={15} />
            Clear
          </button>

          <button
            type="button"
            className="compare-bar__compare"
            disabled={compareCount < 2}
            onClick={() =>
              navigate("/compare")
            }
          >
            Compare
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompareBar;
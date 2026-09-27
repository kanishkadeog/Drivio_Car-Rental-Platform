// car-rental/platform/src/pages/Compare/Compare.jsx

import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "motion/react";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button/Button";

import cars from "../../data/cars";
import { useCompare } from "../../context/CompareContext";

import "../Compare/Compare.scss";

const Compare = () => {
  const {
    compareIds,
    clearCompare,
  } = useCompare();

  const selectedCars = compareIds
    .map((id) =>
      cars.find(
        (car) => car.id === id
      )
    )
    .filter(Boolean);

  return (
    <main className="compare-page">
      <Container>
        <div className="compare-page__header">
          <Link to="/cars">
            <ArrowLeft size={15} />
            Back to fleet
          </Link>

          <span>
            VEHICLE COMPARISON
          </span>

          <h1>
            See them side by side.
          </h1>

          <p>
            Compare the details that matter
            before choosing your next drive.
          </p>
        </div>

        {selectedCars.length < 2 ? (
          <div className="compare-page__empty">
            <span>COMPARE</span>

            <h2>
              Choose at least two vehicles.
            </h2>

            <p>
              Add vehicles from the fleet to
              compare their specifications,
              pricing and features.
            </p>

            <Link to="/cars">
              <Button>
                Explore the fleet
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              className="compare-table"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <div className="compare-table__row compare-table__row--cars">
                <div className="compare-table__label">
                  Vehicle
                </div>

                {selectedCars.map(
                  (car) => (
                    <div
                      className="compare-car"
                      key={car.id}
                    >
                      <img
                        src={car.images?.[0]}
                        alt={car.name}
                      />

                      <span>
                        {car.category}
                      </span>

                      <h2>
                        {car.name}
                      </h2>

                      <strong>
                        ₹
                        {car.pricePerDay.toLocaleString(
                          "en-IN"
                        )}
                        <small>
                          /day
                        </small>
                      </strong>
                    </div>
                  )
                )}
              </div>

              {[
                ["Brand", "brand"],
                ["Year", "year"],
                ["Fuel", "fuel"],
                [
                  "Transmission",
                  "transmission",
                ],
                [
                  "Seats",
                  "seats",
                ],
                [
                  "Mileage",
                  "mileage",
                ],
                [
                  "Rating",
                  "rating",
                ],
                [
                  "Location",
                  "location",
                ],
              ].map(([label, key]) => (
                <div
                  className="compare-table__row"
                  key={key}
                >
                  <div className="compare-table__label">
                    {label}
                  </div>

                  {selectedCars.map(
                    (car) => (
                      <div
                        className="compare-value"
                        key={car.id}
                      >
                        {car[key]}
                        {key === "mileage" &&
                          " km/l"}
                        {key === "seats" &&
                          " seats"}
                        {key === "rating" &&
                          " / 5"}
                      </div>
                    )
                  )}
                </div>
              ))}

              <div className="compare-table__row">
                <div className="compare-table__label">
                  Features
                </div>

                {selectedCars.map(
                  (car) => (
                    <div
                      className="compare-features"
                      key={car.id}
                    >
                      {car.features
                        ?.slice(0, 5)
                        .map(
                          (feature) => (
                            <span
                              key={feature}
                            >
                              <Check size={12} />
                              {feature}
                            </span>
                          )
                        )}
                    </div>
                  )
                )}
              </div>

              <div className="compare-table__row compare-table__row--action">
                <div />

                {selectedCars.map(
                  (car) => (
                    <Link
                      to={`/cars/${car.id}`}
                      key={car.id}
                    >
                      View vehicle
                    </Link>
                  )
                )}
              </div>
            </motion.div>

            <button
              type="button"
              className="compare-page__clear"
              onClick={clearCompare}
            >
              Clear comparison
            </button>
          </>
        )}
      </Container>
    </main>
  );
};

export default Compare;
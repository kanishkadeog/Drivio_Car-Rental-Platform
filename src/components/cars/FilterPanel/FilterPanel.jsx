// car-rental-platform/src/components/cars/FilterPanel/FilterPanel.jsx

import { Check, RotateCcw, X } from "lucide-react";

import useCars from "../../../hooks/useCars";

import "../FilterPanel/FilterPanel.scss";

const brands = [
  "BMW",
  "Mercedes-Benz",
  "Porsche",
  "Audi",
  "Range Rover",
  "Toyota",
  "Volvo",
  "MINI",
  "Jeep",
  "Tesla",
];

const fuels = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
];

const transmissions = [
  "Automatic",
  "Manual",
];

const FilterPanel = ({ isOpen, onClose }) => {
  const {
    brand,
    fuel,
    transmission,
    seats,
    minPrice,
    maxPrice,
    available,
    updateParam,
    clearFilters,
  } = useCars();

  const handleReset = () => {
    clearFilters();
  };

  return (
    <>
      {isOpen && (
        <div
          className="filter-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`filter-panel ${
          isOpen ? "filter-panel--open" : ""
        }`}
      >
        <div className="filter-panel__header">
          <div>
            <span>REFINE</span>

            <h2>Find your drive.</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="filter-panel__body">
          {/* Price */}
          <section className="filter-group">
            <div className="filter-group__title">
              <span>01</span>
              <h3>Daily price</h3>
            </div>

            <div className="price-fields">
              <label>
                <span>MIN</span>

                <input
                  type="number"
                  min="0"
                  value={minPrice || ""}
                  placeholder="₹ 0"
                  onChange={(event) =>
                    updateParam(
                      "minPrice",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                <span>MAX</span>

                <input
                  type="number"
                  min="0"
                  value={
                    maxPrice === Infinity
                      ? ""
                      : maxPrice
                  }
                  placeholder="₹ 50,000"
                  onChange={(event) =>
                    updateParam(
                      "maxPrice",
                      event.target.value
                    )
                  }
                />
              </label>
            </div>
          </section>

          {/* Brand */}
          <section className="filter-group">
            <div className="filter-group__title">
              <span>02</span>
              <h3>Brand</h3>
            </div>

            <div className="filter-options">
              {brands.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    brand === item
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    updateParam(
                      "brand",
                      brand === item ? "" : item
                    )
                  }
                >
                  <span>{item}</span>

                  {brand === item && (
                    <Check size={15} />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Fuel */}
          <section className="filter-group">
            <div className="filter-group__title">
              <span>03</span>
              <h3>Fuel type</h3>
            </div>

            <div className="filter-pills">
              {fuels.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    fuel === item
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    updateParam(
                      "fuel",
                      fuel === item ? "" : item
                    )
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Transmission */}
          <section className="filter-group">
            <div className="filter-group__title">
              <span>04</span>
              <h3>Transmission</h3>
            </div>

            <div className="filter-pills">
              {transmissions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    transmission === item
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    updateParam(
                      "transmission",
                      transmission === item
                        ? ""
                        : item
                    )
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Seats */}
          <section className="filter-group">
            <div className="filter-group__title">
              <span>05</span>
              <h3>Seats</h3>
            </div>

            <div className="filter-pills">
              {[2, 4, 5, 7].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    Number(seats) === item
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    updateParam(
                      "seats",
                      Number(seats) === item
                        ? ""
                        : item
                    )
                  }
                >
                  {item}+
                </button>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section className="filter-group">
            <div className="availability-toggle">
              <div>
                <span>06</span>

                <div>
                  <h3>Available now</h3>
                  <p>
                    Show only ready-to-book cars
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={
                  available ? "is-active" : ""
                }
                onClick={() =>
                  updateParam(
                    "available",
                    available ? "" : "true"
                  )
                }
                aria-label="Toggle availability"
              >
                <span />
              </button>
            </div>
          </section>
        </div>

        <div className="filter-panel__footer">
          <button
            type="button"
            onClick={handleReset}
            className="filter-reset"
          >
            <RotateCcw size={15} />
            Reset filters
          </button>

          <button
            type="button"
            onClick={onClose}
            className="filter-apply"
          >
            Show results
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;
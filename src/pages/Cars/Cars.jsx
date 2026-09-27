// car-rental-platform/src/pages/Cars.jsx

import { motion } from "motion/react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

import Container from "../../components/common/Container";
import SearchInput from "../../components/cars/SearchInput/SearchInput";
import CarGrid from "../../components/cars/CarGrid/CarGrid";

import useCars from "../../hooks/useCars";


import { useState } from "react";
import FilterPanel from "../../components/cars/FilterPanel/FilterPanel";

import "../Cars/Cars.scss";

const Cars = () => {
  const {
    cars,
    allCars,
    category,
    type,
    journey,
    location,
    sort,
    updateParam,
    clearFilters,
  } = useCars();

  const activeFilterCount = [
  category,
  type,
  journey,
  location,
].filter(Boolean).length;

  const hasFilters =
    category ||
    type ||
    journey ||
    location ||
    cars.length !== allCars.length;

  const activeLabel =
    category ||
    type ||
    (journey
      ? journey.replace("-", " ")
      : "");


      const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <main className="cars-page">
      {/* Page Hero */}
      <section className="cars-page__hero">
        <Container>
          <motion.div
            className="cars-page__hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="cars-page__eyebrow">
              THE DRIVIO FLEET
            </span>

            <h1>
              Find the car
              <span>that fits the journey.</span>
            </h1>

            <p>
              From everyday elegance to unforgettable performance,
              discover a collection built around how you want to drive.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Fleet Controls */}
      <section className="cars-page__controls">
        <Container>
          <div className="cars-page__toolbar">
            <SearchInput />

           <button
               type="button"
               className="cars-page__filter-button"
               onClick={() => setFiltersOpen(true)}
            >
             <SlidersHorizontal size={17} />
               Filters

               {activeFilterCount > 0 && (
                 <span className="cars-page__filter-count">
                   {activeFilterCount}
                 </span>
                )}
            </button>

          </div>

          <div className="cars-page__meta">
            <div>
              <span className="cars-page__count">
                {cars.length}
              </span>

              <span className="cars-page__count-label">
                vehicles available
              </span>
            </div>

            <div className="cars-page__sort">
              <label htmlFor="fleet-sort">Sort by</label>

              <select
                id="fleet-sort"
                value={sort}
                onChange={(event) =>
                  updateParam("sort", event.target.value)
                }
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="price-low">
                  Price: Low to high
                </option>

                <option value="price-high">
                  Price: High to low
                </option>

                <option value="rating">
                  Highest rated
                </option>

                <option value="newest">
                  Newest
                </option>
              </select>
            </div>
          </div>

          {/* Active search state */}
          {hasFilters && (
            <motion.div
              className="cars-page__active"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="cars-page__active-copy">
                <span>Showing</span>

                {activeLabel && (
                  <strong>
                    {activeLabel}
                  </strong>
                )}

                {location && (
                  <strong>
                    near {location}
                  </strong>
                )}

                <span>
                  · {cars.length} result{cars.length !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear all
                <ArrowRight size={15} />
              </button>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Fleet */}
      <section className="cars-page__fleet">
        <Container>
          {cars.length > 0 ? (
            <CarGrid cars={cars} />
          ) : (
            <div className="cars-page__empty">
              <span>NO MATCHES</span>

              <h2>
                Nothing found for this search.
              </h2>

              <p>
                Try another brand, model, category, or remove
                some filters to explore the full fleet.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Explore all vehicles
              </button>
            </div>
          )}
        </Container>
      </section>

      <FilterPanel
         isOpen={filtersOpen}
         onClose={() => setFiltersOpen(false)}
      />

    </main>
  );
};

export default Cars;
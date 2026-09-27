// car-rental-platform/src/components/cars/RecentlyViewed/RecentlyViewed.jsx


import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import cars from "../../../data/cars";
import useRecentlyViewed from "../../../hooks/useRecentlyViewed";

import "../RecentlyViewed/RecentlyViewed.scss";

const RecentlyViewed = ({ currentCar }) => {
  const storedCars =
    useRecentlyViewed(currentCar);

  const items = storedCars
    .filter(
      (item) =>
        item.id !== currentCar?.id
    )
    .map((item) =>
      cars.find(
        (car) => car.id === item.id
      )
    )
    .filter(Boolean)
    .slice(0, 4);

  if (!items.length) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <div className="recently-viewed__heading">
        <div>
          <span>KEEP EXPLORING</span>

          <h2>
            Recently viewed.
          </h2>
        </div>
      </div>

      <div className="recently-viewed__grid">
        {items.map((car) => (
          <Link
            to={`/cars/${car.id}`}
            className="recent-card"
            key={car.id}
          >
            <div className="recent-card__image">
              <img
                src={car.images?.[0]}
                alt={car.name}
              />

              <span>
                <ArrowUpRight size={15} />
              </span>
            </div>

            <div className="recent-card__content">
              <small>
                {car.category}
              </small>

              <h3>{car.name}</h3>

              <p>
                ₹
                {car.pricePerDay.toLocaleString(
                  "en-IN"
                )}
                / day
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
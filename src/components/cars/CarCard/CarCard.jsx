// car-rental-platform/src/components/cars/CarCard/CarCard.jsx

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Heart,
  Fuel,
  Settings2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Scale } from "lucide-react";
import { useCompare } from "../../../context/CompareContext";

import { useFavorites } from "../../../context/FavoritesContext";

import "../CarCard/CarCard.scss";

const CarCard = ({ car }) => {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const {
  isCompared,
  toggleCompare,
  compareCount,
  maxCompare,
} = useCompare();

  const favorite = isFavorite(car.id);

  const compared = isCompared(car.id);

const handleCompare = (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (
    !compared &&
    compareCount >= maxCompare
  ) {
    toast.error(
      `You can compare up to ${maxCompare} cars`
    );

    return;
  }

  toggleCompare(car.id);

  toast.success(
    compared
      ? "Removed from comparison"
      : "Added to comparison"
  );
};

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(car.id);

    toast.success(
      favorite
        ? "Removed from favorites"
        : "Added to favorites"
    );
  };

  return (
    <motion.article
      className="car-card"
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        to={`/cars/${car.id}`}
        className="car-card__image"
      >
        <img
           src={car.images?.[0]}
           alt={`${car.name} rental car`}
           loading="lazy"
           decoding="async"
         />

        <div className="car-card__image-overlay" />

        {car.badge && (
          <span className="car-card__badge">
            {car.badge}
          </span>
        )}

        <button
          type="button"
          className={`car-card__favorite ${
            favorite ? "is-active" : ""
          }`}
          onClick={handleFavorite}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            size={17}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <button
            type="button"
            className={`car-card__compare ${
            compared ? "is-active" : ""
             }`}
            onClick={handleCompare}
            aria-label={
             compared
                ? "Remove from comparison"
                : "Compare car"
              }
          >
         <Scale size={18} />
       </button>

        <span className="car-card__arrow">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      <div className="car-card__content">
        <div className="car-card__top">
          <div>
            <span className="car-card__category">
              {car.category}
            </span>

            <h3>{car.name}</h3>

            <p>
              {car.brand} · {car.model}
            </p>
          </div>

          <div className="car-card__rating">
            <span>★</span>
            {car.rating}
          </div>
        </div>

        <div className="car-card__specs">
          <span>
            <Fuel size={13} />
            {car.fuel}
          </span>

          <span>
            <Users size={13} />
            {car.seats}
          </span>

          <span>
            <Settings2 size={13} />
            {car.transmission}
          </span>
        </div>

        <div className="car-card__bottom">
          <div>
            <strong>
              ₹{car.pricePerDay.toLocaleString("en-IN")}
            </strong>

            <span>/ day</span>
          </div>

          <span
            className={
              car.available
                ? "is-available"
                : "is-unavailable"
            }
          >
            {car.available
              ? "Available"
              : "Unavailable"}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default CarCard;
// car-rental-platform/src/pages/CarDetails/CarDetails.jsx

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  Share2,
  Star,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button/Button";
import CarGallery from "../../components/cars/CarGallery/CarGallery";
import CarSpecifications from "../../components/cars/CarSpecifications/CarSpecifications";
import CarFeatures from "../../components/cars/CarFeatures/CarFeatures";

import cars from "../../data/cars";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";

import RecentlyViewed from "../../components/cars/RecentlyViewed/RecentlyViewed";

import "../CarDetails/CarDetails.scss";

import { useFavorites } from "../../context/FavoritesContext";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();


  const car = cars.find(
    (item) => String(item.id) === String(carId)
  );

   const {
  isFavorite,
  toggleFavorite,
} = useFavorites();

  const favorite = car ? isFavorite(car.id) : false;

  useRecentlyViewed(car);

  if (!car) {
    return (
      <main className="car-details car-details--not-found">
        <Container>
          <span>404 / VEHICLE NOT FOUND</span>

          <h1>
            This car has left the garage.
          </h1>

          <Link to="/cars">
            <Button>
              Explore the fleet
            </Button>
          </Link>
          
        </Container>
      </main>
    );
  }

 

  const handleShare = async () => {
    const shareData = {
      title: `${car.brand} ${car.model}`,
      text: `Explore the ${car.name} at VÉLOCITY.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        toast.success(
          "Vehicle link copied"
        );
      }
    } catch {
      // User cancelled native share.
    }
  };

  return (
    <main className="car-details">
      <Container>
        {/* Breadcrumb */}
        <motion.div
          className="car-details__breadcrumb"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={15} />
            Back to fleet
          </button>

          <span>/</span>

          <span>{car.category}</span>

          <span>/</span>

          <strong>{car.model}</strong>
        </motion.div>

        {/* Gallery */}
        <motion.section
          className="car-details__gallery"
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >
          <CarGallery car={car} />
        </motion.section>

        {/* Main content */}
        <div className="car-details__layout">
          {/* Left */}
          <div className="car-details__content">
            <motion.header
              className="car-details__heading"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <div>
                <span className="car-details__category">
                  {car.category}
                </span>

                <h1>{car.name}</h1>

                <div className="car-details__meta">
                  <span>
                    {car.brand}
                  </span>

                  <i>•</i>

                  <span>
                    {car.year}
                  </span>

                  <i>•</i>

                  <span>
                    {car.color}
                  </span>
                </div>
              </div>

              <div className="car-details__actions">
                <button
                  type="button"
                  onClick={() => {
                  toggleFavorite(car.id);

                  toast.success(
                  favorite
                  ? "Removed from favorites"
                   : "Added to favorites"
                 );
                }}
               className={favorite ? "is-active" : ""}
               aria-label={
               favorite
                 ? "Remove from favorites"
                  : "Add to favorites"
                 }
              >
             <Heart
               size={19}
               fill={
               favorite
                  ? "currentColor"
                  : "none"
               }
             />
           </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share vehicle"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </motion.header>

            {/* Rating */}
            <div className="car-details__rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={14}
                      fill="currentColor"
                    />
                  )
                )}
              </div>

              <strong>
                {car.rating}
              </strong>

              <span>
                ({car.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <section className="car-details__section">
              <span className="section-number">
                01
              </span>

              <div>
                <h2>
                  Built for the road ahead.
                </h2>

                <p>
                  {car.description}
                </p>
              </div>
            </section>

            {/* Specifications */}
            <section className="car-details__section car-details__section--block">
              <span className="section-number">
                02
              </span>

              <div>
                <h2>Specifications</h2>

                <CarSpecifications car={car} />
              </div>
            </section>

            {/* Features */}
            <section className="car-details__section">
              <span className="section-number">
                03
              </span>

              <div>
                <h2>What's included</h2>

                <CarFeatures
                  features={car.features}
                />
              </div>
            </section>

            {/* Location */}
            <section className="car-details__location">
              <div>
                <MapPin size={18} />

                <div>
                  <span>VEHICLE LOCATION</span>

                  <strong>
                    {car.location}
                  </strong>
                </div>
              </div>

              <span>
                Pickup & return available
              </span>
            </section>
          </div>

          {/* Booking card */}
          <aside className="car-details__booking">
            <div className="booking-card">
              <div className="booking-card__top">
                <span>
                  DAILY RATE
                </span>

                <div>
                  <strong>
                    ₹{car.pricePerDay.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <small>/ day</small>
                </div>
              </div>

              <div
                className={`booking-card__availability ${
                  car.available
                    ? "is-available"
                    : "is-unavailable"
                }`}
              >
                <span />

                {car.available
                  ? "Available for booking"
                  : "Currently unavailable"}
              </div>

              <div className="booking-card__divider" />

              <div className="booking-card__summary">
                <div>
                  <span>Vehicle</span>
                  <strong>
                    {car.brand} {car.model}
                  </strong>
                </div>

                <div>
                  <span>Category</span>
                  <strong>
                    {car.category}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {car.location}
                  </strong>
                </div>
              </div>

              <Button
                fullWidth
                disabled={!car.available}
                onClick={() =>
                  navigate(
                    `/booking/${car.id}`
                  )
                }
              >
                {car.available
                  ? "Book this vehicle"
                  : "Currently unavailable"}
              </Button>

              <p className="booking-card__note">
                No payment is required at this
                stage.
              </p>
            </div>
          </aside>
        </div>

        {/* Back to fleet */}
        <div className="car-details__back">
          <Link to="/cars">
            <ArrowLeft size={15} />
            Browse the full fleet
            <ArrowRight size={15} />
          </Link>
        </div>

        <RecentlyViewed currentCar={car} />

      </Container>
    </main>
  );
};

export default CarDetails;
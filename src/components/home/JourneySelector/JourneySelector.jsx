// car-rental-platform/src/components/home/JourneySelector/JourneySelector.jsx

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CarFront,
  Crown,
  Mountain,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import cars from "../../../data/cars";
import "../JourneySelector/JourneySelector.scss";

const journeys = [
  {
    id: "weekend",
    number: "01",
    title: "Weekend Escape",
    shortTitle: "Weekend",
    description:
      "Leave the routine behind. Choose something agile, expressive, and made for open roads.",
    categories: ["Sports", "SUV"],
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "business",
    number: "02",
    title: "Business Trip",
    shortTitle: "Business",
    description:
      "Arrive composed. Refined sedans and executive cars designed to keep every journey effortless.",
    categories: ["Sedan", "Luxury"],
    icon: BriefcaseBusiness,
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "family",
    number: "03",
    title: "Family Journey",
    shortTitle: "Family",
    description:
      "More space for everyone, more room for everything. Comfortable vehicles built for longer drives.",
    categories: ["SUV", "Hatchback"],
    icon: UsersRound,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "luxury",
    number: "04",
    title: "Luxury Experience",
    shortTitle: "Luxury",
    description:
      "For occasions where ordinary simply won't do. Discover our most sophisticated machines.",
    categories: ["Luxury", "Sports"],
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "adventure",
    number: "05",
    title: "Adventure",
    shortTitle: "Adventure",
    description:
      "Take the road less travelled. Capability, confidence, and enough space for the unexpected.",
    categories: ["SUV"],
    icon: Mountain,
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=85",
  },
];

const cardVariants = {
  initial: {
    opacity: 0,
    y: 18,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
    },
  },
};

function JourneySelector() {
  const navigate = useNavigate();
  const [activeJourney, setActiveJourney] = useState("weekend");

  const journey = journeys.find((item) => item.id === activeJourney);

  const recommendedCars = useMemo(() => {
    if (!journey) return [];

    return cars
      .filter((car) => journey.categories.includes(car.category))
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        return b.rating - a.rating;
      })
      .slice(0, 3);
  }, [journey]);

  const handleExplore = () => {
    navigate(`/cars?journey=${journey.id}`);
  };

  return (
    <section className="journey-section">
      <div className="container">
        <div className="journey-header">
          <div className="journey-eyebrow">
            <span />
            FIND YOUR FIT
          </div>

          <div className="journey-heading-wrap">
            <h2>
              One fleet.
              <br />
              <span>Different reasons to drive.</span>
            </h2>

            <p>
              Tell us what the journey looks like. We'll show you the cars
              that fit it.
            </p>
          </div>
        </div>

        <div className="journey-selector">
          <div className="journey-tabs" role="tablist">
            {journeys.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeJourney;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`journey-tab ${isActive ? "active" : ""}`}
                  onClick={() => setActiveJourney(item.id)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="journey-tab-number">{item.number}</span>

                  <span className="journey-tab-icon">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>

                  <span className="journey-tab-title">
                    {item.shortTitle}
                  </span>

                  {isActive && <span className="journey-tab-line" />}
                </button>
              );
            })}
          </div>

          <div className="journey-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={journey.id}
                className="journey-main"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="journey-image">
                  <motion.img
                    src={journey.image}
                    alt={journey.title}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <div className="journey-image-overlay" />

                  <div className="journey-image-label">
                    <span>DRIVIO</span>
                    <span>/{journey.number}</span>
                  </div>
                </div>

                <div className="journey-copy">
                  <div className="journey-copy-top">
                    <span className="journey-number">
                      {journey.number} / 05
                    </span>

                    <div className="journey-copy-icon">
                      <journey.icon size={21} strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3>{journey.title}</h3>

                  <p>{journey.description}</p>

                  <div className="journey-categories">
                    {journey.categories.map((category) => (
                      <span key={category}>{category}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="journey-explore"
                    onClick={handleExplore}
                  >
                    <span>Explore this journey</span>

                    <span className="journey-explore-icon">
                      <ArrowUpRight size={17} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="journey-recommendations">
              <div className="recommendation-header">
                <div>
                  <span className="recommendation-eyebrow">
                    RECOMMENDED FOR YOU
                  </span>
                  <h4>Vehicles that fit the moment.</h4>
                </div>

                <CarFront size={20} strokeWidth={1.5} />
              </div>

              <AnimatePresence mode="popLayout">
                {recommendedCars.map((car, index) => (
                  <motion.button
                    key={`${journey.id}-${car.id}`}
                    type="button"
                    className="recommendation-card"
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      delay: index * 0.06,
                    }}
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <div className="recommendation-image">
                      <img
                        src={car.images?.[0]}
                        alt={car.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="recommendation-info">
                      <span>{car.category}</span>
                      <strong>{car.name}</strong>

                      <div className="recommendation-meta">
                        <span>
                          ₹{car.pricePerDay.toLocaleString("en-IN")}
                          <small>/day</small>
                        </span>

                        <span>{car.rating} ★</span>
                      </div>
                    </div>

                    <span className="recommendation-arrow">
                      <ArrowUpRight size={16} />
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySelector;
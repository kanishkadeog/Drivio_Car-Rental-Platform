// car-rental-platform/src/components/home/FeaturedCars/FeaturedCars.jsx

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../common/Container";
import SectionHeading from "../../common/SectionHeading/SectionHeading";
import Button from "../../common/Button/Button";
import CarCard from "../../cars/CarCard/CarCard";

import cars from "../../../data/cars";

import "../FeaturedCars/FeaturedCars.scss";

function FeaturedCars() {
  const featuredCars = cars.filter((car) => car.featured);

  return (
    <section className="featured-cars" id="fleet">
      <Container>
        <div className="featured-cars__top">
          <SectionHeading
            eyebrow="The fleet"
            title="Cars worth getting behind the wheel of."
            description="A curated collection of premium vehicles, selected for performance, comfort and unforgettable journeys."
          />

          <Link to="/cars" className="featured-cars__all">
            View all cars
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="featured-cars__grid">
          {featuredCars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="featured-cars__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            From city drives to weekend escapes,
            find the car that matches your journey.
          </p>

          <Button to="/cars">
            Explore entire fleet
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedCars;
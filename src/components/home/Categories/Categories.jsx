// car-rental-platform/src/components/home/Categories/Categories.jsx

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../common/Container";
import SectionHeading from "../../common/SectionHeading/SectionHeading";

import cars from "../../../data/cars";

import "../Categories/Categories.scss";

const categories = [
  {
    name: "Luxury",
    description: "Refined comfort",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Sports",
    description: "Performance driven",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "SUV",
    description: "Built for more",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Sedan",
    description: "Executive journeys",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Electric",
    description: "The future moves",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Hatchback",
    description: "Urban freedom",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=85",
  },
];

function Categories() {
  return (
    <section className="categories">
      <Container>
        <div className="categories__header">
          <SectionHeading
            eyebrow="Find your drive"
            title="A vehicle for every kind of journey."
            description="From effortless city drives to adrenaline-filled weekends, choose the machine that fits the moment."
          />

          <span className="categories__count">
            {categories.length.toString().padStart(2, "0")} categories
          </span>
        </div>

        <div className="categories__grid">
          {categories.map((category, index) => {
            const count = cars.filter(
              (car) => car.category === category.name
            ).length;

            return (
              <motion.div
                key={category.name}
                className={`category-card category-card--${index + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                }}
              >
                <Link
                  to={`/cars?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="category-card__link"
                >
                  <img
                    src={category.image}
                    alt={`${category.name} vehicles`}
                    className="category-card__image"
                    loading="lazy"
                  />

                  <div className="category-card__overlay" />

                  <div className="category-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="category-card__content">
                    <div>
                      <span>{category.description}</span>

                      <h3>{category.name}</h3>

                      <small>
                        {count} {count === 1 ? "vehicle" : "vehicles"}
                      </small>
                    </div>

                    <div className="category-card__arrow">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Categories;
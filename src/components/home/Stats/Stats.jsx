// car-rental-platform/src/components/home/Stats/Stats.jsx

import { motion } from "motion/react";
import { CarFront, MapPin, Route, Star } from "lucide-react";

import Container from "../../common/Container";
import "../Stats/Stats.scss";

const stats = [
  {
    value: "500+",
    label: "Premium vehicles",
    icon: CarFront,
  },
  {
    value: "25+",
    label: "Pickup locations",
    icon: MapPin,
  },
  {
    value: "10K+",
    label: "Journeys completed",
    icon: Route,
  },
  {
    value: "4.9/5",
    label: "Average experience",
    icon: Star,
  },
];

function Stats() {
  return (
    <section className="stats">
      <Container>
        <div className="stats__grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                className="stats__item"
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <div className="stats__icon">
                  <Icon size={18} strokeWidth={1.6} />
                </div>

                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Stats;
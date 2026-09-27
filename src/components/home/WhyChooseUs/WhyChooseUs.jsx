// car-rental-platform/src/components/home/WhyChooseUs/WhyChooseUs.jsx

import { motion } from "motion/react";
import { ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../common/Container";

import "../WhyChooseUs/WhyChooseUs.scss";

const benefits = [
  {
    number: "01",
    eyebrow: "The collection",
    title: "Curated, not crowded.",
    description:
      "Every vehicle in the DRIVIO collection is selected around one idea — it should make the journey worth remembering.",
    points: [
      "Premium and performance-focused vehicles",
      "Detailed vehicle specifications",
      "Multiple categories for every journey",
    ],
  },
  {
    number: "02",
    eyebrow: "The experience",
    title: "Ready when you are.",
    description:
      "Forget complicated rental experiences. Browse your vehicle, choose your dates and get moving with a simple, transparent process.",
    points: [
      "Simple online booking flow",
      "Clear daily pricing",
      "Flexible pickup planning",
    ],
  },
  {
    number: "03",
    eyebrow: "The journey",
    title: "Built around your drive.",
    description:
      "A business meeting, a weekend escape or a road trip with friends — the right vehicle changes the entire experience.",
    points: [
      "Journey-based vehicle discovery",
      "Personalized recommendations",
      "Designed for city and long-distance travel",
    ],
  },
];

function WhyChooseUs() {
  return (
    <section className="why-velocity">
      <Container>
        <div className="why-velocity__intro">
          <div>
            <span className="section-label">
                Why DRIVIO</span>

            <h2>
              More than a rental.
              <br />
              <span>It's your next story.</span>
            </h2>
          </div>

          <p>
            We believe the vehicle should be part of the experience —
            not just the way you get there.
          </p>
        </div>

        <div className="why-velocity__layout">
          <div className="why-velocity__visual">
            <div className="why-velocity__visual-inner">
              <motion.img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
                alt="Premium sports car on the road"
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: 1,
                  ease: [0.2, 0.65, 0.25, 1],
                }}
              />

              <div className="why-velocity__visual-overlay" />

              <div className="why-velocity__visual-top">
                <span>DRIVIO</span>
                <span>EST. 2026</span>
              </div>

              <div className="why-velocity__visual-bottom">
                <span>Drive beyond ordinary.</span>

                <div>
                  <Sparkles size={15} />
                  Premium mobility
                </div>
              </div>
            </div>
          </div>

          <div className="why-velocity__stories">
            {benefits.map((benefit, index) => (
              <motion.article
                className="why-story"
                key={benefit.number}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                }}
              >
                <div className="why-story__number">
                  {benefit.number}
                </div>

                <div className="why-story__body">
                  <span className="why-story__eyebrow">
                    {benefit.eyebrow}
                  </span>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>

                  <ul>
                    {benefit.points.map((point) => (
                      <li key={point}>
                        <Check size={14} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="why-velocity__footer">
          <div className="why-velocity__trust">
            <ShieldCheck size={18} />
            <span>
              Designed around simplicity, transparency and choice.
            </span>
          </div>

          <Link to="/about" className="why-velocity__link">
            Our story
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default WhyChooseUs;
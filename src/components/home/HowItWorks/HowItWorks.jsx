// car-rental-platform/src/components/home/HowItWorks/HowItWorks.jsx

import { motion, useScroll, useTransform } from "motion/react";
import {
  CalendarDays,
  CarFront,
  KeyRound,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

import Container from "../../common/Container";

import "../HowItWorks/HowItWorks.scss";

const steps = [
  {
    number: "01",
    eyebrow: "Discover",
    title: "Find your vehicle.",
    description:
      "Explore a curated collection of premium vehicles and narrow it down by category, price, fuel type or transmission.",
    icon: Search,
    meta: "Browse the collection",
  },
  {
    number: "02",
    eyebrow: "Choose",
    title: "Shape your journey.",
    description:
      "Select your pickup location and dates, review the vehicle details and choose the option that fits your plans.",
    icon: CalendarDays,
    meta: "Select your dates",
  },
  {
    number: "03",
    eyebrow: "Drive",
    title: "Take the wheel.",
    description:
      "Complete your details, confirm your booking and get ready to drive. Your next experience starts here.",
    icon: KeyRound,
    meta: "Start your journey",
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 35%"],
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      className="how-it-works"
      ref={sectionRef}
    >
      <Container>
        <div className="how-it-works__header">
          <div>
            <span className="section-label">
              The DRIVIO way
            </span>

            <h2>
              Three steps.
              <br />
              <span>One unforgettable drive.</span>
            </h2>
          </div>

          <p>
            We've kept the rental experience intentionally
            simple. Less friction. More time behind the wheel.
          </p>
        </div>

        <div className="how-it-works__timeline">
          <div className="how-it-works__line">
            <div className="how-it-works__line-track" />

            <motion.div
              className="how-it-works__line-progress"
              style={{ height: progressHeight }}
            />
          </div>

          <div className="how-it-works__steps">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="how-step"
                  key={step.number}
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
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                  }}
                >
                  <div className="how-step__marker">
                    <span>{step.number}</span>
                  </div>

                  <div className="how-step__content">
                    <div className="how-step__top">
                      <div className="how-step__icon">
                        <Icon size={22} strokeWidth={1.5} />
                      </div>

                      <span className="how-step__eyebrow">
                        {step.eyebrow}
                      </span>
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>

                    <div className="how-step__meta">
                      <Sparkles size={14} />
                      {step.meta}
                    </div>
                  </div>

                  <div className="how-step__visual">
                    <div className="how-step__visual-number">
                      {step.number}
                    </div>

                    {index === 0 && (
                      <Search size={85} strokeWidth={0.6} />
                    )}

                    {index === 1 && (
                      <MapPin size={85} strokeWidth={0.6} />
                    )}

                    {index === 2 && (
                      <CarFront size={85} strokeWidth={0.6} />
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="how-it-works__bottom">
          <span>
            Simple by design. Premium by experience.
          </span>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
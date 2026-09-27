// car-rental-platform/src/components/home/FinalCTA/FinalCTA.jsx

import { motion } from "motion/react";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./FinalCTA.scss";

function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="final-cta">
      <div className="final-cta-background">
        <div className="final-cta-glow final-cta-glow-one" />
        <div className="final-cta-glow final-cta-glow-two" />
      </div>

      <div className="container">
        <motion.div
          className="final-cta-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="final-cta-top">
            <div className="final-cta-label">
              <span className="final-cta-label-dot" />
              READY WHEN YOU ARE
            </div>

            <div className="final-cta-coordinate">
              20° 35' N / 78° 57' E
            </div>
          </div>

          <div className="final-cta-content">
            <div className="final-cta-copy">
              <div className="final-cta-icon">
                <Compass size={21} strokeWidth={1.4} />
              </div>

              <h2>
                Your next
                <br />
                <span>road is waiting.</span>
              </h2>

              <p>
                Pick the car. Set the destination. Let the road take care of
                the rest.
              </p>

              <div className="final-cta-actions">
                <button
                  type="button"
                  className="final-cta-primary"
                  onClick={() => navigate("/cars")}
                >
                  <span>Explore the fleet</span>

                  <span className="final-cta-primary-icon">
                    <ArrowUpRight size={17} />
                  </span>
                </button>

                <button
                  type="button"
                  className="final-cta-secondary"
                  onClick={() => navigate("/contact")}
                >
                  Talk to us
                </button>
              </div>
            </div>

            <div className="final-cta-mark">
              <Sparkles size={18} strokeWidth={1.2} />

              <span>DRIVIO</span>

              <strong>DRIVE<br />BEYOND<br />ORDINARY.</strong>
            </div>
          </div>

          <div className="final-cta-bottom">
            <span>CURATED VEHICLES</span>
            <span>SEAMLESS JOURNEYS</span>
            <span>UNFORGETTABLE DRIVES</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
// car-rental-platform/src/components/home/FAQ/FAQ.jsx

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import faq from "../../../data/faq";
import "../FAQ/FAQ.scss";

function FAQ() {
  const [activeId, setActiveId] = useState(1);

  const activeFaq = faq.find((item) => item.id === activeId);

  const toggleFaq = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <div className="faq-eyebrow">
            <span />
            QUESTIONS, ANSWERED
          </div>

          <div className="faq-heading">
            <h2>
              Before you
              <br />
              <span>hit the road.</span>
            </h2>

            <p>
              Everything you need to know before choosing your next DRIVIO
              experience.
            </p>
          </div>
        </div>

        <div className="faq-layout">
          <div className="faq-list">
            {faq.map((item) => {
              const isActive = item.id === activeId;

              return (
                <div
                  key={item.id}
                  className={`faq-item ${isActive ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(item.id)}
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="faq-question-left">
                      <span className="faq-number">
                        {String(item.id).padStart(2, "0")}
                      </span>

                      <span className="faq-question-text">
                        {item.question}
                      </span>
                    </div>

                    <span className="faq-chevron">
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        className="faq-mobile-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="faq-answer-panel">
            <div className="faq-answer-decoration">
              <HelpCircle size={22} strokeWidth={1.3} />
              <span>DRIVIO GUIDE</span>
            </div>

            <AnimatePresence mode="wait">
              {activeFaq ? (
                <motion.div
                  key={activeFaq.id}
                  className="faq-answer-content"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="faq-answer-number">
                    {String(activeFaq.id).padStart(2, "0")}
                  </span>

                  <h3>{activeFaq.question}</h3>

                  <p>{activeFaq.answer}</p>

                  <div className="faq-answer-footer">
                    <span>NEED TO KNOW</span>

                    <span className="faq-answer-line" />

                    <span>01 — 06</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="faq-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span>SELECT A QUESTION</span>
                  <ArrowUpRight size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="faq-bottom">
          <div>
            <span className="faq-bottom-label">STILL CURIOUS?</span>
            <strong>Let's talk about your journey.</strong>
          </div>

          <a href="/contact" className="faq-contact">
            <span>Contact DRIVIO</span>
            <span className="faq-contact-icon">
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
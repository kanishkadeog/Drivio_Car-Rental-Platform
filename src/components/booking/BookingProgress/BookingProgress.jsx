// car-rental-platform/src/components/booking/BookingProgress/BookingProgress.jsx

import { motion } from "motion/react";
import {
  CarFront,
  MapPin,
  UserRound,
  ClipboardCheck,
  Check,
  CheckCheck,
} from "lucide-react";

import "../BookingProgress/BookingProgress.scss";

const steps = [
  {
    id: 1,
    label: "Vehicle",
    icon: CarFront,
  },
  {
    id: 2,
    label: "Journey",
    icon: MapPin,
  },
  {
    id: 3,
    label: "Your Details",
    icon: UserRound,
  },
  {
    id: 4,
    label: "Review",
    icon: ClipboardCheck,
  },
   {
    id: 5,
    label: "Confirm",
    icon: CheckCheck,
  },
];

function BookingProgress({ currentStep = 1 }) {
  return (
    <div className="booking-progress">
      {steps.map((step, index) => {
        const Icon = step.icon;

        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div
            className="booking-progress__step-wrapper"
            key={step.id}
          >
            <div
              className={[
                "booking-progress__step",
                isActive
                  ? "booking-progress__step--active"
                  : "",
                isCompleted
                  ? "booking-progress__step--completed"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <motion.div
                className="booking-progress__circle"
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                {isCompleted ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : (
                  <Icon size={17} strokeWidth={2} />
                )}
              </motion.div>

              <div className="booking-progress__text">
                <span className="booking-progress__number">
                  0{step.id}
                </span>

                <span className="booking-progress__label">
                  {step.label}
                </span>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="booking-progress__line">
                <motion.div
                  className="booking-progress__line-fill"
                  initial={{ width: "0%" }}
                  animate={{
                    width:
                      currentStep > step.id
                        ? "100%"
                        : "0%",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingProgress;

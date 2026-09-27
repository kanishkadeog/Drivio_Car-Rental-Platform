// car-rental-platform/src/pages/Booking/Booking.jsx

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Download,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  calculateRental,
  formatCurrency,
  formatBookingDate,
  generateBookingId,
} from "../../utils/bookingUtils";

// import { Link, useParams } from "react-router-dom";
import { Link,  useParams } from "react-router-dom";

import { useBooking } from "../../context/BookingContext";

import cars from "../../data/cars";

import BookingProgress from "../../components/booking/BookingProgress/BookingProgress";

import "./Booking.scss";


function Booking() {
  const { carId } = useParams();

  const {
    booking,
    setCurrentStep,
    setVehicle,
  } = useBooking();



const currentStep = booking.currentStep || 1;

const selectedCar = cars.find(
  (car) => String(car.id) === String(carId)
);

useEffect(() => {
  if (!selectedCar) {
    return;
  }

  if (booking.vehicle?.id !== selectedCar.id) {
    setVehicle(selectedCar);
  }
}, [
  selectedCar,
  booking.vehicle,
  setVehicle,
]);



  return (
    <main className="booking-page">

      {/* ============================================
          PAGE HEADER
      ============================================ */}

      <section className="booking-page__header">
        <div className="container">

          <motion.div
            className="booking-page__back"
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <Link to={`/cars/${carId}`}>
              <ArrowLeft size={16} />
              Back to vehicle
            </Link>
          </motion.div>

          <motion.div
            className="booking-page__heading"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
            }}
          >
            <div className="booking-page__eyebrow">
              <Sparkles size={14} />
              RESERVATION
            </div>

            <h1>
              Complete your
              <span> reservation.</span>
            </h1>

            <p>
              A few details and your next journey
              is ready to begin.
            </p>
          </motion.div>

        </div>
      </section>


      {/* ============================================
          BOOKING CONTENT
      ============================================ */}

      <section className="booking-page__content">
        <div className="container">

          <BookingProgress
            currentStep={currentStep}
          />


          <div className="booking-layout">

            {/* ======================================
                MAIN PANEL
            ====================================== */}

            <motion.div
              className="booking-main"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
            >

              <div className="booking-main__top">
                <span>
                  STEP 0{currentStep}
                </span>

                <div className="booking-main__status">
                  <span />
                  Secure booking
                </div>
              </div>


              <div className="booking-main__body">

                 {currentStep === 1 && (
                   <BookingVehicleStep
                     car={selectedCar}
                       onContinue={() => setCurrentStep(2)}
                   />
                  )}

                 {currentStep === 2 && (
                     <BookingJourneyStep
                         onBack={() => setCurrentStep(1)}
                         onContinue={() => setCurrentStep(3)}
                      />
                  )}

                 {currentStep === 3 && (
                     <BookingDetailsStep
                         onBack={() => setCurrentStep(2)}
                         onContinue={() => setCurrentStep(4)}
                      />
                  )}

                  {/* {currentStep === 4 && (
                      <BookingReviewStep
                          onBack={() => setCurrentStep(3)}
                          onConfirm={() => setCurrentStep(5)}
                      />
                   )} */}

                   {currentStep === 4 && (
                      <BookingReviewStep
                        onBack={() => setCurrentStep(3)}
                      />
                   )}

                   {currentStep === 5 && (
                      <BookingConfirmationStep />
                    )}

              </div>

            </motion.div>


            {/* ======================================
                SUMMARY PANEL
            ====================================== */}

            <BookingSummary />

          </div>

        </div>
      </section>

    </main>
  );
}


// ============================================
// STEP 01
// ============================================

function BookingVehicleStep({
  car,
  onContinue,
}) {
  if (!car) {
    return (
      <div className="booking-empty">
        <div className="booking-empty__icon">
          !
        </div>

        <h2>
          Vehicle not found
        </h2>

        <p>
          We couldn't find the vehicle you're
          trying to reserve.
        </p>

        <Link to="/cars">
          Browse vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="vehicle-step">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="vehicle-step__header">

        <div>
          <span className="vehicle-step__eyebrow">
            STEP 01 · VEHICLE
          </span>

          <h2>
            Confirm your vehicle
          </h2>

          <p>
            Make sure you've selected the vehicle
            you want for your journey.
          </p>
        </div>

        <div className="vehicle-step__check">
          ✓
        </div>

      </div>


      {/* ==========================================
          VEHICLE CARD
      ========================================== */}

      <motion.div
        className="vehicle-card"
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >

        <div className="vehicle-card__image">

          <img
            src={car.images?.[0]}
            alt={`${car.name} ${car.model}`}
          />

          <div className="vehicle-card__image-badge">
            {car.available
              ? "AVAILABLE"
              : "UNAVAILABLE"}
          </div>

        </div>


        <div className="vehicle-card__content">

          <div className="vehicle-card__identity">

            <div>
              <span className="vehicle-card__brand">
                {car.brand}
              </span>

              <h3>
                {car.name}
              </h3>

              <p>
                {car.model}
              </p>
            </div>

            <div className="vehicle-card__price">
              <strong>
                ₹{Number(car.pricePerDay).toLocaleString(
                  "en-IN"
                )}
              </strong>

              <span>
                / day
              </span>
            </div>

          </div>


          {/* ======================================
              SPECS
          ====================================== */}

          <div className="vehicle-card__specs">

            <div className="vehicle-card__spec">
              <span>
                FUEL
              </span>

              <strong>
                {car.fuel}
              </strong>
            </div>

            <div className="vehicle-card__spec">
              <span>
                SEATS
              </span>

              <strong>
                {car.seats}
              </strong>
            </div>

            <div className="vehicle-card__spec">
              <span>
                TRANSMISSION
              </span>

              <strong>
                {car.transmission}
              </strong>
            </div>

          </div>

        </div>

      </motion.div>


      {/* ==========================================
          CONFIRMATION
      ========================================== */}

      <div className="vehicle-step__confirmation">

        <div>
          <span className="vehicle-step__confirmation-icon">
            ✓
          </span>

          <div>
            <strong>
              Vehicle selected
            </strong>

            <p>
              {car.name} is ready for your journey.
            </p>
          </div>
        </div>

        <span>
          ₹{Number(car.pricePerDay).toLocaleString(
            "en-IN"
          )} / day
        </span>

      </div>


      {/* ==========================================
          ACTION
      ========================================== */}

      <div className="vehicle-step__actions">

        <Link
          to={`/cars/${car.id}`}
          className="vehicle-step__back"
        >
          Change vehicle
        </Link>

        <button
          type="button"
          className="vehicle-step__continue"
          onClick={onContinue}
          disabled={!car.available}
        >
          <span>
            Continue to journey
          </span>

          <span>
            →
          </span>
        </button>

      </div>

    </div>
  );
}

// ============================================
// STEP 02
// ============================================

function BookingJourneyStep({
  onBack,
  onContinue,
}) {
  const {
    booking,
    setJourney,
  } = useBooking();

  const journey = booking.journey;

  const [errors, setErrors] = useState({});

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const rental = useMemo(() => {
    return calculateRental(
      booking.vehicle?.pricePerDay,
      journey.pickupDate,
      journey.returnDate
    );
  }, [
    booking.vehicle,
    journey.pickupDate,
    journey.returnDate,
  ]);

const handleChange = (field, value) => {
  setJourney({
    [field]: value,
  });

  setErrors((prev) => ({
    ...prev,
    [field]: "",
  }));

  if (
    field === "pickupDate" &&
    journey.returnDate &&
    journey.returnDate <= value
  ) {
    setJourney({
      pickupDate: value,
      returnDate: "",
    });
  }
};

  const validateJourney = () => {
    const nextErrors = {};

    if (!journey.pickupLocation.trim()) {
      nextErrors.pickupLocation =
        "Please select a pickup location.";
    }

    if (!journey.pickupDate) {
      nextErrors.pickupDate =
        "Please select a pickup date.";
    }

    if (!journey.pickupTime) {
      nextErrors.pickupTime =
        "Please select a pickup time.";
    }

    if (!journey.returnLocation.trim()) {
      nextErrors.returnLocation =
        "Please select a return location.";
    }

    if (!journey.returnDate) {
      nextErrors.returnDate =
        "Please select a return date.";
    }

    if (!journey.returnTime) {
      nextErrors.returnTime =
        "Please select a return time.";
    }

    if (
      journey.pickupDate &&
      journey.returnDate &&
      journey.returnDate <= journey.pickupDate
    ) {
      nextErrors.returnDate =
        "Return date must be after pickup date.";
    }

    if (
      journey.pickupDate === today &&
      journey.pickupTime
    ) {
      const now = new Date();

      const [hours, minutes] =
        journey.pickupTime
          .split(":")
          .map(Number);

      const selectedTime = new Date();

      selectedTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      if (selectedTime <= now) {
        nextErrors.pickupTime =
          "Please select a future pickup time.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateJourney()) {
      return;
    }

    onContinue();
  };

  const minimumReturnDate =
    journey.pickupDate
      ? getNextDate(journey.pickupDate)
      : getNextDate(today);

  return (
    <div className="journey-step">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="journey-step__header">

        <div>
          <span className="journey-step__eyebrow">
            STEP 02 · JOURNEY
          </span>

          <h2>
            Plan your journey
          </h2>

          <p>
            Tell us when and where your journey
            begins and ends.
          </p>
        </div>

        <div className="journey-step__icon">
          <MapPin size={20} />
        </div>

      </div>


      {/* ==========================================
          PICKUP
      ========================================== */}

      <div className="journey-section">

        <div className="journey-section__heading">

          <div className="journey-section__number">
            01
          </div>

          <div>
            <h3>
              Pickup
            </h3>

            <p>
              Where your journey begins
            </p>
          </div>

        </div>


        <div className="journey-fields">

          <BookingField
            label="Pickup location"
            icon={<MapPin size={16} />}
            error={errors.pickupLocation}
          >
            <select
              value={journey.pickupLocation}
              onChange={(event) =>
                handleChange(
                  "pickupLocation",
                  event.target.value
                )
              }
            >
              <option value="">
                Select pickup location
              </option>

              <option value="Pune Airport">
                Pune Airport
              </option>

              <option value="Pune Railway Station">
                Pune Railway Station
              </option>

              <option value="Hinjewadi">
                Hinjewadi
              </option>

              <option value="Koregaon Park">
                Koregaon Park
              </option>

              <option value="Kharadi">
                Kharadi
              </option>
            </select>
          </BookingField>


          <BookingField
            label="Pickup date"
            icon={<CalendarDays size={16} />}
            error={errors.pickupDate}
          >
            <input
              type="date"
              min={today}
              value={journey.pickupDate}
              onChange={(event) =>
                handleChange(
                  "pickupDate",
                  event.target.value
                )
              }
            />
          </BookingField>


          <BookingField
            label="Pickup time"
            icon={<Clock3 size={16} />}
            error={errors.pickupTime}
          >
            <input
              type="time"
              value={journey.pickupTime}
              onChange={(event) =>
                handleChange(
                  "pickupTime",
                  event.target.value
                )
              }
            />
          </BookingField>

        </div>

      </div>


      {/* ==========================================
          RETURN
      ========================================== */}

      <div className="journey-section">

        <div className="journey-section__heading">

          <div className="journey-section__number">
            02
          </div>

          <div>
            <h3>
              Return
            </h3>

            <p>
              Where your journey ends
            </p>
          </div>

        </div>


        <div className="journey-fields">

          <BookingField
            label="Return location"
            icon={<MapPin size={16} />}
            error={errors.returnLocation}
          >
            <select
              value={journey.returnLocation}
              onChange={(event) =>
                handleChange(
                  "returnLocation",
                  event.target.value
                )
              }
            >
              <option value="">
                Select return location
              </option>

              <option value="Pune Airport">
                Pune Airport
              </option>

              <option value="Pune Railway Station">
                Pune Railway Station
              </option>

              <option value="Hinjewadi">
                Hinjewadi
              </option>

              <option value="Koregaon Park">
                Koregaon Park
              </option>

              <option value="Kharadi">
                Kharadi
              </option>
            </select>
          </BookingField>


          <BookingField
            label="Return date"
            icon={<CalendarDays size={16} />}
            error={errors.returnDate}
          >
            <input
              type="date"
              min={minimumReturnDate}
              value={journey.returnDate}
              onChange={(event) =>
                handleChange(
                  "returnDate",
                  event.target.value
                )
              }
            />
          </BookingField>


          <BookingField
            label="Return time"
            icon={<Clock3 size={16} />}
            error={errors.returnTime}
          >
            <input
              type="time"
              value={journey.returnTime}
              onChange={(event) =>
                handleChange(
                  "returnTime",
                  event.target.value
                )
              }
            />
          </BookingField>

        </div>

      </div>


      {/* ==========================================
          LIVE PRICE
      ========================================== */}

      {rental.days > 0 && (
        <motion.div
          className="journey-price"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <div className="journey-price__duration">

            <span>
              RENTAL DURATION
            </span>

            <strong>
              {rental.days}{" "}
              {rental.days === 1
                ? "day"
                : "days"}
            </strong>

          </div>


          <div className="journey-price__calculation">

            <span>
              {formatCurrency(
                rental.dailyRate
              )} × {rental.days} days
            </span>

            <strong>
              {formatCurrency(
                rental.subtotal
              )}
            </strong>

          </div>

        </motion.div>
      )}


      {/* ==========================================
          ACTIONS
      ========================================== */}

      <div className="journey-step__actions">

        <button
          type="button"
          className="journey-step__back"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to vehicle
        </button>

        <button
          type="button"
          className="journey-step__continue"
          onClick={handleContinue}
        >
          Continue to details
          <ArrowRight size={16} />
        </button>

      </div>

    </div>
  );
}

// -----------

function BookingField({
  label,
  icon,
  error,
  children,
}) {
  return (
    <div
      className={[
        "booking-field",
        error ? "booking-field--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <label>

        <span className="booking-field__label">
          {label}
        </span>

        <div className="booking-field__control">

          <span className="booking-field__icon">
            {icon}
          </span>

          {children}

        </div>

      </label>

      {error && (
        <span className="booking-field__error">
          {error}
        </span>
      )}

    </div>
  );
}


// ---------

function getNextDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  date.setDate(date.getDate() + 1);

  return date
    .toISOString()
    .split("T")[0];
}


// ============================================
// STEP 03
// ============================================

function BookingDetailsStep({
  onBack,
  onContinue,
}) {
  const {
    booking,
    setCustomer,
  } = useBooking();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      fullName:
        booking.customer?.fullName || "",

      email:
        booking.customer?.email || "",

      phone:
        booking.customer?.phone || "",

      notes:
        booking.customer?.notes || "",
    },

    mode: "onBlur",
  });

  const onSubmit = (data) => {
    setCustomer(data);

    onContinue();
  };

  return (
    <div className="details-step">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="details-step__header">

        <div>
          <span className="details-step__eyebrow">
            STEP 03 · YOUR DETAILS
          </span>

          <h2>
            Tell us about you
          </h2>

          <p>
            We’ll use these details to keep you
            updated about your reservation.
          </p>
        </div>

        <div className="details-step__icon">
          <UserRound size={20} />
        </div>

      </div>


      {/* ==========================================
          FORM
      ========================================== */}

      <form
        className="details-form"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* ========================================
            PERSONAL INFORMATION
        ======================================== */}

        <div className="details-form__section">

          <div className="details-form__section-heading">

            <span>
              01
            </span>

            <div>
              <h3>
                Contact information
              </h3>

              <p>
                Your basic contact details
              </p>
            </div>

          </div>


          <div className="details-form__grid">

            {/* FULL NAME */}

            <BookingInput
              label="Full name"
              icon={<UserRound size={16} />}
              placeholder="Enter your full name"
              error={errors.fullName?.message}
              {...register("fullName", {
                required:
                  "Please enter your full name.",

                minLength: {
                  value: 2,
                  message:
                    "Name must contain at least 2 characters.",
                },

                pattern: {
                  value:
                    /^[A-Za-zÀ-ÿ]+(?:[\s'-][A-Za-zÀ-ÿ]+)*$/,
                  message:
                    "Please enter a valid name.",
                },
              })}
            />


            {/* EMAIL */}

            <BookingInput
              label="Email address"
              type="email"
              icon={<Mail size={16} />}
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required:
                  "Please enter your email address.",

                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address.",
                },
              })}
            />


            {/* PHONE */}

            <BookingInput
              label="Phone number"
              type="tel"
              icon={<Phone size={16} />}
              placeholder="10-digit mobile number"
              error={errors.phone?.message}
              {...register("phone", {
                required:
                  "Please enter your phone number.",

                pattern: {
                  value:
                    /^[1-9]\d{9}$/, 
                    // "[1-9]" as phone number can start frrom 1 to 9 any number 
                  message:
                    "Enter a valid 10-digit mobile number.",
                },
              })}
            />

          </div>

        </div>


        {/* ========================================
            NOTES
        ======================================== */}

        <div className="details-form__section">

          <div className="details-form__section-heading">

            <span>
              02
            </span>

            <div>
              <h3>
                Additional notes
              </h3>

              <p>
                Anything we should know before your
                journey?
              </p>
            </div>

          </div>


          <div className="details-form__textarea">

            <label>
              <span>
                Notes
              </span>

              <textarea
                placeholder="Add a request, special requirement, or anything else..."
                rows={5}
                maxLength={500}
                {...register("notes")}
              />

            </label>

            <small>
              Optional · Maximum 500 characters
            </small>

          </div>

        </div>


        {/* ========================================
            PRIVACY NOTICE
        ======================================== */}

        <div className="details-form__privacy">

          <ShieldCheck size={17} />

          <div>
            <strong>
              Your information is secure
            </strong>

            <p>
              Your contact details are only used
              to manage this reservation and keep
              you updated about your journey.
            </p>
          </div>

        </div>


        {/* ========================================
            ACTIONS
        ======================================== */}

        <div className="details-step__actions">

          <button
            type="button"
            className="details-step__back"
            onClick={onBack}
          >
            <ArrowLeft size={15} />
            Back to journey
          </button>


          <button
            type="submit"
            className="details-step__continue"
          >
            Continue to review

            <ArrowRight size={16} />

          </button>

        </div>

      </form>

    </div>
  );
}


// ---------

const BookingInput = ({
  label,
  icon,
  error,
  ...props
}) => {
  return (
    <div
      className={[
        "booking-input",
        error
          ? "booking-input--error"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <label>

        <span className="booking-input__label">
          {label}
        </span>

        <div className="booking-input__control">

          <span className="booking-input__icon">
            {icon}
          </span>

          <input {...props} />

        </div>

      </label>


      {error && (
        <span className="booking-input__error">
          {error}
        </span>
      )}

    </div>
  );
};


// ============================================
// STEP 04 — REVIEW & CONFIRM
// ============================================

function BookingReviewStep({
  onBack,
  onConfirm,
}) {

  const {
     booking,
     setCurrentStep,
     setBookingId,
  } = useBooking();

  const vehicle = booking.vehicle;
  const journey = booking.journey;
  const customer = booking.customer;

  const rental = useMemo(() => {
    return calculateRental(
      vehicle?.pricePerDay,
      journey?.pickupDate,
      journey?.returnDate
    );
  }, [
    vehicle?.pricePerDay,
    journey?.pickupDate,
    journey?.returnDate,
  ]);

 

  const formatTime = (timeString) => {
    if (!timeString) {
      return "";
    }

    const [hours, minutes] = timeString
      .split(":")
      .map(Number);

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const serviceFee = Math.round(
    rental.subtotal * 0.1
  );

  const total = rental.subtotal + serviceFee;

  const handleConfirm = () => {
  const bookingId = generateBookingId();

  setBookingId(bookingId);
  setCurrentStep(5);
  onConfirm?.();
  };

  return (
    <div className="review-step">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="review-step__header">

        <div>
          <span className="review-step__eyebrow">
            STEP 04 · REVIEW
          </span>

          <h2>
            Review your booking
          </h2>

          <p>
            Everything looks good? Review the
            details below and confirm your reservation.
          </p>
        </div>

        <div className="review-step__icon">
          <Check size={20} />
        </div>

      </div>


      {/* ========================================
          VEHICLE
      ======================================== */}

      <section className="review-section">

        <div className="review-section__header">

          <div>
            <span className="review-section__eyebrow">
              01 · YOUR VEHICLE
            </span>

            <h3>
              Selected vehicle
            </h3>
          </div>

          <button
            type="button"
            className="review-section__edit"
            onClick={() => setCurrentStep(1)}
          >
            Edit
          </button>

        </div>


        <div className="review-vehicle">

          <div className="review-vehicle__image">

            {vehicle?.images?.[0] ? (
              <img
                src={vehicle.images[0]}
                alt={`${vehicle.brand} ${vehicle.name}`}
              />
            ) : (
              <span>
                VEHICLE
              </span>
            )}

          </div>


          <div className="review-vehicle__info">

            <span className="review-vehicle__brand">
              {vehicle?.brand || "—"}
            </span>

            <h4>
              {vehicle?.name || "Vehicle not selected"}
            </h4>

            <p>
              {vehicle?.model || ""}
            </p>

          </div>


          <div className="review-vehicle__price">

            <strong>
              {formatCurrency(
                vehicle?.pricePerDay || 0
              )}
            </strong>

            <span>
              / day
            </span>

          </div>

        </div>

      </section>


      {/* ========================================
          JOURNEY
      ======================================== */}

      <section className="review-section">

        <div className="review-section__header">

          <div>
            <span className="review-section__eyebrow">
              02 · YOUR JOURNEY
            </span>

            <h3>
              Pickup & return
            </h3>
          </div>

          <button
            type="button"
            className="review-section__edit"
            onClick={() => setCurrentStep(2)}
          >
            Edit
          </button>

        </div>


        <div className="review-journey">

          {/* PICKUP */}

          <div className="review-journey__point">

            <div className="review-journey__marker">
              <MapPin size={13} />
            </div>

            <div className="review-journey__content">

              <span>
                PICKUP
              </span>

              <strong>
                {journey?.pickupLocation || "—"}
              </strong>

              <small>
                {formatBookingDate(journey?.pickupDate)}
                {journey?.pickupTime && (
                  <>
                    {" · "}
                    {formatTime(journey.pickupTime)}
                  </>
                )}
              </small>

            </div>

          </div>


          <div className="review-journey__connector">
            <span />
          </div>


          {/* RETURN */}

          <div className="review-journey__point">

            <div className="review-journey__marker">
              <MapPin size={13} />
            </div>

            <div className="review-journey__content">

              <span>
                RETURN
              </span>

              <strong>
                {journey?.returnLocation || "—"}
              </strong>

              <small>
                {formatBookingDate(journey?.returnDate)}
                {journey?.returnTime && (
                  <>
                    {" · "}
                    {formatTime(journey.returnTime)}
                  </>
                )}
              </small>

            </div>

          </div>

        </div>


        <div className="review-duration">

          <div>
            <Clock3 size={15} />

            <span>
              Rental duration
            </span>
          </div>

          <strong>
            {rental.days > 0
              ? `${rental.days} ${
                  rental.days === 1
                    ? "day"
                    : "days"
                }`
              : "—"}
          </strong>

        </div>

      </section>


      {/* ========================================
          CUSTOMER DETAILS
      ======================================== */}

      <section className="review-section">

        <div className="review-section__header">

          <div>
            <span className="review-section__eyebrow">
              03 · YOUR DETAILS
            </span>

            <h3>
              Customer information
            </h3>
          </div>

          <button
            type="button"
            className="review-section__edit"
            onClick={() => setCurrentStep(3)}
          >
            Edit
          </button>

        </div>


        <div className="review-customer">

          <div className="review-customer__item">

            <UserRound size={15} />

            <div>
              <span>
                FULL NAME
              </span>

              <strong>
                {customer?.fullName || "—"}
              </strong>
            </div>

          </div>


          <div className="review-customer__item">

            <Mail size={15} />

            <div>
              <span>
                EMAIL
              </span>

              <strong>
                {customer?.email || "—"}
              </strong>
            </div>

          </div>


          <div className="review-customer__item">

            <Phone size={15} />

            <div>
              <span>
                PHONE
              </span>

              <strong>
                {customer?.phone || "—"}
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          FINAL PRICE
      ======================================== */}

      <section className="review-pricing">

        <div className="review-pricing__heading">

          <span>
            FINAL AMOUNT
          </span>

          <h3>
            Reservation total
          </h3>

        </div>


        <div className="review-pricing__rows">

          <div>
            <span>
              Rental
            </span>

            <strong>
              {formatCurrency(
                rental.subtotal || 0
              )}
            </strong>
          </div>


          <div>
            <span>
              Service fee (10%)
            </span>

            <strong>
              {formatCurrency(serviceFee)}
            </strong>
          </div>

        </div>


        <div className="review-pricing__divider" />


        <div className="review-pricing__total">

          <span>
            TOTAL
          </span>

          <strong>
            {formatCurrency(total)}
          </strong>

        </div>

      </section>


      {/* ========================================
          ACTIONS
      ======================================== */}

      <div className="review-step__actions">

        <button
          type="button"
          className="review-step__back"
          onClick={onBack}
        >
          <ArrowLeft size={15} />
          Back to details
        </button>


        <button
          type="button"
          className="review-step__confirm"
          onClick={handleConfirm}
        >
          <span>
            Confirm booking
          </span>

          <ArrowRight size={16} />

        </button>

      </div>

    </div>
  );
}

// ------

// ============================================
// STEP 05 — BOOKING CONFIRMATION
// ============================================


function BookingConfirmationStep() {
  const { booking,  } = useBooking();

  const vehicle = booking.vehicle;
  const journey = booking.journey;
  const customer = booking.customer;

  const rental = calculateRental(
    vehicle?.pricePerDay,
    journey?.pickupDate,
    journey?.returnDate
  );

  const serviceFee = Math.round(
    rental.subtotal * 0.1
  );

  const total = rental.subtotal + serviceFee;

  const formatTime = (timeString) => {
    if (!timeString) {
      return "—";
    }

    const [hours, minutes] = timeString
      .split(":")
      .map(Number);

    const date = new Date();

    date.setHours(
      hours,
      minutes,
      0,
      0
    );

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="confirmation-step">

      {/* ========================================
          SUCCESS HEADER
      ======================================== */}

      <motion.div
        className="confirmation-step__success"
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
        }}
      >
        <div className="confirmation-step__success-icon">
          <Check size={30} strokeWidth={2.5} />
        </div>

        <span className="confirmation-step__eyebrow">
          RESERVATION CONFIRMED
        </span>

        <h2>
          You're all set
          {customer?.fullName
            ? `, ${customer.fullName.split(" ")[0]}`
            : ""}.
        </h2>

        <p>
          Your DRIVIO reservation has been
          confirmed successfully. Your vehicle
          will be ready for your journey.
        </p>
      </motion.div>


      {/* ========================================
          BOOKING ID
      ======================================== */}

      <motion.div
        className="confirmation-step__booking-id"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.12,
        }}
      >
        <div>
          <span>
            BOOKING ID
          </span>

          <strong>
            {booking.bookingId || "—"}
          </strong>
        </div>

        <div className="confirmation-step__booking-status">
          <span />
          CONFIRMED
        </div>
      </motion.div>


      {/* ========================================
          VEHICLE
      ======================================== */}

      <motion.section
        className="confirmation-card"
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.18,
        }}
      >
        <div className="confirmation-card__header">
          <div>
            <span>
              01 · VEHICLE
            </span>

            <h3>
              Your reserved vehicle
            </h3>
          </div>
        </div>

        <div className="confirmation-vehicle">

          <div className="confirmation-vehicle__image">
            {vehicle?.images?.[0] ? (
              <img
                src={vehicle.images[0]}
                alt={`${vehicle.brand} ${vehicle.name}`}
              />
            ) : (
              <span>
                VEHICLE
              </span>
            )}
          </div>

          <div className="confirmation-vehicle__info">
            <span>
              {vehicle?.brand || "—"}
            </span>

            <h4>
              {vehicle?.name || "Vehicle"}
            </h4>

            <p>
              {vehicle?.model || ""}
            </p>
          </div>

          <div className="confirmation-vehicle__price">
            <strong>
              {formatCurrency(
                vehicle?.pricePerDay || 0
              )}
            </strong>

            <span>
              / day
            </span>
          </div>

        </div>
      </motion.section>


      {/* ========================================
          JOURNEY
      ======================================== */}

      <motion.section
        className="confirmation-card"
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.24,
        }}
      >
        <div className="confirmation-card__header">
          <div>
            <span>
              02 · JOURNEY
            </span>

            <h3>
              Pickup & return
            </h3>
          </div>
        </div>

        <div className="confirmation-journey">

          <div className="confirmation-journey__point">
            <div className="confirmation-journey__marker">
              <MapPin size={14} />
            </div>

            <div>
              <span>
                PICKUP
              </span>

              <strong>
                {journey?.pickupLocation || "—"}
              </strong>

              <small>
                {formatBookingDate(
                  journey?.pickupDate
                )}

                {" · "}

                {formatTime(
                  journey?.pickupTime
                )}
              </small>
            </div>
          </div>


          <div className="confirmation-journey__line">
            <span />
          </div>


          <div className="confirmation-journey__point">
            <div className="confirmation-journey__marker">
              <MapPin size={14} />
            </div>

            <div>
              <span>
                RETURN
              </span>

              <strong>
                {journey?.returnLocation || "—"}
              </strong>

              <small>
                {formatBookingDate(
                  journey?.returnDate
                )}

                {" · "}

                {formatTime(
                  journey?.returnTime
                )}
              </small>
            </div>
          </div>

        </div>

        <div className="confirmation-duration">
          <Clock3 size={15} />

          <span>
            Rental duration
          </span>

          <strong>
            {rental.days}{" "}
            {rental.days === 1
              ? "day"
              : "days"}
          </strong>
        </div>
      </motion.section>


      {/* ========================================
          PRICE
      ======================================== */}

      <motion.section
        className="confirmation-card confirmation-card--pricing"
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.30,
        }}
      >
        <div className="confirmation-card__header">
          <div>
            <span>
              03 · PAYMENT SUMMARY
            </span>

            <h3>
              Reservation total
            </h3>
          </div>
        </div>

        <div className="confirmation-pricing">

          <div>
            <span>
              Rental · {rental.days}{" "}
              {rental.days === 1
                ? "day"
                : "days"}
            </span>

            <strong>
              {formatCurrency(
                rental.subtotal
              )}
            </strong>
          </div>

          <div>
            <span>
              Service fee
            </span>

            <strong>
              {formatCurrency(
                serviceFee
              )}
            </strong>
          </div>

          <div className="confirmation-pricing__divider" />

          <div className="confirmation-pricing__total">
            <span>
              TOTAL
            </span>

            <strong>
              {formatCurrency(total)}
            </strong>
          </div>

        </div>
      </motion.section>


      {/* ========================================
          CUSTOMER
      ======================================== */}

      {customer?.fullName && (
        <motion.div
          className="confirmation-customer"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.35,
          }}
        >
          <div className="confirmation-customer__icon">
            <UserRound size={16} />
          </div>

          <div>
            <span>
              RESERVATION HOLDER
            </span>

            <strong>
              {customer.fullName}
            </strong>
          </div>

          <div className="confirmation-customer__contact">
            <span>
              {customer.email}
            </span>

            <span>
              {customer.phone}
            </span>
          </div>
        </motion.div>
      )}


      {/* ========================================
          NOTICE
      ======================================== */}

      <div className="confirmation-notice">
        <ShieldCheck size={17} />

        <div>
          <strong>
            Your reservation is secure
          </strong>

          <p>
            No payment has been collected.
            Keep your booking ID handy for
            your upcoming journey.
          </p>
        </div>
      </div>


      {/* ========================================
          ACTIONS
      ======================================== */}

 <div className="confirmation-step__actions">

        <Link
          to="/cars"
          className="confirmation-step__home"
        
        >
          <Home size={18} />
          Back to fleet
        </Link>

        <button
          type="button"
          className="confirmation-step__print"
          onClick={() => window.print()}
        >
          <Download size={18} />
          Save reservation
        </button>

      </div> 

      {/* ======== */}

      

    </div>
  );
}

// ============================================
// BOOKING SUMMARY
// ============================================

function BookingSummary() {
  const { booking } = useBooking();

  const rental = calculateRental(
  booking.vehicle?.pricePerDay,
  booking.journey?.pickupDate,
  booking.journey?.returnDate
);

  return (
    <aside className="booking-summary">

      <div className="booking-summary__header">
        <div>
          <span>
            YOUR RESERVATION
          </span>

          <h3>
            Booking summary
          </h3>
        </div>

        <div className="booking-summary__secure">
          <ShieldCheck size={17} />
        </div>
      </div>


      <div className="booking-summary__vehicle">

      <div className="booking-summary__vehicle-image">
         {booking.vehicle?.images?.[0] ? (
           <img
                src={booking.vehicle.images[0]}
               alt={booking.vehicle.name}
           />
          ) : (
            <span>
               VEHICLE
            </span>
          )}
       </div>

        <div className="booking-summary__vehicle-info">
          <span>
            Selected vehicle
          </span>

          <strong>
            {booking.vehicle?.name || "Not selected"}
          </strong>

          <small>
            {booking.vehicle?.brand || "Choose your vehicle"}
          </small>
        </div>

      </div>


      <div className="booking-summary__divider" />

{booking.journey?.pickupDate && (
  <div className="booking-summary__journey">

    <div>
      <span>
        PICKUP: 
      </span>

      <strong>
        {booking.journey.pickupLocation || "—"}
      </strong>

      <small>
        {booking.journey.pickupDate}
        {booking.journey.pickupTime
          ? ` · ${booking.journey.pickupTime}`
          : ""}
      </small>
    </div>


    <div className="booking-summary__journey-arrow">
      →
    </div>


    <div>
      <span>
        RETURN: 
      </span>

      <strong>
        {booking.journey.returnLocation || "—"}
      </strong>

      <small>
        {booking.journey.returnDate || "—"}
        {booking.journey.returnTime
          ? ` · ${booking.journey.returnTime}`
          : ""}
      </small>
    </div>

  </div>
)}

<div className="booking-summary__divider" />


      <div className="booking-summary__row">
        <span>
          Rental duration
        </span>

        <strong>
             {rental.days > 0
               ? `${rental.days} ${
                     rental.days === 1
                     ? "day"
                     : "days"
                   }`
                : "—"}
           </strong>
      </div>

      <div className="booking-summary__row">
        <span>
          Daily rate
        </span>

       <strong>
           {rental.dailyRate > 0
              ? formatCurrency(rental.dailyRate)
               : "—"}
        </strong>
      </div>


      <div className="booking-summary__total">
        <div>
          <span>
            Estimated total
          </span>

          <small>
            Final amount calculated at review
          </small>
        </div>

        <strong>
           {rental.subtotal > 0
             ? formatCurrency(rental.subtotal)
             : "—"}
         </strong>
      </div>

      {booking.customer?.fullName && (
  <div className="booking-summary__customer">

    <div className="booking-summary__customer-icon">
      ✓
    </div>

    <div>
      <span>
        DRIVER
      </span>

      <strong>
        {booking.customer.fullName}
      </strong>
    </div>

  </div>
)}


      <div className="booking-summary__trust">

        <div>
          <ShieldCheck size={15} />
          Secure reservation
        </div>

        <div>
          No payment required yet
        </div>

      </div>

    </aside>
  );
}

export default Booking;
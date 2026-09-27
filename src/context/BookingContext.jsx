// car-rental-platform/src/context/BookingContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const BookingContext = createContext(null);

const STORAGE_KEY = "velocity-booking";

const initialBooking = {
  vehicle: null,

  journey: {
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnLocation: "",
    returnDate: "",
    returnTime: "",
  },

  customer: {
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  },

  currentStep: 1,
  bookingId: null,
  status: "draft",
};

function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    try {
      const savedBooking = localStorage.getItem(STORAGE_KEY);

      return savedBooking
        ? JSON.parse(savedBooking)
        : initialBooking;
    } catch (error) {
      console.error("Failed to load booking:", error);
      return initialBooking;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(booking)
      );
    } catch (error) {
      console.error("Failed to save booking:", error);
    }
  }, [booking]);

  const setVehicle = (vehicle) => {
    setBooking((prev) => ({
      ...prev,
      vehicle,
    }));
  };

  const setJourney = (journey) => {
    setBooking((prev) => ({
      ...prev,
      journey: {
        ...prev.journey,
        ...journey,
      },
    }));
  };

  const setCustomer = (customer) => {
    setBooking((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        ...customer,
      },
    }));
  };

  const setCurrentStep = (step) => {
    setBooking((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  const setBookingId = (bookingId) => {
    setBooking((prev) => ({
      ...prev,
      bookingId,
      status: "confirmed",
    }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);

    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      booking,

      setVehicle,
      setJourney,
      setCustomer,
      setCurrentStep,
      setBookingId,
      resetBooking,
    }),
    [booking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider"
    );
  }

  return context;
}

export default BookingProvider;
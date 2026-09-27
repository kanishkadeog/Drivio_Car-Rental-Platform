import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBooking } from "../../../context/BookingContext";

function BookingCleanup() {
  const location = useLocation();
  const { booking, resetBooking } = useBooking();

  useEffect(() => {
    const isOutsideBooking = !location.pathname.startsWith("/booking");

    if (isOutsideBooking && booking.status === "confirmed") {
      resetBooking();
    }
  }, [
    location.pathname,
    booking.status,
    resetBooking,
  ]);

  return null;
}

export default BookingCleanup;
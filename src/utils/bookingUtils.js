// car-rental-platform/src/utils/bookingUtils.js

/**
 * Convert YYYY-MM-DD into a UTC timestamp.
 * Using UTC prevents timezone-related date calculation bugs.
 */
function dateToUTC(dateString) {
  if (!dateString) return null;

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return Date.UTC(year, month - 1, day);
}

/**
 * Calculate number of rental days.
 *
 * Example:
 * 2026-09-21 → 2026-09-24
 * = 3 rental days
 */
export function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = dateToUTC(startDate);
  const end = dateToUTC(endDate);

  if (start === null || end === null) {
    return 0;
  }

  const difference = end - start;

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

/**
 * Calculate rental cost.
 */
export function calculateRental(
  dailyRate,
  startDate,
  endDate
) {
  const days = calculateDays(
    startDate,
    endDate
  );

  const rate = Number(dailyRate) || 0;

  return {
    days,
    dailyRate: rate,
    subtotal: days * rate,
  };
}

/**
 * Format currency for the Velocity UI.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

/**
 * Generate a unique demo booking ID.
 *
 * Example:
 * VEL-7K4P2M91
 */

export function generateBookingId() {
  const timestamp = Date.now()
    .toString(36)
    .toUpperCase();

  const random = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return `VEL-${timestamp}-${random}`;
}



/**
 * Format a date for display.
 *
 * Example:
 * 2026-09-24 → 24 Sep 2026
 */
export function formatBookingDate(dateString) {
  if (!dateString) {
    return "—";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
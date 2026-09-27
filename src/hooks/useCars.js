// car-rental-platform/src/hooks/useCars.js

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import cars from "../data/cars.js";

const journeyCategories = {
  "weekend-escape": ["Sports", "SUV"],
  "business-trip": ["Sedan", "Luxury"],
  "family-journey": ["SUV"],
  "luxury-experience": ["Luxury", "Sports"],
  adventure: ["SUV", "Sports"],
};

// Safely handles "", null, and undefined
const normalize = (value) => String(value ?? "").trim().toLowerCase();

export const useCars = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = normalize(searchParams.get("search"));
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const journey = searchParams.get("journey") || "";
  const location = normalize(searchParams.get("location"));
  const sort = searchParams.get("sort") || "recommended";
  const brand = searchParams.get("brand") || "";
  const fuel = searchParams.get("fuel") || "";
  const transmission = searchParams.get("transmission") || "";
  const seats = searchParams.get("seats") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const available = searchParams.get("available") === "true";


  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search by car name, brand, or model
    if (search) {
      result = result.filter((car) => {
        const searchableText = [
          car.name,
          car.brand,
          car.model,
        ]
          .filter(Boolean)
          .join(" ");

        return normalize(searchableText).includes(search);
      });
    }

    // Category filter
    if (category) {
      result = result.filter(
        (car) => normalize(car.category) === normalize(category)
      );
    }

    // Vehicle type from homepage SearchPanel
    if (type && type !== "all") {
      result = result.filter(
        (car) => normalize(car.category) === normalize(type)
      );
    }

    // Journey recommendation
    if (journey && journeyCategories[journey]) {
      result = result.filter((car) =>
        journeyCategories[journey].some(
          (journeyCategory) =>
            normalize(journeyCategory) === normalize(car.category)
        )
      );
    }

    // Location
    if (location) {
      result = result.filter((car) =>
        normalize(car.location).includes(location)
      );
    }

    // Brand
    if (brand) {
      result = result.filter(
        (car) =>
          normalize(car.brand) ===
          normalize(brand)
      );
    }

    // Fuel
    if (fuel) {
      result = result.filter(
        (car) =>
          normalize(car.fuel) ===
          normalize(fuel)
      );
    }

    // Transmission
    if (transmission) {
      result = result.filter(
        (car) =>
          normalize(car.transmission) ===
          normalize(transmission)
      );
    }

    // Seats
    if (seats) {
      result = result.filter(
        (car) => car.seats >= Number(seats)
      );
    }

    // Price
    result = result.filter(
      (car) =>
        car.pricePerDay >= minPrice &&
        car.pricePerDay <= maxPrice
    );

    // Availability
    if (available) {
      result = result.filter(
        (car) => car.available
      );
    }


    // Sorting
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;

      case "price-high":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;

      default:
        // Featured first, then rating
        result.sort((a, b) => {
          if (a.featured !== b.featured) {
            return Number(b.featured) - Number(a.featured);
          }

          return b.rating - a.rating;
        });
    }

    return result;
  }, [search, category, type, journey, location, brand, fuel, transmission, seats, minPrice, maxPrice, available, sort]);

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    // if (!value || value === "all") {
    //   nextParams.delete(key);
    // } else {
    //   nextParams.set(key, value);
    // }

     if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === "all"
    ) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };


    const clearParam = (key) => {
    const nextParams =
      new URLSearchParams(searchParams);

    nextParams.delete(key);

    setSearchParams(nextParams);
  };


  const clearFilters = () => {
    setSearchParams({});
  };

  return {
    cars: filteredCars,
    allCars: cars,

    search,
    category,
    type,
    journey,
    location,
    sort,

     brand,
    fuel,
    transmission,
    seats,
    minPrice,
    maxPrice,
    available,

    updateParam,
    clearParam,
    clearFilters,
  };
};

export default useCars;
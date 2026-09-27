// car-rent-platform/src/hooks/useRecentlyViewed.js


import { useEffect, useState } from "react";

const STORAGE_KEY =
  "velocity-recently-viewed";

const useRecentlyViewed = (car) => {
  const [recentlyViewed, setRecentlyViewed] =
    useState([]);

  useEffect(() => {
    if (!car?.id) return;

    try {
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const withoutCurrent = stored.filter(
        (item) => item.id !== car.id
      );

      const updated = [
        {
          id: car.id,
          name: car.name,
          brand: car.brand,
          model: car.model,
          image: car.images?.[0],
          pricePerDay: car.pricePerDay,
        },
        ...withoutCurrent,
      ].slice(0, 5);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      setRecentlyViewed(updated);
    } catch {
      setRecentlyViewed([]);
    }
  }, [car]);

  return recentlyViewed;
};

export default useRecentlyViewed;
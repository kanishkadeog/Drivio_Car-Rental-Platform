// car-rental-platform/src/context/CompareContext.jsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const CompareContext = createContext(null);

const MAX_COMPARE = 3;

export const CompareProvider = ({
  children,
}) => {
  const [compareIds, setCompareIds] =
    useState([]);

  const toggleCompare = (carId) => {
    setCompareIds((current) => {
      if (current.includes(carId)) {
        return current.filter(
          (id) => id !== carId
        );
      }

      if (current.length >= MAX_COMPARE) {
        return current;
      }

      return [...current, carId];
    });
  };

  const isCompared = (carId) =>
    compareIds.includes(carId);

  const clearCompare = () => {
    setCompareIds([]);
  };

  const value = useMemo(
    () => ({
      compareIds,
      compareCount: compareIds.length,
      toggleCompare,
      isCompared,
      clearCompare,
      maxCompare: MAX_COMPARE,
    }),
    [compareIds]
  );

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
};
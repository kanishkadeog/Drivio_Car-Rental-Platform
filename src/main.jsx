// car-rental-platform/src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import BookingProvider from "./context/BookingContext";


import "./styles/globals.scss";

createRoot(document.getElementById("root")).render(
 <StrictMode>
    <BookingProvider>
      <FavoritesProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </FavoritesProvider>
    </BookingProvider>
  </StrictMode>
);
// car-rental-platform/src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";

import Navbar from "../src/components/common/Navbar/Navbar";
import Footer from "../src/components/common/Footer/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import Booking from "./pages/Booking/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import CompareBar from "./components/cars/CompareBar/CompareBar";
import Compare from "./pages/Compare/Compare";

import BookingCleanup from "./components/booking/BookingCleanup/BookingCleanup";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route path="/" element={<Home />} />

          <Route path="/cars" element={<Cars />} />

          <Route
            path="/cars/:carId"
            element={<CarDetails />}
          />

          <Route
            path="/booking/:carId"
            element={<Booking />}
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />

          <Route path="/compare" element={<Compare />} />

        </Routes>
      </AnimatePresence>


     <CompareBar />

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

     <BookingCleanup />
     
      <div className="app">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
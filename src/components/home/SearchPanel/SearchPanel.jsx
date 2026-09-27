// car-rental-platform/src/components/home/SearchPanel/SearchPanel.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CarFront,
  MapPin,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";

import "../SearchPanel/SearchPanel.scss";

const vehicleTypes = [
  "Any vehicle",
  "SUV",
  "Sedan",
  "Luxury",
  "Sports",
  "Hatchback",
];

function SearchPanel() {
  const navigate = useNavigate();

  const [pickupLocation, setPickupLocation] =
    useState("");

  const [pickupDate, setPickupDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [vehicleType, setVehicleType] =
    useState("Any vehicle");

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (pickupLocation.trim()) {
      params.set(
        "location",
        pickupLocation.trim()
      );
    }

    if (pickupDate) {
      params.set("pickup", pickupDate);
    }

    if (returnDate) {
      params.set("return", returnDate);
    }

    if (vehicleType !== "Any vehicle") {
      params.set("type", vehicleType);
    }

    const queryString = params.toString();

    navigate(
      queryString
        ? `/cars?${queryString}`
        : "/cars"
    );
  };

  return (
    <section className="search-section">
      <div className="container">
        <motion.div
          className="search-panel"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="search-panel__heading">
            <div>
              <span>Find your ride</span>

              <h2>
                Where are you going?
              </h2>
            </div>

            <div className="search-panel__number">
              <span>01</span>
              <span>Search</span>
            </div>
          </div>

          <form
            className="search-panel__form"
            onSubmit={handleSearch}
          >
            {/* Location */}
            <label className="search-field">
              <span className="search-field__label">
                Pickup location
              </span>

              <div className="search-field__input">
                <MapPin size={18} />

                <input
                  type="text"
                  placeholder="City or location"
                  value={pickupLocation}
                  onChange={(event) =>
                    setPickupLocation(
                      event.target.value
                    )
                  }
                />
              </div>
            </label>

            {/* Pickup */}
            <label className="search-field">
              <span className="search-field__label">
                Pickup date
              </span>

              <div className="search-field__input">
                <CalendarDays size={18} />

                <input
                  type="date"
                  value={pickupDate}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(event) =>
                    setPickupDate(
                      event.target.value
                    )
                  }
                />
              </div>
            </label>

            {/* Return */}
            <label className="search-field">
              <span className="search-field__label">
                Return date
              </span>

              <div className="search-field__input">
                <CalendarDays size={18} />

                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || undefined}
                  onChange={(event) =>
                    setReturnDate(
                      event.target.value
                    )
                  }
                />
              </div>
            </label>

            {/* Vehicle */}
            <label className="search-field">
              <span className="search-field__label">
                Vehicle
              </span>

              <div className="search-field__input">
                <CarFront size={18} />

                <select
                  value={vehicleType}
                  onChange={(event) =>
                    setVehicleType(
                      event.target.value
                    )
                  }
                >
                  {vehicleTypes.map(
                    (type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              className="search-panel__button"
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Search size={19} />

              <span>Search cars</span>

              <ArrowUpRight size={17} />
            </motion.button>
          </form>

          <div className="search-panel__footer">
            <span>
              <i />
              Instant availability
            </span>

            <span>
              No booking fees
            </span>

            <span>
              Free cancellation on selected cars
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SearchPanel;
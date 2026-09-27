// car-rental-platform/src/components/cars/CarSpecifications/CarSpecifications.jsx

import {
  Gauge,
  Fuel,
  Settings2,
  Users,
  CalendarDays,
  MapPin,
} from "lucide-react";

import "../CarSpecifications/CarSpecifications.scss";

const CarSpecifications = ({ car }) => {
  const specifications = [
    {
      label: "Fuel",
      value: car.fuel,
      icon: Fuel,
    },
    {
      label: "Transmission",
      value: car.transmission,
      icon: Settings2,
    },
    {
      label: "Seats",
      value: `${car.seats} passengers`,
      icon: Users,
    },
    {
      label: "Mileage",
      value: `${car.mileage} km/l`,
      icon: Gauge,
    },
    {
      label: "Year",
      value: car.year,
      icon: CalendarDays,
    },
    {
      label: "Location",
      value: car.location,
      icon: MapPin,
    },
  ];

  return (
    <div className="car-specifications">
      {specifications.map(
        ({ label, value, icon: Icon }) => (
          <div
            className="car-specification"
            key={label}
          >
            <div className="car-specification__icon">
              <Icon size={17} />
            </div>

            <div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CarSpecifications;
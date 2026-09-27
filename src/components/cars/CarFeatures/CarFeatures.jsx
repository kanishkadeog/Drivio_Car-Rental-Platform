// car-rent-platform/src/components/cars/CarFeatures/CarFeatures.jsx

import { Check } from "lucide-react";

import "../CarFeatures/CarFeatures.scss";

const CarFeatures = ({ features = [] }) => {
  return (
    <div className="car-features">
      {features.map((feature) => (
        <div
          className="car-feature"
          key={feature}
        >
          <span>
            <Check size={13} />
          </span>

          {feature}
        </div>
      ))}
    </div>
  );
};

export default CarFeatures;
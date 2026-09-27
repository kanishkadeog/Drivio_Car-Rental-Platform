// car-rental-platform/src/components/common/SectionHeading/SectionHeading.jsx

import "../SectionHeading/SectionHeading.scss";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  return (
    <div
      className={`section-heading section-heading--${align} ${className}`}
    >
      {eyebrow && (
        <p className="section-heading__eyebrow">
          {eyebrow}
        </p>
      )}

      {title && (
        <h2 className="section-heading__title">
          {title}
        </h2>
      )}

      {description && (
        <p className="section-heading__description">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
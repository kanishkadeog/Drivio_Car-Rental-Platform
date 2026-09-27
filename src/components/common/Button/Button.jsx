// car-rental-platform/src/components/common/Button/Button.jsx

import { ArrowUpRight } from "lucide-react";
import "../Button/Button.scss";

function Button({
  children,
  variant = "primary",
  type = "button",
  href,
  icon = true,
  fullWidth = false,
  className = "",
  ...props
}) {
const classes = `button button--${variant} ${
    fullWidth ? "button--full" : ""
  } ${className}`;


  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        <span>{children}</span>

        {icon && (
          <span className="button__icon">
            <ArrowUpRight size={17} strokeWidth={2} />
          </span>
        )}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      <span>{children}</span>

      {icon && (
        <span className="button__icon">
          <ArrowUpRight size={17} strokeWidth={2} />
        </span>
      )}
    </button>
  );
}

export default Button;
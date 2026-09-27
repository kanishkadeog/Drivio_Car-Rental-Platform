// car-rental-platform/src/components/common/Container.jsx

function Container({ children, className = "" }) {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  );
}

export default Container;
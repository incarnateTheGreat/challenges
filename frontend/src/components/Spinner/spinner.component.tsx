import React from "react";

interface SpinnerProps {
  size?: string;
  position?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ position, size }): JSX.Element => {
  const modifierPosition = position ? `spinner-${position}` : "";
  const modifierSize = size ? `spinner-${size}` : "";

  return <div className={`spinner ${modifierPosition} ${modifierSize}`}></div>;
};

export default Spinner;

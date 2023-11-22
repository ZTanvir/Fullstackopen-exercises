import { useState } from "react";
import PropTypes from "prop-types";

const Toggleable = ({ label, children }) => {
  const [showElement, setShowElement] = useState(false);
  const hide = { display: showElement ? "none" : "" };
  const show = { display: showElement ? "" : "none" };

  const handleShowElement = () => {
    setShowElement(!showElement);
  };

  return (
    <section>
      <button onClick={handleShowElement} style={hide}>
        {label}
      </button>
      <div style={show}> {children}</div>
      <button onClick={handleShowElement} style={show}>
        Cancel
      </button>
    </section>
  );
};

Toggleable.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Toggleable;

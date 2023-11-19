import { useState } from "react";

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
export default Toggleable;

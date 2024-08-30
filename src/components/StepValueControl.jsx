// this component helps the user to adjust the stepValue state

import React from "react";

const StepValueControl = ({ stepValue, setStepValue }) => {
  const stepValues = ["1n", "2n", "4n", "8n", "16n", "32n", "64n", "128n"];

  return (
    <div>
      <div className="step-value-control">
        {stepValues.map((value, index) => (
          <button
            key={index}
            className={`step-value ${stepValue === value ? "active" : ""}`}
            onClick={() => setStepValue(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div>the current step value is {stepValue}</div>
    </div>
  );
};

export default React.memo(StepValueControl);

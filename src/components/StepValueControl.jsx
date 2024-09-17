// this component helps the user to adjust the stepValue state

import React from "react";

const StepValueControl = ({ stepValue, setStepValue }) => {
  const stepValues = ["1n", "2n", "4n", "8n", "16n", "32n", "64n", "128n"];
  const stepValuesInEnglish = {
    "1n": "whole note",
    "2n": "half note",
    "4n": "quarter note",
    "8n": "eighth note",
    "16n": "sixteenth note",
    "32n": "thirty-second note",
    "64n": "sixty-fourth note",
    "128n": "one hundred twenty-eighth note",
  };

  return (
    <div>
      <div className="step-value-control">
        {stepValues.map((value, index) => (
          <button
            key={index}
            className={`step-value ${stepValue === value ? "active" : ""}`}
            onClick={() => setStepValue(value)}
          >
            {stepValuesInEnglish[value]}
          </button>
        ))}
      </div>
      <div>the current step value is {stepValuesInEnglish[stepValue]}</div>
    </div>
  );
};

export default React.memo(StepValueControl);

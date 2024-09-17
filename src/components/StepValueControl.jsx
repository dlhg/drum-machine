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
    <div className="step-value-control">
      <select
        value={stepValue}
        onChange={(e) => setStepValue(e.target.value)}
        className="step-value-dropdown"
      >
        {stepValues.map((value) => (
          <option key={value} value={value}>
            step value = {stepValuesInEnglish[value]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(StepValueControl);

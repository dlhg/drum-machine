import React from "react";

const StepValueControl = ({ stepValue, setStepValue }) => {
  const stepValues = ["1n", "2n", "4n", "8n", "16n", "32n", "64n", "128n"];
  const stepValuesInNotation = {
    "1n": "\uD834\uDD5D", // whole note
    "2n": "\uD834\uDD5E", // half note
    "4n": "\uD834\uDD5F", // quarter note
    "8n": "\uD834\uDD60", // eighth note
    "16n": "\uD834\uDD61", // sixteenth note
    "32n": "\uD834\uDD62", // thirty-second note
    "64n": "\uD834\uDD63", // sixty-fourth note
    "128n": "\uD834\uDD64", // one hundred twenty-eighth note
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
            {stepValuesInNotation[value]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(StepValueControl);

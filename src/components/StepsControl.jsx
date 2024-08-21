import React from "react";

const StepsControl = ({ steps, minSteps, maxSteps, handleStepsChange }) => (
  <div className="steps-control">
    <input
      type="number"
      min={minSteps}
      max={maxSteps}
      value={steps}
      onChange={handleStepsChange}
    />
    <span className="steps-label">{steps} Steps</span>
  </div>
);

export default React.memo(StepsControl);

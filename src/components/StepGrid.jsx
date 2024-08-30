import React, { useState } from "react";
import NoteDropdown from "./NoteDropdown";

const StepGrid = ({
  sequence,
  currentStep,
  toggleStep,
  notes,
  handleNoteChange,
  sampleNames,
}) => {
  const [clickedStep, setClickedStep] = useState(null);

  const handleStepClick = (rowIndex, stepIndex) => {
    toggleStep(rowIndex, stepIndex);
    setClickedStep({ rowIndex, stepIndex });

    // Remove the click-pulse class after the animation completes
    setTimeout(() => {
      setClickedStep(null);
    }, 300);
  };

  return (
    <div className="sequencer-grid">
      {sequence.map((row, rowIndex) => (
        <div key={rowIndex} className="sequencer-row">
          <div className="sample-name">{sampleNames[rowIndex]}</div>
          <NoteDropdown
            note={notes[rowIndex]}
            rowIndex={rowIndex}
            handleNoteChange={handleNoteChange}
          />
          <div className="steps-container">
            {row.map((step, stepIndex) => (
              <div
                key={stepIndex}
                onClick={() => handleStepClick(rowIndex, stepIndex)}
                className={`step ${step ? "active" : ""} ${
                  currentStep === stepIndex ? "playing" : ""
                } ${
                  clickedStep &&
                  clickedStep.rowIndex === rowIndex &&
                  clickedStep.stepIndex === stepIndex
                    ? "click-pulse"
                    : ""
                }`}
              >
                {stepIndex + 1}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(StepGrid);

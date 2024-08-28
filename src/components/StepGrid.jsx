import React from "react";
import NoteDropdown from "./NoteDropdown";

const StepGrid = ({
  sequence,
  currentStep,
  toggleStep,
  notes,
  handleNoteChange,
  sampleNames, // Add sampleNames prop
}) => (
  <div className="sequencer-grid">
    {sequence.map((row, rowIndex) => (
      <div key={rowIndex} className="sequencer-row">
        <div className="sample-name">{sampleNames[rowIndex]}</div>{" "}
        {/* Add sample name */}
        <NoteDropdown
          note={notes[rowIndex]}
          rowIndex={rowIndex}
          handleNoteChange={handleNoteChange}
        />
        <div className="steps-container">
          {row.map((step, stepIndex) => (
            <div
              key={stepIndex}
              onClick={() => toggleStep(rowIndex, stepIndex)}
              className={`step ${step ? "active" : ""} ${
                currentStep === stepIndex ? "playing" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default React.memo(StepGrid);

import React from "react";
import NoteDropdown from "./NoteDropdown";

const StepGrid = ({
  sequence,
  currentStep,
  toggleStep,
  notes,
  handleNoteChange,
}) => (
  <div className="sequencer-grid">
    {sequence.map((row, rowIndex) => (
      <div key={rowIndex} className="sequencer-row">
        <NoteDropdown
          note={notes[rowIndex]}
          rowIndex={rowIndex}
          handleNoteChange={handleNoteChange}
        />
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
    ))}
  </div>
);

export default React.memo(StepGrid);

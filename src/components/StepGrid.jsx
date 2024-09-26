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
  const [currentPage, setCurrentPage] = useState(0);
  const stepsPerPage = 8;

  const handleStepClick = (rowIndex, stepIndex) => {
    toggleStep(rowIndex, stepIndex);
    setClickedStep({ rowIndex, stepIndex });

    // Remove the click-pulse class after the animation completes
    setTimeout(() => {
      setClickedStep(null);
    }, 300);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startStepIndex = currentPage * stepsPerPage;
  const endStepIndex = startStepIndex + stepsPerPage;

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
            {row.slice(startStepIndex, endStepIndex).map((step, stepIndex) => (
              <div
                key={stepIndex}
                onClick={() =>
                  handleStepClick(rowIndex, startStepIndex + stepIndex)
                }
                className={`step ${step ? "active" : ""} ${
                  currentStep === startStepIndex + stepIndex ? "playing" : ""
                } ${
                  clickedStep &&
                  clickedStep.rowIndex === rowIndex &&
                  clickedStep.stepIndex === startStepIndex + stepIndex
                    ? "click-pulse"
                    : ""
                }`}
              >
                {startStepIndex + stepIndex + 1}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          &lt; Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={endStepIndex >= sequence[0].length}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default React.memo(StepGrid);

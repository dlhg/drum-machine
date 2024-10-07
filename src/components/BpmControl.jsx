import React, { useState, useEffect, useRef } from "react";

const BPMControl = ({ bpm, minBPM, maxBPM, handleBpmChange }) => {
  const [currentBpm, setCurrentBpm] = useState(bpm);
  const bpmRef = useRef(null);

  useEffect(() => {
    setCurrentBpm(bpm);
  }, [bpm]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      const newBpm = Math.min(maxBPM, currentBpm + 1);
      setCurrentBpm(newBpm);
      handleBpmChange({ target: { value: newBpm } });
      // Move cursor to the end of the text
      setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(bpmRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 0);
    } else if (e.key === "ArrowDown") {
      const newBpm = Math.max(minBPM, currentBpm - 1);
      setCurrentBpm(newBpm);
      handleBpmChange({ target: { value: newBpm } });
      // Move cursor to the end of the text
      setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(bpmRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 0);
    }
  };

  const handleChange = (e) => {
    const newBpm = Math.min(
      maxBPM,
      Math.max(minBPM, Number(e.target.innerText) || minBPM)
    );
    setCurrentBpm(newBpm);
    handleBpmChange({ target: { value: newBpm } });
  };

  const handleInput = (e) => {
    const bpmValue = Number(bpmRef.current.innerText);
    if (isNaN(bpmValue) || bpmValue < minBPM) {
      setCurrentBpm(minBPM);
      handleBpmChange({ target: { value: minBPM } });
    } else if (bpmValue > maxBPM) {
      setCurrentBpm(maxBPM);
      handleBpmChange({ target: { value: maxBPM } });
    } else {
      handleChange(e);
    }

    // Move cursor to the end of the text
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(bpmRef.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleBeforeInput = (e) => {
    const currentText = bpmRef.current.innerText;
    if (!/^\d*$/.test(e.data) || currentText.length >= 3) {
      e.preventDefault();
    }
  };

  const handleBlur = () => {
    const bpmValue = Number(bpmRef.current.innerText);
    if (isNaN(bpmValue) || bpmValue < minBPM) {
      setCurrentBpm(minBPM);
      handleBpmChange({ target: { value: minBPM } });
      bpmRef.current.innerText = minBPM; // Force update the DOM
      console.log("bpm is zero???");
    } else if (bpmValue > maxBPM) {
      setCurrentBpm(maxBPM);
      handleBpmChange({ target: { value: maxBPM } });
      bpmRef.current.innerText = maxBPM; // Force update the DOM
    }
  };

  return (
    <div
      className="bpm-control"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onInput={handleInput}
      onBeforeInput={handleBeforeInput}
      ref={bpmRef}
    >
      {currentBpm}
    </div>
  );
};

export default React.memo(BPMControl);

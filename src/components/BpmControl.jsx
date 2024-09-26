import React from "react";

const BpmControl = ({ bpm, minBPM, maxBPM, handleBpmChange }) => (
  <div className="bpm-control">
    <input
      type="number"
      min={minBPM}
      max={maxBPM}
      value={bpm}
      onChange={handleBpmChange}
    />
    <span className="bpm-label">BPM</span>
  </div>
);

export default React.memo(BpmControl);

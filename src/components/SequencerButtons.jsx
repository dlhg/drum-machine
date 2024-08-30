import React from "react";

const SequencerButtons = ({
  playing,
  startSequencer,
  pauseSequencer,
  stopSequencer,
  clearSequence,
  invertSequence,
}) => (
  <div className="sequencer-buttons">
    <button onClick={playing ? pauseSequencer : startSequencer}>
      {playing ? "⏸️" : "▶️"}
    </button>
    <button onClick={stopSequencer} disabled={!playing}>
      ⏹
    </button>
    <button onClick={clearSequence}>Clear Sequence</button>
    <button onClick={invertSequence}>Invert Sequence</button>
  </div>
);

export default React.memo(SequencerButtons);

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
    <button onClick={startSequencer} disabled={playing}>
      Play
    </button>
    <button onClick={pauseSequencer} disabled={!playing}>
      Pause
    </button>
    <button onClick={stopSequencer} disabled={!playing}>
      Stop
    </button>
    <button onClick={clearSequence}>Clear Sequence</button>
    <button onClick={invertSequence}>Invert Sequence</button>
  </div>
);

export default React.memo(SequencerButtons);

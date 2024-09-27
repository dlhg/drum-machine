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
      {playing ? "PAUSE" : "PLAY"}
    </button>
    <button onClick={stopSequencer} disabled={!playing}>
      STOP
    </button>
    <button onClick={clearSequence}>CLEAR</button>
    {/* <button onClick={invertSequence}>INVERT</button> */}
  </div>
);

export default React.memo(SequencerButtons);

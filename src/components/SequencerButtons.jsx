import React from "react";
import BpmControl from "./BPMControl";

const SequencerButtons = ({
  playing,
  startSequencer,
  pauseSequencer,
  stopSequencer,
  clearSequence,
  invertSequence,
  bpm,
  minBPM,
  maxBPM,
  handleBpmChange,
}) => (
  <div className="sequencer-buttons">
    <BpmControl
      bpm={bpm}
      minBPM={minBPM}
      maxBPM={maxBPM}
      handleBpmChange={handleBpmChange}
    />
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

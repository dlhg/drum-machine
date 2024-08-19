import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from "tone";

const StepSequencer = () => {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = 64;
  const rows = 4;
  const instruments = useMemo(
    () => [
      new Tone.Synth().toDestination(),
      new Tone.MembraneSynth().toDestination(),
      new Tone.NoiseSynth().toDestination(),
      new Tone.FMSynth().toDestination(),
    ],
    []
  );

  const [sequence, setSequence] = useState(
    Array(rows).fill(Array(steps).fill(false))
  );

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        sequence.forEach((row, index) => {
          if (row[step]) {
            instruments[index].triggerAttackRelease("C2", "16n", time);
          }
        });
      },
      Array.from({ length: steps }, (_, i) => i),
      "16n"
    ).start(0);

    return () => loop.dispose();
  }, [bpm, sequence, instruments]);

  const toggleStep = useCallback((row, step) => {
    setSequence((prevSequence) =>
      prevSequence.map((r, i) =>
        i === row ? r.map((s, j) => (j === step ? !s : s)) : r
      )
    );
  }, []);

  const startSequencer = useCallback(() => {
    setPlaying(true);
    Tone.Transport.start();
  }, []);

  const stopSequencer = useCallback(() => {
    setPlaying(false);
    Tone.Transport.stop();
    setCurrentStep(0);
  }, []);

  const pauseSequencer = useCallback(() => {
    setPlaying(false);
    Tone.Transport.pause();
  }, []);

  const handleBpmChange = useCallback((e) => {
    setBpm(e.target.value);
  }, []);

  return (
    <div className="sequencer-container">
      <div className="bpm-control">
        <input
          type="range"
          min="60"
          max="200"
          value={bpm}
          onChange={handleBpmChange}
        />
        <span className="bpm-label">{bpm} BPM</span>
      </div>
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
      </div>
      <div className="sequencer-grid">
        {sequence.map((row, rowIndex) => (
          <div key={rowIndex} className="sequencer-row">
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
    </div>
  );
};

export default React.memo(StepSequencer);

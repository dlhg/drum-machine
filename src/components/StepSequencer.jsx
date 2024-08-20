import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from "tone";

const StepSequencer = () => {
  const rows = 4;

  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(64);
  const [sequence, setSequence] = useState(
    Array(rows).fill(Array(steps).fill(false))
  );

  const [notes, setNotes] = useState(Array(rows).fill("C3")); // New state for notes

  const instruments = useMemo(
    () => [
      new Tone.AMSynth().toDestination(),
      new Tone.FMSynth().toDestination(),
      new Tone.PluckSynth().toDestination(),
      new Tone.MonoSynth().toDestination(),
    ],
    []
  );

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        sequence.forEach((row, index) => {
          if (row[step]) {
            instruments[index].triggerAttackRelease(notes[index], "16n", time); // Use selected note
          }
        });
      },
      Array.from({ length: steps }, (_, i) => i),
      "16n"
    ).start(0);

    return () => loop.dispose();
  }, [bpm, sequence, instruments, steps, notes]);

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

  const handleStepsChange = useCallback((e) => {
    const newSteps = parseInt(e.target.value, 10);
    setSteps(newSteps);
    setSequence((prevSequence) =>
      prevSequence.map((row) => {
        const newRow = Array(newSteps).fill(false);
        row.slice(0, newSteps).forEach((val, idx) => {
          newRow[idx] = val;
        });
        return newRow;
      })
    );
  }, []);

  const handleNoteChange = useCallback((rowIndex, e) => {
    const newNote = e.target.value;
    setNotes((prevNotes) =>
      prevNotes.map((note, i) => (i === rowIndex ? newNote : note))
    );
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
      <div className="steps-control">
        <input
          type="range"
          min="8"
          max="128"
          value={steps}
          onChange={handleStepsChange}
        />
        <span className="steps-label">{steps} Steps</span>
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
            <select
              value={notes[rowIndex]}
              onChange={(e) => handleNoteChange(rowIndex, e)}
              className="note-dropdown"
            >
              {["C3", "D3", "E3", "F3", "G3", "A3", "B3"].map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </select>
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
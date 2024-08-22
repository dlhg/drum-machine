import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from "tone";
import BpmControl from "./BpmControl";
import NumberOfStepsControl from "./NumberOfStepsControl";
import SequencerButtons from "./SequencerButtons";
import StepGrid from "./StepGrid";

const StepSequencer = () => {
  const rows = 4;
  const maxSteps = 128;
  const minSteps = 8;
  const maxBPM = 999;
  const minBPM = 1;

  // useState

  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(16);
  const [sequence, setSequence] = useState(
    Array(rows).fill(Array(steps).fill(false))
  );
  const [notes, setNotes] = useState(Array(rows).fill("C3"));

  // useMemo

  const instruments = useMemo(
    () => [
      new Tone.AMSynth().toDestination(),
      new Tone.FMSynth().toDestination(),
      new Tone.PluckSynth().toDestination(),
      new Tone.MonoSynth().toDestination(),
    ],
    []
  );

  // useCallBack

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
    if (e.target.value > maxSteps) {
      e.target.value = maxSteps;
    }
    if (e.target.value < minSteps) {
      e.target.value = minSteps;
    }

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

  const clearSequence = useCallback(() => {
    setSequence(Array(rows).fill(Array(steps).fill(false)));
  }, [rows, steps]);

  const invertSequence = useCallback(() => {
    setSequence((prevSequence) => {
      const newSequence = [];
      for (let i = 0; i < rows; i++) {
        newSequence.push(
          prevSequence[i].map((step) => {
            return !step;
          })
        );
      }
      return newSequence;
    });
  }, [rows]);

  // useEffect

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        sequence.forEach((row, index) => {
          if (row[step]) {
            instruments[index].triggerAttackRelease(notes[index], "16n", time);
          }
        });
      },
      Array.from({ length: steps }, (_, i) => i),
      "16n"
    ).start(0);

    return () => loop.dispose();
  }, [bpm, sequence, instruments, steps, notes]);

  return (
    <div className="sequencer-container">
      <BpmControl
        bpm={bpm}
        minBPM={minBPM}
        maxBPM={maxBPM}
        handleBpmChange={handleBpmChange}
      />
      <NumberOfStepsControl
        steps={steps}
        minSteps={minSteps}
        maxSteps={maxSteps}
        handleStepsChange={handleStepsChange}
      />
      <SequencerButtons
        playing={playing}
        startSequencer={startSequencer}
        pauseSequencer={pauseSequencer}
        stopSequencer={stopSequencer}
        clearSequence={clearSequence}
        invertSequence={invertSequence}
      />
      <StepGrid
        sequence={sequence}
        currentStep={currentStep}
        toggleStep={toggleStep}
        notes={notes}
        handleNoteChange={handleNoteChange}
      />
    </div>
  );
};

export default React.memo(StepSequencer);

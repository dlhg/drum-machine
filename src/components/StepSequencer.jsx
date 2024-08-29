import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from "tone";
import BpmControl from "./BpmControl";
import NumberOfStepsControl from "./NumberOfStepsControl";
import SequencerButtons from "./SequencerButtons";
import StepGrid from "./StepGrid";
import ConfirmationPopup from "./ConfirmationPopup";

// Import drum sounds
import kick from "../assets/DrumSounds/kick.wav";
import clap from "../assets/DrumSounds/clap.wav";
import closedhat from "../assets/DrumSounds/closedhat.wav";
import closedhat2 from "../assets/DrumSounds/closedhat2.wav";
import conga from "../assets/DrumSounds/conga.wav";
import eightoheightbass from "../assets/DrumSounds/808bass.wav";
import rimshot from "../assets/DrumSounds/rimshot.wav";
import openhat from "../assets/DrumSounds/openhat.wav";

const StepSequencer = () => {
  const rows = 8;
  const maxSteps = 128;
  const minSteps = 1;
  const maxBPM = 999;
  const minBPM = 1;
  const sampleNames = [
    "Kick",
    "Clap",
    "Closed Hat",
    "Conga",
    "808 Bass",
    "Rimshot",
    "Open Hat",
    "Closed Hat 2",
  ];

  // useState

  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(16);
  const [sequence, setSequence] = useState(
    Array(rows).fill(Array(steps).fill(false))
  );
  const [notes, setNotes] = useState(Array(rows).fill("C3"));

  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [showPopupPreference, setShowPopupPreference] = useState(true);

  // useMemo

  const instruments = useMemo(
    () => [
      new Tone.Sampler({ C3: kick }).toDestination(),
      new Tone.Sampler({ C3: clap }).toDestination(),
      new Tone.Sampler({ C3: closedhat }).toDestination(),
      new Tone.Sampler({ C3: conga }).toDestination(),
      new Tone.Sampler({ C3: eightoheightbass }).toDestination(),
      new Tone.Sampler({ C3: rimshot }).toDestination(),
      new Tone.Sampler({ C3: openhat }).toDestination(),
      new Tone.Sampler({ C3: closedhat2 }).toDestination(),
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
    if (showPopupPreference) {
      setPopupAction(() => () => {
        setSequence(Array(rows).fill(Array(steps).fill(false)));
        setShowPopup(false);
      });
      setShowPopup(true);
    } else {
      setSequence(Array(rows).fill(Array(steps).fill(false)));
    }
  }, [rows, steps, showPopupPreference]);

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

  const handleConfirm = useCallback(() => {
    if (popupAction) {
      popupAction();
    }
  }, [popupAction]);

  const handleCancel = useCallback(() => {
    setShowPopup(false);
  }, []);

  const handlePreferenceChange = useCallback((e) => {
    setShowPopupPreference(!e.target.checked);
  }, []);

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
        sampleNames={sampleNames}
      />
      {showPopup && (
        <ConfirmationPopup
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onPreferenceChange={handlePreferenceChange}
        />
      )}
    </div>
  );
};

export default React.memo(StepSequencer);

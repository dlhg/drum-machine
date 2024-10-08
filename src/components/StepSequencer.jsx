import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from "tone";

// Import components
import BPMControl from "./BPMControl";
import NumberOfStepsControl from "./NumberOfStepsControl";
import StepGrid from "./StepGrid";
import ConfirmationPopup from "./ConfirmationPopup";
import StepValueControl from "./StepValueControl";

// Import drum sounds
import kick from "../assets/DrumSounds/kick.wav";
import clap from "../assets/DrumSounds/clap.wav";
import closedhat from "../assets/DrumSounds/closedhat.wav";
import closedhat2 from "../assets/DrumSounds/closedhat2.wav";
import conga from "../assets/DrumSounds/conga.wav";
import eightoheightbass from "../assets/DrumSounds/808bass.wav";
import rimshot from "../assets/DrumSounds/rimshot.wav";
import openhat from "../assets/DrumSounds/openhat.wav";

// Consts
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
    "Closed Hat 2",
    "Conga",
    "808 Bass",
    "Rimshot",
    "Open Hat",
  ];
  const stepsPerPage = 16;

  // useState

  const [bpm, setBpm] = useState(120);

  const [currentPage, setCurrentPage] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [numOfSteps, setSteps] = useState(16);
  const [sequence, setSequence] = useState(
    Array(rows).fill(Array(numOfSteps).fill(false))
  );
  const [notes, setNotes] = useState(Array(rows).fill("C3"));
  const [stepValue, setStepValue] = useState("16n");

  const [showPopup, setShowPopup] = useState(false);
  const [popupAction, setPopupAction] = useState(null);
  const [showPopupPreference, setShowPopupPreference] = useState(true);

  // useMemo

  const instruments = useMemo(
    () => [
      new Tone.Sampler({ C3: kick }).toDestination(),
      new Tone.Sampler({ C3: clap }).toDestination(),
      new Tone.Sampler({ C3: closedhat }).toDestination(),
      new Tone.Sampler({ C3: closedhat2 }).toDestination(),
      new Tone.Sampler({ C3: conga }).toDestination(),
      new Tone.Sampler({ C3: eightoheightbass }).toDestination(),
      new Tone.Sampler({ C3: rimshot }).toDestination(),
      new Tone.Sampler({ C3: openhat }).toDestination(),
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
    if (e.target.value > maxBPM || e.target.value < minBPM) {
      return;
    }
    setBpm(e.target.value);
  }, []);

  const handleStepsChange = useCallback(
    (e) => {
      if (e.target.value > maxSteps) {
        e.target.value = maxSteps;
      }
      if (e.target.value < minSteps) {
        e.target.value = minSteps;
      }

      const newSteps = parseInt(e.target.value, 10);
      setSteps(newSteps);

      // Calculate the highest valid page based on the new number of steps
      const highestValidPage = Math.floor((newSteps - 1) / stepsPerPage);
      if (currentPage > highestValidPage) {
        setCurrentPage(highestValidPage);
      }

      setSequence((prevSequence) =>
        prevSequence.map((row) => {
          const newRow = Array(newSteps).fill(false);
          row.slice(0, newSteps).forEach((val, idx) => {
            newRow[idx] = val;
          });
          return newRow;
        })
      );
    },
    [currentPage, stepsPerPage]
  );

  const handleNoteChange = useCallback((rowIndex, e) => {
    const newNote = e.target.value;
    setNotes((prevNotes) =>
      prevNotes.map((note, i) => (i === rowIndex ? newNote : note))
    );
  }, []);

  const clearSequence = useCallback(() => {
    if (showPopupPreference) {
      setPopupAction(() => () => {
        setSequence(Array(rows).fill(Array(numOfSteps).fill(false)));
        setShowPopup(false);
      });
      setShowPopup(true);
    } else {
      setSequence(Array(rows).fill(Array(numOfSteps).fill(false)));
    }
  }, [rows, numOfSteps, showPopupPreference]);

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
    // 0 swing is default (max value 1), just putting this here in case I want to add swing later
    // Tone.Transport.swing = 0;

    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        sequence.forEach((row, index) => {
          if (row[step]) {
            instruments[index].triggerAttackRelease(notes[index], "16n", time);
          }
        });
      },
      Array.from({ length: numOfSteps }, (_, i) => i),
      // stepValue is a string that represents the note duration (16n, 8n, 4n, etc)
      stepValue
    ).start(0);

    return () => loop.dispose();
  }, [bpm, sequence, instruments, numOfSteps, notes, stepValue]);

  return (
    <div className="sequencer-container">
      <div className="controls-container">
        <BPMControl
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

        <NumberOfStepsControl
          steps={numOfSteps}
          minSteps={minSteps}
          maxSteps={maxSteps}
          handleStepsChange={handleStepsChange}
        />
        <StepValueControl stepValue={stepValue} setStepValue={setStepValue} />
      </div>
      <StepGrid
        sequence={sequence}
        currentStep={currentStep}
        toggleStep={toggleStep}
        notes={notes}
        handleNoteChange={handleNoteChange}
        sampleNames={sampleNames}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        stepsPerPage={stepsPerPage}
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

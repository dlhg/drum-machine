import React from "react";

const NoteDropdown = ({ note, rowIndex, handleNoteChange }) => (
  <select
    value={note}
    onChange={(e) => handleNoteChange(rowIndex, e)}
    className="note-dropdown"
  >
    {[
      "C3",
      "C#3",
      "D3",
      "D#3",
      "E3",
      "F3",
      "F#3",
      "G3",
      "G#3",
      "A3",
      "A#3",
      "B3",
      "C4",
      "C#4",
      "D4",
      "D#4",
      "E4",
      "F4",
      "F#4",
      "G4",
      "G#4",
      "A4",
      "A#4",
      "B4",
      "C5",
      "C#5",
      "D5",
      "D#5",
      "E5",
      "F5",
      "F#5",
      "G5",
      "G#5",
      "A5",
      "A#5",
      "B5",
      "C6",
    ].map((note) => (
      <option key={note} value={note}>
        {note}
      </option>
    ))}
  </select>
);

export default React.memo(NoteDropdown);

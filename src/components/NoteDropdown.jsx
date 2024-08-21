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
    ].map((note) => (
      <option key={note} value={note}>
        {note}
      </option>
    ))}
  </select>
);

export default React.memo(NoteDropdown);

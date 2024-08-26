import React from "react";

const ConfirmationPopup = ({ onConfirm, onCancel, onPreferenceChange }) => (
  <div className="confirmation-popup">
    <p>Are you sure?</p>
    <button onClick={onConfirm}>Yes</button>
    <button onClick={onCancel}>No</button>
    <div>
      <input
        type="checkbox"
        id="dont-show-again"
        onChange={onPreferenceChange}
      />
      <label htmlFor="dont-show-again">Don't show this again</label>
    </div>
  </div>
);

export default React.memo(ConfirmationPopup);

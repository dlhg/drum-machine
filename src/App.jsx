import { useState } from "react";
import "./App.css";
import * as Tone from "tone";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className="viewport">
        <div className="grid-parent">
          <div className="sequencer">
            <div className="solo-mute-volume-column"></div>
          </div>

          <div className="left-menu"> </div>
          <div className="bottom-menu"></div>
          <div className="top-menu"> </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import * as Tone from "tone";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className="viewport">
        <div className="grid-parent"></div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import * as Tone from "tone";
import StepSequencer from "./components/StepSequencer";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <StepSequencer />
    </>
  );
}

export default App;

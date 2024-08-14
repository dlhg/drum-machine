import { useState } from "react";
import "./App.css";
import * as Tone from "tone";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="viewport">
      <div className="parent">
        <div className="div1">
          <button>←</button>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className={`pulse pulse${i + 1}`}>
              Pulse {i + 1}
            </div>
          ))}
          <button>→</button>
        </div>
        <div className="div2">Div 2</div>
        <div className="div3">Div 3</div>
        <div className="div4">Div 4</div>
        <div className="div5">Div 5</div>
        <div className="div6">Div 6</div>
        <div className="div7"></div>

        <div className="div8">Div 8</div>
        <div className="div9">Div 9</div>
        <div className="div10">Div 10</div>
      </div>
    </div>
  );
}

export default App;

import "./styles.css";

import React from "react";
import { Heatmap } from "react-hour-heatmap";
import MapaCalor_todos from "./MapaCalor_todos";


export default function Calendario() {
  return (
    <div className="App">
      <MapaCalor_todos
      />
    </div>
  );
}

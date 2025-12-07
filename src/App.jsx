import { useRef, useState, useEffect } from "react";

import './App.css'
import TimeScrollytelling from "./articles/coldplunge/components/scrolly/time/TimeScrollytelling";
import TreeScrollyTelling from "./articles/coldplunge/components/scrolly/tree/TreeScrollyTelling";
import TreeVisualization from "./articles/coldplunge/components/scrolly/tree/TreeVisualization";
import treeData from './articles/coldplunge/components/scrolly/tree/data.json'
import TimeVisualization from "./articles/coldplunge/components/scrolly/time/TimeVisualization";
import ExperimentDesign from "./articles/coldplunge/components/experimentDesign/ExperimentDesign";
import experimentData from './articles/coldplunge/components/experimentDesign/data.json'
import Week1 from "./pages/week1";
import ColdPlunge from "./articles/coldplunge/ColdPlunge";
function App() {

  return (
    <>
    <ColdPlunge />

    </>
  )
}

export default App

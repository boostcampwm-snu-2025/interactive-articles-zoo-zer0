import { useRef, useState, useEffect } from "react";

import TreeVisualization from "../articles/coldplunge/components/scrolly/tree/TreeVisualization";
import treeData from '../articles/coldplunge/components/scrolly/tree/data.json'
import TimeVisualization from "../articles/coldplunge/components/scrolly/time/TimeVisualization";
import ExperimentDesign from "../articles/coldplunge/components/experimentDesign/ExperimentDesign";
import experimentData from '../articles/coldplunge/components/experimentDesign/data.json'
export default function Week1(){
    return(
            <>
    <h2>Week 1: recreating a past article</h2>
    <p>
      Highlights: using d3, responsive to screensize, 
    </p>
    <TreeVisualization data={treeData} focusStep={"allReviews"} focusType={"edge"} />

    <ExperimentDesign data={experimentData} />
    <TimeVisualization activeStep={1} />

    </>
    )
}
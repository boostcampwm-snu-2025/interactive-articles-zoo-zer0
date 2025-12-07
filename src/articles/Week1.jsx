import { useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import Narrative from "./coldplunge/components/Narrative";
import TreeVisualization from "./coldplunge/components/scrolly/tree/TreeVisualization";
import TreeScrollyTelling from "./coldplunge/components/scrolly/tree/TreeScrollyTelling";
import treeData from './coldplunge/components/scrolly/tree/data.json'

import SourcesScrollytelling from "./coldplunge/components/scrolly/sources/SourcesScrollytelling";

import TimeVisualization from "./coldplunge/components/scrolly/time/TimeVisualization";

import ExperimentDesign from "./coldplunge/components/experimentDesign/ExperimentDesign";
import experimentData from './coldplunge/components/experimentDesign/data.json'
export default function Week1(){
    return(
        <>
        <nav className="article-nav">
            <Link to="/" className="back-button">← Back to Home</Link>
        </nav>
        <Narrative content={
            <>
                <h1>1주차: d3를 사용한 시각화 + 스크롤리텔링 기사</h1>
                <p>
                Highlights: designing visualizations, using d3 to implement that vision, responsive to screensize, making scrolly components
                <br></br>
                <small>+ used react-dom for multipage portfolio-esque(?) website</small>
                <br></br>
                시각화 계획, 구현, 그리고 설명을 적어봤습니다. 기사는 <a href="../articles/cold-plunge">요기</a>.
                <br></br>
                <small>(대충 온라인 건강트렌드 & 임상시험에서의 성편향 내용입니다)</small>
                </p>
                <h2>1. Tree Graph</h2>
                <h3>1.1 Big Picture</h3>
                <p>
                    Objective: Create a citation tree that connects to any source cited in an article or review paper. The nodes are colored by type of source. If the source is a clinical study, then it is colored by % of female participants.
                    <br></br>
                    Each edge is colored by the sentiment of cited source. If an upper article cites a source to show the benefits of cold plunging, then it is colored green.

                </p>
                <div style={{display:"flex", alignItems:"flex-start",justifyContent:"start",flexDirection:"row"}}>
                    <img src="/week1/bigpicture.png" style={{height:"400px"}} />
                    <div style={{marginLeft:"-40vw"}}>
                        <TreeVisualization data={treeData} focusStep={"reflection"} focusType={"edge"} />
                    </div>
                </div>
                <h3>1.2 Hover & Tapered Edges</h3>
                <p>
                    When the reader hovers on a node, it shows the title of the article/paper. When they hover over an edge, it shows how the upper source quoted the bottom source. 
                    <br></br> <br></br>
                    Previously, readers compalined that the edges were too thin to hover over. However, thick edges tend to be aesthetically monstrous.
                    <br></br>
                    Hence, i decided to add an opaque thicker edge. To prevent overlaping, the thicker edges were tapered.
                    <br></br>
                </p>
                <div style={{display:"flex", alignItems:"flex-start",justifyContent:"start",flexDirection:"row"}}>
                    <img src="/week1/edge.png" style={{height:"400px"}} />
                    <div style={{marginLeft:"-40vw"}}>
                        <TreeVisualization data={treeData} focusStep={0} focusType={"edge"} />
                    </div>
                </div>
                <h3>1.3 Zoom Logic</h3>
                <p>
                    Highligting the relationship between upper and lower nodes is <strong>crucial</strong> to the message of this article. However, when scale is determined manually (and centered between node and child), the nodes would get cropped out on smaller screens.
                </p>
                <img src="/week1/zoomissue.png" />
                <p>
                    Hence, I rewrote the transform helper function where, instead of manually changing scale, it would receive margin as a parameter. Based on the viewport, it would calculate the scale necessary to have such margins. Additionally, to ensure that all nodes can be viewed (even on thinner screens), I added a condition where width of child node row is also considered. 
                </p>
                    <img src="/week1/zoom.png" style={{width:"90%"}} />
                    
                <h3>1.4 Scrollytelling sequence</h3>
                <p>
                    Zoom-in/Zoom-out, fade-in fade-out would be determined by scroll step.
                </p>
                <img src="/week1/scrollysequence.png" style={{width:"100%"}}/>
                <p>The sequence:</p>
            </>} />
        <TreeScrollyTelling />
        <Narrative content={
        <>
            <h2 style={{marginTop:"-80vh"}}>2. Sources</h2>
            <p>This part was relatively simple. Just need to calculate the position of where each rectangle should go. Using d3 transitions makes it look cooler.</p> 
            <img src="/week1/sourcescrolly.png" />

            <SourcesScrollytelling />
            
            <p style={{marginTop:"-70vh"}}>Decided not to follow with the initial scrolly sequence plan because it felt like too much scrolly.</p>
            <img src="/week1/sourcescrolly2.png" />
            <p>Instead, decided to use that grid chart idea as a stand alone interactive.</p>
            <h2>3. Experiment design explanations</h2>
            <p>This part looks simple but was quite complicated (to me...).</p>
            <ExperimentDesign data={experimentData} />
            <p>Made one more type that is similar to the static heatmap I had originally.</p>
            <div style={{display:"flex", alignItems:"flex-start",justifyContent:"start",flexDirection:"row"}}>
                <div style={{scale:"0.5",marginLeft:"-180px",marginTop:"-180px"}}>
                    <ExperimentDesign data={experimentData} gendered={false}/>
                </div>
                <img style={{width:"450px",marginLeft:"-180px"}} src="/week1/oldHeatmap.png" />

            </div>
            <h2>4. Timeline</h2>
            <p>also relatively easier. not much interactive stuff either. would have been nice to show the titles as readers scroll, but didn't have enough time for that :(
                <br></br><small>At least the tooltip works and changes position based on mouse location..! :D</small>
            </p>
                <TimeVisualization activeStep={1} />

            <h2>5. etc.</h2>
            <ul>
                <li>
                    Originally made it in <a href="https://github.com/zoo-zer0/cold-plunge"> this repo.</a> So some of the css might be off....
                </li>
                <li>
                    Not sure if this is conventional for a multipage website, but couldn't find examples of news websites that had interactive components publically show their repos (except <a href="https://pudding.cool/">The Pudding</a>, but they use Svelte)
                </li>
                <li>
                    다음주도 d3.js... but three.js 요소도 추가해보기..! (아니면 지도 시각화 해보기) (<a href="https://www.straitstimes.com/multimedia/graphics/2024/12/singapore-butterflies-climate-change/index.html">이런 느낌으로?!</a>)
                </li>
            </ul>
        </>}/>
        <nav className="article-nav">
            <Link to="/" className="back-button">← Back to Home</Link>
        </nav>
        </>
    )
}
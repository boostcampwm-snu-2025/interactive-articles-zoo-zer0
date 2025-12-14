import { useState, useEffect, useRef } from "react";
import TreeVisualization from "./TreeVisualization";
import data from "./data.json";
import { Scrolly, ScrollyStep } from "../../../../../patterns/Scrolly";
const TreeScrollyTelling = () => {
    
    const [activeStep, setActiveStep] = useState(null);
 
    const stepsData = [
        { id: 0, focus: "node", source: 0, //joseon
            content: (
                <>
                    <p>
                    I began tracing this pipeline through a story in <a href="">The Joseon Ilbo.</a> The article covered a Vogue video featuring Jennie from Blackpink introducing her nightly cold plunging routine.
                    </p>
                </>
            )
        },
        { id: 1, focus: "edge", source: 0, //joseon
            content: (
                <>
                    <p>
                        Each of these lines represent a quote from the bubble above, connected to the source of the claim, categorized by its stance on cold plunging: 
                        {" "}<span style={{backgroundColor:"#26a02a"}} className = "highlight">beneficial</span>, 
                        {" "}<span style={{backgroundColor:"#a5231a"}} className = "highlight">harmful</span>, 
                        {" "}or <span style={{backgroundColor:"#757575"}} className = "highlight">neutral</span>. 
                    </p>
                    <p>
                        For example, <a href="">The Joseon Ilbo article</a> lists several benefits—such as reduced pain, improved circulation, and muscle recovery—citing <a href="">EveryDay Health</a>, A U.S.-based medical newsletter.
                    </p>
                </>
            )
        },
        { id: 2, focus: "node", source: 1, //everyday
            content: (
                <>
                    <p>
                        <a href="">EveryDay Health</a> is generally reputable, with its articles medically reviewed and citations drawn from scientific journals, while remaining accessible to the general public.
                    </p>
                </>
            )
        },
        { id: 3, focus: "edge", source: 1, //everyday
            content: (
                <>
                    <p>
                        <a href="">EveryDay Health</a>'s article considers both the benefits and potential harms of cold plunging, but leans more <span style={{backgroundColor:"#26a02a"}} className= "highlight">positive.</span>
                    </p>
                    <p>
                        For example, it mentions benefits such as reduced pain and fatigue, and improved recovery after high-intensity exercise.
                    </p>
                </>
            )
        },
        { id: 4, focus: "node", source: 14, //review 2022 sports medicine
            content: (
                <>
                    <p>
                        These claims are cited from a 2022 systematic review published in <a href="">Sports Medicine</a> that examined 52 studies.
                    </p>
                    <p>
                        A <strong><span style={{backgroundColor:"#ffaf80ff", color: "black"}} className="highlight orange">review paper</span></strong> is a type of scientific study that analyzes findings on a single topic by synthesizing results from multiple previous studies, represented here as an orange dot.
                    </p>
                </>
            )
        },
        { id: 5, focus: "edge", source: 14, 
            content: (
                <>
                    <p>
                        Each cold-water-immersion trial (a controlled experiment designed to test specific effects) is represented as a dot, colored on a scale from 
                        <span style={{backgroundColor:"#a7e3ffff", color: "black"}} className= "highlight boy-blue">blue</span>  
                        to 
                        <span style={{backgroundColor:"#b80090"}} className="highlight">pink</span>: 
                        the pinker the dot, the greater the female participation rate.
                    </p>
                    <p>
                        You'll notice a sea of blue dots. Out of those 52 studies, I had access to 32 trials. And out of those 32 trials, 
                        <br></br>
                        <strong><span className="highlight">22</span> excluded women entirely.</strong>
                    </p>
                </>
            )
        },
        { id: 6, focus: "edge", source: "allReviews", 
            content: (
                <>
                <p>
                    And this isn't unique to this one review article.
                </p>
                </>
            )
        },
        { id: 7, focus: "edge", source: 6, //frontier in physiology 2025
            content: (
                <>
                <p>
                    Let's look at the 2025 review article looking into the doses of cold water immersion, which analyzes 55 studies. I could access 31 trials. 
                </p>
                <p>
                    And out of those 31 trials, <span className="highlight">23</span> excluded women entirely.
                </p>
                </>
            )
        },
        { id: 8, focus: "edge", source: "allReviews", 
            content: (
                <>
                <p>
                    Each review article, colored orange, shows a similar pattern.
                </p>
                </>
            )
        },
        {id: 9, focus: "edge", source: "allReviews",
            content:(<></>)
        }
    ];
    const onStepEnter = ({ data }) => {
        setActiveStep(data);
    };

    return(
        <div className="scrolly">
            <div className="sticky">
                <p style={{position:"absolute",fontSize:"0.7em",left:"50%", transform:"translateX(-50%)"}}><em>
                Hover over a <strong>dot</strong> to see its source.
                <br></br>Hover over a <strong>line</strong> to read the quoted citation.
                <br></br><strong>Click</strong> to visit source website.
                </em>
                </p>

                <TreeVisualization 
                    data={data} 
                    focusStep={activeStep != null ? stepsData[activeStep].source : null} 
                    focusType={activeStep != null ? stepsData[activeStep].focus : null} 
                />
            </div>
            <div className="scrolly-narrative">
                <Scrolly offset={0.5} onStepEnter={onStepEnter}>
                    {stepsData.map((step, index) => (
                        <ScrollyStep data={index} key={index}>
                            <div 
                                className={activeStep === index ? "scroll-box active" : "scroll-box"} 
                                id={index === 9 ? "throwaway" : ""}
                            >
                                {step.content}
                            </div>
                        </ScrollyStep>
                    ))}
                </Scrolly>
            </div>     
        </div>
    )
}

export default TreeScrollyTelling;
import { useState } from "react";
import { Scrollama, Step } from 'react-scrollama';

const SourcesScrollytelling = () =>{
    
    const [activeStep, setActiveStep] = useState(null);
    const stepsData = [
        { id: 0,
            content: (
                <>
                    <p>
                    Stepping outside the headlines, I collected <b>426</b> PubMed articles, with abstracts available, that conducted clinical and randomized trials, tagged <span class="highlight">“cold-water-immersion”.</span>
                    </p>
                </>
            )
        },
        { id: 1,
            content: (
                <>
                    <p>
                    Non-human experiments, cold water immersion as a pain stimulus, and experiments focused on heated water immersion were excluded during the data clean up process.
                    </p>
                </>
            )
        },
        { id: 2,
            content: (
                <>
                    <p>
                    That left me with <b>212</b> articles, all with a focus on therapeutic and physiological effects of cold therapy. 
                    </p>
                </>
            )
        },
        { id: 3,
            content: (
                <>
                    <p>
                        And out of 212 studies,
                        <br></br>
                        <br></br><span class="highlight boy-blue">143</span> consisted only of men,
                        <span class="highlight">69</span> had both male and female participants,
                        <br></br>and only <span class="highlight girl-pink">11</span> were female-focused studies.
                        <br></br>
                        <br></br>Additionally, <span class="highlight gray">13</span> did not include any information about the gender of participants.
                    </p>
                </>
            )
        },
        { id: 4,
            content: (
                <>
                    <p>
                        (add something about %)
                    </p>
                    <p>
                        A <strong><span style={{backgroundColor:"#ffaf80ff", color: "black"}} className="highlight orange">review paper</span></strong> is a type of scientific study that analyzes findings on a single topic by synthesizing results from multiple previous studies, represented here as an orange dot.
                    </p>
                </>
            )
        },
        {id: 5, 
            content:(<></>)
        }
    ];
    
    const onStepEnter = ({ data })=>{
        setActiveStep(data);
        console.log(data);
    };

    return(
        <div className="scrolly">
            <div className="sticky">
                <button>click me</button>
            </div>
            <div className="scrolly-narrative">
                <Scrollama offset={0.4} onStepEnter={onStepEnter}>
                    {stepsData.map((step, index)=>(
                        <Step data={index} key={index}>
                            <div className= {activeStep === index ? "scroll-box active" : "scroll-box"} id={index===5 ? "throwaway":""}>
                                {step.content}
                            </div>
                        </Step>
                    ))}
                    
                </Scrollama>
            </div>     
        </div>
    )
}
export default SourcesScrollytelling;
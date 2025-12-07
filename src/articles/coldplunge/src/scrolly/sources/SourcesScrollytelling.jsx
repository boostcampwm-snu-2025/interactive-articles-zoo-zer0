import { useState } from "react";
import { Scrollama, Step } from 'react-scrollama';
import SourcesVisualization from "./SourcesVisualization";
import data from "./data.json";

const SourcesScrollytelling = () =>{
    
    const [activeStep, setActiveStep] = useState(null);
    const stepsData = [
        { id: 0,
            content: (
                <>
                    <p>
                    Stepping outside the headlines, I collected <b>426</b> PubMed articles, with abstracts available, that conducted clinical and randomized trials, tagged <span className="highlight">“cold-water-immersion”.</span>
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
                        <br></br><span className="highlight boy-blue">143</span> consisted only of men,
                        <span className="highlight">69</span> had both male and female participants,
                        <br></br>and only <span className="highlight girl-pink">11</span> were female-focused studies.
                        <br></br>
                        <br></br>Additionally, <span className="highlight gray">13</span> did not include any information about the gender of participants.
                    </p>
                </>
            )
        },
        { id: 4,
            content: (
                <>
<p>
  In terms of percentage, that's
  <br></br>
  <span className="highlight boy-blue">67.5%</span> men-only studies,
  <br />
  <span style={{backgroundColor:"#9d92d1ff"}} className="highlight">32.5%</span> mixed-gender,
  and only 
  <br></br>
  <span className="highlight girl-pink">5.2%</span> focused on women.
  <br /><br />
  Meanwhile, <span className="highlight gray">6.1%</span> didn’t report gender at all.
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
                <SourcesVisualization data={data} step={activeStep != null ? stepsData[activeStep].id : null}/>
            </div>
            <div className="scrolly-narrative center">
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
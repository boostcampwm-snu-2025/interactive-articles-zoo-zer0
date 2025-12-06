import { useState } from "react";
import { Scrollama, Step } from 'react-scrollama';
import TimeVisualization from "./TimeVisualization";

const TimeScrollytelling = () =>{
    
    const [activeStep, setActiveStep] = useState(null);
    const stepsData = [
        { id: 0,
            content: (
                <>
                    <p>
While the number of cold water immersion studies published peaked around 2014, there has been research that included women throughout the years since 1998 (though only a minority).
                    </p>
                </>
            )
        },
        { id: 1,
            content: (
                <>
                    <p>
2009 was a strange peak year for women-centered studies: four of the seven papers published were 100% female cohorts.
                    </p>
                </>
            )
        },
        { id: 2,
            content: (
                <>
                    <p>
But reading them closely, most of these studies treated “female” only as a recruitment detail. The consideration of sex as a variable—or the hormonal context of women’s physiology—appears limited. 
                    </p>
                </>
            )
        },
        { id: 3,
            content: (
                <>
                    <p>
The single outlier came from <a href="https://pubmed.ncbi.nlm.nih.gov/19370271/" target="_blank">Effect of stress on pain perception in young women, 2009</a> Ironically, it was the one psychology study that noted hormonal effects, while the three studies on muscle recovery studies said nothing at all. 

                    </p>
                </>
            )
        },
        { id: 4,
            content: (
                <>
<p>They state,
“Since all subjects were females, PPT and PTOL values may have been influenced by hormonal effect of the ovulatory cycle…[however] there are studies indicating that the <strong>influence of the ovulatory cycle on pain perception is minimal."</strong>
<br></br><br></br>
Perhaps one may take this as proof that sex differences are negligible.
</p>
                </>
            )
        },
        {id: 5, 
            content:(<>
            <p>
                But recent studies have started to acknowledge this, as they are beginning to openly call out the underrepresentation of women in sports medicine studies, framing their designs as correctives to a male-dominated literature. 
            </p>
            </>)
        },
        {id: 6, 
            content:(<>
            <p>
                One 2025 trial begins its introduction with the importance of studying women. “Female participants are <strong>significantly underrepresented in sports and exercise medicine research,</strong> including studies related to CWI and HWI. <strong>Hormonal status (e.g., estrogen levels) and differences in body composition… could potentially contribute to divergent outcomes.</strong>”
            </p>
            <p style={{fontSize:"0.8em"}}>
                <a href="https://pubmed.ncbi.nlm.nih.gov/40333546/" target="_blank">
No acceleration of recovery from exercise-induced muscle damage after cold or hot water immersion in women: A randomised controlled trial, 2025
</a>
</p>            
            </>)
        },
        {id: 7, 
            content:(<>
            <p>
                Another study of hamstring recovery in women explains its design as a corrective measure, directly motivated by the lack of female data.
            </p>
            <p style={{fontSize:"0.8em"}}>
<a href="https://pubmed.ncbi.nlm.nih.gov/39665595/" target="_blank">
Effect of cold-water immersion treatment on recovery from exercise-induced muscle damage in the hamstring”, 2025
</a>
            </p>
            </>)
        },
        {id: 8, 
            content:(<>
            <p>
This trend of acknowledgement seems to have started in <span class = "highlight">2020,</span> by a study comparing the effect of various methods of cold therapy on muscle recovery in females. 
<br></br>“To our knowledge, no study has examined the physiological responses or the recovery between PBC, CWI, and a control treatment in females. This is consistent with the <strong>significantly under‐represented female participants in the wider sport and exercise medicine literature.”</strong>
</p>
            <p style={{fontSize:"0.8em"}}>
                <a href="https://pubmed.ncbi.nlm.nih.gov/31677292/" target="_blank">
Partial-body cryotherapy (-135°C) and cold-water immersion (10°C) after muscle damage in females, 2020
</a>
</p>
            </>)
        },
        {id: 9, 
            content:(<>
            <p>
                It compared traditional cold-water immersion with cryotherapy, a treatment involving extremely low temperatures of nitrogen gas, and concluded that the physiological effects of these two methods were generally similar, noting, “These data <strong>contrast our previous findings in males</strong> utilizing the same exercise and recovery intervention.”

            </p>
            </>)
        },
        {id: 10, 
            content:(<>
            <p>
                They acknowledged their limitations, “Due to logical constraints, the stage of menstrual cycle was not controlled for. Different estrogen levels of the participants might have contributed to the different results in the present study…In humans, the protective effect of estrogen levels and the influence of oral contraception on muscle damage are less clear, but it is <strong>likely</strong> that the protective <strong>effect of estrogen might have a significant impact</strong> on the outcome.” And encouraged future studies to take into account. 
            </p>
            </>)
        },
        {id: 11, 
            content:(<></>)
        },
    ];
    
    const onStepEnter = ({ data })=>{
        setActiveStep(data);
        console.log(data);
    };

    return(
        <div className="scrolly">
            <div className="sticky">
                <p style={{fontSize:"0.7em",margin:"-1em"}}><em>Hover over a <strong>block</strong> to see details.<br></br><strong>Click</strong> to visit source website.</em></p>
                <TimeVisualization activeStep={activeStep != null ? stepsData[activeStep].id : null} />
            </div>
            <div className="scrolly-narrative">
                <Scrollama offset={0.4} onStepEnter={onStepEnter}>
                    {stepsData.map((step, index)=>(
                        <Step data={index} key={index}>
                            <div className= {activeStep === index ? "scroll-box active" : "scroll-box"} id={index===11 ? "throwaway":""}>
                                {step.content}
                            </div>
                        </Step>
                    ))}
                    
                </Scrollama>
            </div>     
        </div>
    )
}
export default TimeScrollytelling;
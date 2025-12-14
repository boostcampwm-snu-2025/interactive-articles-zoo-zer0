import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { Seat } from "../types";
import ScrollyStadium from "./ScrollyStadium";

function ScrollytellingStadium() {
  const [activeSeat, setActiveSeat] = useState<Seat | null>(null);
  const [activeGameID, setActiveGameID] = useState<string | null>("8");
  const seat1: Seat | null = null;
  const seat2: Seat = {x:-100,y:-1000,section:""}; //show graph //= { x: 149, y: 388, section: "SKY Upper Designated Seat" };
  const seat3: Seat | null = null;
  const seat4: Seat = {x:-100,y:-1000,section:""}; //show graph
  const seat5: Seat = { x: 177,y: 318,section: "Green Designated Seat"}; //green seats
  const seat6: Seat | null = null; //hide graph
  const seat7: Seat={ x: 336,y: 663,section: "Navy Seat"} //navy seats
  const seat8: Seat={ x: 400,y: 519,section: "Blue Seat"} //blue seats
  const seat9: Seat={ x: 324,y: 473,section: "Red Seat"} //red seats
  //const seat10: Seat={ x: 324,y: 473,section: "Red Seat"} //red seats


  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.5 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.5 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.5 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.5 });
  const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.5 });
  const { ref: ref6, inView: inView6 } = useInView({ threshold: 0.5 });
  const { ref: ref7, inView: inView7 } = useInView({ threshold: 0.5 });
  const { ref: ref8, inView: inView8 } = useInView({ threshold: 0.5 });
  const { ref: ref9, inView: inView9 } = useInView({ threshold: 0.5 });
  const { ref: ref10, inView: inView10 } = useInView({ threshold: 0.5 });

  // ✅ move state update into useEffect
  useEffect(() => {
    if (inView1 || inView2){ //Regular Season LG
        setActiveGameID("8");
        if (inView1) setActiveSeat(seat1);
        else if (inView2) setActiveSeat(seat2);
    }
    else if (inView3 || inView4 || inView5 || inView6 || inView7 || inView8 || inView9 || inView10){ // Post-season LG
         setActiveGameID("6"); 
        if(inView3) setActiveSeat(seat3);
        else if (inView4) setActiveSeat(seat4);
        else if (inView5) setActiveSeat(seat5);
        else if (inView6) setActiveSeat(seat6);
        else if (inView7) setActiveSeat(seat7);
        else if (inView8) setActiveSeat(seat8);
        else if (inView9 || inView10) setActiveSeat(seat9);

    }
    else{

    }
  }, [inView1, inView2, inView3, inView4, inView5, inView6, inView7, inView8, inView9,inView10]);

    return (
    <div className="scrolly">
        <div style={{top:"50px"}} className="sticky">
            <div className="scrollyStadium">
                <ScrollyStadium
                    selectedGameId={ activeGameID }
                    selectedSeat={activeSeat}
                    onSelectSeat={setActiveSeat}
                />
                </div>
        </div>
        
        <div className="scrolly_narrative_center">
        <section ref={ref1} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView1 ? "active-step" : ""}>
To look further into this trend, let’s look at the Jamsil Seoul Sports Complex Baseball Stadium, home to the LG Twins. From August 8 to 10, they hosted a regular-season three-game series against the Hanwha Eagles.

            </p>
            </div>
        </section>

        <section ref={ref2} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView2 ? "active-step" : ""}>
Each seat section on the left shows the average price increase rate of Ticketbay listings—measured as resale price divided by original price—colored by a gradient from light (100%) to dark (800%). The bar graph on the right compares the original price with the average resale price. 
<br></br><br></br>
During the regular season, resale prices averaged <strong>300%</strong> of face value. 
            </p>
            </div>
        </section>

        <section ref={ref3} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView3 ? "active-step" : ""}>
However, once the postseason began, the contrast became unmistakable: the colors darkened, and so did the numbers.
            </p>
            </div>
        </section>

        <section ref={ref4} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView4 ? "active-step" : ""}>
At Jamsil, where Games 1 and 2 of the Korean Season were held, tickets for the Hanwha Eagles vs LG Twins matchup were resold at an average of <mark style={{backgroundColor:"#bfc4d9ff",padding:"0.05em 0.1em",fontWeight: inView4 ? "bold" : "normal"}}>
                    540%
                </mark> of their original price.
<br></br> <br></br>
As resale ticket prices soared, some fans were simply priced out of attending games.
            </p>
            </div>
        </section>

        <section ref={ref5} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView5 ? "active-step" : ""}>
For example, the Green seats, popular for their relatively affordable price of ₩35,000, showed a <mark style={{backgroundColor:"#bfc4d9ff",padding:"0.05em 0.1em",fontWeight: inView5 ? "bold" : "normal"}}>
                    619.2%
                </mark> price increase. The histogram on the right shows the distribution of these listings, with none going below ₩130,000.
            </p>
            </div>
        </section>

        <section ref={ref6} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView6 ? "active-step" : ""}>
This pattern is not unique to a single section.
            </p>
            </div>
        </section>
        <section ref={ref7} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView7 ? "active-step" : ""}>
    The Navy seats, originally, ₩50,000, showed an average price increase of <mark style={{backgroundColor:"#bfc4d9ff",padding:"0.05em 0.1em",fontWeight: inView7 ? "bold" : "normal"}}>
                    562.2%. 
                </mark>

            </p>
            </div>
        </section>
                <section ref={ref8} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView8 ? "active-step" : ""}>
Similar patterns appeared for the Blue seats (originally ₩80,000,  price increase 473.6%),
            </p>
            </div>
        </section>
                <section ref={ref9} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView9 ? "active-step" : ""}>
and the Red Seats (originally ₩50,000, price increase 517.4%).
            </p>
            </div>
        </section>
                <section ref={ref10} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView10 ? "active-step" : ""}>
These so-called “regular seats” sell for an average of over ₩200,000—exceeding the ₩160,000 original price of the Premium Seats. 
<br></br><br></br>
As affordable sections virtually disappear, rising ticket prices have turned watching a game from a public pastime into a privilege. 
            </p>
            </div>
        </section>
        </div>


    </div>
    );
}

export default ScrollytellingStadium;

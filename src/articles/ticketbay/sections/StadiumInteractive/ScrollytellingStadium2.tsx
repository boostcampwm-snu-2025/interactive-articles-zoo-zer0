import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { Seat } from "../types";
import ScrollyStadium from "./ScrollyStadium";

function ScrollytellingStadium2() {
  const [activeSeat, setActiveSeat] = useState<Seat | null>(null);
  const [activeGameID] = useState<string | null>("6");
  const seat5: Seat | null=null; //hide graph
  const seat6: Seat={ x: 177,y: 318,section: "Navy Seat"}

  const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.5 });
  const { ref: ref6, inView: inView6 } = useInView({ threshold: 0.5 });

  // ✅ move state update into useEffect
  useEffect(() => {
    if (inView5) setActiveSeat(seat5);
    else if (inView6) setActiveSeat(seat6);
  }, [inView5, inView6]);

    return (
    <div className="scrolly">
        <div style={{top:"50px"}} className="sticky">
      <h2>
      "Limited Cultural Access Due to Scalping - The Problem of Popular Seats Becoming Expensive"
      </h2>
            <div className="scrollyStadium">
                <ScrollyStadium
                    selectedGameId={ activeGameID }
                    selectedSeat={activeSeat}
                    onSelectSeat={setActiveSeat}
                />
                </div>
        </div>
        
        <div className="scrolly_narrative_center">

        <section ref={ref5} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView5 ? "active-step" : ""}>
            As resale ticket prices soared, some people could no longer afford to attend baseball games.
            </p>
            </div>
        </section>

        <section ref={ref6} style={{ height: "100vh"}}>
            <div className="scroll-box">
            <p className={inView6 ? "active-step" : ""}>
            The Green Designated Seats in the outfield, and the Blue, Navy, and Red seats in the infield are popular among spectators due to their relatively low prices. The resale prices for all these seats exceed 200,000 won. This is more expensive than the original price of premium seats.
            </p>
            </div>
        </section>
        </div>


    </div>
    );
}

export default ScrollytellingStadium2;

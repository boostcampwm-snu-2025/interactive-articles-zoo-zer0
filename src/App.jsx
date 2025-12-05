import { useState } from 'react'
import './App.css'
import Narrative from './Narrative'
import Hero from './components/Hero'

import TreeScrollyTelling from './scrolly/tree/TreeScrollyTelling'
import SourcesScrollytelling from './scrolly/sources/SourcesScrollytelling'
function App() {

  return (
    <>
      <Hero />
      <Narrative content={
        <>
          <p>
            <span className="dropcap">C</span>old plunge content is everywhere on my <em>For You Page</em>. It seems like I’m not alone, as Google searches for <span className="highlight">“cold plunge”</span> have surged by <strong><span className="highlight">3862.5%</span></strong> since 2020. On YouTube, TikTok, Instagram, and Reddit, cold plunging has gone from niche recovery ritual to mainstream “biohack”.
          </p>
          <p>
            Endorsed by celebrities and my favorite wellness influencers, cold plunging is said to offer benefits like enhanced recovery, boosted mood, and weight loss, supposedly backed up by scientific research and numerous controlled trials.
          </p>
        </>
      }/>
      <Narrative content={
        <>
          <p>
            This was enough to convince me to give it a try. But the moment I stepped in the tub, immersing myself in the ice cold water, there was no shivering, no promised calorie burn like the health blogs claimed; just a pure, overwhelming state of stress. As I endured what felt more painful than therapeutic, I thought to myself: maybe this trend isn't <em>for me.</em>
          </p>
          <p>
            Somehow, the scientific evidence behind the flashy YouTube thumbnails and influencer tubs may not be as inclusive as the marketing makes it seem.
          </p>
          <p>
              In fact, out of 212 PubMed trials on the effects of cold therapy, more than <b>half the studies excluded women from its methodology entirely</b>. 
          </p>
          <p>
            So how does advice based on male-centric studies become universal wellness wisdom? Why are female bodies left out of the research, and does this go beyond a mere harmless internet trend?
          </p>
        </>
      }/>
      <Narrative content={
        <>
          <h2>The Flow of Information: from the Lab to Your Feed</h2>
          <p>
            Cold plunging didn’t land on my For You Page arbitrarily. It traveled through a lengthy, complex citation pipeline: from controlled trials in academic journals, to systematic reviews, to mainstream health blogs, to celebrity news and TikTok videos. Somewhere along that path, critical details—like who the studies were actually conducted on—disappeared.
          </p>
        </>
      }/>
      <TreeScrollyTelling />
      <Narrative content={
        <>
        <p style={{marginTop:"-75vh"}}>
          So when EveryDay Health claims “cold plunging may help relieve pain,” or “A cold water plunge may temporarily make you feel invigorated,” that conclusion largely reflects male physiology. At the research level, gender gaps are documented, if you go looking for them. At the newsletter level, this information is omitted. And by the time this advice hits celebrity news or your For You Page, the message becomes universal.
        </p>
        <p>
          But is this merely one slightly flawed citation chain, or part of a larger, systemic pattern? If gender gaps can disappear so easily on the way from trials to journals to celebrity news, what do things look like at the source?
        </p>
        <h2>Unpacking the Data</h2>
        </>
      }/>
      <SourcesScrollytelling />
      <Narrative content ={
        <>
          <h2>Beyond Who Was Studied: What Was Tested?</h2>

  <p>
    Knowing <em>who</em> was included in cold water immersion research is only part of the story. 
    The equally important question is: <strong>what exactly were researchers testing for?</strong>  
    Beyond merely “Were women included?”, but “Does this specific method help <em>me</em> with <em>my specific needs</em>?”
  </p>

  <p>To explore this, studies were categorized along two dimensions<sup>1</sup>:</p>
  <ul>
    <li><strong>Method of cold therapy:</strong> full-body immersion, partial immersion, cryotherapy with nitrogen air, hot water immersion, and other variations.</li>
    <li><strong>Intended effect:</strong> outcomes such as muscle recovery, athletic performance, diet, pain perception, clinical treatment, and more.</li>
  </ul>
  <p style={{textAlign:"right",color:"#666", fontSize:"0.8em"}}>
    <strong><sup>1</sup>Note on methodology:</strong> These categories were developed after manually reviewing all 11 of the female-only research papers. 
    A random sample of 59 additional studies was then categorized, for a total of 70. 
    Studies with methods or effects outside the listed groups were classified as "etc."
    The heatmap therefore reflects only this subset of the 212 available studies.
  </p>
        </>
      }/>
    </>
    
  )
}

export default App

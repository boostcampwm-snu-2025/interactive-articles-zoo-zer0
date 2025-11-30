import { useState } from 'react'
import './App.css'
import Narrative from './Narrative'
import Hero from './components/Hero'
//import ScrollamaDemo from './scrolly/test'
import TreeScrollyTelling from './scrolly/tree/TreeScrollyTelling'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <Narrative content={
        <>
          <p>
            <span className="dropcap">C</span>old plunge content is everywhere on my For You Page. It seems like I’m not alone, as Google searches for “cold plunge” have surged by 3862.5% since 2020. On YouTube, TikTok, Instagram, and Reddit, cold plunging has gone from niche recovery ritual to mainstream “biohack”.
          </p>
          <p>
            Endorsed by celebrities and my favorite wellness influencers, cold plunging is said to offer benefits like enhanced recovery, boosted mood, and weight loss, supposedly backed up by scientific research and numerous controlled trials.
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
        <p style={{marginTop:"-100vh"}}>
          So when EveryDay Health claims “cold plunging may help relieve pain,” or “A cold water plunge may temporarily make you feel invigorated,” that conclusion largely reflects male physiology. At the research level, gender gaps are documented, if you go looking for them. At the newsletter level, this information is omitted. And by the time this advice hits celebrity news or your For You Page, the message becomes universal.
        </p>
        <p>
          But is this merely one slightly flawed citation chain, or part of a larger, systemic pattern? If gender gaps can disappear so easily on the way from trials to journals to celebrity news, what do things look like at the source?
        </p>
        </>
      }/>
    </>
    
  )
}

export default App

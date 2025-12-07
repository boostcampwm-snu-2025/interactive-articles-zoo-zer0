import './ColdPlunge.css'
import { Link } from 'react-router-dom'
import Narrative from './components/Narrative'
import Hero from './components/Hero'
import experimentdata from './components/experimentDesign/data.json'
import ExperimentDesign from './components/experimentDesign/ExperimentDesign'
import TreeScrollyTelling from './components/scrolly/tree/TreeScrollyTelling'
import SourcesScrollytelling from './components/scrolly/sources/SourcesScrollytelling'
import TimeScrollytelling from './components/scrolly/time/TimeScrollytelling'
function ColdPlunge() {

  return (
    <>
      <nav className="article-nav">
        <Link to="/" className="back-button">← Back to Home</Link>
      </nav>
      <Hero />
      <Narrative content={
        <>
          <p>
            <span className="dropcap">C</span>old plunge content is everywhere on my <em>For You Page</em>. It seems like I’m not alone, as Google searches for <span className="highlight">“cold plunge”</span> have surged by <strong><span className="highlight">3862.5%</span></strong> since 2020. On YouTube, TikTok, and Instagram, cold plunging has gone from niche recovery ritual to mainstream “biohack”.
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
          <h2 style={{marginTop:"-75vh"}}>Beyond Who Was Studied: What Was Tested?</h2>

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
    <ExperimentDesign data={experimentdata} gendered={false}/>
    <Narrative content={
      <>
        <p>
    Even within the same category, results often disagree. For example:
  </p>

  <blockquote>
  <p>
    <a href="https://pubmed.ncbi.nlm.nih.gov/31652109/" target="_blank">
      Cold-Water Immersion Does Not Accelerate Performance Recovery After 10-km Street Run: Randomized Controlled Clinical Trial, 2019
    </a>
  </p>
  <p>
    <a href="https://pubmed.ncbi.nlm.nih.gov/27786541/" target="_blank">
      Postexercise cold-water immersion improves intermittent high-intensity exercise performance in normothermia, 2016
    </a>
  </p>
</blockquote>

  <p>
    Both of these trials examined whole-body cold-water immersion for athletic performance, yet they reached opposite conclusions. 
    Differences in conditions—temperature, duration, or even interpretation—likely explain the contrast. 
    This is the normal process of science: individual studies may conflict, but over time the body of work evolves, refining its methods and producing more nuanced insights.
  </p>
      </>}/>
      <ExperimentDesign data={experimentdata} gendered={true}/>
      <Narrative content={
        <>
          <p>
    When we layer on sex representation, the imbalance becomes stark. 
    Whole-body cold water immersion and cryotherapy—the two most common methods when influencers mention a "cold plunge routine"—are overwhelmingly male-focused. 
    By contrast, 7 out of the 11 female-only studies observed the effects of partial-body immersion.
  </p>

  <p>
    Female-only research often begins from scratch. As the few rare female-only studies state:
  </p>

  <blockquote>
  <p>
    “To our knowledge,<strong> no study </strong>has examined the physiological responses or the recovery between PBC, CWI, and a control treatment in <strong>females</strong>.” 
    <br></br>
      <a style={{textAlign:"right", fontSize:"0.8em"}} href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7027844/" target="_blank">
        Partial‐body cryotherapy (−135°C) and cold‐water immersion (10°C) after muscle damage in females, 2020</a>
  </p>

  <p>
    “To our knowledge, existing studies have <strong>only been conducted on male subjects.</strong> Female participants are <strong>significantly underrepresented</strong> in sports and exercise medicine research, including studies related to CWI and HWI.”  
    <br></br>
      <a style={{textAlign:"right", fontSize:"0.8em"}} href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12057877/" target="_blank">
        No acceleration of recovery from exercise-induced muscle damage after cold or hot water immersion in women: A randomised controlled trial, 2020</a>
  </p>
</blockquote>


  <p>
    Because there’s so little historical foundation, even a single new study is often the “first” of its kind, 
    which makes it difficult to establish nuanced recommendations, like optimal temperatures, durations, or mechanisms, for women’s bodies.
  </p>

  <p>
    Entire method and effect categories have <strong>no female-focused studies at all</strong>. 
    For example, no research on female-focused research exists regarding cold immersion for hyperthermia treatment, sleep, or key physiological mechanisms like vasodilation, oxygenation, and parasympathetic activity, despite these being widely used terminology in wellness media. 
    Moreover, when studies do discuss such mechanisms in their introduction, supported citations are older research that mostly reflect male physiology. 
        <br></br>
      <a style={{textAlign:"right", fontSize:"0.8em"}} href="https://pubmed.ncbi.nlm.nih.gov/8891513/" target="_blank">
        Change in sympathetic activity, cardiovascular functions and plasma hormone concentrations due to cold water immersion in men, 1997
    </a>
  </p>

  <p>
    So while cold plunging spreads virally through celebrity culture and wellness newsletters, 
    the underlying research base reflects a much deeper gender skew. 
    And this imbalance is not unique to cold therapy: it mirrors a broader underrepresentation of female participants in sports and exercise medicine. 
    Which means when I ask, <em>“Is cold plunging good for me?”</em>—the most honest answer is still: <strong>we don’t know yet.</strong>
  </p>
  <h2>The Timeline of Cold Plunge Science</h2>
        </>
      }/>
      <TimeScrollytelling/>
      <Narrative content={<>
            <p style={{marginTop:"-75vh"}}>
Raised awareness of the lack of female-centered research in cold water immersion is part of a larger reckoning in sports and exercise science. Recent studies not only acknowledge that women have long been underrepresented, they also explain why: the technical difficulty of accounting for hormonal variability across the menstrual cycle. But if that variability is large enough to complicate experimental design, it’s also large enough to matter in practice. In other words, the very thing used as a reason to exclude women is itself evidence that we need more research—not less.

    </p>
Progress is happening. In July 2024, the <em>Journal of Science and Medicine in Sport</em> introduced a rule requiring authors of single-sex studies to provide explicit justification for excluding one gender. Male-only studies were still published in 2024, but the trajectory is shifting. By 2025, new female-focused studies are not just filling a gap; they are redefining the research agenda.

<br></br>
<a style={{fontSize:"0.8em"}} href="https://pubmed.ncbi.nlm.nih.gov/38879218/" target="_blank">
Addressing female underrepresentation in sport & exercise-related research: JSAMS policy for submitted studies (& subsequent considerations), 2024
</a>
    <p>
Cold plunges may have gone viral for their universal appeal, but the science shows us they are not universal, or not yet. The question now is whether research can keep pace with practice—whether the next wave of studies will reflect the people actually stepping into the ice bath.

    </p>
        
        </>}/>
      <footer style={{width:"100%", height:"30vh", backgroundColor:"#dfeeffff", paddingTop:"20px"}}>
            by Jooyoung | Visit my <a href="https://zoo-zer0.github.io/">portfolio</a>
      </footer>
    </>
    
  )
}

export default ColdPlunge

import Toggle from "../../components/Toggle";
import Header from "../../components/Header";
import Narrative from "../../components/Narrative";
export default function Week2(){
    return(<>
    <Header />
    <Narrative content={<>
        <h1>week 2</h1>
        <p>
            Last week, I wrote "not sure if this is conventional for a multipage website..." Looking back, my previous repo was definitely unstructured and routing would have become painful as the number of articles grew.
        </p>
        <p>
            this was my previous file structure:
        </p>
        <Toggle summary={"previous file structure"} content={<>
├── public
<br></br>│   ├── coldplunge
<br></br>│   │   ├── img
<br></br>│   │   │   ├── logo.png
<br></br>│   │   │   ├── title.jpg
<br></br>│   │   │   └── title2.jpeg
<br></br>│   │   └── vite.svg
<br></br>│   ├── week1
<br></br>│   │   ├── bigpicture.png
<br></br>│   │   ├── edge.png
<br></br>│   │   ├── oldHeatmap.png
<br></br>│   │   ├── scrollysequence.png
<br></br>│   │   ├── sourcescrolly.png
<br></br>│   │   ├── sourcescrolly2.png
<br></br>│   │   ├── zoom.png
<br></br>│   │   └── zoomissue.png
<br></br>│   └── vite.svg
<br></br>├── src
<br></br>│   ├── articles
<br></br>│   │   ├── coldplunge
<br></br>│   │   │   ├── components
<br></br>│   │   │   │   ├── experimentDesign
<br></br>│   │   │   │   │   ├── data.json
<br></br>│   │   │   │   │   └── ExperimentDesign.jsx
<br></br>│   │   │   │   ├── scrolly
<br></br>│   │   │   │   │   ├── sources
<br></br>│   │   │   │   │   │   ├── data.json
<br></br>│   │   │   │   │   │   ├── SourcesScrollytelling.jsx
<br></br>│   │   │   │   │   │   └── SourcesVisualization.jsx
<br></br>│   │   │   │   │   ├── time
<br></br>│   │   │   │   │   │   ├── data.json
<br></br>│   │   │   │   │   │   ├── TimeScrollytelling.jsx
<br></br>│   │   │   │   │   │   └── TimeVisualization.jsx
<br></br>│   │   │   │   │   └── tree
<br></br>│   │   │   │   │       ├── data.json
<br></br>│   │   │   │   │       ├── TreeScrollyTelling.jsx
<br></br>│   │   │   │   │       └── TreeVisualization.jsx
<br></br>│   │   │   │   ├── Hero.jsx
<br></br>│   │   │   │   ├── Narrative.jsx
<br></br>│   │   │   │   └── Scrolly.jsx
<br></br>│   │   │   ├── scrolly
<br></br>│   │   │   │   ├── sources
<br></br>│   │   │   │   │   └── SourcesScrollytelling.jsx
<br></br>│   │   │   │   ├── time
<br></br>│   │   │   │   │   └── TimeScrollytelling.jsx
<br></br>│   │   │   │   └── tree
<br></br>│   │   │   │       └── TreeScrollyTelling.jsx
<br></br>│   │   │   ├── ColdPlunge.css
<br></br>│   │   │   └── ColdPlunge.jsx
<br></br>│   │   └── Week1.jsx
<br></br>│   ├── assets
<br></br>│   │   └── react.svg
<br></br>│   ├── pages
<br></br>│   │   ├── Home.css
<br></br>│   │   └── Home.jsx
<br></br>│   ├── App.css
<br></br>│   ├── App.jsx
<br></br>│   ├── index.css
<br></br>│   └── main.jsx
<br></br>├── eslint.config.js
        </>} />
        <p><small><em>why are there multiple scrolly bits....why are reusable components stuck in coldplunge...wdym i gotta manually add a router to an article...</em></small></p>
        <p>this is my current structure:</p>
       <Toggle summary={"current file structure"} content={<>
<br />├── public
<br />│   ├── coldplunge
<br />│   │   ├── img
<br />│   │   │   ├── logo.png
<br />│   │   │   ├── title.jpg
<br />│   │   │   └── title2.jpeg
<br />│   │   └── vite.svg
<br />│   ├── ticketbay
<br />│   │   └── img
<br />│   │       ├── data
<br />│   │       │   ├── 야구 top 통장표 b c씨 강조.svg
<br />│   │       │   ├── 야구 top 통장표 찐.svg
<br />│   │       │   ├── 현황 1.svg
<br />│   │       │   └── 현황 2.svg
<br />│   │       ├── stadiums
<br />│   │       │   ├── hanhwa.png
<br />│   │       │   ├── lg.png
<br />│   │       │   ├── samsung.png
<br />│   │       │   └── ssg.png
<br />│   │       ├── tickets
<br />│   │       │   ├── 1.png
<br />│   │       │   ├── 2.png
<br />│   │       │   ├── 3.png
<br />│   │       │   ├── 4.png
<br />│   │       │   └── 5.png
<br />│   │       ├── logo.svg
<br />│   │       ├── regular-season-average-resale-price-relative-to-face-value-.png
<br />│   │       ├── title
<br />│   │       ├── title.jpeg
<br />│   │       ├── title.png
<br />│   │       └── 휠체어석.png
<br />│   ├── week1
<br />│   │   ├── bigpicture.png
<br />│   │   ├── edge.png
<br />│   │   ├── oldHeatmap.png
<br />│   │   ├── scrollysequence.png
<br />│   │   ├── sourcescrolly.png
<br />│   │   ├── sourcescrolly2.png
<br />│   │   ├── zoom.png
<br />│   │   └── zoomissue.png
<br />│   └── vite.svg
<br />├── src
<br />│   ├── articles
<br />│   │   ├── cold-plunge
<br />│   │   │   ├── sections
<br />│   │   │   │   ├── experimentDesign
<br />│   │   │   │   │   ├── data.json
<br />│   │   │   │   │   └── ExperimentDesign.jsx
<br />│   │   │   │   ├── scrolly
<br />│   │   │   │   │   └── tree
<br />│   │   │   │   │       └── TreeScrollyTelling.jsx
<br />│   │   │   │   └── visuals
<br />│   │   │   │       ├── sources
<br />│   │   │   │       │   ├── data.json
<br />│   │   │   │       │   ├── SourcesScrollytelling.jsx
<br />│   │   │   │       │   └── SourcesVisualization.jsx
<br />│   │   │   │       ├── time
<br />│   │   │   │       │   ├── data.json
<br />│   │   │   │       │   ├── TimeScrollytelling.jsx
<br />│   │   │   │       │   └── TimeVisualization.jsx
<br />│   │   │   │       └── tree
<br />│   │   │   │           ├── data.json
<br />│   │   │   │           ├── TreeScrollyTelling.jsx
<br />│   │   │   │           └── TreeVisualization.jsx
<br />│   │   │   ├── ColdPlunge.css
<br />│   │   │   ├── index.jsx
<br />│   │   │   └── meta.js
<br />│   │   ├── test
<br />│   │   │   ├── article.md
<br />│   │   │   └── meta.js
<br />│   │   ├── ticketbay
<br />│   │   │   ├── assets
<br />│   │   │   │   ├── BarChart.tsx
<br />│   │   │   │   ├── Narrative.tsx
<br />│   │   │   │   └── QuoteBox.tsx
<br />│   │   │   ├── sections
<br />│   │   │   │   ├── StadiumInteractive
<br />│   │   │   │   │   ├── data
<br />│   │   │   │   │   │   ├── category.ts
<br />│   │   │   │   │   │   ├── stadium.ts
<br />│   │   │   │   │   │   └── tickets.ts
<br />│   │   │   │   │   ├── ColorScale.tsx
<br />│   │   │   │   │   ├── DisplayArea.tsx
<br />│   │   │   │   │   ├── GameSelector.tsx
<br />│   │   │   │   │   ├── GameTypeSelector.tsx
<br />│   │   │   │   │   ├── InteractiveStadium.tsx
<br />│   │   │   │   │   ├── ScrollyStadium.tsx
<br />│   │   │   │   │   ├── ScrollytellingStadium.tsx
<br />│   │   │   │   │   ├── ScrollytellingStadium2.tsx
<br />│   │   │   │   │   ├── SellerTables.tsx
<br />│   │   │   │   │   ├── StadiumChart.tsx
<br />│   │   │   │   │   ├── StadiumChartScrolly.tsx
<br />│   │   │   │   │   └── StadiumGraph.tsx
<br />│   │   │   │   ├── TimeScrolly
<br />│   │   │   │   │   ├── TimeGraph.tsx
<br />│   │   │   │   │   └── TimeScrolly.tsx
<br />│   │   │   │   ├── TimeSus
<br />│   │   │   │   │   ├── Sus.Scrolly.tsx
<br />│   │   │   │   │   └── SusGraph.tsx
<br />│   │   │   │   ├── colors.ts
<br />│   │   │   │   ├── Conclusion.tsx
<br />│   │   │   │   ├── DataWrapperCharts.tsx
<br />│   │   │   │   ├── DesktopNotice.tsx
<br />│   │   │   │   ├── Donut.tsx
<br />│   │   │   │   ├── Footer.tsx
<br />│   │   │   │   ├── Hero.tsx
<br />│   │   │   │   ├── Top10Toggles.tsx
<br />│   │   │   │   └── types.ts
<br />│   │   │   ├── index.jsx
<br />│   │   │   ├── meta.js
<br />│   │   │   └── Ticketbay.css
<br />│   │   ├── week-1
<br />│   │   │   ├── index.jsx
<br />│   │   │   ├── meta.js
<br />│   │   │   └── week-1.css
<br />│   │   └── week-2
<br />│   │       ├── index.jsx
<br />│   │       └── meta.js
<br />│   ├── assets
<br />│   │   └── react.svg
<br />│   ├── components
<br />│   │   ├── Footer.jsx
<br />│   │   ├── Header.jsx
<br />│   │   ├── Hero.jsx
<br />│   │   ├── Narrative.jsx
<br />│   │   ├── Scrolly.jsx
<br />│   │   └── Toggle.tsx
<br />│   ├── data
<br />│   │   ├── articles.js
<br />│   │   ├── authors.js
<br />│   │   └── sections.js
<br />│   ├── pages
<br />│   │   ├── Home.css
<br />│   │   ├── Home.jsx
<br />│   │   └── MarkdownArticle.jsx
<br />│   ├── App.css
<br />│   ├── App.jsx
<br />│   ├── index.css
<br />│   └── main.jsx
<br />├── eslint.config.js
<br />├── index.html
<br />├── package-lock.json
<br />├── package.json
<br />├── README.md
<br />└── vite.config.js

</>} />
        <p>reusable components---like header, narrative, scrolly---are now shared across all interactive articles, so it makes more sense to keep them in a global components folder instead of nesting them inside individual articles.  </p>

        <p>each article now has not only an index.jsx but also meta.js. this metadata gets collected in src/data/articles.js, which is then used for routing, navigation, and section pages (though these havent been fully umplemented). though i still have to manually update the registry, at least there's a single, predictable place to do it. </p>
        <p>writing simpler articles has also become much easier with the markdown-based articles. so now, when there's a "breaking news"-style piece, a writer can now:</p>
        <p>
            1) create a new folder <br />
            2) add article.md and meta.js <br />
            3) write the article <br />
            4) register it in articles.js
        </p>
        <p>boom! the article is published. but this also made me think that the process could be further automated with templates, or eventually a small backend with markdown content.</p>
        <p>so while i didn't build any new data visualizations this week, i did learn how to build the structure of a news website itself, borrowing ideas from how larger newsrooms organize their projects.</p>
    </>}/>
    </>)
}
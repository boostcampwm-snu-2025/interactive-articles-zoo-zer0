<<<<<<< HEAD
[] reorganize file structure
├── public/
│   ├── coldplunge
│   │   
│   ├── week1
├── src/
|   ├── app/
│   │   ├── App.jsx
│   │   ├── routes.jsx
│   │   ├── providers.jsx
|   ├── components/ (site-wide, reusable)
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CoverStory.jsx
│   │   ├── EditorsPicks.jsx
│   │   ├── RecentStories.jsx
|   ├── patterns/
|   |   ├── Hero.jsx
│   │   └── Scrolly.jsx
│   ├── pages/
|   |   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   ├── ArticlePage.jsx (generic article wrapper)

│   ├── articles/
│   │   ├── cold-plunge/
│   │   │   ├── index.jsx (entry point)
│   │   │   ├── meta.js
│   │   │   ├── ColdPlunge.css
│   │   │   ├── sections/
│   │   │   │   ├── experimentDesign
│   │   │   │   │   ├── data.json
│   │   │   │   │   └── ExperimentDesign.jsx
│   │   │   │   ├── visuals/
│   │   │   │   │   ├── sources
│   │   │   │   │   │   ├── data.json
│   │   │   │   │   │   ├── SourcesScrollytelling.jsx
│   │   │   │   │   │   └── SourcesVisualization.jsx
│   │   │   │   │   ├── time
│   │   │   │   │   │   ├── data.json
│   │   │   │   │   │   ├── TimeScrollytelling.jsx
│   │   │   │   │   │   └── TimeVisualization.jsx
│   │   │   │   │   └── tree
│   │   │   │   │       ├── data.json
│   │   │   │   │       ├── TreeScrollyTelling.jsx
│   │   │   │   │       └── TreeVisualization.jsx
│   │   │   ├── ColdPlunge.css
│   │   │   └── ColdPlunge.jsx
│   │   └── week-1
│   │   │   ├── index.jsx
│   │   │   ├── meta.js
│   ├── data/
│   |   ├── author.js
│   |   ├── articles.js
│   ├── styles/






│   ├── assets
│   │   └── react.svg
│   ├── pages
│   │   ├── Home.css
│   │   └── Home.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js




# React + Vite
=======
# Interactive Articles
>>>>>>> refs/remotes/origin/main

## 1주차 회고
https://interactive-articles-zoo-zer0.vercel.app/
## 서비스 목적
재미 없을 수도 있는 데이터 관련 기사를 인터랙티브하고 미적으로 아름답게 전달하기.

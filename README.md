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

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

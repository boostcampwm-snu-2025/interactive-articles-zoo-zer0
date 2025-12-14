import { useRef, useState, useEffect } from "react";

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { articles } from "./data/articles";
import MarkdownArticle from "./pages/MarkdownArticle";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        {articles.map(article => (
          <Route
            key={article.slug}
            path={`/${article.slug}`}
            element={
              article.type === "markdown" ? (
                <MarkdownArticle
                  content={article.markdown}
                  meta={article}
                />
              ) : (
              <article.Component />)
            }
          />
        ))}
      </Routes>
    </div>
  );
}
export default App

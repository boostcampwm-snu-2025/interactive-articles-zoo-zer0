import { Link } from 'react-router-dom'
import './Home.css'
import { articles } from '../data/articles'
import Header from '../components/Header'
function Home(){

 return (
    <div className="home">
      <Header showLogo={false}/>
      <main className="articles-grid">
        {articles.map((article) => (
          <Link 
            to={article.slug} 
            key={article.slug} 
            className="article-card"
          >
            <div className="article-image">
              <img src={article.cover} alt={article.title} />
            </div>
            <div className="article-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            <span className="article-date">{article.author}</span>

            <span className="article-date">
            {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(new Date(article.date))}
            </span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default Home

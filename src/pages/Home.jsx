import { Link } from 'react-router-dom'
import './Home.css'
function Home(){
    const articles = [
        {
            id:1,
            title: "Cold Plunges for Him",
            description: "(기사)",
            image:"/coldplunge/img/title2.jpeg",
            link: "/articles/cold-plunge",
            date: "week 1"
        },
        {
            id:2,
            title: "1주차: d3를 사용한 시각화 + 스크롤리텔링 기사",
            description: "(1주차 회고)",
            image:"/week1/bigpicture.png",
            link: "/articles/week-1",
            date: "week 1"
        },
    ]
 return (
    <div className="home">
      <header className="home-header">
        <h1>Interactive Articles</h1>
        <p>매주 데이터 시각화와 인터렉티브 요소가 들어간 기사를 작성할 예정입니다.</p>
      </header>

      <main className="articles-grid">
        {articles.map((article) => (
          <Link 
            to={article.link} 
            key={article.id} 
            className="article-card"
          >
            <div className="article-image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="article-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="article-date">{article.date}</span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default Home

import Header from "../components/Header";
import Narrative from "../components/Narrative";
export default function ArticleLayout({ children, meta }) {
  return (
    <>
      <Header showLogo={false} />

      <article className="article">
        <header className="article-header">
          <h1>{meta.title}</h1>
          <p className="article-meta">
            {meta.author} · {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(new Date(meta.date))}
          </p>
        </header>
        <Narrative content={(<>
            <section className="article-body">
          {children}
        </section>
        </>)} />
        
      </article>
    </>
  );
}

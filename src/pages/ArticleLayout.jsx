import Header from "../components/Header";

export default function ArticleLayout({ children, meta }) {
  return (
    <>
      <Header showLogo={false} />

      <article className="article">
        <header className="article-header">
          <h1>{meta.title}</h1>
          <p className="article-meta">
            {meta.author} · {meta.date}
          </p>
        </header>

        <section className="article-body">
          {children}
        </section>
      </article>
    </>
  );
}

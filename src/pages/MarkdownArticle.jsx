import ReactMarkdown from "react-markdown";
import ArticleLayout from "./ArticleLayout";

export default function MarkdownArticle({ content, meta }) {
  return (
    <ArticleLayout meta={meta}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </ArticleLayout>
  );
}

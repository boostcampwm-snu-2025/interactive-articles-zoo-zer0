export default function Toggle({
  summary,
  content,
}: {
  summary: string;
  content: React.ReactNode;
}) {
  return (
    <div>
      <style>{`
        details summary {
          cursor: pointer;
          font-weight: normal;
        }
        details[open] summary {
          font-weight: bold;
        }
        details{
          box-shadow: 0 0px 0px #3a3a3a73;
        }
        details[open]{
          box-shadow: 0 4px 8px #3a3a3a32;
        }
      `}</style>

      <details
        style={{
          textAlign: "left",
          width: "90%",
          maxWidth: "600px",
          margin: "auto",
          padding: "10px 15px",
          border: "2px solid rgb(172, 172, 172)",
          borderRadius: "10px",
          color: "rgba(84, 84, 84, 1)"
        }}
      >
        
        <summary style={{color:"rgba(43, 43, 43, 1)"}}>{summary}</summary>
        {content}
      </details>
    </div>
  );
}

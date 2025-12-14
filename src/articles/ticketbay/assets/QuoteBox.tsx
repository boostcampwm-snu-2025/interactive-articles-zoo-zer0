export default function QuoteBox({quote, source, color}:{quote: React.ReactNode, source: React.ReactNode, color:string}){
    return(
        <div style={{
            textAlign: "left",
            width: "90%",
            maxWidth: "650px",
            margin: "auto",
            borderLeft:`6px solid ${color}`,
            background:"#f5f5f5ff"
        }}>
            <div style={{padding: "10px"}}>
                {quote}
                <small>{source}</small>
            </div>
        </div>
    )
}
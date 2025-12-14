import { Link } from "react-router-dom";
import { sections } from "../data/sections";

export default function Header(showLogo=true) {
  return (
    <nav className="nav">
        {showLogo && (
        <Link to="/"style={{textDecoration:"none"}}>
            <h1 style={{
                margin:"50px auto 0px auto",
                borderTop:"3px solid #171717",
                borderBottom:"3px solid #171717",
                width:"max-content",
                padding:"0px 40px",
                color:"#171717",
                fontSize:"4rem",
                fontWeight:"600",
                fontFamily:"Merriweather"
            }}>
            YOUR NEWS SITE</h1>
        </Link>
        )}
      
    <div style={{width:"100%", justifyContent:"center", borderTop:"1px solid #171717", borderBottom:"1px solid #171717", margin:"20px 0 0 0"}}>
      <ul className="nav-sections" style={{
        listStyleType:"none", margin:0, padding:0,
        display:"flex", justifyContent:"center"
      }}>
        {!showLogo && (
            <li style={{ float: "left" }}>
            <Link
                to="/"
                style={{
                textAlign: "center",
                padding: "14px 16px",
                textDecoration: "none",
                color: "#171717",
                }}
            >
                HOME
            </Link>
            </li>
        )}
        {sections.map(({ slug, label }) => (
          <li key={slug} style={{float:"left"}}>
            <Link to={`/section/${slug}`}
            style={{
                textAlign:"center",
                padding:"14px 16px",
                textDecoration:"none",
                color:"#171717",
            }}>
            {label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </nav>
  );
}

export default function Footer(){
    return(
<footer
  style={{
    backgroundColor: "rgb(43, 63, 107)",
    color: "white",
    width: "100%",     // full viewport width
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50%",
    marginRight: "-50%",
    height: "25vh",
    marginTop:"-50px"
  }}
  className="site-footer"
>
      <div className="footer-inner">
    <p style={{paddingTop:"20px"}}className="footer-logo"><strong>🌳Beautiful Forest</strong></p>
    <p style={{color:"rgba(191, 197, 210, 1)"}}className="footer-credit">© 2025 Beautiful숲 | 기획·제작: 김수빈, 이가은, 이민규, 이소연, 현주영</p>
    <p className="footer-links">
      <a style={{color:"rgba(204, 217, 244, 1)"}} href="#top"> · Jump to Top · </a>
    </p>
  </div>
</footer>
    )
}
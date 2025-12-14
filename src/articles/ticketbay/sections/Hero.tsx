
export default function Hero() {


  return (
    <div
      style={{
        position:"relative",
        display:"inline-block",
        width:"100%"
      }}
    >
      {/* background image */}
      <img
        src="/ticketbay/img/title.jpeg"
        alt="Hero background"
        style={{
          height: "100vh",
          width: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* overlay title */}
      <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          textAlign: "center",
          transform: "translate(-50%,-50%)",
          color:"white",
        }}>
      <h1 style={{fontSize:"50px", marginBlock:0}}>Those Who Buy Tickets<br></br> They'll Never Use</h1>
      <h2 style={{color:"#eaebffff",margin:0,fontWeight:"normal"}}>Inside the World of Korea's Ticket Scalpers</h2>
      <p style={{margin:"10px"}}>By <strong>Ga-eun Lee</strong>, <strong>Joo-young Hyun</strong>, <strong>Min-gyu Lee</strong>, <strong>Soo-bin Kim</strong>, and <strong>So-yeon Lee</strong></p>
      </div>
    </div>
  );
}

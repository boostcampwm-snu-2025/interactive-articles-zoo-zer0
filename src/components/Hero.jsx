
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
        src="/img/title.jpg"
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
      <h1 style={{textShadow:"2px 2px 2px #0d47a1",color: "#ccf7ffff",fontSize:"60px", marginBlock:0}}>Cold Plunges for Him</h1>
      <h2 style={{color:"#66bdecff",margin:0,fontWeight:"normal"}}>When the For You Page Isn’t for Me</h2>
      <p style={{color: "#cde1ffff",margin:"10px"}}>By <strong>Joo-young Hyun</strong></p>
      </div>
    </div>
  );
}

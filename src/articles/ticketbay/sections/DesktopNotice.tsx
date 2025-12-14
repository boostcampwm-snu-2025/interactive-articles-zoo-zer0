import { useEffect } from "react";

const DesktopNotice: React.FC = () => {
  const isMobile = window.innerWidth < 1000;

  useEffect(() => {
    if (isMobile) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = ""; // restore on unmount
      };
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.95)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        textAlign: "center",
        padding: "2rem",
        width: "100%", // fill viewport
        maxWidth: "100%", // ensure no overflow
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        데스크톱 환경에서 가장 잘 보이는 페이지입니다 💻
      </h2>
      <p style={{ fontSize: "1rem", color: "#555" }}>
        모바일에서는 일부 기능이 제대로 표시되지 않을 수 있습니다.
        <br />
        <a href="https://brunch.co.kr/">브런치</a>에서 기사를 읽어보세요.
      </p>
    </div>
  );
};

export default DesktopNotice;

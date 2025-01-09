import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const loadBarba = async () => {
      const barba = (await import("@barba/core")).default;
      
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          barba.go("/");  
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    };

    loadBarba();
  }, []);

  const circleRadius = 500;

  return (
    <div data-barba="container" data-barba-namespace="page2">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "black",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "36px",
            zIndex: 2,
          }}
        >
          Archive
        </div>

        <div
          className="circle"
          style={{
            position: "absolute",
            top: `-${circleRadius / 2}px`, 
            width: `${circleRadius}px`, 
            height: `${circleRadius}px`,
            border: "2px solid white", 
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>
      </div>
    </div>
  );
}

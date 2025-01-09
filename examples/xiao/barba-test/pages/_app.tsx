import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { gsap } from "gsap";

const slideUpLeave = (container) => {
  return new Promise((resolve) => {
    const tl = gsap.timeline();
    tl.to(container, {
      y: "-100%",
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: resolve, 
    });
  });
};

const slideUpEnter = (container) => { // this doesn't happen? 
  const tl = gsap.timeline();
  tl.from(container, {
    y: "100%",
    duration: 0.75,
    ease: "power2.inOut"
  }, 0)
}

const slideDownLeave = (container) => {
  return new Promise((resolve) => {
    const tl = gsap.timeline();
    tl.to(container, {
      y: "100%",
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: resolve, 
    });
  });
};

const slideDownEnter = (container) => {
  const tl = gsap.timeline();
  tl.from(container, {
    y: "-100%",
    duration: 0.75,
    ease: "power2.inOut"
  }, 0)
}

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const barba = (await import("@barba/core")).default;

        barba.init({
          transitions: [
            {
              name: "slide-up",
              from: { namespace: "home" },
              to: { namespace: "page2" },
              sync: true, 
              leave({ current }) {
                return slideUpLeave(current.container);
              },
              enter({ next }) {
                slideUpEnter(next.container);
              },
            },
            {
              name: "slide-down",
              from: { namespace: "page2" },
              to: { namespace: "home" },
              sync: true, 
              leave({ current }) {
                return slideDownLeave(current.container);
              },
              enter({ next }) {
                slideDownEnter(next.container);
              },
            },
          ],
        });

        return () => {
          barba.destroy();
        };

      }
    }
  )();
  }, []);

  return (
    <div data-barba="wrapper">
      <div data-barba="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
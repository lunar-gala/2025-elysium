



"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import localFont from "next/font/local";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger and close icons


const greyMonoTrial = localFont({
  src: "../../app/fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const moodCrowd = localFont({
  src: "../../app/fonts/MOONCROWD.otf",
  variable: "--font-mooncrowd",
});

const Navbar = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `text-white/40 hover:text-white/70 text-justify ${greyMonoTrial.className} text-[14px] font-[450] leading-normal tracking-[-0.56px] ${
      pathname === href ? "text-white/90" : ""
    }`;

  const [menuOpen, setMenuOpen] = useState(false);


  return (

    <nav className="fixed top-0 left-0 w-full h-16 z-50" style={{
      position: 'relative',
      top:'20px',
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(50, 50, 50, 0))',
      boxShadow: 'inset 0 10px 10px rgba(0, 0, 0, 0.2)'
  }}>
    <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '40px',
          backdropFilter: 'blur(64px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
    <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '50px',
          backdropFilter: 'blur(32px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
    <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '60px',
          backdropFilter: 'blur(16px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
    <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '70px',
          backdropFilter: 'blur(8px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
    <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '80px',
          backdropFilter: 'blur(4px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
      <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '90px',
          backdropFilter: 'blur(2px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
      <div style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '100%',
          height: '100px',
          backdropFilter: 'blur(1px)', 
          pointerEvents: 'none',
          zIndex: -1,
      }}></div>
  
  


      <div className="container h-full mx-auto px-4">
        <div className="flex items-center sm:items-center h-full relative justify-center px-4 sm:px-12">

        {/* Hamburger Button - Visible on Mobile */}
        <button className="sm:hidden text-white focus:outline-none items-center" onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen && <Menu size={18} />}
        </button>

          {/* Left Menu */}
          <div className="hidden sm:flex gap-4 rounded h-full items-end flex-1 justify-end">
            <a href="/about" className={linkClasses("/about")}>About</a>
            <a href="/lines" className={linkClasses("/lines")}>Lines</a>
            <a href="/talent" className={linkClasses("/talent")}>Talent</a>
          </div>

          {/* Centered Logo */}
          <div
            className={`flex ${moodCrowd.className} pl-[20px] pr-[20px] md:pl-[30px] md:pr-[30px] items-center justify-center drop-shadow-[0_-1px_3px_rgba(255,255,255,1)]`}
          >
            <Logo />
          </div>


          {/* Right Menu */}
          <div className="hidden sm:flex gap-4 rounded h-full items-end flex-1 justify-start">
            <a href="/merch" className={linkClasses("/merch")}>Merch</a>
            <a href="/archive" className={linkClasses("/archive")}>
              Archive <span className="ml-1 hidden lg:inline-block">↗</span>
            </a>
            <a
              target="_blank"
              href="https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2591&p=1"
              className={linkClasses("")} // External links don't match pathname
            >
              Tickets <span className="ml-1 hidden lg:inline-block">↗</span>
            </a>
          </div>
        </div>
      </div>
      {/* Mobile Menu - Stacked on Left */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-black/90 backdrop-blur-md transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden`}
      >
        <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
          <X size={18} />
        </button>
        <div className="flex flex-col gap-4 mt-16 px-6">
          <a href="/about" className={linkClasses("/about")} onClick={() => setMenuOpen(false)}>About</a>
          <a href="/lines" className={linkClasses("/lines")} onClick={() => setMenuOpen(false)}>Lines</a>
          <a href="/talent" className={linkClasses("/talent")} onClick={() => setMenuOpen(false)}>Talent</a>
          <a href="/merch" className={linkClasses("/merch")} onClick={() => setMenuOpen(false)}>Merch</a>
          <a href="/archive" className={linkClasses("/archive")} onClick={() => setMenuOpen(false)}>Archive ↗</a>
          <a target="_blank" href="https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2591&p=1" className={linkClasses("")} onClick={() => setMenuOpen(false)}>Tickets ↗</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


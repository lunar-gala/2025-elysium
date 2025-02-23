"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import localFont from "next/font/local";

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

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50">
      <div className="container h-full mx-auto px-4">
        <div className="flex items-end h-full relative justify-center px-12">
          {/* Left Menu */}
          <div className="flex gap-4 rounded h-full items-end flex-1 justify-end">
            <a href="/about" className={linkClasses("/about")}>About</a>
            <a href="/lines" className={linkClasses("/lines")}>Lines</a>
            <a href="/talent" className={linkClasses("/talent")}>Talent</a>
          </div>

          {/* Centered Logo */}
          <div
            className={`flex ${moodCrowd.className} text-white text-[50px] font-normal leading-[30px] uppercase pl-[30px] pr-[30px] items-end drop-shadow-[0_-1px_3px_rgba(255,255,255,1)]`}
          >
            <Logo />
          </div>

          {/* Right Menu */}
          <div className="flex gap-4 rounded h-full items-end flex-1 justify-start">
            <a href="/merch" className={linkClasses("/merch")}>Merch</a>
            <a href="/archive" className={linkClasses("/archive")}>
              Archive <span className="ml-1">↗</span>
            </a>
            <a
              target="_blank"
              href="https://carnegiemellontickets.universitytickets.com/w/event.aspx?id=2591&p=1"
              className={linkClasses("")} // External links don't match pathname
            >
              Tickets <span className="ml-1">↗</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

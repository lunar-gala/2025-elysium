"use client"
import Logo from "../components/navigation/Logo";
import localFont from "next/font/local";
import Particles from '../components/home/particles';

const moodCrowd = localFont({
  src: "./fonts/MOONCROWD.otf",
  variable: "--font-mooncrowd",
});

const greyMonoTrial = localFont({
  src: "./fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});


export default function Home() {
  return (
    <div className="relative h-screen">
      <Particles />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col ${moodCrowd.className} text-white text-[100px] font-normal leading-[30px] uppercase pl-[30px] pr-[30px] items-end drop-shadow-[0_-1px_3px_rgba(255,255,255,1)] `}>
        <Logo />
        <p className={`text-white text-[20px] m-4 ${greyMonoTrial.className}`}> coming soon </p>
      </div>
      
    </div>
  );
}
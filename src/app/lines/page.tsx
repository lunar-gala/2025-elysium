"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";
import { motion } from "framer-motion";

// Load Custom Fonts
const greyMonoTrial = localFont({
  src: "../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});

const moonCrowd = localFont({
  src: "../fonts/MOONCROWD.otf",
  variable: "--font-moon-crowd",
});

const ultraLightItalic = localFont({
  src: "../fonts/PPEditorialNew-UltralightItalic.otf",
  variable: "--font-ultra-light-italic",
});


export default function Lines() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black text-white">
      {/* Box that contains both texts */}
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }} className="flex flex-col w-[30%]">
        {/* Centered "Coming Soon..." */}
        <h1 className={`text-4xl sm:text-8xl text-center ${ultraLightItalic?.className || ""}`}>
          Coming Soon...
        </h1>

        {/* Right-Aligned "MARCH 22ND" under the "..." */}
        <h1 className={`text-sm sm:text-2xl text-right mt-2 pr-5 ${greyMonoTrial?.className || ""}`}>
          MARCH 22ND
        </h1>
      </motion.div>
    </div>
  );
}
"use client";

import lines from '@/data/lines'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import localFont from 'next/font/local';
import { useEffect, useRef, use } from 'react';
import { motion } from 'framer-motion';
import P5sketch from "../components/P5sketch";
import BottomBar from "../components/BottomBar";

const greyMonoTrial = localFont({
  src: "../../fonts/GreyMonoLLTrialWeb-Book.woff2",
  variable: "--font-grey-mono-trial",
});


export default function LinePage({ params }: { params: Promise<{ lineId: string }> }) {
  const { lineId } = use(params);
  const line = lines[lineId]

  if (!line) return notFound()

  return (

    <>
    <P5sketch/>

    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
    >
    <div className="flex flex-col h-screen text-white font-mono absolute z-10">
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Left panel with aligned info */}
        <div className="w-[30%] px-12 py-16 text-[11px] leading-[1.6] tracking-wider uppercase space-y-8 mt-50">
          <div className="space-y-2">
            <div className="flex gap-6">
              <span className="text-white/60 w-20">ACT {line.act}</span>
              <span className="text-white font-semibold">{line.title}</span>
            </div>
          </div>
          <div className="space-y-[0px]">
          {[
            { label: "Designers", value: line.designers.join(", ") },
            { label: "Sound", value: line.sound },
            { label: "Motion", value: line.motion },
            { label: "Photo", value: line.photo.join(", ") },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <span className="text-white/60 w-20">{item.label}</span>
              <span className="text-white normal-case tracking-tight">{item.value}</span>
            </div>
          ))}
          </div>
          <p className="whitespace-pre-line text-white/80 text-[11px] leading-relaxed normal-case tracking-tight">
            {line.description}
          </p>
        </div>

        {/* Horizontal scrollable image section */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-2 items-start  my-10 mt-15">
            {line.images.map((src, idx) => (
              <div key={idx} className="h-[70vh] flex-shrink-0">
                <Image
                  key={idx}
                  src={src}
                  alt={`line look ${idx}`}
                  width={9999}
                  height={9999}
                  className="h-full w-auto object-cover"
                />
              </div>
              ))}
            </div>
          </div>
        </div>

      {/* Bottom act/line bar with tick style */}
      <BottomBar lineId={lineId} lineAct={line.act} />
    </div>
    </motion.div>
    </>
  )
}

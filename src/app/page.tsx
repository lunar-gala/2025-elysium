"use client"

import Image from "next/image";
import ThreeCanvas from '@/components/ThreeCanvas'

export default function Home() {
  return (
    <div>
      <ThreeCanvas className='absolute top-0 left-0 w-full h-full' />
    </div>
  );
}
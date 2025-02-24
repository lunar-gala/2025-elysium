"use client"

import Image from "next/image";
import ActOneParticles from '@/components/ActOneParticles'
import ActTwoParticles from '@/components/ActTwoParticles'
import ActThreeParticles from '@/components/ActThreeParticles'
import ActFourParticles from '@/components/ActFourParticles'

export default function Home() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <ActFourParticles className='absolute top-0 left-0 w-full h-full' />
    </div>
  );
}
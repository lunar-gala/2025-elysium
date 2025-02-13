'use client'

import { usePathname } from 'next/navigation'

export default function MainContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isRootPath = pathname === "/"
  const isAbout = pathname === "/about"

  return (
    <main className={`absolute left-0 right-0 bottom-0 overflow-auto ${isRootPath || isAbout ? "" : "top-16"} ${isAbout ? "top-0" : ""}`}>
      {children}
    </main>
  )
}
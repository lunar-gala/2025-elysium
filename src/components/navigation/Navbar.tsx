"use client"
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50">
      <div className="container h-full mx-auto px-4">
        <div className="flex items-center justify-between h-full">
          <div className="relative">
            <Logo />
          </div>
          <div 
            className="flex gap-16 mx-auto p-3 rounded">
            <Link href="/lines">Lines</Link>
            <Link href="/people">People</Link>
            <Link href="/tickets">Tickets</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
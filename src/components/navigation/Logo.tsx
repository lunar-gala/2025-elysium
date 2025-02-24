"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" >
      <img src="/wordmark.png" alt="Description" className="h-[45px] md:h-[70px]" />
    </Link>
  );
};

export default Logo;
"use client";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" >
      <img src="/wordmark.png" alt="Description" className="h-[30px] sm:h-[50px]" />
    </Link>
  );
};

export default Logo;
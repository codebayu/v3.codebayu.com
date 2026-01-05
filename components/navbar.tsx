"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LocaleSwitcher from "@/components/locale-switcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = [
    { label: "Home", href: "/" },
    { label: "Career", href: "/career" },
  ];

  return (
    <nav
      className={[
        "w-full flex justify-center sticky top-0 py-4 md:py-6 px-6 md:px-16 z-50",
        "transition-colors duration-200",
        scrolled
          ? "bg-white/90 backdrop-blur border-b border-neutral-200"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="w-full xl:max-w-5xl flex justify-between items-center gap-2 ">
        <ul className="flex gap-4 md:gap-8">
          {nav.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="md:text-lg font-semibold hover:underline underline-offset-4"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <LocaleSwitcher />
      </div>
    </nav>
  );
}

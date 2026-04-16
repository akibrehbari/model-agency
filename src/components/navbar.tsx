"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Models", href: "#models" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 lg:px-24 py-4 lg:py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative h-10 w-auto"
            >
              <Image
                src="/logo.png"
                alt="Cuhvet"
                height={40}
                width={120}
                className="object-contain invert"
              />
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors text-sm font-medium hover:bg-white/5 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <Button
              onClick={() => scrollToSection("#apply")}
              className="hidden lg:flex items-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-[9999] overflow-y-auto">
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-8 space-y-8 min-h-full">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white text-2xl font-medium hover:text-rose-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="w-32 h-px bg-white/20" />
            <Button
              onClick={() => scrollToSection("#apply")}
              size="lg"
              className="flex items-center gap-2"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

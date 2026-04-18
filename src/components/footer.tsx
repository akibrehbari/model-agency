"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  company: [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Models", href: "#models" },
    { label: "Apply", href: "#apply" },
  ],
  legal: [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "#" },
  ],
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      const isMobile = window.innerWidth < 768;
      if (el) el.scrollIntoView({ behavior: isMobile ? "auto" : "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white border-t border-white/5">
      {/* CTA Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="bg-black border-r border-white/5 p-12 md:p-20 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to start
            <br />
            your journey?
          </h3>
          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
            Join hundreds of successful models who have transformed their
            careers with us. Your potential is waiting.
          </p>
          <button
            onClick={() => scrollToSection("#apply")}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-lg flex items-center gap-3 transition-all duration-300 group w-fit active:scale-[0.98]"
          >
            <span className="text-lg">Apply Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-black p-12 md:p-20 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Have questions?
          </h3>
          <p className="text-white/50 text-lg leading-relaxed mb-6 max-w-md">
            Reach out to us anytime. We respond to all inquiries within 24
            hours.
          </p>
          <a
            href="mailto:hello@cuhvet.com"
            className="text-rose-400 hover:text-rose-300 font-semibold text-lg transition-colors"
          >
            hello@cuhvet.com
          </a>
        </div>
      </div>

      {/* Links Section */}
      <div className="bg-black px-6 md:px-24 py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Cuhvet"
                  height={32}
                  width={100}
                  className="object-contain invert"
                />
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Empowering the next generation of models and content creators
                worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/40 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-white/40 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white/40 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
                Social
              </h4>
              <ul className="space-y-3">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Cuhvet. All rights
              reserved.
            </p>
            <p className="text-white/20 text-xs">
              You must be 18+ to apply and use this service.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

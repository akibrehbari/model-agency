"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";

const HERO_TEXTS = [
  "Start Your Modeling Career",
  "Build Your Personal Brand",
  "Turn Passion Into Income",
  "Join a Community That Cares",
];
const TYPING_SPEED = 60;
const ERASING_SPEED = 30;
const PAUSE_AFTER_TYPING = 2000;
const PAUSE_AFTER_ERASING = 800;

const marqueeItems = [
  "Fashion",
  "Glamour",
  "Lifestyle",
  "Fitness",
  "Beauty",
  "Travel",
  "Content Creation",
  "Brand Deals",
  "Social Media",
  "Personal Branding",
];

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showVideo, setShowVideo] = useState(false);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const currentText = HERO_TEXTS[textIndex];

  useEffect(() => {
    if (!isInView) return;

    let delay: number;

    if (!isErasing) {
      delay = displayedChars < currentText.length ? TYPING_SPEED : PAUSE_AFTER_TYPING;
    } else {
      delay = displayedChars > 0 ? ERASING_SPEED : PAUSE_AFTER_ERASING;
    }

    const timeout = setTimeout(() => {
      if (!isErasing) {
        if (displayedChars < currentText.length) {
          setDisplayedChars((prev) => prev + 1);
        } else {
          setIsErasing(true);
        }
      } else {
        if (displayedChars > 0) {
          setDisplayedChars((prev) => prev - 1);
        } else {
          setIsErasing(false);
          setTextIndex((prev) => (prev + 1) % HERO_TEXTS.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, displayedChars, isErasing, currentText]);

  const scrollToApply = () => {
    const el = document.querySelector("#apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = showVideo ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showVideo]);

  return (
    <>
      <section
        id="about"
        ref={ref}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-0 overflow-hidden bg-black"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-600/8 rounded-full blur-[200px]" />
        </div>

        {/* Main content */}
        <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="mx-auto w-full max-w-7xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-green-600/10 border border-green-500/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">
                  Now Accepting Applications
                </span>
              </div>
            </motion.div>

            {/* Typing heading */}
            <div className="text-center">
              <h1 className="text-[clamp(32px,7vw,90px)] font-extrabold leading-[0.95] tracking-tighter bg-gradient-to-r from-rose-300 via-rose-500 to-red-600 bg-clip-text text-transparent">
                {currentText.slice(0, displayedChars)}
                <span className="inline-block w-[3px] md:w-[5px] h-[0.85em] bg-rose-500 ml-1 align-middle animate-pulse" />
              </h1>
            </div>

            {/* Subtext + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 md:mt-14 flex flex-col items-center gap-8 text-center"
            >
              <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed font-light">
                We help aspiring models launch and grow their careers.
                Professional guidance, top opportunities, and full support
                &mdash; so you can focus on what you do best.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToApply} size="lg" className="group">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowVideo(true)}
                  className="group"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch How It Works</span>
                </Button>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto text-center"
            >
              {[
                { value: "500+", label: "Active Models" },
                { value: "$2M+", label: "Model Earnings" },
                { value: "100%", label: "Safe & Verified" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-white font-bold text-3xl md:text-4xl tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scrolling marquee at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 border-t border-white/5 py-5 overflow-hidden"
        >
          <div className="flex animate-scroll-slow whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="text-white/50 text-sm font-medium uppercase tracking-widest mx-8 shrink-0"
              >
                {item}
                <span className="text-rose-500/60 mx-8">&bull;</span>
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <span className="text-sm font-medium">Close</span>
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/hkOEd7exTAA?autoplay=1"
              title="How it works"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

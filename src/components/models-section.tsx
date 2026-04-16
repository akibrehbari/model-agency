"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const models = [
  {
    name: "Charlotte",
    handle: "@redcharlotte_",
    followers: "32K",
    monthlyEarnings: "$8,200",
    image: "/models/charlotte/profile.JPG",
    tags: ["Creator", "Influencer"],
  },
  {
    name: "Haley",
    handle: "@itzcrazyhaley",
    followers: "47K",
    monthlyEarnings: "$11,400",
    image: "/models/haley/profile.png",
    tags: ["Creator", "Influencer"],
  },
  {
    name: "Emily",
    handle: "@emilyybarely",
    followers: "28K",
    monthlyEarnings: "$7,600",
    image: "/models/emily/profile.png",
    tags: ["Creator", "Influencer"],
  },
  {
    name: "Poppy",
    handle: "@its_poppy_xo",
    followers: "39K",
    monthlyEarnings: "$9,800",
    image: "/models/poppy/profile.jpeg",
    tags: ["Creator", "Influencer"],
  },
];

export default function ModelsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const visibleCount = 3;
  const maxIndex = models.length - visibleCount;

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [autoplay, goNext]);

  const visibleModels = models.slice(current, current + visibleCount);
  if (visibleModels.length < visibleCount) {
    visibleModels.push(...models.slice(0, visibleCount - visibleModels.length));
  }

  return (
    <section
      id="models"
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-black relative"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-rose-400 mb-4">
            Our Models
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <h2 className="text-[clamp(36px,6vw,80px)] leading-[0.95] font-extrabold text-white tracking-tight">
              Real
            </h2>
            <span className="text-3xl md:text-5xl lg:text-6xl font-extrabold inline-block bg-rose-600 text-white px-6 py-2 -rotate-1 hover:rotate-0 transition-transform rounded-lg">
              People
            </span>
            <h2 className="text-[clamp(36px,6vw,80px)] leading-[0.95] font-extrabold text-white tracking-tight">
              Real Results.
            </h2>
          </div>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            These are real models who trusted us with their careers. Their
            growth speaks for itself.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Desktop Carousel (3 visible) */}
          <div className="hidden md:block relative">
            <div className="overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-3 gap-6"
                >
                  {visibleModels.map((model, i) => (
                    <div
                      key={`${model.name}-${i}`}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-500"
                    >
                      {/* Portrait Image */}
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={model.image}
                          alt={model.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Verified badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-[10px] font-semibold">
                            Verified
                          </span>
                        </div>

                        {/* Bottom info overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white font-bold text-xl mb-1">
                            {model.name}
                          </h3>
                          <p className="text-white/60 text-sm mb-3">
                            {model.handle}
                          </p>

                          <div className="flex items-center gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <p className="text-white font-bold text-sm">
                                {model.followers}
                              </p>
                              <p className="text-white/50 text-[10px]">
                                Followers
                              </p>
                            </div>
                            <div className="bg-rose-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <p className="text-rose-300 font-bold text-sm">
                                {model.monthlyEarnings}
                              </p>
                              <p className="text-white/50 text-[10px]">
                                Monthly
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            {model.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-medium px-2 py-1 rounded-full bg-white/10 text-white/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-3">
                <button
                  onClick={goPrev}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={goNext}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-rose-500 w-8"
                        : "bg-white/20 w-2 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical scroll of all cards */}
          <div className="md:hidden space-y-6">
            {models.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-[10px] font-semibold">
                      Verified
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {model.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-3">
                      {model.handle}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <p className="text-white font-bold text-sm">
                          {model.followers}
                        </p>
                        <p className="text-white/50 text-[10px]">Followers</p>
                      </div>
                      <div className="bg-rose-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <p className="text-rose-300 font-bold text-sm">
                          {model.monthlyEarnings}
                        </p>
                        <p className="text-white/50 text-[10px]">Monthly</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

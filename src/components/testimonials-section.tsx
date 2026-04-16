"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I was skeptical at first, but Cuhvet completely changed my life. Within 3 months, I went from making nothing to earning over $10,000 a month. The team is incredibly supportive and always available when I need help.",
    author: "Sarah M.",
    age: 26,
    location: "Los Angeles, CA",
    earnings: "$12,400/month",
    monthsActive: 6,
  },
  {
    quote:
      "The onboarding process was so smooth and professional. They taught me everything from content strategy to branding. I feel like I have a real business now, not just a side hustle. Best decision I ever made.",
    author: "Jessica L.",
    age: 24,
    location: "Miami, FL",
    earnings: "$8,200/month",
    monthsActive: 4,
  },
  {
    quote:
      "What sets Cuhvet apart is their genuine care for their models. They don't just recruit you and leave — they actively work on growing your brand every single day. My followers grew by 300% in just 5 months.",
    author: "Emily R.",
    age: 28,
    location: "New York, NY",
    earnings: "$15,800/month",
    monthsActive: 8,
  },
  {
    quote:
      "I tried doing this on my own for a year with minimal results. After joining Cuhvet, everything changed. Their marketing team is incredible and my growth has been exponential. I wish I had found them sooner.",
    author: "Anna K.",
    age: 25,
    location: "Chicago, IL",
    earnings: "$9,600/month",
    monthsActive: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const t = testimonials[current];

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cuhvet",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: testimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: testimonial.quote,
    })),
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-gray-50 relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-rose-500 mb-4">
            Testimonials
          </p>
          <h2 className="text-[clamp(36px,6vw,80px)] leading-[0.95] font-extrabold text-black tracking-tight">
            Hear From
            <br />
            <span className="text-gray-400">Our Models.</span>
          </h2>
        </motion.div>

        {/* Testimonial Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch lg:max-h-[520px]"
        >
          {/* Main testimonial card */}
          <div className="flex max-h-[520px]">
            <div className="bg-rose-50 rounded-2xl p-8 md:p-12 flex-1 flex flex-col justify-between relative overflow-hidden border border-rose-100">
              <div className="absolute top-6 right-8 opacity-10">
                <Quote className="w-24 h-24 text-rose-400" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-8 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-gray-900 font-bold text-xl">
                        {t.author}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Age {t.age} &middot; {t.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-rose-600 font-bold text-xl">
                        {t.earnings}
                      </p>
                      <p className="text-gray-500 text-sm">
                        After {t.monthsActive} months
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors border border-gray-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors border border-gray-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
                <div className="flex gap-2 ml-auto">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === current
                          ? "bg-rose-500 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video testimonial — portrait */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[520px]">
            <div className="flex-1 relative min-h-0">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/hkOEd7exTAA"
                title="Model testimonial video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-4 shrink-0">
              <p className="text-gray-900 font-semibold text-sm">
                Video Testimonial
              </p>
              <p className="text-gray-500 text-xs">
                Hear directly from our models
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

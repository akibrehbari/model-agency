"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Application",
    description:
      "Fill out a quick application with your details and photos. It takes less than 5 minutes. We review every single application personally.",
  },
  {
    number: "02",
    title: "Profile Review",
    description:
      "Our team carefully reviews your application within 24-48 hours. We look for authenticity, potential, and commitment. You'll get personal feedback either way.",
  },
  {
    number: "03",
    title: "Onboarding & Training",
    description:
      "Once approved, you'll receive comprehensive onboarding. Learn the platform, content strategy, branding, and everything needed to succeed from day one.",
  },
  {
    number: "04",
    title: "Start Earning",
    description:
      "Launch your career with full support. Our team handles promotion, growth strategy, and optimization so you can focus on creating. Most models see results within the first month.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToApply = () => {
    const el = document.querySelector("#apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start Your Modeling Career with Cuhvet",
    description:
      "A simple, transparent process to launch your modeling career and start earning",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-white relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-rose-500 mb-4">
            How It Works
          </p>
          <h2 className="text-[clamp(36px,6vw,80px)] leading-[0.95] font-extrabold text-black tracking-tight">
            From Application
            <br />
            <span className="text-gray-400">To Earning.</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            A simple, transparent process designed to get you started quickly and
            set you up for long-term success.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group p-8 lg:p-10 border-b md:border-b-0 md:border-r border-gray-100 last:border-0"
            >
              <div className="relative space-y-4">
                <span className="text-5xl lg:text-6xl font-black text-black/[0.06] select-none block">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-gray-900 text-lg lg:text-xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <button
            onClick={scrollToApply}
            className="inline-flex items-center gap-3 bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 group active:scale-[0.98]"
          >
            <span className="text-lg">Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

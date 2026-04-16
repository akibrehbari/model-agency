"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do I need previous modeling experience?",
    answer:
      "Not at all. Many of our most successful models started with zero experience. We provide full onboarding and training to get you started. What matters most is your dedication and willingness to learn.",
  },
  {
    question: "How much can I realistically earn?",
    answer:
      "Earnings vary depending on your effort, consistency, and niche. Our models typically earn between $3,000–$20,000+ per month. Top performers earn significantly more. We'll work with you to set realistic goals and build a growth strategy.",
  },
  {
    question: "Is my identity and information kept private?",
    answer:
      "Absolutely. We take privacy extremely seriously. Your personal information is never shared with third parties. You have full control over your public identity, and we support models who prefer to work under a stage name.",
  },
  {
    question: "What does the application process look like?",
    answer:
      "It's simple: fill out the application form with your details and photos, and our team will review it within 24–48 hours. If approved, you'll go through a quick onboarding where we set up everything you need to get started.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide end-to-end support including content strategy, profile optimization, marketing and promotion, growth analytics, and 24/7 assistance. Think of us as your full management team — we handle the business side so you can focus on creating.",
  },
  {
    question: "How long does it take to start earning?",
    answer:
      "Most models start seeing results within their first month. The speed depends on your consistency and the effort you put in during onboarding. Our team actively promotes your profile from day one to accelerate growth.",
  },
  {
    question: "Can I do this part-time?",
    answer:
      "Yes. Many of our models start part-time while maintaining other commitments. You set your own schedule and work at your own pace. As your earnings grow, you can decide how much time to dedicate.",
  },
  {
    question: "What are the age requirements?",
    answer:
      "You must be at least 18 years old to apply. Our primary focus is models aged 24–30, but we welcome applicants of all ages above 18 who meet our criteria.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className="text-gray-900 font-semibold text-base md:text-lg group-hover:text-rose-600 transition-colors">
          {faq.question}
        </span>
        <span className="shrink-0 mt-1">
          {isOpen ? (
            <Minus className="w-5 h-5 text-rose-500" />
          ) : (
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-base leading-relaxed pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-white relative"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-rose-500 mb-4">
              FAQ
            </p>
            <h2 className="text-[clamp(36px,5vw,64px)] leading-[0.95] font-extrabold text-black tracking-tight mb-6">
              Questions?
              <br />
              <span className="text-gray-400">We&apos;ve got answers.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Everything you need to know before applying. Can&apos;t find what
              you&apos;re looking for? Reach out to us directly.
            </p>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

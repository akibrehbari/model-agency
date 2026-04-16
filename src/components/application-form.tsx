"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  instagram: string;
  experience: string;
  motivation: string;
}

export default function ApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    instagram: "",
    experience: "",
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="apply" className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black rounded-2xl p-12 border border-white/10"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Application Submitted!
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-2">
              Thank you for your interest in joining Cuhvet. Our team will
              review your application and get back to you within 24-48 hours.
            </p>
            <p className="text-rose-400 text-sm font-medium">
              Check your email for a confirmation.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="apply"
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-rose-400 mb-4">
                Apply Now
              </p>
              <h2 className="text-[clamp(36px,5vw,64px)] leading-[1.1] font-extrabold text-white tracking-tight mb-6">
                Ready to Get{" "}
                <span className="inline-block bg-rose-600 text-white px-4 py-1 -rotate-1 hover:rotate-0 transition-transform rounded-lg">
                  Started?
                </span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Fill out the application below. It only takes a few minutes, and
                our team will personally review every submission.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">
                What We Look For
              </h3>
              {[
                "Age 18+ (primary focus: 24-30)",
                "Willingness to learn and grow",
                "Consistency and dedication",
                "Professional attitude",
                "Active social media presence (preferred)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-white/60 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Privacy — Material card */}
            <div className="bg-black rounded-2xl p-6 space-y-3 border border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-semibold text-sm">
                  Your Privacy Matters
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                All information is kept strictly confidential. We never share
                your data with third parties.
              </p>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-white/30" />
                <span className="text-white/30 text-xs">
                  256-bit SSL encrypted
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — Form (Material card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Personal Info — Material filled inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age *</Label>
                  <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="flex h-14 w-full rounded-lg bg-white/[0.08] border-0 border-b-2 border-white/20 px-4 pt-5 pb-2 text-base text-white focus:border-b-rose-500 focus:bg-white/[0.12] focus:outline-none transition-all duration-200"
                  >
                    <option value="" className="bg-gray-900">
                      Select age
                    </option>
                    {Array.from({ length: 13 }, (_, i) => i + 18).map(
                      (age) => (
                        <option key={age} value={age} className="bg-gray-900">
                          {age}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="@yourusername"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="experience">Experience *</Label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="flex h-14 w-full rounded-lg bg-white/[0.08] border-0 border-b-2 border-white/20 px-4 pt-5 pb-2 text-base text-white focus:border-b-rose-500 focus:bg-white/[0.12] focus:outline-none transition-all duration-200"
                >
                  <option value="" className="bg-gray-900">
                    Select your experience level
                  </option>
                  <option value="none" className="bg-gray-900">
                    No experience — completely new
                  </option>
                  <option value="some" className="bg-gray-900">
                    Some experience (hobby/part-time)
                  </option>
                  <option value="experienced" className="bg-gray-900">
                    Experienced (1+ years)
                  </option>
                  <option value="professional" className="bg-gray-900">
                    Professional (full-time creator)
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="motivation">
                  Why do you want to become a model? *
                </Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Tell us about yourself, your goals, and what motivates you..."
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full group text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting Application...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Application
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
                <p className="text-white/30 text-xs text-center mt-4">
                  By submitting, you agree to our Terms of Service and Privacy
                  Policy. You must be 18+ to apply.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

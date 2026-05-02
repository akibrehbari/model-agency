"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Lock,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Image upload constraints
// ---------------------------------------------------------------------------

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB combined
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];
const ACCEPT_ATTR = ACCEPTED_IMAGE_TYPES.join(",");

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be 80 characters or fewer")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Please enter a valid phone number (e.g. +1 555 000-0000)"
    ),

  age: z
    .string()
    .min(1, "Please select your age")
    .refine((v) => {
      const n = parseInt(v, 10);
      return n >= 18 && n <= 30;
    }, "You must be between 18 and 30 years old to apply"),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be 100 characters or fewer"),

  instagram: z
    .string()
    .min(1, "Instagram handle is required")
    .refine(
      (v) => /^@?[\w.]{1,30}$/.test(v.trim()),
      "Please enter a valid Instagram handle (e.g. @yourusername)"
    ),

  experience: z
    .string()
    .min(1, "Please select your experience level"),

  motivation: z
    .string()
    .min(30, "Please write at least 30 characters so we can get to know you")
    .max(1000, "Motivation must be 1,000 characters or fewer"),
});

type FormValues = z.output<typeof schema>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-rose-400 text-xs mt-1 flex items-center gap-1">
      <span aria-hidden>✕</span>
      {message}
    </p>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ApplicationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  // Photos state — managed manually (outside react-hook-form)
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate object URLs for previews and clean them up on change/unmount
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  function handleFilesSelected(files: FileList | null) {
    setPhotoError("");
    if (!files || files.length === 0) return;

    const incoming = Array.from(files);
    const merged: File[] = [...photos];

    for (const file of incoming) {
      if (merged.length >= MAX_PHOTOS) {
        setPhotoError(`You can upload up to ${MAX_PHOTOS} photos.`);
        break;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
        setPhotoError("Only JPG, PNG, WEBP, or HEIC images are allowed.");
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setPhotoError(`Each photo must be ${formatBytes(MAX_PHOTO_BYTES)} or smaller.`);
        continue;
      }
      // Skip exact duplicates (same name + size)
      if (merged.some((f) => f.name === file.name && f.size === file.size)) continue;
      merged.push(file);
    }

    const totalBytes = merged.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setPhotoError(`Combined photo size must be under ${formatBytes(MAX_TOTAL_BYTES)}.`);
      return;
    }

    setPhotos(merged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError("");
  }

  const onSubmit = async (data: FormValues) => {
    setServerError("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value ?? ""));
      });
      photos.forEach((file) => formData.append("photos", file, file.name));

      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json?.error ?? "Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Failed to submit application. Please try again."
      );
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <section
        id="apply"
        className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-black"
      >
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
              review your application and get back to you within 24–48 hours.
            </p>
            <p className="text-rose-400 text-sm font-medium">
              Check your email for a confirmation.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <section
      id="apply"
      ref={ref}
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-rose-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ── Left — Info ─────────────────────────────────────────────────── */}
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
                Fill out the application below. It only takes a few minutes,
                and our team will personally review every submission.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">
                What We Look For
              </h3>
              {[
                "Age 18+ (primary focus: 24–45)",
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

            {/* Privacy card */}
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

          {/* ── Right — Form ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Server-level error banner */}
              {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{serverError}</p>
                </div>
              )}

              {/* ── Row 1: Full Name + Email ─────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                    {...register("fullName")}
                  />
                  <FieldError message={errors.fullName?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>
              </div>

              {/* ── Row 2: Phone + Age + Location ───────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="age">
                    Age <span className="text-rose-400">*</span>
                  </Label>
                  <select
                    id="age"
                    aria-invalid={!!errors.age}
                    className="flex h-14 w-full rounded-lg bg-white/8 border-0 border-b-2 border-white/20 px-4 pt-5 pb-2 text-base text-white focus:border-b-rose-500 focus:bg-white/12 focus:outline-none transition-all duration-200"
                    {...register("age")}
                  >
                    <option value="" className="bg-gray-900">
                      Select age
                    </option>
                    {Array.from({ length: 13 }, (_, i) => i + 18).map((a) => (
                      <option key={a} value={a} className="bg-gray-900">
                        {a}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.age?.message} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="location">
                    Location <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    aria-invalid={!!errors.location}
                    {...register("location")}
                  />
                  <FieldError message={errors.location?.message} />
                </div>
              </div>

              {/* ── Instagram ────────────────────────────────── */}
              <div className="space-y-1.5">
                <Label htmlFor="instagram">
                  Instagram Handle <span className="text-rose-400">*</span>
                </Label>
                <Input
                  id="instagram"
                  placeholder="@yourusername"
                  aria-invalid={!!errors.instagram}
                  {...register("instagram")}
                />
                <FieldError message={errors.instagram?.message} />
              </div>

              {/* ── Experience ──────────────────────────────────────────── */}
              <div className="space-y-1.5">
                <Label htmlFor="experience">
                  Experience <span className="text-rose-400">*</span>
                </Label>
                <select
                  id="experience"
                  aria-invalid={!!errors.experience}
                  className="flex h-14 w-full rounded-lg bg-white/8 border-0 border-b-2 border-white/20 px-4 pt-5 pb-2 text-base text-white focus:border-b-rose-500 focus:bg-white/12 focus:outline-none transition-all duration-200"
                  {...register("experience")}
                >
                  <option value="" className="bg-gray-900">
                    Select your experience level
                  </option>
                  <option value="none" className="bg-gray-900">
                    No experience — completely new
                  </option>
                  <option value="some" className="bg-gray-900">
                    Some experience (hobby / part-time)
                  </option>
                  <option value="experienced" className="bg-gray-900">
                    Experienced (1+ years)
                  </option>
                  <option value="professional" className="bg-gray-900">
                    Professional (full-time creator)
                  </option>
                </select>
                <FieldError message={errors.experience?.message} />
              </div>

              {/* ── Motivation ──────────────────────────────────────────── */}
              <div className="space-y-1.5">
                <Label htmlFor="motivation">
                  Why do you want to become a model?{" "}
                  <span className="text-rose-400">*</span>
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Tell us about yourself, your goals, and what motivates you… (minimum 30 characters)"
                  aria-invalid={!!errors.motivation}
                  className="min-h-[120px]"
                  {...register("motivation")}
                />
                <FieldError message={errors.motivation?.message} />
              </div>

              {/* ── Photos ──────────────────────────────────────────────── */}
              <div className="space-y-2">
                <Label htmlFor="photos">
                  Photos{" "}
                  <span className="text-white/40 text-xs font-normal">
                    (optional — up to {MAX_PHOTOS}, max {formatBytes(MAX_PHOTO_BYTES)} each)
                  </span>
                </Label>

                <label
                  htmlFor="photos"
                  className="flex flex-col items-center justify-center gap-2 w-full min-h-[120px] rounded-lg border-2 border-dashed border-white/20 bg-white/4 hover:bg-white/8 hover:border-rose-500/50 transition-all duration-200 cursor-pointer p-6 text-center"
                >
                  <Upload className="w-6 h-6 text-white/50" />
                  <span className="text-white/70 text-sm font-medium">
                    Click to upload photos
                  </span>
                  <span className="text-white/40 text-xs">
                    JPG, PNG, WEBP, or HEIC
                  </span>
                </label>

                <input
                  id="photos"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPT_ATTR}
                  className="sr-only"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />

                {photoError && <FieldError message={photoError} />}

                {photos.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
                    {photos.map((file, i) => (
                      <div
                        key={`${file.name}-${i}`}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/5"
                      >
                        {previews[i] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={previews[i]}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/40">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          aria-label={`Remove ${file.name}`}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-1.5 py-1">
                          <p className="text-white/80 text-[10px] truncate">
                            {formatBytes(file.size)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Submit ──────────────────────────────────────────────── */}
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
                      Submitting Application…
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

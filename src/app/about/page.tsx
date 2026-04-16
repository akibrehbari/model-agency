import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CheckCircle2, Users, TrendingUp, Shield, Heart, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | Cuhvet",
  description:
    "Learn about Cuhvet's mission to empower aspiring models and content creators. Professional support, transparent processes, and a community that cares.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-rose-600/10 border border-rose-500/20 rounded-full px-4 py-2 mb-8">
              <span className="text-rose-300 text-sm font-medium">About Cuhvet</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Empowering the Next Generation of Models
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-3xl mx-auto">
              We're on a mission to help aspiring models and content creators turn
              their passion into a sustainable career with professional support,
              transparency, and genuine care.
            </p>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  To democratize the modeling industry by providing aspiring models
                  with the tools, support, and opportunities they need to succeed.
                  We believe everyone deserves a chance to pursue their dreams,
                  regardless of their background or experience level.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  To become the most trusted and supportive modeling agency in the
                  industry, known for our transparency, professionalism, and
                  genuine commitment to our models' success and well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description:
                    "Your safety and privacy are non-negotiable. We maintain strict verification processes and never compromise on security.",
                },
                {
                  icon: Heart,
                  title: "Genuine Care",
                  description:
                    "We treat every model as an individual, not a number. Your success is our success, and we're invested in your journey.",
                },
                {
                  icon: TrendingUp,
                  title: "Growth Focused",
                  description:
                    "We're committed to helping you grow professionally and personally, with ongoing support and development opportunities.",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "Join a supportive community of models who uplift, inspire, and help each other succeed.",
                },
                {
                  icon: CheckCircle2,
                  title: "Transparency",
                  description:
                    "No hidden fees, no surprises. We believe in clear communication and honest business practices.",
                },
                {
                  icon: Zap,
                  title: "Results Driven",
                  description:
                    "We focus on tangible results and real earnings. Your success is measured by your growth and income.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <value.icon className="w-10 h-10 text-rose-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>
                Cuhvet was founded with a simple belief: the modeling industry
                should be accessible to everyone with talent, dedication, and
                passion—not just those with connections or prior experience.
              </p>
              <p>
                We saw too many aspiring models struggling to break into the
                industry, facing rejection, confusion, and lack of support. We knew
                there had to be a better way.
              </p>
              <p>
                Today, we've helped over 500 models launch and grow their careers,
                with our community earning millions collectively. But we're just
                getting started. Every day, we work to make the modeling industry
                more inclusive, transparent, and rewarding for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-rose-600/10 to-red-600/10 border border-rose-500/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "500+", label: "Active Models" },
                  { value: "$2M+", label: "Total Earnings" },
                  { value: "4.9/5", label: "Average Rating" },
                  { value: "24/7", label: "Support Available" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              What Sets Us Apart
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "No Upfront Fees",
                  description:
                    "We don't charge application fees or upfront costs. We succeed when you succeed.",
                },
                {
                  title: "Personal Attention",
                  description:
                    "Every application is personally reviewed. You're not just a number in our system.",
                },
                {
                  title: "Comprehensive Training",
                  description:
                    "From content strategy to brand building, we provide everything you need to succeed.",
                },
                {
                  title: "Active Promotion",
                  description:
                    "We don't just onboard you and disappear. We actively promote and support your growth every day.",
                },
                {
                  title: "Safe Environment",
                  description:
                    "100% verified and safe. We maintain strict standards and protect your privacy at all times.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <CheckCircle2 className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-rose-600/20 to-red-600/20 border border-rose-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of models who have transformed their careers with
              Cuhvet. Your potential is waiting.
            </p>
            <a
              href="/#apply"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 active:scale-[0.98]"
            >
              <span>Apply Now</span>
              <CheckCircle2 className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

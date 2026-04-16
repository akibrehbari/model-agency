import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Privacy Policy | Cuhvet",
  description:
    "Learn how Cuhvet collects, uses, and protects your personal information. Your privacy and security are our top priorities.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-lg mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p>
                Welcome to Cuhvet ("we," "our," or "us"). We are committed to
                protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website
                ads.cuhvet.com and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-white/90 mb-3 mt-4">
                Personal Information
              </h3>
              <p className="mb-3">
                When you apply to become a model with Cuhvet, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Age</li>
                <li>Location (city and state)</li>
                <li>Instagram handle (optional)</li>
                <li>Experience level</li>
                <li>Motivation and career goals</li>
              </ul>

              <h3 className="text-xl font-semibold text-white/90 mb-3 mt-6">
                Automatically Collected Information
              </h3>
              <p className="mb-3">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and review your model application</li>
                <li>Communicate with you about your application status</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send important updates about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to third
                parties. We may share your information only in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white/90">With your consent:</strong>{" "}
                  When you explicitly agree to share your information
                </li>
                <li>
                  <strong className="text-white/90">Service providers:</strong>{" "}
                  With trusted third-party service providers who assist in
                  operating our website (e.g., hosting, email services)
                </li>
                <li>
                  <strong className="text-white/90">Legal requirements:</strong>{" "}
                  When required by law, court order, or legal process
                </li>
                <li>
                  <strong className="text-white/90">Business transfers:</strong>{" "}
                  In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational security
                measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>256-bit SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Employee confidentiality agreements</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100%
                secure. While we strive to protect your information, we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain your personal information only for as long as necessary
                to fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required by law. Application data is
                typically retained for 2 years, after which it may be archived or
                deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Privacy Rights
              </h2>
              <p className="mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white/90">Access:</strong> Request a
                  copy of your personal information
                </li>
                <li>
                  <strong className="text-white/90">Correction:</strong> Request
                  correction of inaccurate information
                </li>
                <li>
                  <strong className="text-white/90">Deletion:</strong> Request
                  deletion of your personal information
                </li>
                <li>
                  <strong className="text-white/90">Opt-out:</strong> Unsubscribe
                  from marketing communications
                </li>
                <li>
                  <strong className="text-white/90">Data portability:</strong>{" "}
                  Request transfer of your data to another service
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:info@cuhvet.com"
                  className="text-rose-400 hover:text-rose-300 underline"
                >
                  info@cuhvet.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. Cookies are small data files stored on
                your device. You can control cookies through your browser settings,
                but disabling them may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites (e.g., social
                media platforms). We are not responsible for the privacy practices
                of these external sites. We encourage you to review their privacy
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Children's Privacy
              </h2>
              <p>
                Our services are intended for individuals 18 years of age or
                older. We do not knowingly collect personal information from
                anyone under 18. If we become aware that we have collected
                information from someone under 18, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                11. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in countries
                other than your country of residence. These countries may have
                different data protection laws. By using our services, you consent
                to such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. We encourage you
                to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                13. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions or concerns about this Privacy Policy or
                our data practices, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                <p className="text-white font-semibold mb-2">Cuhvet</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@cuhvet.com"
                    className="text-rose-400 hover:text-rose-300"
                  >
                    info@cuhvet.com
                  </a>
                </p>
                <p>Website: ads.cuhvet.com</p>
              </div>
            </section>

            <section className="border-t border-white/10 pt-8 mt-12">
              <p className="text-white/40 text-sm">
                By using Cuhvet's services, you acknowledge that you have read and
                understood this Privacy Policy and agree to its terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

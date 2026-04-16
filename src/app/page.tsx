import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import ModelsSection from "@/components/models-section";
import TestimonialsSection from "@/components/testimonials-section";
import ApplicationForm from "@/components/application-form";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cuhvet",
    url: "https://ads.cuhvet.com",
    description:
      "Professional modeling agency helping aspiring models launch and grow their careers.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ads.cuhvet.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Modeling Agency",
    provider: {
      "@type": "Organization",
      name: "Cuhvet",
      url: "https://ads.cuhvet.com",
    },
    areaServed: "US",
    description:
      "Professional modeling career support including content strategy, brand building, marketing, promotion, and 24/7 assistance for aspiring models.",
    offers: {
      "@type": "Offer",
      description:
        "Full modeling career management with training, promotion, and support",
      priceCurrency: "USD",
      price: "0",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ads.cuhvet.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://ads.cuhvet.com/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How It Works",
        item: "https://ads.cuhvet.com/#how-it-works",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Models",
        item: "https://ads.cuhvet.com/#models",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Apply",
        item: "https://ads.cuhvet.com/#apply",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-black">
        <Navbar />
        <HeroSection />
        <HowItWorks />
        <ModelsSection />
        <TestimonialsSection />
        <ApplicationForm />
        <FaqSection />
        <Footer />
      </div>
    </>
  );
}

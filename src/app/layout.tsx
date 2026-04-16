import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import LenisProvider from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: "Cuhvet | Get Seen. Get Paid",
  description:
    "Launch your modeling career with Cuhvet. Professional guidance, brand building, and real earnings. Join 500+ models earning $3K-$20K+/month. No experience required. Apply today.",
  applicationName: "Cuhvet",
  referrer: "origin-when-cross-origin",
  keywords: [
    "modeling agency",
    "become a model",
    "content creator",
    "model application",
    "modeling career",
    "model management",
    "online modeling",
    "content creation career",
    "influencer agency",
    "model earnings",
    "professional modeling",
    "brand building",
    "social media modeling",
    "get paid to model",
    "modeling jobs",
    "content creator jobs",
  ],
  authors: [{ name: "Cuhvet", url: "https://ads.cuhvet.com" }],
  creator: "Cuhvet",
  publisher: "Cuhvet",
  metadataBase: new URL("https://ads.cuhvet.com"),
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Cuhvet | Get Seen. Get Paid",
    description:
      "Launch your modeling career with professional support. Join 500+ models earning $3K-$20K+/month. No experience required. Apply now and start earning.",
    siteName: "Cuhvet",
    locale: "en_US",
    type: "website",
    url: "https://ads.cuhvet.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Cuhvet - Get Seen. Get Paid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cuhvet",
    creator: "@cuhvet",
    title: "Cuhvet | Get Seen. Get Paid",
    description:
      "Launch your modeling career with professional support. Join 500+ models earning $3K-$20K+/month. Apply now.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="application-name" content="Cuhvet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Cuhvet" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://ads.cuhvet.com" />

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-59SNT489');
        `}</Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LPBZ09FMXF"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LPBZ09FMXF');
        `}</Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2135091370568701');
          fbq('track', 'PageView');
        `}</Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cuhvet",
              url: "https://ads.cuhvet.com",
              logo: "https://ads.cuhvet.com/logo.png",
              description:
                "Professional modeling agency helping aspiring models launch and grow their careers with full support, training, and promotion.",
              email: "hello@cuhvet.com",
              sameAs: [
                "https://instagram.com/cuhvet",
                "https://twitter.com/cuhvet",
                "https://tiktok.com/@cuhvet",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@cuhvet.com",
                contactType: "Customer Service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59SNT489"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2135091370568701&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

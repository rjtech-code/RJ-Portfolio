// Single source of truth for business details and page metadata.
// Used by React components and by the build (vite.config.js, scripts/prerender.js),
// so keep this file free of JSX and browser-only APIs.
//
// The public site origin is NOT stored here: it comes from the VITE_SITE_URL
// environment variable (see .env.production). When it is empty, every
// domain-dependent tag (canonical, og:url, og:image, JSON-LD, sitemap) is omitted.

export const business = {
  name: "RJ TechForce",
  alternateNames: ["RJ Tech Force", "RJTechForce"],
  foundingYear: "2021",
  description:
    "RJ TechForce is a web development team based in Churu, Rajasthan, India, building websites, web applications, SaaS platforms and e-commerce solutions, with UI/UX design and ongoing maintenance.",
  // Confirmed by the owner
  email: "rjtechforce@gmail.com",
  phone: {
    display: "+91 96643 73310",
    e164: "+919664373310",
  },
  whatsappUrl: "https://wa.me/919664373310",
  location: {
    locality: "Churu",
    region: "Rajasthan",
    country: "India",
    countryCode: "IN",
    display: "Churu, Rajasthan, India",
    mapUrl: "https://maps.google.com/?q=Churu,Rajasthan,India",
  },
  hours: {
    display: "Available 24/7",
  },
  // Only profiles marked verified are published in structured data (sameAs).
  socialProfiles: [
    { name: "Instagram", url: "https://www.instagram.com/rjtechforce/", verified: true },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/rjtechforce", verified: false },
    { name: "GitHub", url: "https://github.com/rjtechforce", verified: false },
    { name: "Twitter / X", url: "https://twitter.com/rjtechforce", verified: false },
  ],
  logoPath: "/brand/rj-techforce-logo-512.png",
  ogImagePath: "/og-image.png",
  ogImageAlt: "RJ TechForce logo",
};

export const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

// Metadata for every route. Only "/" is indexable today; it is the only page
// with substantial public content.
export const pages = {
  home: {
    path: "/",
    title: "RJ TechForce | Web Development & UI/UX Design Agency",
    description:
      "RJ TechForce builds websites, web applications, SaaS platforms and e-commerce stores with React and Node.js, plus UI/UX design and website maintenance.",
  },
  adminDashboard: {
    path: "/admin",
    title: "Admin Dashboard | RJ TechForce",
    noIndex: true,
  },
  adminLogin: {
    path: "/admin/login",
    title: "Admin Login | RJ TechForce",
    noIndex: true,
  },
  notFound: {
    title: "Page Not Found | RJ TechForce",
    description: "The page you are looking for does not exist.",
    noIndex: true,
  },
};

// Public, indexable paths: drives the sitemap
export const indexablePaths = [pages.home.path];

export const normalizeSiteUrl = (value) => (value || "").trim().replace(/\/+$/, "");

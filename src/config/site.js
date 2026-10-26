// Default business details (owner-confirmed, Oct 2026). Admin > Settings can override
// them at runtime via the API; these values are the fallback when the API is unavailable.
// Used by React components and by the build, so keep this file free of JSX and browser APIs.
//
// The public site origin is NOT stored here: it comes from VITE_SITE_URL (see .env.production).

export const defaultSettings = {
  companyName: "RJ TechForce",
  tagline: "Build · Design · Grow",
  email: "rjtechforce@gmail.com",
  phone: "+91 96643 73310",
  whatsapp: "919664373310",
  locality: "Churu",
  region: "Rajasthan",
  country: "India",
  hours: "Available 24/7",
  socialLinks: [{ name: "Instagram", url: "https://www.instagram.com/rjtechforce/" }],
};

export const brand = {
  foundingYear: "2021",
  alternateNames: ["RJ Tech Force", "RJTechForce"],
  description:
    "RJ TechForce is a web development team based in Churu, Rajasthan, India, building websites, web applications, SaaS platforms and e-commerce solutions, with UI/UX design and ongoing maintenance.",
  logoPath: "/brand/rj-techforce-logo-512.png",
  ogImagePath: "/og-image.png",
  ogImageAlt: "RJ TechForce logo",
};

export const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

export const normalizeSiteUrl = (value) => (value || "").trim().replace(/\/+$/, "");

export const phoneHref = (settings) => `tel:${(settings.phone || "").replace(/[^\d+]/g, "")}`;
export const phoneE164 = (settings) => (settings.phone || "").replace(/[^\d+]/g, "");
export const whatsappUrl = (settings, text) =>
  settings.whatsapp ? `https://wa.me/${settings.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
export const locationDisplay = (settings) =>
  [settings.locality, settings.region, settings.country].filter(Boolean).join(", ");
export const mapUrl = (settings) =>
  `https://maps.google.com/?q=${encodeURIComponent(locationDisplay(settings))}`;

// Registry of public pages: URL, default metadata and hero copy.
// "draft: false" pages show a draft notice and are noindex until marked reviewed
// in Admin > Website Content & SEO. Keep free of JSX (used at build time).
import { services } from "../data/services.js";

export const staticPages = [
  {
    key: "home",
    path: "/",
    label: "Home",
    title: "RJ TechForce | Web Development & UI/UX Design Agency",
    description:
      "RJ TechForce builds websites, web applications, SaaS platforms and e-commerce stores with React and Node.js, plus UI/UX design and website maintenance.",
    draft: false,
  },
  {
    key: "about",
    path: "/about",
    label: "About Us",
    title: "About Us | RJ TechForce",
    description:
      "Meet RJ TechForce, a web development team in Churu, Rajasthan building websites, web applications and SaaS products for businesses.",
    heading: "We build digital experiences that matter",
    intro:
      "RJ TechForce is a web development team based in Churu, Rajasthan. We help businesses plan, design, build and run modern websites and web applications.",
    draft: false,
  },
  {
    key: "services",
    path: "/services",
    label: "Services",
    title: "Web Development Services | RJ TechForce",
    description:
      "Website development, web applications, React, UI/UX design, SaaS and e-commerce development services from RJ TechForce.",
    heading: "Services built around your goals",
    intro:
      "From a fast business website to a full SaaS platform, we cover design, development, deployment and support.",
    draft: false,
  },
  ...services.map((service) => ({
    key: `service-${service.slug}`,
    path: `/services/${service.slug}`,
    label: service.title,
    parent: "services",
    title: `${service.title} | RJ TechForce`,
    description: service.summary,
    heading: service.title,
    intro: service.intro,
    draft: false,
  })),
  {
    key: "portfolio",
    path: "/portfolio",
    label: "Portfolio",
    title: "Portfolio | RJ TechForce",
    description:
      "Websites, web applications, dashboards, SaaS and e-commerce projects from RJ TechForce.",
    heading: "Our portfolio",
    intro: "A selection of websites, applications and platforms. Open a project to read the case study.",
    draft: false,
  },
  {
    key: "process",
    path: "/process",
    label: "Our Process",
    title: "Our Development Process | RJ TechForce",
    description:
      "How RJ TechForce plans, designs, builds, tests and launches websites and web applications, step by step.",
    heading: "How we work",
    intro: "A clear, step-by-step process so you always know what happens next and what we need from you.",
    draft: false,
  },
  {
    key: "pricing",
    path: "/pricing",
    label: "Pricing",
    title: "Pricing & Project Estimates | RJ TechForce",
    description:
      "How RJ TechForce scopes and quotes websites, web applications and e-commerce projects, and how to request an estimate.",
    heading: "Pricing & project estimates",
    intro: "Every project is different, so we quote each one after understanding your requirements. Compare packages below and request an estimate.",
    draft: false,
  },
  {
    key: "blog",
    path: "/blog",
    label: "Blog",
    title: "Blog | RJ TechForce",
    description:
      "Articles on web development, React, UI/UX design, website performance and running a business online.",
    heading: "Insights & articles",
    intro: "Practical notes on building, designing and growing websites and web applications.",
    draft: false,
  },
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
    title: "Contact RJ TechForce | Start Your Project",
    description:
      "Tell us about your website or web application project. Contact RJ TechForce by form, WhatsApp or email.",
    heading: "Let's start your project",
    intro: "Share a few details about what you need and we'll get back to you.",
    draft: false,
  },
  {
    key: "faq",
    path: "/faq",
    label: "FAQ",
    title: "FAQ | RJ TechForce",
    description:
      "Answers to common questions about RJ TechForce services, pricing, timelines, technology and support.",
    heading: "Frequently asked questions",
    intro: "Quick answers about working with us. Can't find what you need? Contact us.",
    draft: false,
  },
  {
    key: "privacy-policy",
    path: "/privacy-policy",
    label: "Privacy Policy",
    title: "Privacy Policy | RJ TechForce",
    description: "How RJ TechForce collects, uses and protects information submitted through this website.",
    heading: "Privacy Policy",
    draft: false,
  },
  {
    key: "terms-and-conditions",
    path: "/terms-and-conditions",
    label: "Terms & Conditions",
    title: "Terms & Conditions | RJ TechForce",
    description: "Terms for using the RJ TechForce website and information about our services.",
    heading: "Terms & Conditions",
    draft: false,
  },
];

export const pageByKey = Object.fromEntries(staticPages.map((page) => [page.key, page]));
export const pageByPath = Object.fromEntries(staticPages.map((page) => [page.path, page]));

export const notFoundPage = {
  key: "not-found",
  title: "Page Not Found | RJ TechForce",
  description: "The page you are looking for does not exist.",
  noIndex: true,
};

export const adminShellPage = { key: "admin", title: "RJ TechForce Admin", noIndex: true };

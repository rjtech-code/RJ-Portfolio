// Service page content. Keep free of JSX: also used at build time (routes, sitemap).
// Icons are referenced by name and resolved in src/Components/common/Icon.jsx.
// Written as a description of the service offering; review before marking pages reviewed.

export const services = [
  {
    slug: "website-development",
    spot: "website",
    title: "Website Development",
    icon: "Monitor",
    summary:
      "Fast, responsive business websites built for performance, search visibility and a clear path to enquiries.",
    intro:
      "A website is often the first place customers check before contacting you. We design and build business websites that load quickly, work on every screen size and make it easy for visitors to understand what you offer and get in touch.",
    problems: [
      "Your current website is slow, outdated or hard to update",
      "Visitors on mobile struggle to read or navigate your pages",
      "Customers can't find clear information about your services",
      "You have no simple way to collect enquiries online",
    ],
    offerings: [
      { title: "Business websites", desc: "Multi-page sites that present your services, team and contact details clearly." },
      { title: "Landing pages", desc: "Focused pages for a single product, campaign or service." },
      { title: "Portfolio websites", desc: "Showcase work, case studies and credentials for professionals and studios." },
      { title: "Website redesigns", desc: "Modernize an existing site while keeping the content and URLs that matter." },
    ],
    features: [
      "Responsive layouts for mobile, tablet and desktop",
      "Technical SEO foundations: titles, descriptions, sitemap, structured data",
      "Contact forms connected to email or a dashboard",
      "Performance-focused builds with optimized images",
      "Accessible markup and keyboard-friendly navigation",
      "Handover guidance so your team can update content",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    portfolioCategory: "Websites",
    stack: {languages:  ["HTML5",  "CSS3",  "JavaScript",  "TypeScript"],  frameworks:  ["React",  "Next.js",  "Vite",  "Tailwind CSS",  "Framer Motion",  "React Router"],  data:  ["REST APIs",  "Node.js",  "MongoDB",  "Cloudinary"],  tools:  ["Figma",  "Git",  "GitHub",  "Vercel",  "Netlify",  "Lighthouse",  "Google Analytics",  "Search Console"]},
    faqs: [
      { q: "How long does a business website take?", a: "It depends on the number of pages and the content that is ready. We agree on a timeline after the discovery call." },
      { q: "Can you redesign my existing website?", a: "Yes. We review what works today, plan redirects for changed URLs and rebuild the design and code." },
      { q: "Will my website work well on mobile phones?", a: "Yes. Every layout is designed and tested for mobile, tablet and desktop screens." },
      { q: "Can I update the content myself after launch?", a: "Yes. We can add an admin panel or a simple content workflow so your team can edit text, images and blog posts." },
    ],
  },
  {
    slug: "web-application-development",
    spot: "webapp",
    title: "Web Application Development",
    icon: "Code",
    summary:
      "Custom web applications tailored to your workflows: dashboards, portals, booking systems and internal tools.",
    intro:
      "When spreadsheets and off-the-shelf tools stop fitting the way you work, a custom web application can bring your processes into one secure place. We plan, build and deploy full-stack applications around your real workflows.",
    problems: [
      "Teams rely on spreadsheets and manual copy-paste",
      "Off-the-shelf software doesn't match your process",
      "Data lives in several disconnected tools",
      "You need role-based access for staff and customers",
    ],
    offerings: [
      { title: "Admin dashboards", desc: "Track records, statuses and reports in one interface." },
      { title: "Customer portals", desc: "Let customers log in to view orders, bookings or documents." },
      { title: "Internal tools", desc: "Automate repetitive work such as approvals, scheduling and reporting." },
      { title: "API integrations", desc: "Connect payment gateways, messaging, CRMs and other services." },
    ],
    features: [
      "Secure authentication and role-based permissions",
      "REST APIs with validation and error handling",
      "Database design for reliable, structured data",
      "Search, filters and exports for day-to-day use",
      "Responsive interfaces that work on any device",
      "Deployment, monitoring and maintenance options",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "MySQL"],
    portfolioCategory: "Web Applications",
    stack: {languages:  ["JavaScript",  "TypeScript",  "Python",  "SQL"],  frameworks:  ["React",  "Next.js",  "Redux",  "React Query",  "React Hook Form",  "Zod",  "Chart.js",  "Tailwind CSS"],  data:  ["Node.js",  "Express",  "REST APIs",  "GraphQL",  "MongoDB",  "PostgreSQL",  "MySQL",  "Redis",  "JWT",  "Socket.io",  "OpenAI API"],  tools:  ["Git",  "GitHub",  "Postman",  "Docker",  "Jest",  "Vercel",  "Render"]},
    faqs: [
      { q: "Do you build both the frontend and backend?", a: "Yes. We handle the interface, API, database and deployment as one project." },
      { q: "Who owns the code?", a: "Ownership terms are agreed in the project contract before work starts." },
      { q: "Can you integrate our existing tools?", a: "Usually yes. We connect apps through their APIs, for example payment gateways, CRMs, messaging or AI services." },
      { q: "How do you keep the application secure?", a: "With authentication, role-based access, server-side validation, secure environment settings and regular dependency updates." },
    ],
  },
  {
    slug: "react-development",
    spot: "react",
    title: "React Development",
    icon: "Atom",
    summary:
      "Modern React interfaces with reusable components, clean state management and fast, accessible pages.",
    intro:
      "React is a strong choice for interactive interfaces that need to grow over time. We build React applications and component libraries with a focus on maintainable code, accessibility and performance.",
    problems: [
      "Your existing React codebase has become hard to maintain",
      "Pages feel slow or re-render too often",
      "You need to add features without breaking existing ones",
      "Your interface isn't consistent across screens",
    ],
    offerings: [
      { title: "New React applications", desc: "Single-page apps and dashboards built with Vite or Next.js." },
      { title: "Component libraries", desc: "Reusable, documented UI components that keep your product consistent." },
      { title: "Performance improvements", desc: "Code splitting, memoization and rendering fixes for slow screens." },
      { title: "Migrations & upgrades", desc: "Move legacy pages to React or upgrade older React versions." },
    ],
    features: [
      "Component-based architecture",
      "Routing, forms and validation",
      "API integration and data fetching",
      "Server rendering or prerendering for SEO where needed",
      "Accessibility checks for keyboard and screen readers",
      "Linting and consistent code style",
    ],
    technologies: ["React", "Vite", "Next.js", "TypeScript", "Tailwind CSS"],
    portfolioCategory: "Dashboards",
    stack: {languages:  ["JavaScript",  "TypeScript",  "HTML5",  "CSS3"],  frameworks:  ["React",  "Next.js",  "Vite",  "React Router",  "Redux",  "React Query",  "React Hook Form",  "Framer Motion",  "Tailwind CSS"],  data:  ["REST APIs",  "GraphQL",  "Axios",  "Firebase"],  tools:  ["Storybook",  "Vitest",  "Jest",  "Cypress",  "ESLint",  "Git",  "GitHub",  "Vercel"]},
    faqs: [
      { q: "Is React good for SEO?", a: "Yes, when public pages are server-rendered or prerendered so search engines receive complete HTML." },
      { q: "Can you work on an existing React project?", a: "Yes. We start with a code review and agree on priorities before changing anything." },
      { q: "Do you use TypeScript with React?", a: "Yes, when it suits the project. TypeScript helps catch errors early in larger applications." },
      { q: "Can you improve the speed of my React app?", a: "Yes. We profile slow screens and apply code splitting, memoization and smarter data loading." },
    ],
  },
  {
    slug: "ui-ux-design",
    spot: "uiux",
    title: "UI/UX Design",
    icon: "Palette",
    summary:
      "User-centered interface design: research, wireframes, prototypes and design systems ready for development.",
    intro:
      "Good design makes a product easy to understand and pleasant to use. We map user journeys, design interfaces in Figma and prepare handoff-ready designs that developers can build accurately.",
    problems: [
      "Users get lost or drop off during key steps",
      "Your product looks inconsistent from screen to screen",
      "Developers lack clear designs to build from",
      "You want to validate an idea before building it",
    ],
    offerings: [
      { title: "UX research & flows", desc: "Understand users and map the journeys that matter most." },
      { title: "Wireframes", desc: "Low-fidelity layouts to agree on structure before visual design." },
      { title: "Interactive prototypes", desc: "Clickable Figma prototypes for testing and stakeholder review." },
      { title: "Design systems", desc: "Colors, typography and components documented for consistent UI." },
    ],
    features: [
      "Mobile-first layouts",
      "Accessible color contrast and typography",
      "Reusable component designs",
      "Developer handoff with specs and assets",
      "Design reviews during development",
    ],
    technologies: ["Figma", "Wireframing", "Prototyping"],
    portfolioCategory: "Websites",
    stack: {languages:  ["HTML5",  "CSS3"],  frameworks:  ["Tailwind CSS",  "Framer Motion",  "Storybook"],  data:  [],  tools:  ["Figma",  "Miro",  "Canva",  "Lighthouse"]},
    faqs: [
      { q: "Can I get design only, without development?", a: "Yes. We can deliver Figma files and a design system for your own developers." },
      { q: "How many revisions are included?", a: "Revision rounds are defined in the project proposal." },
      { q: "Do you design for mobile first?", a: "Yes. We start with small screens and scale up, so key actions stay easy on every device." },
      { q: "Will the designs match what gets built?", a: "We hand over components, spacing and colours as a design system, and review the build against the designs." },
    ],
  },
  {
    slug: "saas-development",
    spot: "saas",
    title: "SaaS Development",
    icon: "Layers",
    summary:
      "Software-as-a-Service platforms with accounts, subscriptions, admin tools and scalable architecture.",
    intro:
      "Turning an idea into a subscription product needs more than a good interface. We help plan and build SaaS platforms with user accounts, billing, admin tools and an architecture that can grow with your customers.",
    problems: [
      "You have a product idea and need a first version (MVP)",
      "You need multi-user or multi-team accounts",
      "Billing and subscriptions are handled manually",
      "Your prototype isn't ready for real customers",
    ],
    offerings: [
      { title: "MVP development", desc: "A focused first version to validate the product with real users." },
      { title: "Accounts & teams", desc: "Sign-up, login, roles and team management." },
      { title: "Subscriptions & billing", desc: "Plans and payment integration with a payment provider." },
      { title: "Admin & analytics", desc: "Internal tools to manage customers and monitor usage." },
    ],
    features: [
      "Secure authentication and authorization",
      "Payment gateway integration",
      "Admin panel for operations",
      "Email notifications",
      "Cloud deployment and backups",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Cloud Services"],
    portfolioCategory: "SaaS Platforms",
    stack: {languages:  ["TypeScript",  "JavaScript",  "Python",  "SQL"],  frameworks:  ["React",  "Next.js",  "Tailwind CSS",  "Redux",  "React Query",  "Chart.js"],  data:  ["Node.js",  "Express",  "PostgreSQL",  "MongoDB",  "Prisma",  "Redis",  "JWT",  "Stripe",  "Razorpay",  "OpenAI API"],  tools:  ["Docker",  "Nginx",  "GitHub",  "Postman",  "Jest",  "Vercel",  "Render"]},
    faqs: [
      { q: "Can you help define the MVP scope?", a: "Yes. The discovery phase focuses on the smallest version that tests your core idea." },
      { q: "Which payment providers do you support?", a: "We integrate the provider that fits your market and business; this is agreed during planning." },
      { q: "Can you add AI features to my SaaS product?", a: "Yes. We can integrate AI APIs for features such as chat assistants, summaries or content generation, with usage limits and logging." },
      { q: "Can the platform grow as we get more customers?", a: "We design the database and APIs so the platform can scale, and use hosting that can be upgraded as usage grows." },
    ],
  },
  {
    slug: "ecommerce-development",
    spot: "ecommerce",
    title: "E-Commerce Development",
    icon: "ShoppingCart",
    summary:
      "Online stores with product catalogs, secure checkout, payment integration and order management.",
    intro:
      "Selling online needs a store that is easy to browse, trustworthy at checkout and simple to manage. We build e-commerce websites with catalogs, carts, payment integration and admin tools for orders and inventory.",
    problems: [
      "You want to start selling products online",
      "Your current store is slow or hard to manage",
      "Checkout is confusing and customers abandon carts",
      "Orders and stock are tracked manually",
    ],
    offerings: [
      { title: "Online stores", desc: "Product catalog, search, cart and checkout." },
      { title: "Payment integration", desc: "Connect a payment gateway suited to your customers." },
      { title: "Order management", desc: "Admin tools for orders, stock and customers." },
      { title: "Store redesigns", desc: "Improve the look and usability of an existing store." },
    ],
    features: [
      "Product categories, filters and search",
      "Secure checkout flow",
      "Inventory and order dashboard",
      "Mobile-friendly shopping experience",
      "SEO-friendly product pages",
    ],
    technologies: ["React", "Node.js", "Payment Integrations", "MongoDB"],
    portfolioCategory: "E-Commerce",
    stack: {languages:  ["JavaScript",  "TypeScript",  "HTML5",  "CSS3"],  frameworks:  ["React",  "Next.js",  "Tailwind CSS",  "React Query",  "Three.js"],  data:  ["Node.js",  "Express",  "MongoDB",  "Stripe",  "Razorpay",  "PayPal",  "Shopify",  "WooCommerce",  "Cloudinary"],  tools:  ["Figma",  "GitHub",  "Vercel",  "Google Analytics",  "Search Console",  "Lighthouse"]},
    faqs: [
      { q: "Can I manage products myself?", a: "Yes. Stores include an admin area to add and update products." },
      { q: "Do you provide maintenance after launch?", a: "Ongoing maintenance and support can be added to any project." },
      { q: "Which payment methods can my store accept?", a: "Through gateways like Razorpay, Stripe or PayPal you can accept cards, UPI, net banking and wallets, depending on the gateway." },
      { q: "Do you build on Shopify or WooCommerce?", a: "We can, or build a custom store. We recommend the option that fits your products, budget and how you want to manage the store." },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

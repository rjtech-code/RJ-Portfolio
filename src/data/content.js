// Draft page content (About, Process, Pricing, FAQ, legal pages).
// Pages using this content are labelled "draft" and noindex until the owner marks
// them reviewed in Admin > Website Content & SEO. Keep free of JSX.

export const about = {
  mission:
    "To engineer high-performance digital products through technical precision, user-centric design and scalable architecture.",
  vision:
    "To be a dependable technology partner for businesses that want modern, maintainable software.",
  story: [
    "RJ TechForce started in 2021 as a small engineering group in Churu, Rajasthan, building websites and web applications for businesses.",
    "Today we work across the full product lifecycle: planning, UI/UX design, development, deployment and ongoing support.",
  ],
  milestones: [
    { year: "2021", event: "Team formation", desc: "Core engineering group established." },
    { year: "2022", event: "First SaaS deployment", desc: "Launched our first subscription platform." },
    { year: "2023", event: "Technical expansion", desc: "Added cloud infrastructure and integrations." },
    { year: "Today", event: "Engineering growth", desc: "Building digital products for clients." },
  ],
  values: [
    { title: "Innovation", desc: "Building modern and future-ready digital solutions.", icon: "Lightbulb" },
    { title: "Quality", desc: "Clean code, scalable architecture and professional standards.", icon: "ShieldCheck" },
    { title: "Reliability", desc: "Delivering with consistency, transparency and accountability.", icon: "Target" },
    { title: "Collaboration", desc: "Working closely with clients to turn ideas into products.", icon: "Users" },
  ],
  // Roles, not named people: add real team profiles once they are approved
  teamAreas: [
    { title: "Frontend Engineering", spot: "website", desc: "React interfaces, responsive layouts and accessibility.", icon: "Monitor" },
    { title: "Backend Engineering", spot: "code", desc: "APIs, databases, authentication and integrations.", icon: "Server" },
    { title: "UI/UX Design", spot: "uiux", desc: "Research, wireframes, prototypes and design systems.", icon: "Palette" },
    { title: "Deployment & Support", spot: "rocket", desc: "Hosting, monitoring, maintenance and improvements.", icon: "Cloud" },
  ],
};

export const processSteps = [
  {
    title: "Discovery",
    icon: "Search",
    summary: "Understand your goals, users and requirements.",
    activities: ["Kick-off call", "Requirement gathering", "Review of existing systems"],
    deliverables: ["Project brief", "Initial scope"],
    you: "Share goals, examples you like and any existing material.",
  },
  {
    title: "Planning",
    icon: "ClipboardList",
    summary: "Define scope, architecture, timeline and milestones.",
    activities: ["Feature list and priorities", "Technical architecture", "Timeline and milestones"],
    deliverables: ["Proposal and estimate", "Project plan"],
    you: "Review and approve the scope and plan.",
  },
  {
    title: "Design",
    icon: "Palette",
    summary: "Wireframes and visual designs for the key screens.",
    activities: ["Wireframes", "Visual design in Figma", "Design review"],
    deliverables: ["Approved designs", "Design system basics"],
    you: "Give feedback on wireframes and designs.",
  },
  {
    title: "Development",
    icon: "Code",
    summary: "Build the frontend, backend and integrations in iterations.",
    activities: ["Frontend and backend development", "Integrations", "Regular progress updates"],
    deliverables: ["Working builds on a staging link"],
    you: "Test features as they are ready and share feedback.",
  },
  {
    title: "Testing",
    icon: "ShieldCheck",
    summary: "Check functionality, devices, performance and accessibility.",
    activities: ["Functional testing", "Cross-device checks", "Performance and accessibility review"],
    deliverables: ["Issue list and fixes", "Launch checklist"],
    you: "Final acceptance testing.",
  },
  {
    title: "Deployment",
    icon: "Rocket",
    summary: "Launch on your domain with hosting, analytics and backups.",
    activities: ["Production deployment", "Domain and SSL setup", "Search Console setup"],
    deliverables: ["Live website or application", "Access and handover notes"],
    you: "Provide domain and account access.",
  },
  {
    title: "Support",
    icon: "LifeBuoy",
    summary: "Maintenance, updates and improvements after launch.",
    activities: ["Bug fixes", "Updates and backups", "New features on request"],
    deliverables: ["Agreed support plan"],
    you: "Report issues and request changes.",
  },
];

export const communication = [
  { title: "Regular updates", desc: "Progress updates at each milestone and a shared staging link.", icon: "MessageSquare" },
  { title: "Direct contact", desc: "Reach us on WhatsApp, email or scheduled calls.", icon: "Phone" },
  { title: "Transparent scope", desc: "Written scope, estimates and change requests before extra work.", icon: "FileText" },
];

// No official prices have been confirmed: packages describe scope and every project is quoted.
export const pricingPackages = [
  {
    name: "Business Website",
    range: "Quote on request",
    desc: "For small businesses and professionals who need a clear, fast website.",
    features: ["Multi-page website", "Responsive design", "Contact form", "Basic SEO setup", "Deployment on your domain"],
    cta: "Discuss your website",
    projectType: "Business Website",
  },
  {
    name: "Web Application",
    range: "Quote on request",
    desc: "For dashboards, portals and custom tools built around your workflows.",
    features: ["Requirement workshop", "Custom backend and database", "Authentication and roles", "Admin dashboard", "Deployment and handover"],
    cta: "Plan your application",
    highlighted: true,
    projectType: "Web Application",
  },
  {
    name: "E-Commerce",
    range: "Quote on request",
    desc: "For online stores with a catalogue, checkout and order management.",
    features: ["Product catalogue", "Cart and checkout", "Payment integration", "Order management", "Customer accounts"],
    cta: "Plan your store",
    projectType: "E-Commerce",
  },
  {
    name: "Custom Project",
    range: "Quote on request",
    desc: "For SaaS platforms, UI/UX design work, integrations and anything else.",
    features: ["Discovery workshop", "Custom scope", "Design and/or development", "Integrations", "Ongoing support options"],
    cta: "Describe your project",
    projectType: "Other",
  },
];

export const pricingFactors = [
  { title: "Number of pages and features", desc: "More screens and custom functionality need more design and development time." },
  { title: "Design complexity", desc: "Custom illustrations, animations and design systems add effort." },
  { title: "Integrations", desc: "Payment gateways, CRMs, messaging and third-party APIs." },
  { title: "Content readiness", desc: "Whether text, images and product data are ready or need preparing." },
  { title: "Timeline", desc: "Tight deadlines may require more resources." },
  { title: "Ongoing support", desc: "Hosting, maintenance and updates after launch." },
];

export const pricingComparison = {
  columns: ["Business Website", "Web Application", "E-Commerce", "Custom Project"],
  rows: [
    { label: "Responsive design", values: [true, true, true, true] },
    { label: "Contact / enquiry form", values: [true, true, true, "On request"] },
    { label: "Basic SEO setup", values: [true, true, true, "On request"] },
    { label: "Admin dashboard", values: [false, true, true, "On request"] },
    { label: "User accounts & roles", values: [false, true, true, "On request"] },
    { label: "Payment integration", values: [false, "Optional", true, "On request"] },
    { label: "Custom database", values: [false, true, true, "On request"] },
  ],
};

export const faqGroups = [
  {
    title: "General",
    items: [
      {
        q: "What services does RJ TechForce offer?",
        a: "Website development, web application development, React development, UI/UX design, SaaS development, e-commerce development, and website maintenance and support.",
      },
      {
        q: "Where is RJ TechForce located?",
        a: "We are based in Churu, Rajasthan, India, and work with clients remotely.",
      },
      {
        q: "When can I contact you?",
        a: "We are available 24/7 on WhatsApp and email, and you can also send an enquiry through the contact form.",
      },
      {
        q: "Do you work with clients outside Rajasthan?",
        a: "Yes. We work remotely with clients across India and abroad, using calls, WhatsApp and shared project links.",
      },
    ],
  },
  {
    title: "Pricing & Timeline",
    items: [
      {
        q: "How much does a website cost?",
        a: "It depends on the pages, features and integrations you need. Use the estimate form on the Pricing page and we'll send a quote based on your requirements.",
      },
      {
        q: "How long does a project take?",
        a: "Timelines depend on scope and how quickly content and feedback are available. We share a timeline with milestones in the proposal.",
      },
      {
        q: "How do payments work?",
        a: "Payment terms are agreed in the proposal, usually split across project milestones.",
      },
    ],
  },
  {
    title: "Technology & Support",
    items: [
      {
        q: "Do you develop React websites?",
        a: "Yes. React is one of our main technologies for websites and web applications.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. Maintenance and support plans can be added to any project.",
      },
      {
        q: "Will my website be mobile friendly?",
        a: "Yes. Every project is built with responsive layouts for mobile, tablet and desktop.",
      },
      {
        q: "Will my website be SEO friendly?",
        a: "Yes. We set up page titles, descriptions, a sitemap, structured data and fast-loading pages, and can connect Google Search Console.",
      },
    ],
  },
];

// Templates only: must be reviewed by the owner (and ideally a legal professional) before publishing.
export const legal = {
  "privacy-policy": {
    updated: "2026-10-26",
    sections: [
      {
        title: "Who we are",
        body: ["RJ TechForce is a web development team based in Churu, Rajasthan, India. This policy explains how we handle information collected through this website."],
      },
      {
        title: "Information we collect",
        body: ["When you submit the contact form we collect your name, email address, phone number, the type of project and the project details you provide."],
      },
      {
        title: "How we use it",
        body: ["We use this information only to respond to your enquiry, prepare proposals and communicate about your project. We do not sell your personal information."],
      },
      {
        title: "Storage and service providers",
        body: ["Enquiries are stored in a database hosted by our infrastructure providers (website hosting, application hosting and database hosting). These providers process data on our behalf."],
      },
      {
        title: "Cookies and analytics",
        body: ["This website does not currently use advertising or analytics cookies. If that changes, this policy will be updated."],
      },
      {
        title: "Retention",
        body: ["We keep enquiries for as long as needed to respond and manage any resulting project, then delete them on request or when no longer needed."],
      },
      {
        title: "Your rights",
        body: ["You can ask us to access, correct or delete the information you provided by contacting us using the details below."],
      },
      {
        title: "Contact",
        body: ["For privacy questions, contact us using the email address shown on the Contact page."],
      },
    ],
  },
  "terms-and-conditions": {
    updated: "2026-10-26",
    sections: [
      {
        title: "Use of this website",
        body: ["By using this website you agree to these terms. The content is provided for general information about our services."],
      },
      {
        title: "Services and proposals",
        body: ["Project scope, timelines, prices and payment terms are agreed separately in a written proposal or contract for each project."],
      },
      {
        title: "Intellectual property",
        body: ["The website design, text and logo belong to RJ TechForce unless stated otherwise. Ownership of project deliverables is defined in each project contract."],
      },
      {
        title: "Quotes",
        body: ["Information on this website is not an offer. A quote is provided after understanding your requirements and is valid only as stated in it."],
      },
      {
        title: "Limitation of liability",
        body: ["We aim to keep information accurate and up to date but do not guarantee that the website is free of errors or always available."],
      },
      {
        title: "Changes",
        body: ["We may update these terms from time to time. The date at the top of this page shows the latest version."],
      },
    ],
  },
};

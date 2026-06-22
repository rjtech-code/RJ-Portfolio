import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, BookOpen, TrendingUp, Globe, Code, Zap, DollarSign, Smartphone } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "How Much Does a Website Cost in India? (2026 Guide)",
    slug: "how-much-does-a-website-cost-india-2026",
    excerpt: "A complete breakdown of website development costs in India — from simple business websites to full-stack web applications. Understand pricing, what affects cost, and how to choose the right web development partner.",
    category: "Web Development",
    readTime: "5 min read",
    icon: <DollarSign size={20} />,
    tags: ["Website Cost", "Web Development", "India", "Business Website"],
    content: `Website development costs in India vary widely based on project complexity, features, and the development team. A basic business website typically costs ₹15,000–₹50,000, while complex web applications can range from ₹1,00,000–₹5,00,000+. RJ TechForce offers competitive pricing for all types of web projects.`,
    featured: true,
  },
  {
    id: 2,
    title: "Why Every Business Needs a Professional Website in 2026",
    slug: "why-every-business-needs-a-website-2026",
    excerpt: "In today's digital-first world, not having a website means losing customers to competitors. Learn why a professional website is the most important business investment you can make and how to get started.",
    category: "Business",
    readTime: "4 min read",
    icon: <Globe size={20} />,
    tags: ["Business Website", "Digital Presence", "Online Business", "Website Benefits"],
    content: `96% of consumers research products online before purchasing. A professional website builds credibility, generates leads 24/7, and expands your reach beyond local markets. RJ TechForce specializes in building business websites that convert visitors into customers.`,
    featured: true,
  },
  {
    id: 3,
    title: "React vs Traditional Websites — Which Is Right for Your Business?",
    slug: "react-vs-traditional-websites-comparison",
    excerpt: "React.js has revolutionized web development with component-based architecture and blazing-fast performance. But is it right for your project? Compare React vs HTML/PHP websites in terms of speed, SEO, and maintenance.",
    category: "React Development",
    readTime: "6 min read",
    icon: <Code size={20} />,
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    content: `React.js offers superior performance, reusability, and developer experience for modern web applications. For complex, interactive applications, React is the clear winner. For simple informational sites, traditional approaches may suffice. RJ TechForce builds both — and we help you choose the right approach.`,
    featured: false,
  },
  {
    id: 4,
    title: "Modern Website Design Trends for 2026",
    slug: "modern-website-design-trends-2026",
    excerpt: "From glassmorphism and dark mode interfaces to micro-animations and AI-driven personalization — discover the top web design trends shaping the digital experience landscape in 2026.",
    category: "Web Design",
    readTime: "5 min read",
    icon: <TrendingUp size={20} />,
    tags: ["Web Design", "UI UX", "Design Trends", "Modern Website"],
    content: `2026's biggest web design trends include dark mode-first design, micro-interactions, 3D elements, and AI-personalized content. RJ TechForce implements cutting-edge design techniques that keep your website modern, engaging, and ahead of the competition.`,
    featured: false,
  },
  {
    id: 5,
    title: "How to Improve Website Performance & PageSpeed Score",
    slug: "improve-website-performance-pagespeed-2026",
    excerpt: "A slow website costs you customers and SEO rankings. Learn the top techniques to achieve a 90+ Google PageSpeed score, improve Core Web Vitals, and make your website lightning fast.",
    category: "Performance",
    readTime: "7 min read",
    icon: <Zap size={20} />,
    tags: ["Website Performance", "PageSpeed", "Core Web Vitals", "SEO"],
    content: `Key performance optimizations include image compression with WebP format, code splitting, lazy loading, CDN usage, and minimizing render-blocking resources. RJ TechForce builds every website with performance-first principles to achieve 90+ PageSpeed scores.`,
    featured: false,
  },
  {
    id: 6,
    title: "Responsive Web Design: Why Mobile-First Matters in 2026",
    slug: "responsive-web-design-mobile-first-2026",
    excerpt: "Over 60% of web traffic comes from mobile devices. A mobile-optimized website is not optional — it's essential for SEO rankings, user experience, and business conversions. Here's how to get it right.",
    category: "Mobile Design",
    readTime: "4 min read",
    icon: <Smartphone size={20} />,
    tags: ["Responsive Design", "Mobile First", "UX Design", "SEO"],
    content: `Google uses mobile-first indexing, meaning your mobile site's performance directly impacts search rankings. RJ TechForce builds every website with a mobile-first approach, ensuring perfect display and functionality across all screen sizes and devices.`,
    featured: false,
  },
];

const categoryColors = {
  "Web Development": "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/20",
  "Business": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "React Development": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Web Design": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Performance": "text-green-400 bg-green-400/10 border-green-400/20",
  "Mobile Design": "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

const ArticleCard = ({ article, index, featured = false }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -4 }}
    className={`group relative bg-[#0F172A] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-[0_0_25px_rgba(249,115,22,0.08)] ${
      featured ? "md:col-span-2" : ""
    }`}
    aria-label={`Blog article: ${article.title}`}
  >
    <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#F97316] transition-all duration-500 group-hover:w-full" aria-hidden="true" />

    <div className={`p-8 flex flex-col h-full ${featured ? "md:flex-row md:items-start md:gap-8" : ""}`}>
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] mb-6 flex-shrink-0 group-hover:bg-[#F97316]/20 transition-colors"
        aria-hidden="true"
      >
        {article.icon}
      </div>

      <div className="flex flex-col flex-grow">
        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${categoryColors[article.category] || "text-white/50 bg-white/5 border-white/10"}`}>
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[#64748B] text-[10px] font-medium">
            <Clock size={10} aria-hidden="true" /> {article.readTime}
          </span>
          {article.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F97316] text-white">
              Popular
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#F97316] transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#64748B] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Article tags">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40"
            >
              <Tag size={8} className="inline mr-1" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
          <BookOpen size={14} aria-hidden="true" />
          Read Article
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </div>
  </motion.article>
);

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Web Development", "React Development", "Web Design", "Business", "Performance"];

  const filtered = activeFilter === "All"
    ? articles
    : articles.filter((a) => a.category === activeFilter);

  return (
    <section
      id="blog"
      className="relative py-24 bg-[#020617] overflow-hidden"
      aria-label="RJ TechForce Web Development Blog & Resources"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "50px 50px" }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" aria-hidden="true" />
            Web Development Resources
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6"
          >
            Blog & Resources — <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-orange-400">
              Web Development Insights
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Expert articles on web development, React.js, website design, performance optimization,
            and digital strategy — written by the RJ TechForce team to help your business grow online.
          </motion.p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="navigation" aria-label="Blog categories">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 border ${
                activeFilter === f
                  ? "bg-[#F97316] border-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  : "bg-[#0F172A] border-white/5 text-white/50 hover:border-white/20 hover:text-white"
              }`}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              featured={false}
            />
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-12 bg-[#0F172A] border border-white/10 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#F97316]/5 blur-3xl" aria-hidden="true" />
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tighter">
              Ready to Build Your Website?
            </h3>
            <p className="text-[#CBD5E1] text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Let RJ TechForce create a professional website or web application for your business.
              Get a free consultation and custom quote today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-white text-sm font-bold uppercase tracking-tight rounded-xl hover:bg-[#EA580C] transition-colors shadow-lg shadow-[#F97316]/20"
                aria-label="Contact RJ TechForce for web development"
              >
                Get a Free Quote <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white text-sm font-bold uppercase tracking-tight rounded-xl hover:border-[#F97316]/50 hover:text-[#F97316] transition-all"
                aria-label="View RJ TechForce portfolio"
              >
                View Our Portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;

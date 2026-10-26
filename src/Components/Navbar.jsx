import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#projects" },
  { name: "About Us", href: "/#about-us" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle Navbar shrinking on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the upper-middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Update URL hash without jumping
          window.history.replaceState(null, "", `#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(2));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler. Links point to "/#section", so on other routes
  // (e.g. /admin) the browser follows them normally to the homepage section.
  const handleNavClick = (e, href) => {
    const targetId = href.split("#")[1];
    const element = document.getElementById(targetId);

    if (element) {
      e.preventDefault();
      const offset = 80; // Account for sticky navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setIsOpen(false);
    }
  };

  return (
    <nav
      aria-label="RJ TechForce main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-200 border-b ${
        scrolled
          ? "bg-[#0F172A]/80 backdrop-blur-md py-3 border-white/10 shadow-lg"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Side: Logo */}
          <a
            href="/#home"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
            onClick={(e) => handleNavClick(e, "/#home")}
            aria-label="RJ TechForce home"
          >
            <div className="w-10 h-10 bg-[#F97316] flex items-center justify-center rounded-md">
              <img src="/brand/rj-techforce-logo-80.png" alt="" width="40" height="40" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              TechForce
            </span>
          </a>

          {/* Middle: Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    activeSection === link.href.slice(2)
                      ? "text-[#F97316]"
                      : "text-[#CBD5E1] hover:text-white"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(2) && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F97316]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: CTA */}
          <div className="hidden md:block">
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="inline-block bg-[#F97316] text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-tight hover:bg-[#EA580C] transition-all duration-200 shadow-lg shadow-[#F97316]/20 transform hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#CBD5E1] hover:text-white focus-visible:outline-2 focus-visible:outline-[#F97316]"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed right-0 top-0 h-full w-72 bg-[#0F172A] shadow-2xl z-50 md:hidden px-6 py-8 border-l border-white/10"
            >
              <div className="flex flex-col space-y-6 mt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-lg font-bold tracking-tight border-b border-transparent ${
                      activeSection === link.href.slice(2)
                        ? "text-[#F97316]"
                        : "text-[#CBD5E1]"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

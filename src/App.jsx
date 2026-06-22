import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Technologies from "./Components/Technologies";
import Projects from "./Components/Projects";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLoginPage from "./Components/AdminLoginPage";
import SEO from "./seo/SEO";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="relative bg-[#0F172A] text-white antialiased font-sans">
        <div className="fixed inset-0 tech-grid z-0" />

        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO
                    title="Professional Web Development, UI/UX Design & Modern Digital Solutions"
                    description="RJ TechForce is a professional web development team specializing in modern websites, responsive web applications, UI/UX design, React development, JavaScript solutions, business websites, portfolio websites, and custom digital experiences. We help businesses establish a powerful online presence."
                    keywords="RJ TechForce, web developer, website developer, web development company, website design, React developer, JavaScript developer, frontend developer, UI UX designer, full stack developer, digital agency, business website development, custom website development, portfolio website, web application development, responsive websites, modern web design"
                    canonical="/"
                    structuredData={{
                      "@context": "https://schema.org",
                      "@type": "WebPage",
                      "@id": "https://rjtechforce.com/#webpage",
                      "url": "https://rjtechforce.com/",
                      "name": "RJ TechForce | Professional Web Development & Digital Solutions",
                      "isPartOf": { "@id": "https://rjtechforce.com/#website" },
                      "about": { "@id": "https://rjtechforce.com/#organization" },
                      "description": "Professional web development and digital solutions by RJ TechForce — modern websites, web applications, UI/UX design, and custom software.",
                      "breadcrumb": { "@id": "https://rjtechforce.com/#breadcrumb" },
                      "inLanguage": "en-IN",
                      "potentialAction": [
                        {
                          "@type": "ReadAction",
                          "target": ["https://rjtechforce.com/"]
                        }
                      ]
                    }}
                  />
                  <Hero />
                  <Services />
                  <Technologies />
                  <Projects />
                  <AboutUs />
                  <Blog />
                  <Contact />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <SEO title="Admin Dashboard" noIndex={true} />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/admin/login"
              element={
                <>
                  <SEO title="Admin Login" noIndex={true} />
                  <AdminLoginPage />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Technologies from "./Components/Technologies";
import Projects from "./Components/Projects";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import AdminDashboard from "./Components/AdminDashboard";
import AdminLoginPage from "./Components/AdminLoginPage";
import "./App.css";

/**
 * Section component to demonstrate the smooth scrolling and active link tracking.
 */
const Section = ({ id, title, color }) => (
  <section
    id={id}
    className={`relative min-h-screen flex items-center justify-center border-b border-white/10 ${color}`}
  >
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 uppercase">
        {title}
      </h2>
      <p className="text-lg md:text-xl font-normal text-[#CBD5E1] leading-relaxed">
        RJ TechForce - Technical Excellence
      </p>
    </div>
  </section>
);

export default function App() {
  return (
    <Router>
      <div className="relative bg-[#0F172A] text-white antialiased font-sans">
        {/* Global technical background pattern */}
        <div className="fixed inset-0 tech-grid z-0" />

        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Hero /> 
                <Services />
                <Technologies />
                <Projects />
                <AboutUs />
                <Contact /> {/* Ensure Contact is rendered before Footer */}
              </>
            } />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

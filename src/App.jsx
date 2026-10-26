import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Technologies from "./Components/Technologies";
import Projects from "./Components/Projects";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import NotFound from "./Components/NotFound";
import SEO from "./seo/SEO";
import { pages } from "./config/site";
import "./App.css";

// Admin screens are loaded on demand so public visitors don't download them
const AdminDashboard = lazy(() => import("./Components/AdminDashboard"));
const AdminLoginPage = lazy(() => import("./Components/AdminLoginPage"));

const AdminFallback = () => <div className="min-h-screen bg-[#020617]" aria-busy="true" />;

// The router is provided by the entry point: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx (build-time prerendering).
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-[#0F172A] text-white antialiased font-sans">
        <div className="fixed inset-0 tech-grid z-0" />

        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO {...pages.home} />
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
                  <SEO {...pages.adminDashboard} />
                  <Suspense fallback={<AdminFallback />}>
                    <AdminDashboard />
                  </Suspense>
                </>
              }
            />
            <Route
              path="/admin/login"
              element={
                <>
                  <SEO {...pages.adminLogin} />
                  <Suspense fallback={<AdminFallback />}>
                    <AdminLoginPage />
                  </Suspense>
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <SEO {...pages.notFound} />
                  <NotFound />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import WebsiteDevelopment from "../pages/public/WebsiteDevelopment";
import WebApplicationDevelopment from "../pages/public/WebApplicationDevelopment";
import ReactDevelopment from "../pages/public/ReactDevelopment";
import UIUXDesign from "../pages/public/UIUXDesign";
import SaaSDevelopment from "../pages/public/SaaSDevelopment";
import EcommerceDevelopment from "../pages/public/EcommerceDevelopment";
import Portfolio from "../pages/public/Portfolio";
import ProjectDetails from "../pages/public/ProjectDetails";
import Process from "../pages/public/Process";
import Pricing from "../pages/public/Pricing";
import Blog from "../pages/public/Blog";
import BlogDetails from "../pages/public/BlogDetails";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/FAQ";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsAndConditions from "../pages/public/TermsAndConditions";
import NotFound from "../pages/public/NotFound";

// Admin is code-split: public visitors never download it
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminOverview = lazy(() => import("../pages/admin/AdminOverview"));
const Enquiries = lazy(() => import("../pages/admin/Enquiries"));
const Projects = lazy(() => import("../pages/admin/Projects"));
const PortfolioManagement = lazy(() => import("../pages/admin/PortfolioManagement"));
const BlogManagement = lazy(() => import("../pages/admin/BlogManagement"));
const BlogEditor = lazy(() => import("../pages/admin/BlogEditor"));
const Clients = lazy(() => import("../pages/admin/Clients"));
const ContentManagement = lazy(() => import("../pages/admin/ContentManagement"));
const Settings = lazy(() => import("../pages/admin/Settings"));

const AdminFallback = () => <div className="min-h-screen bg-[#060E1D]" aria-busy="true" />;
const admin = (Component) => (
  <Suspense fallback={<AdminFallback />}>
    <Component />
  </Suspense>
);

const servicePageRoutes = [
  ["website-development", WebsiteDevelopment],
  ["web-application-development", WebApplicationDevelopment],
  ["react-development", ReactDevelopment],
  ["ui-ux-design", UIUXDesign],
  ["saas-development", SaaSDevelopment],
  ["ecommerce-development", EcommerceDevelopment],
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        {servicePageRoutes.map(([slug, Page]) => (
          <Route key={slug} path={`services/${slug}`} element={<Page />} />
        ))}
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:slug" element={<ProjectDetails />} />
        <Route path="process" element={<Process />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="admin/login" element={admin(AdminLogin)} />
      <Route path="admin" element={admin(AdminLayout)}>
        <Route index element={admin(AdminOverview)} />
        <Route path="enquiries" element={admin(Enquiries)} />
        <Route path="projects" element={admin(Projects)} />
        <Route path="portfolio" element={admin(PortfolioManagement)} />
        <Route path="blog" element={admin(BlogManagement)} />
        <Route path="blog/:id" element={admin(BlogEditor)} />
        <Route path="clients" element={admin(Clients)} />
        <Route path="content" element={admin(ContentManagement)} />
        <Route path="settings" element={admin(Settings)} />
        <Route path="*" element={<p className="text-[#94A3B8]">This admin page doesn't exist.</p>} />
      </Route>
    </Routes>
  );
}

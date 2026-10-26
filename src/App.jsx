import { MotionConfig } from "framer-motion";
import { SiteDataProvider } from "./context/SiteDataContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

// The router is provided by the entry point: BrowserRouter in main.jsx,
// StaticRouter in entry-server.jsx (build-time prerendering).
export default function App({ initialData = null }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteDataProvider initialData={initialData}>
        <AppRoutes />
      </SiteDataProvider>
    </MotionConfig>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";

/**
 * Page transition wrapper — Framer Motion needs a key to know when to
 * re-mount a component. useLocation gives us that.
 */
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={location.pathname}>{children}</div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="grain relative min-h-screen bg-ink">
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />

      <Navbar />

      <main className="scroll-mt-24">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* 404 — redirect to home instead of a dedicated page */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Wrap in BrowserRouter at the top level so all nested components can use
 * routing hooks (useNavigate, useLocation, etc.).
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

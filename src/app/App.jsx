import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import CybersecurityPage from "../pages/CybersecurityPage";
import SeoPage from "../pages/SeoPage";
import WebDevPage from "../pages/WebDevPage";
import AboutPage from "../pages/AboutPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#faf8ff" }}>
      {/* Single fixed shared navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Page content – offset below fixed navbar (56px mobile / 64px desktop) */}
      <main className="pt-14 md:pt-16">
        {activePage === "home" && <HomePage onNavigate={handleNavigate} />}
        {activePage === "services" && <ServicesPage onNavigate={handleNavigate} />}
        {activePage === "cybersecurity" && <CybersecurityPage onNavigate={handleNavigate} />}
        {activePage === "seo" && <SeoPage onNavigate={handleNavigate} />}
        {activePage === "webdev" && <WebDevPage onNavigate={handleNavigate} />}
        {activePage === "about" && <AboutPage onNavigate={handleNavigate} />}
      </main>

      {/* Single shared footer */}
      <Footer onNavigate={handleNavigate} />
    </div>);

}
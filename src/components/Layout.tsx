import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import CookieConsent from "./CookieConsent";
import ExitIntentPopup from "./ExitIntentPopup";
import { HashScroll } from "./HashScroll";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <HashScroll />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
}

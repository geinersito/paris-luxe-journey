import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import CookieConsent from './CookieConsent';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
    </div>
  );
}

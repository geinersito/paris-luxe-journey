import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-champagne/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-champagne/20 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Paris Elite Services ("we", "our", or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you use our premium transportation services.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <div className="flex items-start gap-4 mb-4">
                <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold text-lg text-secondary mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Name and contact details (email, phone number)</li>
                        <li>Pickup and drop-off locations</li>
                        <li>Payment information (processed securely via Stripe)</li>
                        <li>Travel preferences and special requests</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-secondary mb-2">Automatically Collected Information</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>IP address and browser type</li>
                        <li>Device information</li>
                        <li>Usage data and analytics</li>
                        <li>Cookies and similar technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <div className="flex items-start gap-4 mb-4">
                <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                    3. How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                    <li>To provide and maintain our transportation services</li>
                    <li>To process your bookings and payments</li>
                    <li>To communicate with you about your reservations</li>
                    <li>To improve our services and customer experience</li>
                    <li>To comply with legal obligations</li>
                    <li>To send promotional communications (with your consent)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing via Stripe (PCI DSS compliant)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                5. Your Rights (GDPR)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="glass-card-premium p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-champagne/10">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                6. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@eliteparistransfer.com</p>
                <p><strong>Phone:</strong> +33 6 68 25 11 02</p>
                <p><strong>Address:</strong> 151 Avenue des Champs-Élysées, 75008 Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


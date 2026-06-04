import React from "react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ref-bg">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-ref-ink/8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <Shield className="w-8 h-8 text-ref-navy mx-auto mb-6" />
            <h1 className="font-editorial font-light text-4xl md:text-5xl lg:text-6xl text-ref-ink mb-6">
              Privacy Policy
            </h1>
            <p className="font-ui text-base text-ref-ink/60 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <p className="font-ui text-xs text-ref-ink/40 mt-4">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-0 divide-y divide-ref-ink/8">
            {/* Introduction */}
            <div className="py-10">
              <div className="flex items-start gap-4">
                <FileText className="w-5 h-5 text-ref-navy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                    1. Introduction
                  </h2>
                  <p className="font-ui text-sm text-ref-ink/60 leading-relaxed">
                    Paris Elite Services ("we", "our", or "us") is committed to
                    protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you use our premium transportation services.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="py-10">
              <div className="flex items-start gap-4">
                <Eye className="w-5 h-5 text-ref-navy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                    2. Information We Collect
                  </h2>
                  <div className="space-y-4 font-ui text-sm text-ref-ink/60">
                    <div>
                      <h3 className="font-semibold text-ref-ink mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Name and contact details (email, phone number)</li>
                        <li>Pickup and drop-off locations</li>
                        <li>Payment information (processed securely via Stripe)</li>
                        <li>Travel preferences and special requests</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-ref-ink mb-2">Automatically Collected Information</h3>
                      <ul className="list-disc list-inside space-y-1.5 ml-4">
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

            {/* How We Use */}
            <div className="py-10">
              <div className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-ref-navy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                    3. How We Use Your Information
                  </h2>
                  <ul className="font-ui text-sm text-ref-ink/60 list-disc list-inside space-y-1.5 ml-4">
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
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                4. Data Security
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="font-ui text-sm text-ref-ink/60 list-disc list-inside space-y-1.5 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing via Stripe (PCI DSS compliant)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                5. Your Rights (GDPR)
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), you have
                the following rights:
              </p>
              <ul className="font-ui text-sm text-ref-ink/60 list-disc list-inside space-y-1.5 ml-4">
                <li><strong className="text-ref-ink">Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-ref-ink">Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong className="text-ref-ink">Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong className="text-ref-ink">Right to Restriction:</strong> Limit how we use your data</li>
                <li><strong className="text-ref-ink">Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-ref-ink">Right to Object:</strong> Object to processing of your data</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                6. Contact Us
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to
                exercise your rights, please contact us:
              </p>
              <div className="font-ui text-sm text-ref-ink/60 space-y-2">
                <p><strong className="text-ref-ink">Email:</strong> privacy@eliteparistransfer.com</p>
                <p><strong className="text-ref-ink">Phone:</strong> +33 6 68 25 11 02</p>
                <p><strong className="text-ref-ink">Address:</strong> Vanves (92170), Ile-de-France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

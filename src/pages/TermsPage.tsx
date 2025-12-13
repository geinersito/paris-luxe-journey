import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-champagne/30 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-champagne/20 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services
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
            {/* Acceptance of Terms */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Paris Elite Services, you accept and agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            {/* Booking and Payment */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <div className="flex items-start gap-4 mb-4">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                    2. Booking and Payment
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold text-lg text-secondary mb-2">Booking Process</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>All bookings must be made through our website or authorized channels</li>
                        <li>Confirmation is sent via email within 24 hours</li>
                        <li>Prices are quoted in Euros (€) and include VAT</li>
                        <li>Payment is required at the time of booking</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-secondary mb-2">Payment Methods</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Credit/Debit cards (Visa, Mastercard, American Express)</li>
                        <li>Secure payment processing via Stripe</li>
                        <li>100% online payment required for confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8 border-2 border-amber-200 bg-amber-50/50">
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                    3. Cancellation Policy
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h3 className="font-semibold text-lg text-secondary mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Full Refund
                      </h3>
                      <p>Cancellations made <strong>24+ hours</strong> before pickup time</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h3 className="font-semibold text-lg text-secondary mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                        50% Refund
                      </h3>
                      <p>Cancellations made <strong>12-24 hours</strong> before pickup time</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-amber-200">
                      <h3 className="font-semibold text-lg text-secondary mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        No Refund
                      </h3>
                      <p>Cancellations made <strong>less than 12 hours</strong> before pickup time or no-shows</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Terms */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                4. Service Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg text-secondary mb-2">Waiting Time</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Airport pickups:</strong> 60 minutes free waiting time from actual landing</li>
                    <li><strong>City pickups:</strong> 15 minutes free waiting time</li>
                    <li><strong>Additional waiting:</strong> €15 per 15 minutes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-secondary mb-2">Luggage</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Standard luggage included (1 suitcase + 1 carry-on per passenger)</li>
                    <li>Extra large items: €15 per item</li>
                    <li>Special items (skis, golf clubs, etc.): Please notify in advance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-secondary mb-2">Flight Delays</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We monitor all flights in real-time</li>
                    <li>No extra charge for flight delays</li>
                    <li>Driver will adjust pickup time automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Liability */}
            <div className="glass-card-premium p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                5. Liability and Insurance
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>All vehicles are fully insured and licensed</li>
                <li>Professional chauffeurs with valid licenses</li>
                <li>We are not liable for delays caused by traffic, weather, or force majeure</li>
                <li>Lost items: Please report within 24 hours</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="glass-card-premium p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-champagne/10">
              <h2 className="text-2xl font-display font-bold text-secondary mb-4">
                6. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@eliteparistransfer.com</p>
                <p><strong>Phone:</strong> +33 6 68 25 11 02 (24/7)</p>
                <p><strong>WhatsApp:</strong> +33 6 68 25 11 02</p>
                <p><strong>Address:</strong> 151 Avenue des Champs-Élysées, 75008 Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


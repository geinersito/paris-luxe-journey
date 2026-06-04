import React from "react";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ref-bg">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-ref-ink/8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <FileText className="w-8 h-8 text-ref-navy mx-auto mb-6" />
            <h1 className="font-editorial font-light text-4xl md:text-5xl lg:text-6xl text-ref-ink mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="font-ui text-base text-ref-ink/60 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services
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
          <div className="divide-y divide-ref-ink/8">
            {/* Acceptance */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed">
                By accessing and using Paris Elite Services, you accept and
                agree to be bound by these Terms and Conditions. If you do not
                agree to these terms, please do not use our services.
              </p>
            </div>

            {/* Booking and Payment */}
            <div className="py-10">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-ref-navy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                    2. Booking and Payment
                  </h2>
                  <div className="space-y-4 font-ui text-sm text-ref-ink/60">
                    <div>
                      <h3 className="font-semibold text-ref-ink mb-2">Booking Process</h3>
                      <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>All bookings must be made through our website or authorized channels</li>
                        <li>Confirmation is sent via email within 24 hours</li>
                        <li>Prices are quoted in Euros (€) and include VAT</li>
                        <li>Payment is required at the time of booking</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-ref-ink mb-2">Payment Methods</h3>
                      <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Credit/Debit cards (Visa, Mastercard, American Express)</li>
                        <li>Secure payment processing via Stripe</li>
                        <li>100% online payment required for confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div className="py-10">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                    3. Cancellation Policy
                  </h2>
                  <div className="space-y-3 font-ui text-sm">
                    <div className="p-4 border border-ref-ink/8 bg-white">
                      <h3 className="font-semibold text-ref-ink mb-1 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" /> Full Refund
                      </h3>
                      <p className="text-ref-ink/60">Cancellations made <strong>24+ hours</strong> before pickup time</p>
                    </div>
                    <div className="p-4 border border-ref-ink/8 bg-white">
                      <h3 className="font-semibold text-ref-ink mb-1 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> 50% Refund
                      </h3>
                      <p className="text-ref-ink/60">Cancellations made <strong>12-24 hours</strong> before pickup time</p>
                    </div>
                    <div className="p-4 border border-ref-ink/8 bg-white">
                      <h3 className="font-semibold text-ref-ink mb-1 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" /> No Refund
                      </h3>
                      <p className="text-ref-ink/60">Cancellations made <strong>less than 12 hours</strong> before pickup time or no-shows</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Terms */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                4. Service Terms
              </h2>
              <div className="space-y-4 font-ui text-sm text-ref-ink/60">
                <div>
                  <h3 className="font-semibold text-ref-ink mb-2">Waiting Time</h3>
                  <ul className="list-disc list-inside space-y-1.5 ml-4">
                    <li><strong className="text-ref-ink">Airport pickups:</strong> 60 minutes free waiting time from actual landing</li>
                    <li><strong className="text-ref-ink">City pickups:</strong> 15 minutes free waiting time</li>
                    <li><strong className="text-ref-ink">Additional waiting:</strong> €15 per 15 minutes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ref-ink mb-2">Luggage</h3>
                  <ul className="list-disc list-inside space-y-1.5 ml-4">
                    <li>Standard luggage included (1 suitcase + 1 carry-on per passenger)</li>
                    <li>Extra large items: €15 per item</li>
                    <li>Special items (skis, golf clubs, etc.): Please notify in advance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ref-ink mb-2">Flight Delays</h3>
                  <ul className="list-disc list-inside space-y-1.5 ml-4">
                    <li>We monitor all flights in real-time</li>
                    <li>No extra charge for flight delays</li>
                    <li>Driver will adjust pickup time automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Liability */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                5. Liability and Insurance
              </h2>
              <ul className="font-ui text-sm text-ref-ink/60 list-disc list-inside space-y-1.5 ml-4">
                <li>All vehicles are fully insured and licensed</li>
                <li>Professional chauffeurs with valid licenses</li>
                <li>We are not liable for delays caused by traffic, weather, or force majeure</li>
                <li>Lost items: Please report within 24 hours</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="py-10">
              <h2 className="font-editorial font-light text-2xl text-ref-ink mb-4">
                6. Contact Information
              </h2>
              <p className="font-ui text-sm text-ref-ink/60 leading-relaxed mb-4">
                For questions about these Terms &amp; Conditions, please contact us:
              </p>
              <div className="font-ui text-sm text-ref-ink/60 space-y-2">
                <p><strong className="text-ref-ink">Email:</strong> info@eliteparistransfer.com</p>
                <p><strong className="text-ref-ink">Phone:</strong> +33 6 68 25 11 02 (24/7)</p>
                <p><strong className="text-ref-ink">WhatsApp:</strong> +33 6 68 25 11 02</p>
                <p><strong className="text-ref-ink">Address:</strong> Vanves (92170), Ile-de-France</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

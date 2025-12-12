import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();

  const faqCategories = {
    bookings: [
      {
        question: t.faq.questions.howToBook.question,
        answer: t.faq.questions.howToBook.answer
      },
      {
        question: t.faq.questions.cancellation.question,
        answer: t.faq.questions.cancellation.answer
      },
      {
        question: t.faq.questions.advanceBooking.question,
        answer: t.faq.questions.advanceBooking.answer
      },
      {
        question: t.faq.questions.modifyBooking.question,
        answer: t.faq.questions.modifyBooking.answer
      }
    ],
    services: [
      {
        question: t.faq.questions.flightDelay.question,
        answer: t.faq.questions.flightDelay.answer
      },
      {
        question: t.faq.questions.airportTransfer.question,
        answer: t.faq.questions.airportTransfer.answer
      },
      {
        question: t.faq.questions.tourGuide.question,
        answer: t.faq.questions.tourGuide.answer
      },
      {
        question: t.faq.questions.privateDriver.question,
        answer: t.faq.questions.privateDriver.answer
      },
      {
        question: t.faq.questions.outsideParis.question,
        answer: t.faq.questions.outsideParis.answer
      }
    ],
    payment: [
      {
        question: t.faq.questions.pricesIncluded.question,
        answer: t.faq.questions.pricesIncluded.answer
      },
      {
        question: t.faq.questions.paymentMethods.question,
        answer: t.faq.questions.paymentMethods.answer
      },
      {
        question: t.faq.questions.deposit.question,
        answer: t.faq.questions.deposit.answer
      }
    ],
    vehicles: [
      {
        question: t.faq.questions.vehicleTypes.question,
        answer: t.faq.questions.vehicleTypes.answer
      }
    ]
  };

  const categoryMapping = {
    bookings: 'bookings',
    services: 'services',
    payment: 'payment',
    vehicles: 'vehicles'
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-cream/50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            Questions & Answers
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6">
            {t?.faq?.title || "Preguntas Frecuentes"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our premium chauffeur services
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {Object.entries(faqCategories).map(([category, questions], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                <h3 className="text-2xl font-display font-bold text-secondary">
                  {t?.faq?.categories?.[categoryMapping[category as keyof typeof categoryMapping]] || category}
                </h3>
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="glass-card-premium px-6 py-2 rounded-xl border-none shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-semibold text-secondary group">
                      <span className="flex items-start gap-3 pr-4">
                        <span className="flex-1">{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-5 pt-2 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card-premium p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-bold text-secondary mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is available 24/7 to assist you with any inquiries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+33123456789" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-gold text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
              <a href="mailto:contact@pariselite.com" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary/40 text-primary rounded-xl font-semibold hover:bg-primary/5 hover:border-primary transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

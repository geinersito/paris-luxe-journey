import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();

  const faqCategories = {
    bookings: [
      { question: t.faq.questions.howToBook.question, answer: t.faq.questions.howToBook.answer },
      { question: t.faq.questions.cancellation.question, answer: t.faq.questions.cancellation.answer },
      { question: t.faq.questions.advanceBooking.question, answer: t.faq.questions.advanceBooking.answer },
      { question: t.faq.questions.modifyBooking.question, answer: t.faq.questions.modifyBooking.answer },
    ],
    services: [
      { question: t.faq.questions.flightDelay.question, answer: t.faq.questions.flightDelay.answer },
      { question: t.faq.questions.airportTransfer.question, answer: t.faq.questions.airportTransfer.answer },
      { question: t.faq.questions.tourGuide.question, answer: t.faq.questions.tourGuide.answer },
      { question: t.faq.questions.privateDriver.question, answer: t.faq.questions.privateDriver.answer },
      { question: t.faq.questions.outsideParis.question, answer: t.faq.questions.outsideParis.answer },
    ],
    payment: [
      { question: t.faq.questions.pricesIncluded.question, answer: t.faq.questions.pricesIncluded.answer },
      { question: t.faq.questions.paymentMethods.question, answer: t.faq.questions.paymentMethods.answer },
      { question: t.faq.questions.deposit.question, answer: t.faq.questions.deposit.answer },
    ],
    vehicles: [
      { question: t.faq.questions.vehicleTypes.question, answer: t.faq.questions.vehicleTypes.answer },
    ],
  };

  const categoryMapping = {
    bookings: "bookings",
    services: "services",
    payment: "payment",
    vehicles: "vehicles",
  };

  return (
    <section className="py-16 md:py-24 bg-ref-bg">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          {Object.entries(faqCategories).map(([category, questions]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 bg-ref-navy" />
                <h3 className="font-editorial font-light text-2xl text-ref-ink">
                  {t?.faq?.categories?.[categoryMapping[category as keyof typeof categoryMapping]] || category}
                </h3>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="border border-ref-ink/8 overflow-hidden data-[state=open]:border-ref-navy/20"
                  >
                    <AccordionTrigger className="font-ui font-semibold text-sm text-ref-ink hover:text-ref-navy hover:no-underline px-5 py-4 text-left transition-colors">
                      <span className="flex items-center justify-between gap-4 pr-2 flex-1">
                        <span className="flex-1">{faq.question}</span>
                        <ChevronDown className="h-4 w-4 text-ref-navy shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="font-ui text-sm text-ref-ink/60 pb-5 pt-2 px-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 border-t border-ref-ink/8 pt-12 text-center">
          <h3 className="font-editorial font-light text-2xl text-ref-ink mb-3">
            Still have questions?
          </h3>
          <p className="font-ui text-sm text-ref-ink/60 mb-6">
            Our team is available 24/7 to assist you with any inquiries
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+33668251102"
              className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 bg-ref-navy text-white hover:bg-ref-ink transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <a
              href="mailto:info@eliteparistransfer.com"
              className="inline-flex items-center justify-center gap-2 font-ui font-semibold text-sm px-6 py-3 border border-ref-ink/20 text-ref-ink hover:bg-ref-ink/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

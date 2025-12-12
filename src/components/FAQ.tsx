import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground text-center mb-12">
          {t?.faq?.title || "Preguntas Frecuentes"}
        </h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {Object.entries(faqCategories).map(([category, questions]) => (
            <div key={category}>
              <h3 className="text-xl font-display text-primary mb-4">
                {t?.faq?.categories?.[categoryMapping[category as keyof typeof categoryMapping]] || category}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-4">
                {questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="bg-card hover:bg-accent/5 rounded-lg px-6 transition-colors duration-200"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

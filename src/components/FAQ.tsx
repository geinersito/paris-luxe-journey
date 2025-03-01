import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();
  
  const faqCategories = {
    reservas: [
      {
        question: "¿Cómo funciona el servicio de reserva?",
        answer: "Nuestro sistema de reserva es simple y directo. Selecciona tu tipo de vehículo, fecha y hora, y completa los detalles de recogida y destino. Recibirás una confirmación inmediata por correo electrónico."
      },
      {
        question: "¿Cuál es la política de cancelación?",
        answer: "Puedes cancelar tu reserva hasta 24 horas antes del servicio sin cargo. Las cancelaciones posteriores pueden estar sujetas a un cargo del 50% del valor del servicio."
      },
      {
        question: "¿Con cuánta anticipación debo reservar?",
        answer: "Recomendamos realizar las reservas con al menos 48 horas de anticipación para garantizar la disponibilidad. Sin embargo, también podemos atender reservas de última hora sujetas a disponibilidad."
      },
      {
        question: "¿Puedo modificar mi reserva?",
        answer: "Sí, puedes modificar tu reserva hasta 24 horas antes del servicio sin cargo adicional. Los cambios están sujetos a disponibilidad."
      }
    ],
    servicios: [
      {
        question: "¿Qué sucede si mi vuelo se retrasa?",
        answer: "Monitoreamos todos los vuelos. No te preocupes, ajustaremos el horario de recogida sin cargo adicional. Nuestro equipo estará pendiente de cualquier cambio en tu horario de llegada."
      },
      {
        question: "¿Cuál es el proceso para traslados al aeropuerto?",
        answer: "Para traslados al aeropuerto, recomendamos programar la recogida con 3 horas de anticipación para vuelos internacionales y 2 horas para vuelos nacionales. Nuestro equipo monitorea el tráfico en tiempo real para garantizar su llegada a tiempo."
      },
      {
        question: "¿Ofrecen servicios de guía turístico?",
        answer: "Sí, contamos con guías profesionales multilingües para tours personalizados por París y sus alrededores. Pueden adaptar el recorrido según sus intereses específicos."
      },
      {
        question: "¿Qué incluye el servicio de chofer privado?",
        answer: "El servicio incluye un chofer profesional multilingüe, vehículo de lujo, agua embotellada, wifi a bordo, y asistencia 24/7. También podemos agregar servicios adicionales según sus necesidades."
      },
      {
        question: "¿Realizan excursiones fuera de París?",
        answer: "Sí, ofrecemos excursiones a destinos populares como Versalles, Valle del Loira, Giverny, Champagne y otros lugares de interés. Todos los tours son personalizables según sus preferencias."
      }
    ],
    pagos: [
      {
        question: "¿Los precios incluyen todos los cargos?",
        answer: "Sí, nuestros precios incluyen IVA, seguro y todos los cargos asociados. No hay costos ocultos. El precio que ve es el precio final que pagará."
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos todas las principales tarjetas de crédito y débito (Visa, MasterCard, American Express), transferencias bancarias y pagos en efectivo. Para reservas corporativas, ofrecemos facturación mensual."
      },
      {
        question: "¿Es necesario un depósito para reservar?",
        answer: "Para la mayoría de los servicios, se requiere un depósito del 30% para confirmar la reserva. El saldo restante puede pagarse antes o al finalizar el servicio, según su preferencia."
      }
    ],
    vehiculos: [
      {
        question: "¿Qué tipos de vehículos ofrecen?",
        answer: "Disponemos de una flota premium que incluye sedanes de lujo (Mercedes Clase S, BMW Serie 7), vans ejecutivas (Mercedes V-Class) y vehículos SUV de alta gama. Todos nuestros vehículos tienen menos de 2 años de antigüedad."
      }
    ]
  };

  const categoryMapping = {
    reservas: 'bookings',
    servicios: 'services',
    pagos: 'payment',
    vehiculos: 'vehicles'
  };

  const questionMapping = {
    reservas: {
      0: 'howToBook',
      1: 'cancellation',
      2: 'advanceBooking',
      3: 'modifyBooking'
    },
    servicios: {
      0: 'flightDelay',
      1: 'airportTransfer',
      2: 'tourGuide',
      3: 'privateDriver',
      4: 'outsideParis'
    },
    pagos: {
      0: 'pricesIncluded',
      1: 'paymentMethods',
      2: 'deposit'
    },
    vehiculos: {
      0: 'vehicleTypes'
    }
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
                {questions.map((faq, index) => {
                  const questionId = questionMapping[category as keyof typeof questionMapping][index as keyof typeof questionMapping[keyof typeof questionMapping]];
                  return (
                    <AccordionItem 
                      key={index} 
                      value={`${category}-${index}`}
                      className="bg-card hover:bg-accent/5 rounded-lg px-6 transition-colors duration-200"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        {t?.faq?.questions?.[questionId]?.question || faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {t?.faq?.questions?.[questionId]?.answer || faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

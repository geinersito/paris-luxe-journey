import TestimonialCard from "./TestimonialCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice Marketing",
      content: "Service impeccable pour nos transferts d'affaires. La ponctualité et le professionnalisme sont remarquables.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      name: "Pierre Laurent",
      role: "Organisateur d'Événements",
      content: "Les services VIP pour nos clients internationaux ont dépassé toutes les attentes. Une expérience vraiment luxueuse.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      name: "Isabella Garcia",
      role: "Voyageuse Fréquente",
      content: "Le service de transfert aéroport est parfait. Les chauffeurs connaissent Paris comme leur poche et sont très courtois.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    },
    {
      name: "James Wilson",
      role: "CEO",
      content: "Un service de limousine exceptionnel pour nos événements d'entreprise. Fiable, élégant et toujours ponctuel.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-pearl dark:bg-primary-dark transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary dark:text-primary-foreground mb-4">
            Témoignages Clients
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience avec Paris Elite Services
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
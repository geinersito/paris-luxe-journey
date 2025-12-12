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
    <section className="section-padding bg-gradient-to-b from-champagne via-cream to-white dark:from-secondary dark:via-secondary-dark dark:to-primary-dark transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-accent italic text-xl md:text-2xl text-primary mb-4">
            Témoignages
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-primary-foreground mb-6">
            Ce Que Disent Nos Clients
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez pourquoi nos clients nous font confiance pour leurs transferts de luxe à Paris
          </p>
        </motion.div>

        {/* Staggered Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`h-full ${index === 1 ? 'lg:mt-12' : ''}`}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Clients Satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Note Moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ponctualité</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support Client</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Clock, Star, Shield, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section
      id="about"
      className="py-20 relative text-primary-foreground"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <span className="text-secondary font-display text-sm uppercase tracking-wider mb-4 block font-semibold">
            {t.about.years}
          </span>
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-white font-bold leading-tight">
            {t.about.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-display mb-8 text-secondary/90 font-medium">
            {t.about.subtitle}
          </h3>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </motion.div>

        {/* Commitment Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 mb-16"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <div className="glass-card p-10 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 hover:bg-black/40 transition-colors duration-300">
            <h3 className="text-2xl md:text-3xl font-display mb-8 text-secondary font-semibold">
              {t.about.commitment.title}
            </h3>
            <ul className="space-y-5">
              {t.about.commitment.items.map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-white/90 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-10 rounded-xl backdrop-blur-md bg-black/30 border border-white/10 hover:bg-black/40 transition-colors duration-300">
            <h3 className="text-2xl md:text-3xl font-display mb-8 text-secondary font-semibold">
              {t.about.expertise.title}
            </h3>
            <ul className="space-y-5">
              {t.about.expertise.items.map((item, index) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <Award className="w-5 h-5 text-secondary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-white/90 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Conclusion Section */}
        <motion.div
          className="max-w-3xl mx-auto space-y-8 text-center"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            {t.about.conclusion.satisfaction}
          </p>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            {t.about.conclusion.partnerships}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

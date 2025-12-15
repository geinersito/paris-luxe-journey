import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Clock, Star, Shield, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section id="about" className="py-20 relative text-primary-foreground">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20 pt-8"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <span className="text-primary font-accent italic text-xl md:text-2xl mb-4 block font-medium drop-shadow-lg">
            {t.about.years}
          </span>
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-white font-bold leading-tight drop-shadow-xl">
            {t.about.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-display italic mb-8 text-primary-200 font-normal drop-shadow-lg">
            {t.about.subtitle}
          </h3>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto font-sans drop-shadow-md">
            {t.about.description}
          </p>
        </motion.div>

        {/* Commitment Section - Enhanced */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 mb-16"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
        >
          <div className="group glass-card p-10 rounded-2xl backdrop-blur-md bg-black/50 border-2 border-white/10 hover:bg-black/60 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury-hover">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Star className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary group-hover:text-primary-light transition-colors duration-300">
                {t.about.commitment.title}
              </h3>
            </div>
            <ul className="space-y-5">
              {t.about.commitment.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 group/item"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300" />
                  </div>
                  <span className="text-white/90 text-base leading-relaxed group-hover/item:text-white transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group glass-card p-10 rounded-2xl backdrop-blur-md bg-black/50 border-2 border-white/10 hover:bg-black/60 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-luxury-hover">
            {/* Icon Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Award className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary group-hover:text-primary-light transition-colors duration-300">
                {t.about.expertise.title}
              </h3>
            </div>
            <ul className="space-y-5">
              {t.about.expertise.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-4 group/item"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-125 transition-transform duration-300" />
                  </div>
                  <span className="text-white/90 text-base leading-relaxed group-hover/item:text-white transition-colors duration-300">
                    {item}
                  </span>
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

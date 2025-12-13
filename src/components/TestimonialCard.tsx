import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialCard = ({ name, role, content, rating, image }: TestimonialCardProps) => {
  // Extract initials from name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      className="glass-card-premium p-8 h-full flex flex-col transition-all duration-500 shadow-luxury hover:shadow-luxury-hover border-2 border-primary/10 hover:border-primary/20 rounded-2xl relative overflow-hidden group"
    >
      {/* Quote Icon - More Prominent */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <svg className="w-20 h-20 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Gold glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px hsl(45 93% 47% / 0.08)' }} />

      {/* Stars - Larger and more prominent */}
      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-6 w-6 fill-primary text-primary drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Content - Better typography */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow mb-8 text-base relative z-10">
        <span className="text-primary text-2xl font-serif leading-none">"</span>
        <span className="italic">{content}</span>
        <span className="text-primary text-2xl font-serif leading-none">"</span>
      </p>

      {/* Author Info - With real photo */}
      <div className="flex items-center gap-4 pt-6 border-t border-primary/10 relative z-10">
        {/* Photo Avatar with fallback to initials - Lazy loaded */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 group-hover:ring-4 group-hover:ring-primary/50 transition-all duration-300">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 bg-gradient-gold flex items-center justify-center ${image ? 'hidden' : ''}`}>
            <span className="text-white font-display font-bold text-lg">{initials}</span>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-lg text-secondary dark:text-primary-foreground group-hover:text-primary transition-colors duration-300">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
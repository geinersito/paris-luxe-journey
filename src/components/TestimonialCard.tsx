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
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card-premium p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl rounded-2xl relative overflow-hidden"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <svg className="w-16 h-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow mb-6 text-base italic">
        "{content}"
      </p>

      {/* Author Info - Without photo */}
      <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
        {/* Initial Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-bold text-lg">{initials}</span>
        </div>
        <div>
          <h4 className="font-display font-semibold text-lg text-primary dark:text-primary-foreground">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
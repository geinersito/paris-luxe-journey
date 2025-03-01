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
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent" />
        </div>
        <div>
          <h4 className="font-display text-lg text-primary dark:text-primary-foreground">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <Star 
            key={i} 
            className="h-5 w-5 fill-secondary text-secondary" 
          />
        ))}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
        {content}
      </p>
      
      <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
    </motion.div>
  );
};

export default TestimonialCard;
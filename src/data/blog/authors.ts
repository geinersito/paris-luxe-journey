import { BlogAuthor } from '@/types/blog'

export const defaultAuthor: BlogAuthor = {
  name: 'Paris Luxe Journey Team',
  role: {
    en: 'Travel Experts',
    es: 'Expertos en Viajes',
    fr: 'Experts en Voyages',
    pt: 'Especialistas em Viagens'
  },
  avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop',
  bio: {
    en: 'Our team of experienced chauffeurs and travel experts share their insider knowledge of Paris and France.',
    es: 'Nuestro equipo de choferes experimentados y expertos en viajes comparten su conocimiento interno de París y Francia.',
    fr: 'Notre équipe de chauffeurs expérimentés et d\'experts en voyages partage leurs connaissances privilégiées de Paris et de la France.',
    pt: 'Nossa equipe de motoristas experientes e especialistas em viagens compartilha seu conhecimento privilegiado de Paris e França.'
  }
}

export const authors: Record<string, BlogAuthor> = {
  'team': defaultAuthor,
  'pierre-dubois': {
    name: 'Pierre Dubois',
    role: {
      en: 'Senior Chauffeur & Paris Expert',
      es: 'Chofer Senior y Experto en París',
      fr: 'Chauffeur Senior et Expert de Paris',
      pt: 'Motorista Sênior e Especialista em Paris'
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: {
      en: 'With over 15 years of experience as a private chauffeur in Paris, Pierre knows every corner of the city and its surroundings.',
      es: 'Con más de 15 años de experiencia como chofer privado en París, Pierre conoce cada rincón de la ciudad y sus alrededores.',
      fr: 'Avec plus de 15 ans d\'expérience en tant que chauffeur privé à Paris, Pierre connaît tous les recoins de la ville et de ses environs.',
      pt: 'Com mais de 15 anos de experiência como motorista particular em Paris, Pierre conhece cada canto da cidade e arredores.'
    }
  },
  'marie-laurent': {
    name: 'Marie Laurent',
    role: {
      en: 'Luxury Travel Consultant',
      es: 'Consultora de Viajes de Lujo',
      fr: 'Consultante en Voyages de Luxe',
      pt: 'Consultora de Viagens de Luxo'
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: {
      en: 'Marie specializes in creating unforgettable luxury travel experiences in Paris and throughout France.',
      es: 'Marie se especializa en crear experiencias de viaje de lujo inolvidables en París y en toda Francia.',
      fr: 'Marie se spécialise dans la création d\'expériences de voyage de luxe inoubliables à Paris et dans toute la France.',
      pt: 'Marie é especializada em criar experiências de viagem de luxo inesquecíveis em Paris e em toda a França.'
    }
  }
}

export const getAuthor = (authorId: string): BlogAuthor => {
  return authors[authorId] || defaultAuthor
}


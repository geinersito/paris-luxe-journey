import { CategoryMeta, BlogCategory } from '@/types/blog'

export const blogCategories: CategoryMeta[] = [
  {
    id: 'transport',
    slug: 'transport',
    name: {
      en: 'Transport',
      es: 'Transporte',
      fr: 'Transport',
      pt: 'Transporte'
    },
    description: {
      en: 'Everything about transportation in Paris - airports, taxis, VTC, metro, and more',
      es: 'Todo sobre transporte en París - aeropuertos, taxis, VTC, metro y más',
      fr: 'Tout sur les transports à Paris - aéroports, taxis, VTC, métro et plus',
      pt: 'Tudo sobre transporte em Paris - aeroportos, táxis, VTC, metrô e mais'
    },
    icon: 'Car',
    seo: {
      metaTitle: {
        en: 'Paris Transport Guide | Airport Transfers & City Transportation',
        es: 'Guía de Transporte en París | Traslados de Aeropuerto y Transporte Urbano',
        fr: 'Guide des Transports à Paris | Transferts Aéroport et Transport Urbain',
        pt: 'Guia de Transporte em Paris | Transfers de Aeroporto e Transporte Urbano'
      },
      metaDescription: {
        en: 'Complete guide to transportation in Paris including airport transfers, taxis, VTC, metro, and public transport options.',
        es: 'Guía completa de transporte en París incluyendo traslados de aeropuerto, taxis, VTC, metro y opciones de transporte público.',
        fr: 'Guide complet des transports à Paris incluant les transferts aéroport, taxis, VTC, métro et options de transport public.',
        pt: 'Guia completo de transporte em Paris incluindo transfers de aeroporto, táxis, VTC, metrô e opções de transporte público.'
      }
    }
  },
  {
    id: 'guides',
    slug: 'guides',
    name: {
      en: 'Travel Guides',
      es: 'Guías de Viaje',
      fr: 'Guides de Voyage',
      pt: 'Guias de Viagem'
    },
    description: {
      en: 'Complete travel guides for Paris - itineraries, attractions, and insider tips',
      es: 'Guías de viaje completas para París - itinerarios, atracciones y consejos internos',
      fr: 'Guides de voyage complets pour Paris - itinéraires, attractions et conseils d\'initiés',
      pt: 'Guias de viagem completos para Paris - itinerários, atrações e dicas privilegiadas'
    },
    icon: 'Map',
    seo: {
      metaTitle: {
        en: 'Paris Travel Guides | Itineraries & Attractions',
        es: 'Guías de Viaje a París | Itinerarios y Atracciones',
        fr: 'Guides de Voyage à Paris | Itinéraires et Attractions',
        pt: 'Guias de Viagem para Paris | Itinerários e Atrações'
      },
      metaDescription: {
        en: 'Expert travel guides for Paris with detailed itineraries, must-see attractions, and local recommendations.',
        es: 'Guías de viaje expertas para París con itinerarios detallados, atracciones imperdibles y recomendaciones locales.',
        fr: 'Guides de voyage experts pour Paris avec itinéraires détaillés, attractions incontournables et recommandations locales.',
        pt: 'Guias de viagem especializados para Paris com itinerários detalhados, atrações imperdíveis e recomendações locais.'
      }
    }
  },
  {
    id: 'tips',
    slug: 'tips',
    name: {
      en: 'Travel Tips',
      es: 'Consejos de Viaje',
      fr: 'Conseils de Voyage',
      pt: 'Dicas de Viagem'
    },
    description: {
      en: 'Practical tips for traveling in Paris - metro, money, safety, and local customs',
      es: 'Consejos prácticos para viajar en París - metro, dinero, seguridad y costumbres locales',
      fr: 'Conseils pratiques pour voyager à Paris - métro, argent, sécurité et coutumes locales',
      pt: 'Dicas práticas para viajar em Paris - metrô, dinheiro, segurança e costumes locais'
    },
    icon: 'Lightbulb',
    seo: {
      metaTitle: {
        en: 'Paris Travel Tips | Metro, Money & Safety Guide',
        es: 'Consejos de Viaje a París | Guía de Metro, Dinero y Seguridad',
        fr: 'Conseils de Voyage à Paris | Guide Métro, Argent et Sécurité',
        pt: 'Dicas de Viagem para Paris | Guia de Metrô, Dinheiro e Segurança'
      },
      metaDescription: {
        en: 'Essential travel tips for Paris including metro navigation, currency exchange, safety advice, and local customs.',
        es: 'Consejos de viaje esenciales para París incluyendo navegación del metro, cambio de moneda, consejos de seguridad y costumbres locales.',
        fr: 'Conseils de voyage essentiels pour Paris incluant navigation métro, change de devises, conseils de sécurité et coutumes locales.',
        pt: 'Dicas de viagem essenciais para Paris incluindo navegação no metrô, câmbio, conselhos de segurança e costumes locais.'
      }
    }
  },
  {
    id: 'culture',
    slug: 'culture',
    name: {
      en: 'Culture & Lifestyle',
      es: 'Cultura y Estilo de Vida',
      fr: 'Culture et Style de Vie',
      pt: 'Cultura e Estilo de Vida'
    },
    description: {
      en: 'French culture, language, restaurants, and Parisian lifestyle',
      es: 'Cultura francesa, idioma, restaurantes y estilo de vida parisino',
      fr: 'Culture française, langue, restaurants et style de vie parisien',
      pt: 'Cultura francesa, idioma, restaurantes e estilo de vida parisiense'
    },
    icon: 'Coffee',
    seo: {
      metaTitle: {
        en: 'Paris Culture & Lifestyle | French Language & Restaurants',
        es: 'Cultura y Estilo de Vida en París | Idioma Francés y Restaurantes',
        fr: 'Culture et Style de Vie à Paris | Langue Française et Restaurants',
        pt: 'Cultura e Estilo de Vida em Paris | Idioma Francês e Restaurantes'
      },
      metaDescription: {
        en: 'Discover French culture, learn essential phrases, find the best restaurants, and embrace the Parisian lifestyle.',
        es: 'Descubre la cultura francesa, aprende frases esenciales, encuentra los mejores restaurantes y abraza el estilo de vida parisino.',
        fr: 'Découvrez la culture française, apprenez les phrases essentielles, trouvez les meilleurs restaurants et adoptez le style de vie parisien.',
        pt: 'Descubra a cultura francesa, aprenda frases essenciais, encontre os melhores restaurantes e abrace o estilo de vida parisiense.'
      }
    }
  }
]

// Helper functions
export const isValidCategory = (cat: string): cat is BlogCategory => {
  return ['transport', 'guides', 'tips', 'culture'].includes(cat)
}

export const getCategoryBySlug = (slug: string): CategoryMeta | undefined => {
  return blogCategories.find(cat => cat.slug === slug)
}


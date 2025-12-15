import { BlogPostMeta } from "@/types/blog";

// Helper function to create author data
const createAuthor = (name: string, isPierre: boolean = true) => ({
  name,
  role: {
    en: isPierre
      ? "Senior Chauffeur & Transport Expert"
      : "Luxury Travel Consultant",
    es: isPierre
      ? "Chofer Senior y Experto en Transporte"
      : "Consultora de Viajes de Lujo",
    fr: isPierre
      ? "Chauffeur Senior et Expert en Transport"
      : "Consultante en Voyages de Luxe",
    pt: isPierre
      ? "Motorista Sênior e Especialista em Transporte"
      : "Consultora de Viagens de Luxo",
  },
  bio: {
    en: isPierre
      ? "With over 15 years of experience driving in Paris, Pierre knows every route and transport option in the city."
      : "Marie specializes in luxury travel planning and has helped thousands of clients navigate Paris transportation.",
    es: isPierre
      ? "Con más de 15 años de experiencia conduciendo en París, Pierre conoce cada ruta y opción de transporte en la ciudad."
      : "Marie se especializa en planificación de viajes de lujo y ha ayudado a miles de clientes a navegar el transporte en París.",
    fr: isPierre
      ? "Avec plus de 15 ans d'expérience de conduite à Paris, Pierre connaît chaque itinéraire et option de transport dans la ville."
      : "Marie est spécialisée dans la planification de voyages de luxe et a aidé des milliers de clients à naviguer dans les transports parisiens.",
    pt: isPierre
      ? "Com mais de 15 anos de experiência dirigindo em Paris, Pierre conhece cada rota e opção de transporte na cidade."
      : "Marie é especializada em planejamento de viagens de luxo e ajudou milhares de clientes a navegar no transporte de Paris.",
  },
  avatar: isPierre
    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
});

export const blogPosts: BlogPostMeta[] = [
  // TRANSPORT CATEGORY (3 posts)
  {
    id: "1",
    slug: "cdg-to-paris-transport-options",
    title: {
      en: "CDG to Paris: Complete Guide to All Transport Options",
      es: "CDG a París: Guía Completa de Todas las Opciones de Transporte",
      fr: "CDG à Paris : Guide Complet de Toutes les Options de Transport",
      pt: "CDG para Paris: Guia Completo de Todas as Opções de Transporte",
    },
    description: {
      en: "Compare all transportation options from Charles de Gaulle Airport to Paris including RER B, Roissybus, taxi, Uber, and VTC with prices and travel times.",
      es: "Compara todas las opciones de transporte desde el Aeropuerto Charles de Gaulle a París incluyendo RER B, Roissybus, taxi, Uber y VTC con precios y tiempos de viaje.",
      fr: "Comparez toutes les options de transport de l'aéroport Charles de Gaulle à Paris incluant RER B, Roissybus, taxi, Uber et VTC avec prix et temps de trajet.",
      pt: "Compare todas as opções de transporte do Aeroporto Charles de Gaulle para Paris incluindo RER B, Roissybus, táxi, Uber e VTC com preços e tempos de viagem.",
    },
    category: "transport",
    author: createAuthor("Pierre Dubois", true),
    publishedAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z",
    readingTime: 8,
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop",
      alt: {
        en: "Charles de Gaulle Airport terminal with transportation options",
        es: "Terminal del Aeropuerto Charles de Gaulle con opciones de transporte",
        fr: "Terminal de l'aéroport Charles de Gaulle avec options de transport",
        pt: "Terminal do Aeroporto Charles de Gaulle com opções de transporte",
      },
    },
    tags: [
      "cdg to paris",
      "airport transfer",
      "rer b",
      "vtc",
      "roissybus",
      "paris transport",
    ],
    seo: {
      metaTitle: {
        en: "CDG to Paris Transport Guide 2025 | All Options Compared",
        es: "Guía de Transporte CDG a París 2025 | Todas las Opciones Comparadas",
        fr: "Guide Transport CDG à Paris 2025 | Toutes les Options Comparées",
        pt: "Guia de Transporte CDG para Paris 2025 | Todas as Opções Comparadas",
      },
      metaDescription: {
        en: "Complete comparison of all transport options from CDG Airport to Paris: RER B, Roissybus, taxi, Uber, VTC. Prices, times, pros & cons for 2025.",
        es: "Comparación completa de todas las opciones de transporte desde el Aeropuerto CDG a París: RER B, Roissybus, taxi, Uber, VTC. Precios, tiempos, pros y contras para 2025.",
        fr: "Comparaison complète de toutes les options de transport de l'aéroport CDG à Paris : RER B, Roissybus, taxi, Uber, VTC. Prix, temps, avantages et inconvénients pour 2025.",
        pt: "Comparação completa de todas as opções de transporte do Aeroporto CDG para Paris: RER B, Roissybus, táxi, Uber, VTC. Preços, tempos, prós e contras para 2025.",
      },
      keywords: [
        "cdg to paris",
        "charles de gaulle airport",
        "rer b",
        "roissybus",
        "paris airport transfer",
        "vtc paris",
        "uber cdg",
        "taxi cdg",
      ],
    },
  },
  {
    id: "2",
    slug: "vtc-vs-taxi-vs-uber-paris",
    title: {
      en: "VTC vs Taxi vs Uber in Paris: What's the Difference?",
      es: "VTC vs Taxi vs Uber en París: ¿Cuál es la Diferencia?",
      fr: "VTC vs Taxi vs Uber à Paris : Quelle est la Différence ?",
      pt: "VTC vs Táxi vs Uber em Paris: Qual é a Diferença?",
    },
    description: {
      en: "Understand the legal differences between VTC, taxi, and Uber in Paris. Compare prices, regulations, and which option is best for tourists.",
      es: "Entiende las diferencias legales entre VTC, taxi y Uber en París. Compara precios, regulaciones y cuál opción es mejor para turistas.",
      fr: "Comprenez les différences légales entre VTC, taxi et Uber à Paris. Comparez les prix, réglementations et quelle option est la meilleure pour les touristes.",
      pt: "Entenda as diferenças legais entre VTC, táxi e Uber em Paris. Compare preços, regulamentações e qual opção é melhor para turistas.",
    },
    category: "transport",
    author: createAuthor("Pierre Dubois", true),
    publishedAt: "2025-01-08T09:00:00Z",
    readingTime: 7,
    featured: false,
    image: {
      url: "/images/blog/vtc-taxi-uber-comparison.jpg",
      alt: {
        en: "Comparison of VTC, taxi and Uber vehicles in Paris",
        es: "Comparación de vehículos VTC, taxi y Uber en París",
        fr: "Comparaison des véhicules VTC, taxi et Uber à Paris",
        pt: "Comparação de veículos VTC, táxi e Uber em Paris",
      },
    },
    tags: [
      "vtc vs taxi",
      "uber paris",
      "paris transport",
      "vtc paris",
      "taxi regulations",
    ],
    seo: {
      metaTitle: {
        en: "VTC vs Taxi vs Uber Paris 2025 | Complete Comparison Guide",
        es: "VTC vs Taxi vs Uber París 2025 | Guía de Comparación Completa",
        fr: "VTC vs Taxi vs Uber Paris 2025 | Guide de Comparaison Complet",
        pt: "VTC vs Táxi vs Uber Paris 2025 | Guia de Comparação Completo",
      },
      metaDescription: {
        en: "Legal differences, pricing, and pros/cons of VTC, taxi, and Uber in Paris. Which is best for tourists? Complete 2025 guide.",
        es: "Diferencias legales, precios y pros/contras de VTC, taxi y Uber en París. ¿Cuál es mejor para turistas? Guía completa 2025.",
        fr: "Différences légales, tarifs et avantages/inconvénients des VTC, taxis et Uber à Paris. Lequel est le meilleur pour les touristes ? Guide complet 2025.",
        pt: "Diferenças legais, preços e prós/contras de VTC, táxi e Uber em Paris. Qual é melhor para turistas? Guia completo 2025.",
      },
      keywords: [
        "vtc vs taxi",
        "uber paris",
        "vtc paris",
        "taxi paris",
        "paris transport comparison",
        "licensed vtc",
      ],
    },
  },
  {
    id: "3",
    slug: "paris-airport-transfer-cost-guide",
    title: {
      en: "Paris Airport Transfer Cost Guide 2025: Real Prices Breakdown",
      es: "Guía de Costos de Traslado de Aeropuerto en París 2025: Desglose de Precios Reales",
      fr: "Guide des Coûts de Transfert Aéroport Paris 2025 : Détail des Prix Réels",
      pt: "Guia de Custos de Transfer de Aeroporto em Paris 2025: Detalhamento de Preços Reais",
    },
    description: {
      en: "Complete breakdown of airport transfer costs from CDG, Orly, and Beauvais to Paris. Hidden fees, factors affecting prices, and how to get the best deal.",
      es: "Desglose completo de costos de traslado de aeropuerto desde CDG, Orly y Beauvais a París. Tarifas ocultas, factores que afectan precios y cómo obtener la mejor oferta.",
      fr: "Détail complet des coûts de transfert aéroport depuis CDG, Orly et Beauvais vers Paris. Frais cachés, facteurs affectant les prix et comment obtenir la meilleure offre.",
      pt: "Detalhamento completo de custos de transfer de aeroporto de CDG, Orly e Beauvais para Paris. Taxas ocultas, fatores que afetam preços e como conseguir a melhor oferta.",
    },
    category: "transport",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-05T11:00:00Z",
    readingTime: 6,
    featured: false,
    image: {
      url: "/images/blog/airport-transfer-cost.jpg",
      alt: {
        en: "Calculator and money showing airport transfer costs",
        es: "Calculadora y dinero mostrando costos de traslado de aeropuerto",
        fr: "Calculatrice et argent montrant les coûts de transfert aéroport",
        pt: "Calculadora e dinheiro mostrando custos de transfer de aeroporto",
      },
    },
    tags: [
      "airport transfer cost",
      "cdg prices",
      "orly transfer",
      "beauvais airport",
      "paris transfer fees",
    ],
    seo: {
      metaTitle: {
        en: "Paris Airport Transfer Cost 2025 | CDG, Orly, Beauvais Prices",
        es: "Costo de Traslado de Aeropuerto París 2025 | Precios CDG, Orly, Beauvais",
        fr: "Coût Transfert Aéroport Paris 2025 | Prix CDG, Orly, Beauvais",
        pt: "Custo de Transfer de Aeroporto Paris 2025 | Preços CDG, Orly, Beauvais",
      },
      metaDescription: {
        en: "Real prices for airport transfers from CDG, Orly, and Beauvais to Paris in 2025. Hidden fees, price factors, and money-saving tips.",
        es: "Precios reales de traslados de aeropuerto desde CDG, Orly y Beauvais a París en 2025. Tarifas ocultas, factores de precio y consejos para ahorrar.",
        fr: "Prix réels des transferts aéroport depuis CDG, Orly et Beauvais vers Paris en 2025. Frais cachés, facteurs de prix et conseils d'économie.",
        pt: "Preços reais de transfers de aeroporto de CDG, Orly e Beauvais para Paris em 2025. Taxas ocultas, fatores de preço e dicas de economia.",
      },
      keywords: [
        "airport transfer cost",
        "cdg to paris price",
        "orly transfer cost",
        "beauvais airport transfer",
        "paris transfer fees",
        "airport taxi price",
      ],
    },
  },

  // GUIDES CATEGORY (2 posts)
  {
    id: "4",
    slug: "complete-paris-guide-first-time",
    title: {
      en: "Complete Paris Guide for First-Time Visitors 2025",
      es: "Guía Completa de París para Visitantes Primerizos 2025",
      fr: "Guide Complet de Paris pour les Visiteurs Débutants 2025",
      pt: "Guia Completo de Paris para Visitantes de Primeira Viagem 2025",
    },
    description: {
      en: "Everything you need to know for your first trip to Paris: visa requirements, best time to visit, budget planning, where to stay, transportation, and must-see attractions.",
      es: "Todo lo que necesitas saber para tu primer viaje a París: requisitos de visa, mejor época para visitar, planificación de presupuesto, dónde hospedarse, transporte y atracciones imperdibles.",
      fr: "Tout ce que vous devez savoir pour votre premier voyage à Paris : exigences de visa, meilleure période pour visiter, planification budgétaire, où séjourner, transport et attractions incontournables.",
      pt: "Tudo que você precisa saber para sua primeira viagem a Paris: requisitos de visto, melhor época para visitar, planejamento de orçamento, onde ficar, transporte e atrações imperdíveis.",
    },
    category: "guides",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-12T08:00:00Z",
    readingTime: 15,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=630&fit=crop",
      alt: {
        en: "Eiffel Tower and Paris cityscape for first-time visitors",
        es: "Torre Eiffel y paisaje urbano de París para visitantes primerizos",
        fr: "Tour Eiffel et paysage urbain de Paris pour les visiteurs débutants",
        pt: "Torre Eiffel e paisagem urbana de Paris para visitantes de primeira viagem",
      },
    },
    tags: [
      "paris guide",
      "first time paris",
      "visit paris",
      "paris itinerary",
      "paris attractions",
      "paris travel tips",
    ],
    seo: {
      metaTitle: {
        en: "Complete Paris Guide 2025 | First-Time Visitor's Essential Guide",
        es: "Guía Completa de París 2025 | Guía Esencial para Visitantes Primerizos",
        fr: "Guide Complet de Paris 2025 | Guide Essentiel pour Visiteurs Débutants",
        pt: "Guia Completo de Paris 2025 | Guia Essencial para Visitantes de Primeira Viagem",
      },
      metaDescription: {
        en: "Ultimate Paris guide for first-time visitors: visa, best time to visit, budget, accommodation, transport, attractions. Everything you need for 2025.",
        es: "Guía definitiva de París para visitantes primerizos: visa, mejor época para visitar, presupuesto, alojamiento, transporte, atracciones. Todo lo que necesitas para 2025.",
        fr: "Guide ultime de Paris pour visiteurs débutants : visa, meilleure période, budget, hébergement, transport, attractions. Tout ce dont vous avez besoin pour 2025.",
        pt: "Guia definitivo de Paris para visitantes de primeira viagem: visto, melhor época para visitar, orçamento, acomodação, transporte, atrações. Tudo que você precisa para 2025.",
      },
      keywords: [
        "paris guide",
        "first time paris",
        "visit paris",
        "paris travel guide",
        "paris attractions",
        "paris budget",
        "paris accommodation",
      ],
    },
  },
  {
    id: "5",
    slug: "perfect-3-day-paris-itinerary",
    title: {
      en: "Perfect 3-Day Paris Itinerary: Day-by-Day Guide",
      es: "Itinerario Perfecto de 3 Días en París: Guía Día a Día",
      fr: "Itinéraire Parfait de 3 Jours à Paris : Guide Jour par Jour",
      pt: "Itinerário Perfeito de 3 Dias em Paris: Guia Dia a Dia",
    },
    description: {
      en: "Maximize your 3 days in Paris with this detailed itinerary. Day 1: Classic Paris, Day 2: Versailles, Day 3: Montmartre & Hidden Gems. Includes maps and timing.",
      es: "Maximiza tus 3 días en París con este itinerario detallado. Día 1: París Clásico, Día 2: Versalles, Día 3: Montmartre y Joyas Ocultas. Incluye mapas y horarios.",
      fr: "Maximisez vos 3 jours à Paris avec cet itinéraire détaillé. Jour 1 : Paris Classique, Jour 2 : Versailles, Jour 3 : Montmartre et Trésors Cachés. Inclut cartes et horaires.",
      pt: "Maximize seus 3 dias em Paris com este itinerário detalhado. Dia 1: Paris Clássico, Dia 2: Versalhes, Dia 3: Montmartre e Joias Escondidas. Inclui mapas e horários.",
    },
    category: "guides",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-09T10:00:00Z",
    readingTime: 12,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=630&fit=crop",
      alt: {
        en: "Paris landmarks and itinerary planning map",
        es: "Monumentos de París y mapa de planificación de itinerario",
        fr: "Monuments de Paris et carte de planification d'itinéraire",
        pt: "Monumentos de Paris e mapa de planejamento de itinerário",
      },
    },
    tags: [
      "paris itinerary",
      "3 days paris",
      "paris day trip",
      "versailles",
      "montmartre",
      "paris planning",
    ],
    seo: {
      metaTitle: {
        en: "Perfect 3-Day Paris Itinerary 2025 | Complete Day-by-Day Guide",
        es: "Itinerario Perfecto de 3 Días en París 2025 | Guía Completa Día a Día",
        fr: "Itinéraire Parfait de 3 Jours à Paris 2025 | Guide Complet Jour par Jour",
        pt: "Itinerário Perfeito de 3 Dias em Paris 2025 | Guia Completo Dia a Dia",
      },
      metaDescription: {
        en: "Detailed 3-day Paris itinerary with maps and timing. Day 1: Eiffel Tower & Louvre, Day 2: Versailles, Day 3: Montmartre. Perfect for first-time visitors.",
        es: "Itinerario detallado de 3 días en París con mapas y horarios. Día 1: Torre Eiffel y Louvre, Día 2: Versalles, Día 3: Montmartre. Perfecto para visitantes primerizos.",
        fr: "Itinéraire détaillé de 3 jours à Paris avec cartes et horaires. Jour 1 : Tour Eiffel et Louvre, Jour 2 : Versailles, Jour 3 : Montmartre. Parfait pour les visiteurs débutants.",
        pt: "Itinerário detalhado de 3 dias em Paris com mapas e horários. Dia 1: Torre Eiffel e Louvre, Dia 2: Versalhes, Dia 3: Montmartre. Perfeito para visitantes de primeira viagem.",
      },
      keywords: [
        "paris itinerary",
        "3 days paris",
        "paris day trip",
        "versailles day trip",
        "montmartre guide",
        "paris planning",
      ],
    },
  },

  // TIPS CATEGORY (3 posts)
  {
    id: "6",
    slug: "10-tourist-mistakes-paris",
    title: {
      en: "10 Tourist Mistakes to Avoid in Paris (2025 Guide)",
      es: "10 Errores de Turista a Evitar en París (Guía 2025)",
      fr: "10 Erreurs de Touriste à Éviter à Paris (Guide 2025)",
      pt: "10 Erros de Turista a Evitar em Paris (Guia 2025)",
    },
    description: {
      en: "Don't make these common mistakes! Learn what to avoid in Paris: metro without validating, currency exchange at airport, tourist traps, and more.",
      es: "¡No cometas estos errores comunes! Aprende qué evitar en París: metro sin validar, cambio de moneda en aeropuerto, trampas turísticas y más.",
      fr: "Ne faites pas ces erreurs courantes ! Apprenez quoi éviter à Paris : métro sans valider, change de devises à l'aéroport, pièges à touristes et plus.",
      pt: "Não cometa esses erros comuns! Aprenda o que evitar em Paris: metrô sem validar, câmbio no aeroporto, armadilhas turísticas e mais.",
    },
    category: "tips",
    author: createAuthor("Pierre Dubois", true),
    publishedAt: "2025-01-07T12:00:00Z",
    readingTime: 9,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&h=630&fit=crop",
      alt: {
        en: "Tourist making common mistakes in Paris",
        es: "Turista cometiendo errores comunes en París",
        fr: "Touriste faisant des erreurs courantes à Paris",
        pt: "Turista cometendo erros comuns em Paris",
      },
    },
    tags: [
      "paris mistakes",
      "tourist traps",
      "paris tips",
      "avoid scams",
      "paris metro",
      "travel mistakes",
    ],
    seo: {
      metaTitle: {
        en: "10 Tourist Mistakes to Avoid in Paris 2025 | Don't Get Scammed",
        es: "10 Errores de Turista a Evitar en París 2025 | No Te Estafen",
        fr: "10 Erreurs de Touriste à Éviter à Paris 2025 | Ne Vous Faites Pas Arnaquer",
        pt: "10 Erros de Turista a Evitar em Paris 2025 | Não Seja Enganado",
      },
      metaDescription: {
        en: "Avoid these 10 common tourist mistakes in Paris: metro validation, currency exchange, taxi scams, tourist traps. Save money and time in 2025.",
        es: "Evita estos 10 errores comunes de turista en París: validación del metro, cambio de moneda, estafas de taxi, trampas turísticas. Ahorra dinero y tiempo en 2025.",
        fr: "Évitez ces 10 erreurs courantes de touriste à Paris : validation métro, change de devises, arnaques taxi, pièges à touristes. Économisez argent et temps en 2025.",
        pt: "Evite esses 10 erros comuns de turista em Paris: validação do metrô, câmbio, golpes de táxi, armadilhas turísticas. Economize dinheiro e tempo em 2025.",
      },
      keywords: [
        "paris mistakes",
        "tourist traps paris",
        "paris scams",
        "avoid mistakes paris",
        "paris metro tips",
        "paris travel mistakes",
      ],
    },
  },
  {
    id: "7",
    slug: "how-to-use-paris-metro",
    title: {
      en: "How to Use the Paris Metro: Complete Guide for Tourists",
      es: "Cómo Usar el Metro de París: Guía Completa para Turistas",
      fr: "Comment Utiliser le Métro de Paris : Guide Complet pour Touristes",
      pt: "Como Usar o Metrô de Paris: Guia Completo para Turistas",
    },
    description: {
      en: "Master the Paris Metro system: types of tickets, how to read the map, useful apps, schedules, safety tips, and common mistakes to avoid.",
      es: "Domina el sistema del Metro de París: tipos de boletos, cómo leer el mapa, apps útiles, horarios, consejos de seguridad y errores comunes a evitar.",
      fr: "Maîtrisez le système du Métro de Paris : types de tickets, comment lire la carte, applications utiles, horaires, conseils de sécurité et erreurs courantes à éviter.",
      pt: "Domine o sistema do Metrô de Paris: tipos de bilhetes, como ler o mapa, apps úteis, horários, dicas de segurança e erros comuns a evitar.",
    },
    category: "tips",
    author: createAuthor("Pierre Dubois", true),
    publishedAt: "2025-01-06T14:00:00Z",
    readingTime: 10,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=630&fit=crop",
      alt: {
        en: "Paris Metro station and map guide",
        es: "Estación del Metro de París y guía de mapa",
        fr: "Station de Métro de Paris et guide de carte",
        pt: "Estação do Metrô de Paris e guia de mapa",
      },
    },
    tags: [
      "paris metro",
      "metro guide",
      "paris transport",
      "metro tickets",
      "paris navigation",
      "public transport",
    ],
    seo: {
      metaTitle: {
        en: "Paris Metro Guide 2025 | How to Use Metro, Tickets & Maps",
        es: "Guía del Metro de París 2025 | Cómo Usar Metro, Boletos y Mapas",
        fr: "Guide du Métro de Paris 2025 | Comment Utiliser Métro, Tickets et Cartes",
        pt: "Guia do Metrô de Paris 2025 | Como Usar Metrô, Bilhetes e Mapas",
      },
      metaDescription: {
        en: "Complete Paris Metro guide: ticket types, reading maps, best apps, schedules, safety tips. Navigate Paris like a local in 2025.",
        es: "Guía completa del Metro de París: tipos de boletos, lectura de mapas, mejores apps, horarios, consejos de seguridad. Navega París como un local en 2025.",
        fr: "Guide complet du Métro de Paris : types de tickets, lecture de cartes, meilleures applications, horaires, conseils de sécurité. Naviguez Paris comme un local en 2025.",
        pt: "Guia completo do Metrô de Paris: tipos de bilhetes, leitura de mapas, melhores apps, horários, dicas de segurança. Navegue em Paris como um local em 2025.",
      },
      keywords: [
        "paris metro",
        "metro guide",
        "paris metro tickets",
        "metro map paris",
        "paris public transport",
        "metro navigation",
      ],
    },
  },
  {
    id: "8",
    slug: "best-currency-exchange-paris",
    title: {
      en: "Best Currency Exchange in Paris: Where to Change Money",
      es: "Mejor Cambio de Moneda en París: Dónde Cambiar Dinero",
      fr: "Meilleur Change de Devises à Paris : Où Changer de l'Argent",
      pt: "Melhor Câmbio em Paris: Onde Trocar Dinheiro",
    },
    description: {
      en: "Find the best currency exchange rates in Paris. Recommended exchange houses, ATMs to avoid, credit cards without fees, and money-saving tips.",
      es: "Encuentra las mejores tasas de cambio de moneda en París. Casas de cambio recomendadas, cajeros a evitar, tarjetas de crédito sin comisiones y consejos para ahorrar.",
      fr: "Trouvez les meilleurs taux de change de devises à Paris. Bureaux de change recommandés, distributeurs à éviter, cartes de crédit sans frais et conseils d'économie.",
      pt: "Encontre as melhores taxas de câmbio em Paris. Casas de câmbio recomendadas, caixas eletrônicos a evitar, cartões de crédito sem taxas e dicas de economia.",
    },
    category: "tips",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-04T11:00:00Z",
    readingTime: 8,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&h=630&fit=crop",
      alt: {
        en: "Currency exchange and euros in Paris",
        es: "Cambio de moneda y euros en París",
        fr: "Change de devises et euros à Paris",
        pt: "Câmbio e euros em Paris",
      },
    },
    tags: [
      "currency exchange",
      "change euros",
      "paris money",
      "atm paris",
      "credit cards",
      "exchange rates",
    ],
    seo: {
      metaTitle: {
        en: "Best Currency Exchange Paris 2025 | Where to Change Money",
        es: "Mejor Cambio de Moneda París 2025 | Dónde Cambiar Dinero",
        fr: "Meilleur Change de Devises Paris 2025 | Où Changer de l'Argent",
        pt: "Melhor Câmbio Paris 2025 | Onde Trocar Dinheiro",
      },
      metaDescription: {
        en: "Best places to exchange currency in Paris 2025: recommended exchange houses, ATMs to avoid, no-fee credit cards, and money-saving tips.",
        es: "Mejores lugares para cambiar moneda en París 2025: casas de cambio recomendadas, cajeros a evitar, tarjetas sin comisiones y consejos para ahorrar.",
        fr: "Meilleurs endroits pour changer des devises à Paris 2025 : bureaux de change recommandés, distributeurs à éviter, cartes sans frais et conseils d'économie.",
        pt: "Melhores lugares para trocar dinheiro em Paris 2025: casas de câmbio recomendadas, caixas eletrônicos a evitar, cartões sem taxas e dicas de economia.",
      },
      keywords: [
        "currency exchange paris",
        "change euros",
        "paris atm",
        "exchange rates paris",
        "no fee credit cards",
        "money exchange",
      ],
    },
  },

  // CULTURE CATEGORY (2 posts)
  {
    id: "9",
    slug: "essential-french-phrases-tourists",
    title: {
      en: "Essential French Phrases for Tourists: Speak Like a Local",
      es: "Frases Francesas Esenciales para Turistas: Habla Como un Local",
      fr: "Phrases Françaises Essentielles pour Touristes : Parlez Comme un Local",
      pt: "Frases Francesas Essenciais para Turistas: Fale Como um Local",
    },
    description: {
      en: "Learn essential French phrases for your Paris trip: greetings, restaurant vocabulary, shopping, asking for help, and important cultural differences.",
      es: "Aprende frases francesas esenciales para tu viaje a París: saludos, vocabulario de restaurante, compras, pedir ayuda y diferencias culturales importantes.",
      fr: "Apprenez les phrases françaises essentielles pour votre voyage à Paris : salutations, vocabulaire de restaurant, achats, demander de l'aide et différences culturelles importantes.",
      pt: "Aprenda frases francesas essenciais para sua viagem a Paris: saudações, vocabulário de restaurante, compras, pedir ajuda e diferenças culturais importantes.",
    },
    category: "culture",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-03T09:00:00Z",
    readingTime: 11,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&h=630&fit=crop",
      alt: {
        en: "French language learning and conversation in Paris",
        es: "Aprendizaje del idioma francés y conversación en París",
        fr: "Apprentissage de la langue française et conversation à Paris",
        pt: "Aprendizado do idioma francês e conversação em Paris",
      },
    },
    tags: [
      "french phrases",
      "basic french",
      "learn french",
      "paris language",
      "french culture",
      "tourist french",
    ],
    seo: {
      metaTitle: {
        en: "Essential French Phrases for Tourists 2025 | Speak Like a Local",
        es: "Frases Francesas Esenciales para Turistas 2025 | Habla Como un Local",
        fr: "Phrases Françaises Essentielles pour Touristes 2025 | Parlez Comme un Local",
        pt: "Frases Francesas Essenciais para Turistas 2025 | Fale Como um Local",
      },
      metaDescription: {
        en: "Master essential French phrases for Paris: greetings, restaurant, shopping, asking for help. Cultural tips and pronunciation guide for tourists.",
        es: "Domina frases francesas esenciales para París: saludos, restaurante, compras, pedir ayuda. Consejos culturales y guía de pronunciación para turistas.",
        fr: "Maîtrisez les phrases françaises essentielles pour Paris : salutations, restaurant, achats, demander de l'aide. Conseils culturels et guide de prononciation pour touristes.",
        pt: "Domine frases francesas essenciais para Paris: saudações, restaurante, compras, pedir ajuda. Dicas culturais e guia de pronúncia para turistas.",
      },
      keywords: [
        "french phrases",
        "basic french",
        "learn french",
        "french for tourists",
        "paris language",
        "french pronunciation",
      ],
    },
  },
  {
    id: "10",
    slug: "best-latin-restaurants-paris",
    title: {
      en: "Best Latin American Restaurants in Paris: Complete Guide",
      es: "Mejores Restaurantes Latinoamericanos en París: Guía Completa",
      fr: "Meilleurs Restaurants Latino-Américains à Paris : Guide Complet",
      pt: "Melhores Restaurantes Latino-Americanos em Paris: Guia Completo",
    },
    description: {
      en: "Discover the best Latin American restaurants in Paris: top Mexican, Peruvian, Argentine, and Brazilian spots. Authentic flavors, locations, and price ranges.",
      es: "Descubre los mejores restaurantes latinoamericanos en París: los mejores lugares mexicanos, peruanos, argentinos y brasileños. Sabores auténticos, ubicaciones y rangos de precios.",
      fr: "Découvrez les meilleurs restaurants latino-américains à Paris : les meilleurs endroits mexicains, péruviens, argentins et brésiliens. Saveurs authentiques, emplacements et gammes de prix.",
      pt: "Descubra os melhores restaurantes latino-americanos em Paris: os melhores lugares mexicanos, peruanos, argentinos e brasileiros. Sabores autênticos, localizações e faixas de preço.",
    },
    category: "culture",
    author: createAuthor("Marie Laurent", false),
    publishedAt: "2025-01-02T10:00:00Z",
    readingTime: 9,
    featured: false,
    image: {
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop",
      alt: {
        en: "Latin American food and restaurants in Paris",
        es: "Comida latinoamericana y restaurantes en París",
        fr: "Cuisine latino-américaine et restaurants à Paris",
        pt: "Comida latino-americana e restaurantes em Paris",
      },
    },
    tags: [
      "latin restaurants",
      "mexican paris",
      "peruvian food",
      "argentine restaurants",
      "brazilian food",
      "paris dining",
    ],
    seo: {
      metaTitle: {
        en: "Best Latin American Restaurants Paris 2025 | Mexican, Peruvian & More",
        es: "Mejores Restaurantes Latinoamericanos París 2025 | Mexicanos, Peruanos y Más",
        fr: "Meilleurs Restaurants Latino-Américains Paris 2025 | Mexicains, Péruviens et Plus",
        pt: "Melhores Restaurantes Latino-Americanos Paris 2025 | Mexicanos, Peruanos e Mais",
      },
      metaDescription: {
        en: "Top Latin American restaurants in Paris 2025: authentic Mexican, Peruvian, Argentine, Brazilian cuisine. Locations, prices, and reviews.",
        es: "Los mejores restaurantes latinoamericanos en París 2025: auténtica cocina mexicana, peruana, argentina, brasileña. Ubicaciones, precios y reseñas.",
        fr: "Les meilleurs restaurants latino-américains à Paris 2025 : cuisine mexicaine, péruvienne, argentine, brésilienne authentique. Emplacements, prix et avis.",
        pt: "Os melhores restaurantes latino-americanos em Paris 2025: autêntica cozinha mexicana, peruana, argentina, brasileira. Localizações, preços e avaliações.",
      },
      keywords: [
        "latin restaurants paris",
        "mexican restaurant paris",
        "peruvian food paris",
        "argentine restaurant",
        "brazilian food",
        "latin american cuisine",
      ],
    },
  },
];

// Helper functions
export const getPostBySlug = (slug: string): BlogPostMeta | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPostMeta[] => {
  return blogPosts.filter((post) => post.category === category);
};

export const getFeaturedPost = (): BlogPostMeta | undefined => {
  return blogPosts.find((post) => post.featured);
};

export const getAllPosts = (): BlogPostMeta[] => {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
};

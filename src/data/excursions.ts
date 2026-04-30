import { ExcursionType, DurationType } from "@/types/excursions";

export interface Excursion {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  durationType: DurationType;
  type: ExcursionType;
  price: number;
  link: string;
  highlights: string[];
  tours: {
    id: string;
    name: string;
    duration: string;
    price: number;
    includes: string[];
  }[];
}

export const excursions: Excursion[] = [
  {
    id: "loire-valley",
    title: "Loire Valley Castles",
    description:
      "Explore the fairytale châteaux of the Loire Valley on a private day trip from Paris with your dedicated chauffeur.",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
    duration: "10-12h",
    durationType: "full-day",
    type: "luxury",
    price: 490,
    link: "/excursions/loire-valley",
    highlights: [
      "Château de Chambord — Renaissance masterpiece",
      "Château de Chenonceau — spanning the River Cher",
      "Scenic Loire Valley countryside",
      "Flexible itinerary with suggested stops",
    ],
    tours: [
      {
        id: "loire-classic",
        name: "Private Day Trip — Loire Valley",
        duration: "10 hours",
        price: 490,
        includes: [
          "Private chauffeur transport",
          "Flexible itinerary",
          "Waiting time included",
          "Tickets and meals not included",
        ],
      },
      {
        id: "loire-helicopter",
        name: "Loire Valley Premium Day",
        duration: "8 hours",
        price: 2900,
        includes: [
          "Partner helicopter transfer",
          "Suggested château itinerary",
          "Champagne welcome",
          "Michelin-star lunch — bookable on request",
        ],
      },
    ],
  },
  {
    id: "champagne",
    title: "Champagne Region",
    description:
      "Discover the prestigious Champagne houses of Épernay and Reims on a private chauffeured day trip from Paris.",
    image:
      "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=1200&q=80",
    duration: "8h",
    durationType: "full-day",
    type: "luxury",
    price: 420,
    link: "/excursions/champagne",
    highlights: [
      "Avenue de Champagne, Épernay",
      "Grande Maisons — Moët, Taittinger, Ruinart",
      "UNESCO-listed Champagne cellars",
      "Rolling hillside vineyards of Côte des Blancs",
    ],
    tours: [
      {
        id: "champagne-classic",
        name: "Private Day Trip — Champagne",
        duration: "8 hours",
        price: 420,
        includes: [
          "Private chauffeur transport",
          "Suggested house visits",
          "Flexible schedule",
          "Meals not included",
        ],
      },
      {
        id: "champagne-private",
        name: "Champagne Premium Day",
        duration: "10 hours",
        price: 950,
        includes: [
          "Private chauffeur, full day",
          "Suggested private house visits",
          "Rare vintage tastings — on request",
          "Michelin-star lunch — bookable on request",
        ],
      },
    ],
  },
  {
    id: "versailles-palace",
    title: "Palace of Versailles",
    description:
      "Discover the grandeur of the Palace of Versailles on a private day trip from Paris with your dedicated chauffeur.",
    image:
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=1200&q=80",
    duration: "8h",
    durationType: "full-day",
    type: "luxury",
    price: 590,
    link: "/excursions/versailles",
    highlights: [
      "Hall of Mirrors and Royal Apartments",
      "Marie Antoinette's Estate",
      "Grand Gardens and Grand Canal",
      "Flexible itinerary at your pace",
      "Door-to-door private transport",
    ],
    tours: [
      {
        id: "versailles-classic",
        name: "Private Day Trip — Versailles",
        duration: "8 hours",
        price: 590,
        includes: [
          "Private chauffeur transport",
          "Flexible itinerary",
          "Waiting time included",
          "Tickets and meals not included",
        ],
      },
      {
        id: "versailles-exclusive",
        name: "Versailles Premium Day",
        duration: "10 hours",
        price: 1900,
        includes: [
          "Private chauffeur, full day",
          "Flexible schedule",
          "Dinner reservation assistance",
          "Tickets and guides not included",
        ],
      },
    ],
  },
  {
    id: "giverny-honfleur",
    title: "Giverny & Honfleur",
    description:
      "Visit Monet's iconic gardens in Giverny and the charming port of Honfleur on a private day trip with your chauffeur.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
    duration: "10h",
    durationType: "full-day",
    type: "luxury",
    price: 680,
    link: "/excursions/giverny-honfleur",
    highlights: [
      "Monet's house and water lily garden, Giverny",
      "Honfleur old harbour and Vieux Bassin",
      "Normandy countryside",
      "Flexible stops at your request",
    ],
    tours: [
      {
        id: "giverny-classic",
        name: "Private Day Trip — Giverny & Honfleur",
        duration: "10 hours",
        price: 680,
        includes: [
          "Private chauffeur transport",
          "Flexible itinerary",
          "Waiting time included",
          "Tickets and meals not included",
        ],
      },
      {
        id: "giverny-art",
        name: "Giverny & Honfleur Premium Day",
        duration: "12 hours",
        price: 1200,
        includes: [
          "Private chauffeur, full day",
          "Painting session — bookable on request",
          "Museum visit — bookable on request",
          "Michelin-star lunch — bookable on request",
        ],
      },
    ],
  },
];

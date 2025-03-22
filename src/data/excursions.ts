import { ExcursionType, DurationType } from '@/types/excursions';

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
    description: "Discover the magnificent Renaissance châteaux of the Loire Valley with private access",
    image: "/images/loire-valley.jpg",
    duration: "10-12h",
    durationType: "full-day",
    type: "luxury",
    price: 490,
    link: "/excursions/loire-valley",
    highlights: [
      "Visit to Château de Chambord",
      "Château de Chenonceau exploration",
      "Wine tasting at a local vineyard",
      "Gourmet lunch at a historic location"
    ],
    tours: [
      {
        id: "loire-classic",
        name: "Classic Loire Valley Tour",
        duration: "10 hours",
        price: 490,
        includes: ["Castle entries", "Expert guide", "Luxury transport", "Lunch"]
      },
      {
        id: "loire-helicopter",
        name: "Loire Valley by Helicopter",
        duration: "8 hours",
        price: 2900,
        includes: ["Helicopter flight", "VIP castle access", "Champagne tasting", "Michelin-star lunch"]
      }
    ]
  },
  {
    id: "champagne",
    title: "Champagne Region",
    description: "Experience the finest champagne houses with exclusive tastings and cellar tours",
    image: "/images/champagne.jpg",
    duration: "8h",
    durationType: "full-day",
    type: "luxury",
    price: 420,
    link: "/excursions/champagne",
    highlights: [
      "Visit to prestigious champagne houses",
      "Private cellar tours",
      "Multiple champagne tastings",
      "Gourmet lunch in Épernay"
    ],
    tours: [
      {
        id: "champagne-classic",
        name: "Champagne Excellence Tour",
        duration: "8 hours",
        price: 420,
        includes: ["House visits", "Premium tastings", "Luxury transport", "Lunch"]
      },
      {
        id: "champagne-private",
        name: "Bespoke Champagne Experience",
        duration: "10 hours",
        price: 950,
        includes: ["Private house tours", "Rare vintage tastings", "Meeting with cellar masters", "Michelin-star lunch"]
      }
    ]
  },
  {
    id: "versailles-palace",
    title: "Palace of Versailles",
    description: "Experience the grandeur of French royalty with exclusive access to the Palace of Versailles",
    image: "/images/versailles.jpg",
    duration: "8h",
    durationType: "full-day",
    type: "luxury",
    price: 590,
    link: "/excursions/versailles",
    highlights: [
      "Private early morning access to Hall of Mirrors",
      "Royal Apartments guided tour",
      "Marie Antoinette's Estate visit",
      "Private gardens tour with fountain show",
      "Gourmet lunch at Ore - Ducasse au Château de Versailles"
    ],
    tours: [
      {
        id: "versailles-classic",
        name: "Royal Versailles Experience",
        duration: "8 hours",
        price: 590,
        includes: ["Skip-the-line access", "Expert historian guide", "Luxury transport", "Gourmet lunch"]
      },
      {
        id: "versailles-exclusive",
        name: "Ultimate Versailles Private Tour",
        duration: "10 hours",
        price: 1900,
        includes: ["Private early access", "Behind-the-scenes areas", "Royal dinner experience", "Luxury transport"]
      }
    ]
  },
  {
    id: "giverny-honfleur",
    title: "Giverny & Honfleur Private Tour",
    description: "Discover Monet's inspiration and the charm of Normandy's coast",
    image: "/images/giverny.jpg",
    duration: "10h",
    durationType: "full-day",
    type: "luxury",
    price: 680,
    link: "/excursions/giverny-honfleur",
    highlights: [
      "Private visit to Monet's house and gardens",
      "Exclusive painting workshop",
      "Honfleur harbor exploration",
      "Seafood lunch at La Ferme Saint Siméon"
    ],
    tours: [
      {
        id: "giverny-classic",
        name: "Impressionist Journey",
        duration: "10 hours",
        price: 680,
        includes: ["Private garden access", "Art historian guide", "Luxury transport", "Gourmet lunch"]
      },
      {
        id: "giverny-art",
        name: "Artist's Experience",
        duration: "12 hours",
        price: 1200,
        includes: ["Private painting session", "Museum curator tour", "Art materials", "Michelin-star lunch"]
      }
    ]
  }
];
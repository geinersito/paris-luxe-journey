import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, Users, Star, MapPin, Check, X } from "lucide-react";

// Traducciones COMPLETAS
const translations = {
  en: {
    // Hero
    hero: {
      title: "Private Day Trips from Paris",
      subtitle:
        "Discover Versailles, Champagne, Giverny and more with your own private chauffeur. Door-to-door service, flexible schedule, fixed price per vehicle.",
      badge1: "1-7 passengers per vehicle",
      badge2: "Fixed price per day",
      badge3: "English-speaking driver",
      ctaPrimary: "Request Your Day Trip",
      ctaSecondary: "See Sample Itineraries",
    },
    // How it Works
    howItWorks: {
      title: "How It Works",
      subtitle:
        "Simple, transparent, and flexible. Book your private day trip in 3 easy steps.",
      step1Title: "Choose Your Destination",
      step1Text:
        "Select from Versailles, Champagne, Giverny, Loire Valley or request a custom itinerary.",
      step2Title: "We Confirm Schedule & Price",
      step2Text:
        "Fixed price per vehicle, no hidden fees. We'll confirm your booking within 2 hours.",
      step3Title: "Enjoy Your Private Day Out",
      step3Text:
        "Door-to-door service, flexible stops, professional English-speaking driver.",
      cta: "Plan Your Day Trip Now",
    },
    // Custom Quote for Agencies
    customQuote: {
      title: "Travel agency or group? Get a custom quote in 10 minutes.",
      subtitle:
        "We specialize in serving travel agencies and groups with tailored itineraries, competitive rates, and reliable service.",
      cta: "WhatsApp – Custom Quote",
    },
    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our private day trips",
      q1: "Are entrance tickets to attractions included in the price?",
      a1: "No, entrance tickets are not included. Our service covers private transportation, professional driver, and waiting time. You'll need to purchase tickets separately for palaces, museums, or attractions. We're happy to provide recommendations and booking links.",
      q2: "Can you help me book entrance tickets or tour guides?",
      a2: "Yes! While tickets and guides are not included in our base price, we can assist you with recommendations and booking information. For guided tours, we can connect you with licensed guides for an additional fee (typically €200-300 for a full day).",
      q3: "Can we change the schedule or add stops during the day?",
      a3: "Absolutely! That's the beauty of a private day trip. Your driver will be flexible with your schedule within the booked hours. Want to add a lunch stop or visit an extra location? Just let your driver know. Additional hours beyond the package can be added at €65/hour.",
      q4: "How many hours are included in each day trip package?",
      a4: "Each package includes a specific number of hours: Versailles Half-Day (5h), Versailles Full-Day (8h), Giverny (8h), Champagne Region (10h), and Loire Valley (12h). This includes travel time from/to Paris and waiting time at destinations. Need more time? Additional hours are €65/hour.",
      stillQuestions: "Still have questions? We're here to help!",
      ctaFaq: "Contact Us on WhatsApp",
    },
    // Day Trip Card
    card: {
      whatsIncluded: "What's Included",
      notIncluded: "Not Included",
      ticketsOptional: "Tickets & Reservations (optional)",
      ticketsBullet1: "We can recommend official tickets and best time slots.",
      ticketsBullet2:
        "If you want, we can assist with reservations via WhatsApp.",
      from: "From",
      perVehicle: "per vehicle",
      upTo: "Up to",
      passengers: "passengers",
      cta: "Request this trip on WhatsApp",
      hours: "hours",
      viewDetails: "View Details",
      requestQuote: "Request Quote",
      privateChauffeur: "Private Chauffeur",
    },
    // Filters
    filters: {
      quickFilters: "Quick Filters",
      allTrips: "All Trips",
      parisOnly: "Paris Tours",
      outsideParis: "Outside Paris",
      nightTours: "Night Tours",
      clearFilters: "Clear filters",
      excursionsMatch: "excursions match",
      noResults: "No results found",
      noResultsMessage:
        "No excursions match your filters. Contact us on WhatsApp and we'll propose a custom itinerary.",
      contactWhatsApp: "Contact us on WhatsApp",
      allTypes: "All Types",
      allLocations: "All Locations",
      anyDuration: "Any Duration",
      halfDay: "Half Day",
      fullDay: "Full Day",
      refineSearch: "Refine Your Search",
      priceRange: "Price range",
      duration: "Duration",
      location: "Location",
      season: "Season",
      // Duration values
      duration2to4: "2-4 Hours",
      durationHalfDay: "Half Day",
      durationFullDay: "Full Day",
      durationMultiDay: "Multi-Day",
      // Location values
      locationParis: "Paris",
      locationVersailles: "Versailles",
      locationLoire: "Loire Valley",
      locationChampagne: "Champagne",
      // Season values
      seasonSpring: "Spring",
      seasonSummer: "Summer",
      seasonAutumn: "Autumn",
      seasonWinter: "Winter",
    },
    // Trips
    trips: {
      versaillesHalf: {
        title: "Versailles Half-Day",
        description:
          "Enjoy a comfortable private transfer from Paris to Versailles with your own chauffeur. We pick you up at your hotel, drive you to the Palace, wait on site and bring you back to Paris at your preferred time.",
        duration: "5 hours",
        distance: "25 km from Paris",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off in Paris",
          "Waiting time at Versailles (up to 3h)",
          "Tolls, parking, fuel",
        ],
        notIncluded: [
          "Entrance tickets to Palace & gardens (€20/person)",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      versaillesFull: {
        title: "Versailles Full-Day",
        description:
          "Spend a full day exploring Versailles at your own pace. Your private chauffeur will wait for you while you visit the Palace, gardens, and Marie Antoinette's Estate. Perfect for those who want to take their time.",
        duration: "8 hours",
        distance: "25 km from Paris",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off in Paris",
          "Waiting time at Versailles (up to 6h)",
          "Tolls, parking, fuel",
        ],
        notIncluded: [
          "Entrance tickets to Palace & gardens (€20/person)",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      giverny: {
        title: "Giverny Day Trip",
        description:
          "Visit Monet's house and gardens in Giverny with your private chauffeur. Enjoy the scenic drive through the French countryside and explore the famous water lily pond at your leisure.",
        duration: "8 hours",
        distance: "75 km from Paris",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off in Paris",
          "Waiting time at Giverny (up to 4h)",
          "Tolls, parking, fuel",
        ],
        notIncluded: [
          "Entrance tickets to Monet's house & gardens (€11/person)",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      champagne: {
        title: "Champagne Region",
        description:
          "Discover the Champagne region with a private day trip to Reims and Épernay. Your chauffeur will take you to the famous champagne houses where you can book tastings and cellar tours on your own.",
        duration: "10 hours",
        distance: "145 km from Paris",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off in Paris",
          "Waiting time in Champagne region (up to 6h)",
          "Tolls, parking, fuel",
          "Suggested itinerary & recommendations",
        ],
        notIncluded: [
          "Champagne house tours & tastings (€25-50/person)",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      loire: {
        title: "Loire Valley Castles",
        description:
          "Explore the magnificent châteaux of the Loire Valley with your private chauffeur. Visit Château de Chambord and Chenonceau, with flexible stops along the way. A full day of French Renaissance architecture.",
        duration: "12 hours",
        distance: "200 km from Paris",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off in Paris",
          "Waiting time at castles (up to 8h)",
          "Tolls, parking, fuel",
          "Suggested itinerary & recommendations",
        ],
        notIncluded: [
          "Entrance tickets to castles (€15-20/person each)",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      parisCityHalf: {
        title: "Paris City Tour – Half Day",
        description:
          "Discover Paris highlights with your private chauffeur. Perfect for photos and getting oriented. Flexible itinerary: Eiffel Tower, Louvre, Notre-Dame, Champs-Élysées, Montmartre. Your driver adapts to your pace and interests.",
        duration: "4-5 hours",
        distance: "Paris city center",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off at your hotel",
          "Flexible route & photo stops",
          "Parking, fuel",
        ],
        notIncluded: [
          "Museum entrance tickets",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      parisCityFull: {
        title: "Paris City Tour – Full Day",
        description:
          "Spend a full day exploring Paris at your own pace. Visit museums from outside, stroll through charming neighborhoods, enjoy a lunch break. Your chauffeur will wait and drive you between locations. Perfect for a comprehensive Paris experience.",
        duration: "8 hours",
        distance: "Paris city center",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off at your hotel",
          "Flexible route & multiple stops",
          "Parking, fuel",
        ],
        notIncluded: [
          "Museum entrance tickets",
          "Licensed tour guide (available on request)",
          "Meals & personal expenses",
        ],
      },
      parisNight: {
        title: "Paris by Night – Illuminations",
        description:
          "Experience the magic of Paris after dark. See the Eiffel Tower sparkling, illuminated monuments, and the city's most beautiful bridges. A romantic and unforgettable evening tour with your private chauffeur.",
        duration: "3-4 hours",
        distance: "Paris city center",
        included: [
          "Private vehicle (1-7 passengers)",
          "Professional English-speaking driver",
          "Pick-up & drop-off at your hotel",
          "Eiffel Tower, Louvre, Opéra, Champs-Élysées, Pont Alexandre III",
          "Parking, fuel",
        ],
        notIncluded: [
          "Eiffel Tower tickets (if you want to go up)",
          "Dinner or drinks",
          "Personal expenses",
        ],
      },
    },
  },
  fr: {
    // Hero
    hero: {
      title: "Excursions Privées depuis Paris",
      subtitle:
        "Découvrez Versailles, la Champagne, Giverny et plus encore avec votre propre chauffeur privé. Service porte-à-porte, horaires flexibles, prix fixe par véhicule.",
      badge1: "1-7 passagers par véhicule",
      badge2: "Prix fixe par jour",
      badge3: "Chauffeur anglophone",
      ctaPrimary: "Demander Votre Excursion",
      ctaSecondary: "Voir les Itinéraires",
    },
    // How it Works
    howItWorks: {
      title: "Comment Ça Marche",
      subtitle:
        "Simple, transparent et flexible. Réservez votre excursion privée en 3 étapes faciles.",
      step1Title: "Choisissez Votre Destination",
      step1Text:
        "Sélectionnez Versailles, Champagne, Giverny, Vallée de la Loire ou demandez un itinéraire personnalisé.",
      step2Title: "Nous Confirmons l'Horaire et le Prix",
      step2Text:
        "Prix fixe par véhicule, sans frais cachés. Nous confirmons votre réservation sous 2 heures.",
      step3Title: "Profitez de Votre Journée Privée",
      step3Text:
        "Service porte-à-porte, arrêts flexibles, chauffeur professionnel anglophone.",
      cta: "Planifiez Votre Excursion Maintenant",
    },
    // Custom Quote for Agencies
    customQuote: {
      title:
        "Agence de voyage ou groupe ? Obtenez un devis personnalisé en 10 minutes.",
      subtitle:
        "Nous sommes spécialisés dans le service aux agences de voyage et aux groupes avec des itinéraires sur mesure, des tarifs compétitifs et un service fiable.",
      cta: "WhatsApp – Devis Personnalisé",
    },
    // FAQ
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir sur nos excursions privées",
      q1: "Les billets d'entrée aux attractions sont-ils inclus dans le prix ?",
      a1: "Non, les billets d'entrée ne sont pas inclus. Notre service couvre le transport privé, le chauffeur professionnel et le temps d'attente. Vous devrez acheter les billets séparément pour les palais, musées ou attractions. Nous sommes heureux de fournir des recommandations et des liens de réservation.",
      q2: "Pouvez-vous m'aider à réserver des billets d'entrée ou des guides touristiques ?",
      a2: "Oui ! Bien que les billets et les guides ne soient pas inclus dans notre prix de base, nous pouvons vous aider avec des recommandations et des informations de réservation. Pour les visites guidées, nous pouvons vous mettre en contact avec des guides agréés moyennant des frais supplémentaires (généralement 200-300 € pour une journée complète).",
      q3: "Peut-on modifier l'horaire ou ajouter des arrêts pendant la journée ?",
      a3: "Absolument ! C'est la beauté d'une excursion privée. Votre chauffeur sera flexible avec votre emploi du temps dans les heures réservées. Vous voulez ajouter un arrêt déjeuner ou visiter un lieu supplémentaire ? Dites-le simplement à votre chauffeur. Des heures supplémentaires peuvent être ajoutées à 65 €/heure.",
      q4: "Combien d'heures sont incluses dans chaque forfait d'excursion ?",
      a4: "Chaque forfait comprend un nombre d'heures spécifique : Versailles Demi-Journée (5h), Versailles Journée Complète (8h), Giverny (8h), Région Champagne (10h) et Vallée de la Loire (12h). Cela inclut le temps de trajet depuis/vers Paris et le temps d'attente aux destinations. Besoin de plus de temps ? Heures supplémentaires à 65 €/heure.",
      stillQuestions:
        "Vous avez encore des questions ? Nous sommes là pour vous aider !",
      ctaFaq: "Contactez-nous sur WhatsApp",
    },
    // Day Trip Card
    card: {
      whatsIncluded: "Inclus",
      notIncluded: "Non Inclus",
      ticketsOptional: "Billets & Réservations (optionnel)",
      ticketsBullet1:
        "Nous pouvons recommander les billets officiels et les meilleurs créneaux horaires.",
      ticketsBullet2:
        "Si vous le souhaitez, nous pouvons vous aider avec les réservations via WhatsApp.",
      from: "À partir de",
      perVehicle: "par véhicule",
      upTo: "Jusqu'à",
      passengers: "passagers",
      cta: "Demander cette excursion sur WhatsApp",
      hours: "heures",
      viewDetails: "Voir les Détails",
      requestQuote: "Demander un Devis",
      privateChauffeur: "Chauffeur Privé",
    },
    // Filters
    filters: {
      quickFilters: "Filtres Rapides",
      allTrips: "Toutes les Excursions",
      parisOnly: "Tours de Paris",
      outsideParis: "Hors de Paris",
      nightTours: "Tours de Nuit",
      clearFilters: "Effacer les filtres",
      excursionsMatch: "excursions correspondent",
      noResults: "Aucun résultat trouvé",
      noResultsMessage:
        "Aucune excursion ne correspond à vos filtres. Contactez-nous sur WhatsApp et nous vous proposerons un itinéraire personnalisé.",
      contactWhatsApp: "Contactez-nous sur WhatsApp",
      allTypes: "Tous les Types",
      allLocations: "Toutes les Destinations",
      anyDuration: "Toute Durée",
      halfDay: "Demi-Journée",
      fullDay: "Journée Complète",
      refineSearch: "Affiner la Recherche",
      priceRange: "Fourchette de prix",
      duration: "Durée",
      location: "Lieu",
      season: "Saison",
      // Duration values
      duration2to4: "2-4 Heures",
      durationHalfDay: "Demi-Journée",
      durationFullDay: "Journée Complète",
      durationMultiDay: "Plusieurs Jours",
      // Location values
      locationParis: "Paris",
      locationVersailles: "Versailles",
      locationLoire: "Vallée de la Loire",
      locationChampagne: "Champagne",
      // Season values
      seasonSpring: "Printemps",
      seasonSummer: "Été",
      seasonAutumn: "Automne",
      seasonWinter: "Hiver",
    },
    // Trips
    trips: {
      versaillesHalf: {
        title: "Versailles Demi-Journée",
        description:
          "Profitez d'un transfert privé confortable de Paris à Versailles avec votre propre chauffeur. Nous vous récupérons à votre hôtel, vous conduisons au Château, attendons sur place et vous ramenons à Paris à l'heure de votre choix.",
        duration: "5 heures",
        distance: "25 km de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à Paris",
          "Temps d'attente à Versailles (jusqu'à 3h)",
          "Péages, parking, carburant",
        ],
        notIncluded: [
          "Billets d'entrée au Château et jardins (€20/personne)",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      versaillesFull: {
        title: "Versailles Journée Complète",
        description:
          "Passez une journée complète à explorer Versailles à votre rythme. Votre chauffeur privé vous attendra pendant que vous visitez le Château, les jardins et le Domaine de Marie-Antoinette. Parfait pour ceux qui veulent prendre leur temps.",
        duration: "8 heures",
        distance: "25 km de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à Paris",
          "Temps d'attente à Versailles (jusqu'à 6h)",
          "Péages, parking, carburant",
        ],
        notIncluded: [
          "Billets d'entrée au Château et jardins (€20/personne)",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      giverny: {
        title: "Excursion à Giverny",
        description:
          "Visitez la maison et les jardins de Monet à Giverny avec votre chauffeur privé. Profitez du trajet pittoresque à travers la campagne française et explorez le célèbre étang aux nymphéas à votre guise.",
        duration: "8 heures",
        distance: "75 km de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à Paris",
          "Temps d'attente à Giverny (jusqu'à 4h)",
          "Péages, parking, carburant",
        ],
        notIncluded: [
          "Billets d'entrée à la maison et jardins de Monet (€11/personne)",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      champagne: {
        title: "Région de Champagne",
        description:
          "Découvrez la région de Champagne avec une excursion privée à Reims et Épernay. Votre chauffeur vous emmènera aux célèbres maisons de champagne où vous pourrez réserver des dégustations et visites de caves par vous-même.",
        duration: "10 heures",
        distance: "145 km de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à Paris",
          "Temps d'attente en région Champagne (jusqu'à 6h)",
          "Péages, parking, carburant",
          "Itinéraire suggéré et recommandations",
        ],
        notIncluded: [
          "Visites et dégustations dans les maisons de champagne (€25-50/personne)",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      loire: {
        title: "Châteaux de la Loire",
        description:
          "Explorez les magnifiques châteaux de la Vallée de la Loire avec votre chauffeur privé. Visitez le Château de Chambord et Chenonceau, avec des arrêts flexibles en chemin. Une journée complète d'architecture Renaissance française.",
        duration: "12 heures",
        distance: "200 km de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à Paris",
          "Temps d'attente aux châteaux (jusqu'à 8h)",
          "Péages, parking, carburant",
          "Itinéraire suggéré et recommandations",
        ],
        notIncluded: [
          "Billets d'entrée aux châteaux (€15-20/personne chacun)",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      parisCityHalf: {
        title: "Visite de Paris – Demi-Journée",
        description:
          "Découvrez les points forts de Paris avec votre chauffeur privé. Parfait pour les photos et l'orientation. Itinéraire flexible : Tour Eiffel, Louvre, Notre-Dame, Champs-Élysées, Montmartre. Votre chauffeur s'adapte à votre rythme et vos intérêts.",
        duration: "4-5 heures",
        distance: "Centre de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à votre hôtel",
          "Itinéraire flexible et arrêts photos",
          "Parking, carburant",
        ],
        notIncluded: [
          "Billets d'entrée aux musées",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      parisCityFull: {
        title: "Visite de Paris – Journée Complète",
        description:
          "Passez une journée complète à explorer Paris à votre rythme. Visitez les musées de l'extérieur, promenez-vous dans les quartiers charmants, profitez d'une pause déjeuner. Votre chauffeur vous attendra et vous conduira entre les lieux. Parfait pour une expérience complète de Paris.",
        duration: "8 heures",
        distance: "Centre de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à votre hôtel",
          "Itinéraire flexible et arrêts multiples",
          "Parking, carburant",
        ],
        notIncluded: [
          "Billets d'entrée aux musées",
          "Guide touristique agréé (disponible sur demande)",
          "Repas et dépenses personnelles",
        ],
      },
      parisNight: {
        title: "Paris de Nuit – Illuminations",
        description:
          "Vivez la magie de Paris après la tombée de la nuit. Admirez la Tour Eiffel scintillante, les monuments illuminés et les plus beaux ponts de la ville. Une soirée romantique et inoubliable avec votre chauffeur privé.",
        duration: "3-4 heures",
        distance: "Centre de Paris",
        included: [
          "Véhicule privé (1-7 passagers)",
          "Chauffeur professionnel anglophone",
          "Prise en charge et retour à votre hôtel",
          "Tour Eiffel, Louvre, Opéra, Champs-Élysées, Pont Alexandre III",
          "Parking, carburant",
        ],
        notIncluded: [
          "Billets Tour Eiffel (si vous souhaitez monter)",
          "Dîner ou boissons",
          "Dépenses personnelles",
        ],
      },
    },
  },
  es: {
    // Hero
    hero: {
      title: "Excursiones Privadas desde París",
      subtitle:
        "Descubre Versalles, Champagne, Giverny y más con tu propio chófer privado. Servicio puerta a puerta, horario flexible, precio fijo por vehículo.",
      badge1: "1-7 pasajeros por vehículo",
      badge2: "Precio fijo por día",
      badge3: "Conductor que habla inglés",
      ctaPrimary: "Solicitar Tu Excursión",
      ctaSecondary: "Ver Itinerarios de Ejemplo",
    },
    // How it Works
    howItWorks: {
      title: "Cómo Funciona",
      subtitle:
        "Simple, transparente y flexible. Reserva tu excursión privada en 3 sencillos pasos.",
      step1Title: "Elige Tu Destino",
      step1Text:
        "Selecciona Versalles, Champagne, Giverny, Valle del Loira o solicita un itinerario personalizado.",
      step2Title: "Confirmamos Horario y Precio",
      step2Text:
        "Precio fijo por vehículo, sin cargos ocultos. Confirmaremos tu reserva en 2 horas.",
      step3Title: "Disfruta de Tu Día Privado",
      step3Text:
        "Servicio puerta a puerta, paradas flexibles, conductor profesional que habla inglés.",
      cta: "Planifica Tu Excursión Ahora",
    },
    // Custom Quote for Agencies
    customQuote: {
      title:
        "¿Agencia de viajes o grupo? Obtén un presupuesto personalizado en 10 minutos.",
      subtitle:
        "Nos especializamos en servir a agencias de viajes y grupos con itinerarios personalizados, tarifas competitivas y servicio confiable.",
      cta: "WhatsApp – Presupuesto Personalizado",
    },
    // FAQ
    faq: {
      title: "Preguntas Frecuentes",
      subtitle:
        "Todo lo que necesitas saber sobre nuestras excursiones privadas",
      q1: "¿Las entradas a las atracciones están incluidas en el precio?",
      a1: "No, las entradas no están incluidas. Nuestro servicio cubre transporte privado, conductor profesional y tiempo de espera. Deberás comprar las entradas por separado para palacios, museos o atracciones. Estaremos encantados de proporcionar recomendaciones y enlaces de reserva.",
      q2: "¿Pueden ayudarme a reservar entradas o guías turísticos?",
      a2: "¡Sí! Aunque las entradas y guías no están incluidas en nuestro precio base, podemos ayudarte con recomendaciones e información de reserva. Para tours guiados, podemos conectarte con guías licenciados por una tarifa adicional (típicamente €200-300 por día completo).",
      q3: "¿Podemos cambiar el horario o añadir paradas durante el día?",
      a3: "¡Absolutamente! Esa es la belleza de una excursión privada. Tu conductor será flexible con tu horario dentro de las horas reservadas. ¿Quieres añadir una parada para almorzar o visitar un lugar adicional? Solo díselo a tu conductor. Se pueden añadir horas adicionales a €65/hora.",
      q4: "¿Cuántas horas están incluidas en cada paquete de excursión?",
      a4: "Cada paquete incluye un número específico de horas: Versalles Medio Día (5h), Versalles Día Completo (8h), Giverny (8h), Región de Champagne (10h) y Valle del Loira (12h). Esto incluye tiempo de viaje desde/hacia París y tiempo de espera en destinos. ¿Necesitas más tiempo? Horas adicionales a €65/hora.",
      stillQuestions: "¿Aún tienes preguntas? ¡Estamos aquí para ayudarte!",
      ctaFaq: "Contáctanos en WhatsApp",
    },
    // Day Trip Card
    card: {
      whatsIncluded: "Incluido",
      notIncluded: "No Incluido",
      ticketsOptional: "Entradas y Reservas (opcional)",
      ticketsBullet1:
        "Podemos recomendar entradas oficiales y mejores horarios.",
      ticketsBullet2:
        "Si lo deseas, podemos ayudarte con las reservas por WhatsApp.",
      from: "Desde",
      perVehicle: "por vehículo",
      upTo: "Hasta",
      passengers: "pasajeros",
      cta: "Solicitar esta excursión en WhatsApp",
      hours: "horas",
      viewDetails: "Ver Detalles",
      requestQuote: "Solicitar Presupuesto",
      privateChauffeur: "Chófer Privado",
    },
    // Filters
    filters: {
      quickFilters: "Filtros Rápidos",
      allTrips: "Todas las Excursiones",
      parisOnly: "Tours de París",
      outsideParis: "Fuera de París",
      nightTours: "Tours Nocturnos",
      clearFilters: "Limpiar filtros",
      excursionsMatch: "excursiones coinciden",
      noResults: "No se encontraron resultados",
      noResultsMessage:
        "Ninguna excursión coincide con tus filtros. Contáctanos en WhatsApp y te propondremos un itinerario personalizado.",
      contactWhatsApp: "Contáctanos en WhatsApp",
      allTypes: "Todos los Tipos",
      allLocations: "Todas las Ubicaciones",
      anyDuration: "Cualquier Duración",
      halfDay: "Medio Día",
      fullDay: "Día Completo",
      refineSearch: "Refinar Búsqueda",
      priceRange: "Rango de precio",
      duration: "Duración",
      location: "Ubicación",
      season: "Temporada",
      // Duration values
      duration2to4: "2-4 Horas",
      durationHalfDay: "Medio Día",
      durationFullDay: "Día Completo",
      durationMultiDay: "Varios Días",
      // Location values
      locationParis: "París",
      locationVersailles: "Versalles",
      locationLoire: "Valle del Loira",
      locationChampagne: "Champagne",
      // Season values
      seasonSpring: "Primavera",
      seasonSummer: "Verano",
      seasonAutumn: "Otoño",
      seasonWinter: "Invierno",
    },
    // Trips
    trips: {
      versaillesHalf: {
        title: "Versalles Medio Día",
        description:
          "Disfruta de un cómodo traslado privado desde París a Versalles con tu propio chófer. Te recogemos en tu hotel, te llevamos al Palacio, esperamos en el lugar y te traemos de vuelta a París a la hora que prefieras.",
        duration: "5 horas",
        distance: "25 km desde París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en París",
          "Tiempo de espera en Versalles (hasta 3h)",
          "Peajes, estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas al Palacio y jardines (€20/persona)",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      versaillesFull: {
        title: "Versalles Día Completo",
        description:
          "Pasa un día completo explorando Versalles a tu propio ritmo. Tu chófer privado te esperará mientras visitas el Palacio, los jardines y la Finca de María Antonieta. Perfecto para quienes quieren tomarse su tiempo.",
        duration: "8 horas",
        distance: "25 km desde París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en París",
          "Tiempo de espera en Versalles (hasta 6h)",
          "Peajes, estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas al Palacio y jardines (€20/persona)",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      giverny: {
        title: "Excursión a Giverny",
        description:
          "Visita la casa y los jardines de Monet en Giverny con tu chófer privado. Disfruta del pintoresco recorrido por la campiña francesa y explora el famoso estanque de nenúfares a tu gusto.",
        duration: "8 horas",
        distance: "75 km desde París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en París",
          "Tiempo de espera en Giverny (hasta 4h)",
          "Peajes, estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas a la casa y jardines de Monet (€11/persona)",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      champagne: {
        title: "Región de Champagne",
        description:
          "Descubre la región de Champagne con una excursión privada a Reims y Épernay. Tu chófer te llevará a las famosas casas de champagne donde podrás reservar degustaciones y tours de bodegas por tu cuenta.",
        duration: "10 horas",
        distance: "145 km desde París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en París",
          "Tiempo de espera en la región de Champagne (hasta 6h)",
          "Peajes, estacionamiento, combustible",
          "Itinerario sugerido y recomendaciones",
        ],
        notIncluded: [
          "Tours y degustaciones en casas de champagne (€25-50/persona)",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      loire: {
        title: "Castillos del Valle del Loira",
        description:
          "Explora los magníficos castillos del Valle del Loira con tu chófer privado. Visita el Château de Chambord y Chenonceau, con paradas flexibles en el camino. Un día completo de arquitectura renacentista francesa.",
        duration: "12 horas",
        distance: "200 km desde París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en París",
          "Tiempo de espera en los castillos (hasta 8h)",
          "Peajes, estacionamiento, combustible",
          "Itinerario sugerido y recomendaciones",
        ],
        notIncluded: [
          "Entradas a los castillos (€15-20/persona cada uno)",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      parisCityHalf: {
        title: "Tour por París – Medio Día",
        description:
          "Descubre los puntos destacados de París con tu chófer privado. Perfecto para fotos y orientación. Itinerario flexible: Torre Eiffel, Louvre, Notre-Dame, Champs-Élysées, Montmartre. Tu conductor se adapta a tu ritmo e intereses.",
        duration: "4-5 horas",
        distance: "Centro de París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en tu hotel",
          "Ruta flexible y paradas para fotos",
          "Estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas a museos",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      parisCityFull: {
        title: "Tour por París – Día Completo",
        description:
          "Pasa un día completo explorando París a tu propio ritmo. Visita museos por fuera, pasea por barrios encantadores, disfruta de una pausa para almorzar. Tu chófer te esperará y te llevará entre ubicaciones. Perfecto para una experiencia completa de París.",
        duration: "8 horas",
        distance: "Centro de París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en tu hotel",
          "Ruta flexible y múltiples paradas",
          "Estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas a museos",
          "Guía turístico autorizado (disponible bajo petición)",
          "Comidas y gastos personales",
        ],
      },
      parisNight: {
        title: "París de Noche – Iluminaciones",
        description:
          "Experimenta la magia de París después del anochecer. Ve la Torre Eiffel brillando, monumentos iluminados y los puentes más hermosos de la ciudad. Un tour nocturno romántico e inolvidable con tu chófer privado.",
        duration: "3-4 horas",
        distance: "Centro de París",
        included: [
          "Vehículo privado (1-7 pasajeros)",
          "Conductor profesional que habla inglés",
          "Recogida y regreso en tu hotel",
          "Torre Eiffel, Louvre, Ópera, Champs-Élysées, Pont Alexandre III",
          "Estacionamiento, combustible",
        ],
        notIncluded: [
          "Entradas Torre Eiffel (si quieres subir)",
          "Cena o bebidas",
          "Gastos personales",
        ],
      },
    },
  },
  pt: {
    // Hero
    hero: {
      title: "Excursões Privadas de Paris",
      subtitle:
        "Descubra Versalhes, Champagne, Giverny e muito mais com seu próprio motorista particular. Serviço porta a porta, horário flexível, preço fixo por veículo.",
      badge1: "1-7 passageiros por veículo",
      badge2: "Preço fixo por dia",
      badge3: "Motorista que fala inglês",
      ctaPrimary: "Solicitar Sua Excursão",
      ctaSecondary: "Ver Itinerários de Exemplo",
    },
    // How it Works
    howItWorks: {
      title: "Como Funciona",
      subtitle:
        "Simples, transparente e flexível. Reserve sua excursão privada em 3 passos fáceis.",
      step1Title: "Escolha Seu Destino",
      step1Text:
        "Selecione Versalhes, Champagne, Giverny, Vale do Loire ou solicite um itinerário personalizado.",
      step2Title: "Confirmamos Horário e Preço",
      step2Text:
        "Preço fixo por veículo, sem taxas ocultas. Confirmaremos sua reserva em 2 horas.",
      step3Title: "Aproveite Seu Dia Privado",
      step3Text:
        "Serviço porta a porta, paradas flexíveis, motorista profissional que fala inglês.",
      cta: "Planeje Sua Excursão Agora",
    },
    // Custom Quote for Agencies
    customQuote: {
      title:
        "Agência de viagens ou grupo? Obtenha um orçamento personalizado em 10 minutos.",
      subtitle:
        "Somos especializados em atender agências de viagens e grupos com itinerários personalizados, tarifas competitivas e serviço confiável.",
      cta: "WhatsApp – Orçamento Personalizado",
    },
    // FAQ
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre nossas excursões privadas",
      q1: "Os ingressos para as atrações estão incluídos no preço?",
      a1: "Não, os ingressos não estão incluídos. Nosso serviço cobre transporte privado, motorista profissional e tempo de espera. Você precisará comprar ingressos separadamente para palácios, museus ou atrações. Teremos prazer em fornecer recomendações e links de reserva.",
      q2: "Vocês podem me ajudar a reservar ingressos ou guias turísticos?",
      a2: "Sim! Embora ingressos e guias não estejam incluídos em nosso preço base, podemos ajudá-lo com recomendações e informações de reserva. Para passeios guiados, podemos conectá-lo com guias licenciados por uma taxa adicional (normalmente €200-300 por dia completo).",
      q3: "Podemos mudar o horário ou adicionar paradas durante o dia?",
      a3: "Absolutamente! Essa é a beleza de uma excursão privada. Seu motorista será flexível com seu horário dentro das horas reservadas. Quer adicionar uma parada para almoço ou visitar um local adicional? Apenas avise seu motorista. Horas adicionais podem ser adicionadas a €65/hora.",
      q4: "Quantas horas estão incluídas em cada pacote de excursão?",
      a4: "Cada pacote inclui um número específico de horas: Versalhes Meio Dia (5h), Versalhes Dia Completo (8h), Giverny (8h), Região de Champagne (10h) e Vale do Loire (12h). Isso inclui tempo de viagem de/para Paris e tempo de espera nos destinos. Precisa de mais tempo? Horas adicionais a €65/hora.",
      stillQuestions: "Ainda tem dúvidas? Estamos aqui para ajudar!",
      ctaFaq: "Entre em Contato pelo WhatsApp",
    },
    // Day Trip Card
    card: {
      whatsIncluded: "Incluído",
      notIncluded: "Não Incluído",
      ticketsOptional: "Ingressos e Reservas (opcional)",
      ticketsBullet1:
        "Podemos recomendar ingressos oficiais e melhores horários.",
      ticketsBullet2: "Se desejar, podemos ajudar com reservas via WhatsApp.",
      from: "A partir de",
      perVehicle: "por veículo",
      upTo: "Até",
      passengers: "passageiros",
      cta: "Solicitar esta excursão no WhatsApp",
      hours: "horas",
      viewDetails: "Ver Detalhes",
      requestQuote: "Solicitar Orçamento",
      privateChauffeur: "Motorista Particular",
    },
    // Filters
    filters: {
      quickFilters: "Filtros Rápidos",
      allTrips: "Todas as Excursões",
      parisOnly: "Tours de Paris",
      outsideParis: "Fora de Paris",
      nightTours: "Tours Noturnos",
      clearFilters: "Limpar filtros",
      excursionsMatch: "excursões correspondem",
      noResults: "Nenhum resultado encontrado",
      noResultsMessage:
        "Nenhuma excursão corresponde aos seus filtros. Entre em contato conosco no WhatsApp e proporemos um itinerário personalizado.",
      contactWhatsApp: "Entre em contato no WhatsApp",
      allTypes: "Todos os Tipos",
      allLocations: "Todas as Localizações",
      anyDuration: "Qualquer Duração",
      halfDay: "Meio Dia",
      fullDay: "Dia Inteiro",
      refineSearch: "Refinar Busca",
      priceRange: "Faixa de preço",
      duration: "Duração",
      location: "Localização",
      season: "Estação",
      // Duration values
      duration2to4: "2-4 Horas",
      durationHalfDay: "Meio Dia",
      durationFullDay: "Dia Inteiro",
      durationMultiDay: "Vários Dias",
      // Location values
      locationParis: "Paris",
      locationVersailles: "Versalhes",
      locationLoire: "Vale do Loire",
      locationChampagne: "Champagne",
      // Season values
      seasonSpring: "Primavera",
      seasonSummer: "Verão",
      seasonAutumn: "Outono",
      seasonWinter: "Inverno",
    },
    // Trips
    trips: {
      versaillesHalf: {
        title: "Versalhes Meio Dia",
        description:
          "Desfrute de um confortável traslado privado de Paris a Versalhes com seu próprio motorista. Buscamos você no hotel, levamos ao Palácio, esperamos no local e trazemos de volta a Paris no horário de sua preferência.",
        duration: "5 horas",
        distance: "25 km de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno em Paris",
          "Tempo de espera em Versalhes (até 3h)",
          "Pedágios, estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos para o Palácio e jardins (€20/pessoa)",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      versaillesFull: {
        title: "Versalhes Dia Inteiro",
        description:
          "Passe um dia inteiro explorando Versalhes no seu próprio ritmo. Seu motorista particular aguardará enquanto você visita o Palácio, os jardins e a Propriedade de Maria Antonieta. Perfeito para quem quer aproveitar com calma.",
        duration: "8 horas",
        distance: "25 km de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno em Paris",
          "Tempo de espera em Versalhes (até 6h)",
          "Pedágios, estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos para o Palácio e jardins (€20/pessoa)",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      giverny: {
        title: "Excursão a Giverny",
        description:
          "Visite a casa e os jardins de Monet em Giverny com seu motorista particular. Aproveite o trajeto panorâmico pelo interior francês e explore o famoso lago de nenúfares à vontade.",
        duration: "8 horas",
        distance: "75 km de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno em Paris",
          "Tempo de espera em Giverny (até 4h)",
          "Pedágios, estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos para a casa e jardins de Monet (€11/pessoa)",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      champagne: {
        title: "Região de Champagne",
        description:
          "Descubra a região de Champagne com uma excursão privada a Reims e Épernay. Seu motorista levará você às famosas casas de champagne onde poderá reservar degustações e tours de adegas por conta própria.",
        duration: "10 horas",
        distance: "145 km de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno em Paris",
          "Tempo de espera na região de Champagne (até 6h)",
          "Pedágios, estacionamento, combustível",
          "Itinerário sugerido e recomendações",
        ],
        notIncluded: [
          "Tours e degustações nas casas de champagne (€25-50/pessoa)",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      loire: {
        title: "Castelos do Vale do Loire",
        description:
          "Explore os magníficos castelos do Vale do Loire com seu motorista particular. Visite o Château de Chambord e Chenonceau, com paradas flexíveis no caminho. Um dia inteiro de arquitetura renascentista francesa.",
        duration: "12 horas",
        distance: "200 km de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno em Paris",
          "Tempo de espera nos castelos (até 8h)",
          "Pedágios, estacionamento, combustível",
          "Itinerário sugerido e recomendações",
        ],
        notIncluded: [
          "Ingressos para os castelos (€15-20/pessoa cada)",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      parisCityHalf: {
        title: "Tour por Paris – Meio Dia",
        description:
          "Descubra os destaques de Paris com seu motorista particular. Perfeito para fotos e orientação. Itinerário flexível: Torre Eiffel, Louvre, Notre-Dame, Champs-Élysées, Montmartre. Seu motorista se adapta ao seu ritmo e interesses.",
        duration: "4-5 horas",
        distance: "Centro de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno no seu hotel",
          "Rota flexível e paradas para fotos",
          "Estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos para museus",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      parisCityFull: {
        title: "Tour por Paris – Dia Inteiro",
        description:
          "Passe um dia inteiro explorando Paris no seu próprio ritmo. Visite museus por fora, passeie por bairros charmosos, aproveite uma pausa para almoço. Seu motorista aguardará e levará você entre os locais. Perfeito para uma experiência completa de Paris.",
        duration: "8 horas",
        distance: "Centro de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno no seu hotel",
          "Rota flexível e múltiplas paradas",
          "Estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos para museus",
          "Guia turístico licenciado (disponível sob consulta)",
          "Refeições e despesas pessoais",
        ],
      },
      parisNight: {
        title: "Paris à Noite – Iluminações",
        description:
          "Experimente a magia de Paris após o anoitecer. Veja a Torre Eiffel cintilante, monumentos iluminados e as pontes mais bonitas da cidade. Um passeio noturno romântico e inesquecível com seu motorista particular.",
        duration: "3-4 horas",
        distance: "Centro de Paris",
        included: [
          "Veículo privado (1-7 passageiros)",
          "Motorista profissional que fala inglês",
          "Busca e retorno no seu hotel",
          "Torre Eiffel, Louvre, Ópera, Champs-Élysées, Pont Alexandre III",
          "Estacionamento, combustível",
        ],
        notIncluded: [
          "Ingressos Torre Eiffel (se quiser subir)",
          "Jantar ou bebidas",
          "Despesas pessoais",
        ],
      },
    },
  },
};

// Tipos de experiencia
const experienceTypes = {
  CULTURAL: "cultural",
  GASTRONOMY: "gastronomy",
  ADVENTURE: "adventure",
  LUXURY: "luxury",
  HISTORICAL: "historical",
  PRIVATE: "private",
} as const;

// Day Trips - Using translation keys with filter tags
const dayTrips = [
  {
    id: 1,
    tripKey: "parisCityHalf",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070",
    price: 380,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.PRIVATE],
    location: "Paris",
    // Filter tags
    durationKey: "duration2to4",
    locationKeys: ["locationParis"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 2,
    tripKey: "parisCityFull",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=2070",
    price: 550,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.PRIVATE],
    location: "Paris",
    // Filter tags
    durationKey: "durationFullDay",
    locationKeys: ["locationParis"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 3,
    tripKey: "parisNight",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070",
    price: 350,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.LUXURY, experienceTypes.PRIVATE],
    location: "Paris",
    // Filter tags
    durationKey: "duration2to4",
    locationKeys: ["locationParis"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 4,
    tripKey: "versaillesHalf",
    image:
      "https://images.unsplash.com/photo-1624698343123-04444a0743ca?q=80&w=2070",
    price: 320,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL],
    location: "Versailles",
    // Filter tags
    durationKey: "durationHalfDay",
    locationKeys: ["locationVersailles"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 5,
    tripKey: "versaillesFull",
    image:
      "https://images.unsplash.com/photo-1624698343123-04444a0743ca?q=80&w=2070",
    price: 480,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL],
    location: "Versailles",
    // Filter tags
    durationKey: "durationFullDay",
    locationKeys: ["locationVersailles"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 6,
    tripKey: "giverny",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    price: 520,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL],
    location: "Normandy",
    // Filter tags
    durationKey: "durationFullDay",
    locationKeys: ["locationParis"], // Normandy region, accessible from Paris
    seasonKeys: ["seasonSpring", "seasonSummer", "seasonAutumn"],
  },
  {
    id: 7,
    tripKey: "champagne",
    image:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=2070",
    price: 650,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.GASTRONOMY, experienceTypes.LUXURY],
    location: "Champagne",
    // Filter tags
    durationKey: "durationFullDay",
    locationKeys: ["locationChampagne"],
    seasonKeys: [
      "seasonSpring",
      "seasonSummer",
      "seasonAutumn",
      "seasonWinter",
    ],
  },
  {
    id: 8,
    tripKey: "loire",
    image:
      "https://images.unsplash.com/photo-1584563143659-e9e5c0b8e4e0?q=80&w=2070",
    price: 750,
    pricePerVehicle: true,
    maxPassengers: 7,
    type: [experienceTypes.CULTURAL, experienceTypes.HISTORICAL],
    location: "Loire Valley",
    // Filter tags
    durationKey: "durationMultiDay",
    locationKeys: ["locationLoire"],
    seasonKeys: ["seasonSpring", "seasonSummer", "seasonAutumn"],
  },
];

const Excursions = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  // Quick filter state
  const [quickFilter, setQuickFilter] = useState("all"); // 'all', 'paris', 'outside', 'night'

  const [selectedTour, setSelectedTour] = useState(null);

  // Filter day trips based on quick filter
  const filteredTrips = dayTrips.filter((trip) => {
    if (quickFilter === "all") return true;

    if (quickFilter === "paris") {
      // Paris tours: parisCityHalf, parisCityFull, parisNight
      return trip.location === "Paris";
    }

    if (quickFilter === "outside") {
      // Outside Paris: Versailles, Giverny, Champagne, Loire
      return trip.location !== "Paris";
    }

    if (quickFilter === "night") {
      // Night tours: parisNight
      return trip.tripKey === "parisNight";
    }

    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setQuickFilter("all");
  };

  // No pagination needed for 8 trips - show all filtered results
  const currentTrips = filteredTrips;

  // Day Trip Card - Compact Overview Version
  const DayTripCard = ({ trip, t }) => {
    const tripData = t.trips[trip.tripKey];
    const whatsappMessage = encodeURIComponent(
      `Hi, I'm interested in the ${tripData.title} on [date] for [X] passengers. Can you confirm availability and price?`,
    );

    const detailRouteMap = {
      loire: "/excursions/loire-valley",
      champagne: "/excursions/champagne",
      giverny: "/excursions/giverny-honfleur",
    };
    const detailRoute = detailRouteMap[trip.tripKey];

    return (
      <div className="glass-card-premium overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Compact Image */}
          <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0 relative rounded-lg overflow-hidden">
            <img
              src={trip.image}
              alt={tripData.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <h3 className="text-xl font-display font-bold text-secondary mb-2 truncate">
                {tripData.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {tripData.description}
              </p>

              {/* Quick Facts */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tripData.duration}
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {tripData.distance}
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {t.card.privateChauffeur}
                </div>
              </div>
            </div>

            {/* Price & CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-primary">
                  €{trip.price}
                </span>
                <span className="text-xs text-gray-500">
                  {t.card.perVehicle}
                </span>
              </div>

              <div className="flex gap-2">
                {detailRoute && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={() => navigate(detailRoute)}
                  >
                    {t.card.viewDetails}
                  </Button>
                )}
                <Button
                  size="sm"
                  className="silk-button"
                  onClick={() =>
                    window.open(
                      `https://wa.me/33668251102?text=${whatsappMessage}`,
                      "_blank",
                    )
                  }
                >
                  {t.card.requestQuote}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-champagne">
      {/* Hero Section - Compact & Clear */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073"
            alt="Private Day Trips from Paris"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <div className="relative mx-auto max-w-4xl px-4 py-6 md:px-6">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-black/55 via-black/25 to-transparent" />

            <div className="relative">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold mb-4 leading-tight drop-shadow-2xl">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-white/95 mb-6 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="rounded-full border border-black/10 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <Users className="w-5 h-5 text-neutral-800" />
                  <span className="text-neutral-900 font-semibold">
                    {t.hero.badge1}
                  </span>
                </div>
                <div className="rounded-full border border-black/10 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neutral-800" />
                  <span className="text-neutral-900 font-semibold">
                    {t.hero.badge2}
                  </span>
                </div>
                <div className="rounded-full border border-black/10 bg-white/90 px-6 py-3 shadow-sm backdrop-blur-sm flex items-center gap-2">
                  <Star className="w-5 h-5 text-neutral-800 fill-current" />
                  <span className="text-neutral-900 font-semibold">
                    {t.hero.badge3}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="silk-button h-12 px-8"
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hi, I'm interested in booking a private day trip from Paris. Can you help me?",
                    );
                    window.open(
                      `https://wa.me/33668251102?text=${message}`,
                      "_blank",
                    );
                  }}
                >
                  {t.hero.ctaPrimary}
                </Button>
                <Button
                  variant="outline"
                  className="button-outline-gold h-12 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  onClick={() => {
                    window.scrollTo({ top: 550, behavior: "smooth" });
                  }}
                >
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                {t.howItWorks.step1Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.howItWorks.step1Text}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                {t.howItWorks.step2Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.howItWorks.step2Text}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-display font-bold text-secondary mb-3">
                {t.howItWorks.step3Title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t.howItWorks.step3Text}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              className="silk-button h-14 px-10 text-lg"
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi, I'd like to plan a private day trip from Paris. Can you help me?",
                );
                window.open(
                  `https://wa.me/33668251102?text=${message}`,
                  "_blank",
                );
              }}
            >
              {t.howItWorks.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Quote CTA for Agencies */}
      <section className="py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass-card-premium p-8 md:p-10 text-center border-2 border-primary/20">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              For Travel Agencies & Groups
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary mb-4">
              {t.customQuote.title}
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {t.customQuote.subtitle}
            </p>
            <Button
              className="silk-button h-14 px-10 text-lg"
              onClick={() => {
                const message = encodeURIComponent(
                  `Hi, I'm from a travel agency/group and I'd like a custom quote for:\n\n` +
                    `- Date: [your date]\n` +
                    `- Number of passengers: [number]\n` +
                    `- Preferred language: [language]\n` +
                    `- Type of tour: [City Tour / Versailles / Night Tour / Other]\n` +
                    `- Need tickets assistance: [Yes / No]\n\n` +
                    `Please send me a quote. Thank you!`,
                );
                window.open(
                  `https://wa.me/33668251102?text=${message}`,
                  "_blank",
                );
              }}
            >
              {t.customQuote.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Quick Filters Sidebar */}
          <div className="w-full lg:w-64">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-lg font-semibold mb-4">
                {t.filters.quickFilters}
              </h2>

              <div className="space-y-2">
                <button
                  onClick={() => setQuickFilter("all")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    quickFilter === "all"
                      ? "bg-primary text-white font-semibold shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.filters.allTrips}
                </button>

                <button
                  onClick={() => setQuickFilter("paris")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    quickFilter === "paris"
                      ? "bg-primary text-white font-semibold shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.filters.parisOnly}
                </button>

                <button
                  onClick={() => setQuickFilter("outside")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    quickFilter === "outside"
                      ? "bg-primary text-white font-semibold shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.filters.outsideParis}
                </button>

                <button
                  onClick={() => setQuickFilter("night")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    quickFilter === "night"
                      ? "bg-primary text-white font-semibold shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t.filters.nightTours}
                </button>
              </div>
            </div>
          </div>

          {/* Day Trips List */}
          <div className="flex-1">
            {/* Results Counter */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary">
                  {filteredTrips.length}
                </span>{" "}
                {t.filters.excursionsMatch}
              </p>
            </div>

            {/* No Results Message */}
            {filteredTrips.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t.filters.noResults}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t.filters.noResultsMessage}
                </p>
                <Button
                  className="silk-button"
                  onClick={() => {
                    const message = encodeURIComponent(
                      "Hi, I'd like to plan a custom day trip from Paris. Can you help me?",
                    );
                    window.open(
                      `https://wa.me/33668251102?text=${message}`,
                      "_blank",
                    );
                  }}
                >
                  {t.filters.contactWhatsApp}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {currentTrips.map((trip) => (
                  <DayTripCard key={trip.id} trip={trip} t={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section - Excursions Specific */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-gray-600">{t.faq.subtitle}</p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="glass-card-premium p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">
                {t.faq.q1}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t.faq.a1}</p>
            </div>

            {/* FAQ 2 */}
            <div className="glass-card-premium p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">
                {t.faq.q2}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t.faq.a2}</p>
            </div>

            {/* FAQ 3 */}
            <div className="glass-card-premium p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">
                {t.faq.q3}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t.faq.a3}</p>
            </div>

            {/* FAQ 4 */}
            <div className="glass-card-premium p-6">
              <h3 className="text-lg font-semibold text-secondary mb-3">
                {t.faq.q4}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t.faq.a4}</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">{t.faq.stillQuestions}</p>
            <Button
              className="silk-button h-14 px-10 text-lg"
              onClick={() => {
                const message = encodeURIComponent(
                  "Hi, I have a question about your private day trips from Paris.",
                );
                window.open(
                  `https://wa.me/33668251102?text=${message}`,
                  "_blank",
                );
              }}
            >
              {t.faq.ctaFaq}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Excursions;

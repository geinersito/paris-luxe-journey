import { Translation } from "@/types/i18n";

export const fr: Translation = {
  nav: {
    home: "Accueil",
    services: "Services",
    about: "À Propos",
    contact: "Contact",
    fleet: "Flotte",
    excursions: "Excursions"
  },
  hero: {
    title: "Transport de Luxe à Paris",
    subtitle: "Découvrez l'élégance de Paris avec nos services de chauffeur premium et nos excursions exclusives."
  },
  excursions: {
    title: "Découvrez les Trésors de France",
    subtitle: "Explorez les sites les plus emblématiques et les secrets les mieux gardés de France avec nos visites personnalisées",
    cta: "Explorer les Destinations",
    search: {
      placeholder: "Rechercher des destinations...",
      duration: "Toutes les durées",
      type: "Tous les types"
    },
    card: {
      moreInfo: "Plus d'informations",
      from: "À partir de",
      duration: "Durée"
    },
    filters: {
      duration: {
        halfDay: "Demi-journée",
        fullDay: "Journée complète",
        multiDay: "Plusieurs jours"
      },
      type: {
        private: "Visites privées",
        group: "Visites en groupe",
        luxury: "Expériences de luxe"
      }
    },
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ"
    }
  },
  faq: {
    title: "Questions Fréquentes",
    categories: {
      bookings: "Réservations",
      services: "Services",
      payment: "Paiements",
      vehicles: "Véhicules"
    },
    questions: {
      howToBook: {
        question: "Comment fonctionne le service de réservation ?",
        answer: "Notre système de réservation est simple et intuitif. Sélectionnez votre type de service, indiquez vos points de départ et d'arrivée, choisissez la date et l'heure, et complétez vos informations personnelles. Vous recevrez une confirmation immédiate par email."
      },
      cancellation: {
        question: "Quelle est la politique d'annulation ?",
        answer: "Les annulations effectuées 24 heures avant le service sont entièrement remboursées. Pour les annulations plus tardives, des frais peuvent s'appliquer. Contactez-nous pour plus de détails."
      },
      advanceBooking: {
        question: "Combien de temps à l'avance dois-je réserver ?",
        answer: "Nous recommandons de réserver au moins 24 heures à l'avance pour garantir la disponibilité. Pour les services spéciaux ou pendant les périodes de forte affluence, une réservation plus anticipée est conseillée."
      },
      modifyBooking: {
        question: "Puis-je modifier ma réservation ?",
        answer: "Oui, vous pouvez modifier votre réservation jusqu'à 24 heures avant le service. Contactez notre équipe pour effectuer les changements nécessaires."
      },
      flightDelay: {
        question: "Que se passe-t-il si mon vol est retardé ?",
        answer: "Nous surveillons les horaires des vols et ajustons notre service en conséquence, sans frais supplémentaires. Notre chauffeur vous attendra à votre arrivée."
      },
      airportTransfer: {
        question: "Quel est le processus pour les transferts aéroportuaires ?",
        answer: "Notre chauffeur vous attendra dans la zone d'arrivée avec une pancarte à votre nom. Il vous aidera avec vos bagages et vous conduira directement à votre destination."
      },
      tourGuide: {
        question: "Proposez-vous des services de guide touristique ?",
        answer: "Oui, nous proposons des guides professionnels multilingues pour tous nos circuits touristiques. Ils sont experts en histoire et culture locales."
      },
      privateDriver: {
        question: "Que comprend le service de chauffeur privé ?",
        answer: "Notre service de chauffeur privé inclut un véhicule de luxe avec chauffeur professionnel, disponible selon vos besoins. Le service peut être réservé à l'heure, à la journée ou pour plusieurs jours."
      },
      outsideParis: {
        question: "Faites-vous des excursions en dehors de Paris ?",
        answer: "Oui, nous organisons des excursions vers les châteaux de la Loire, Versailles, Giverny, et d'autres destinations populaires autour de Paris."
      },
      pricesIncluded: {
        question: "Les prix incluent-ils tous les frais ?",
        answer: "Oui, nos prix sont tout compris : carburant, péages, taxes et assurance. Il n'y a pas de frais cachés."
      },
      paymentMethods: {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les principales cartes de crédit (Visa, MasterCard, American Express), les virements bancaires et les paiements en ligne sécurisés."
      },
      deposit: {
        question: "Un acompte est-il nécessaire pour réserver ?",
        answer: "Pour certains services, un acompte de 30% peut être demandé pour confirmer la réservation. Le solde est payable avant le service."
      },
      vehicleTypes: {
        question: "Quels types de véhicules proposez-vous ?",
        answer: "Notre flotte comprend des berlines de luxe (Mercedes Classe E), des vans (Mercedes Classe V) et des véhicules haut de gamme pour tous vos besoins."
      }
    }
  },
  contact: {
    title: "Contactez-nous",
    description: "Póngase en contacto con nuestro equipo para cualquier consulta o asistencia",
    subtitle: "Prenez contact avec nous",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    message: "Message",
    address: "123 Avenue des Champs-Élysées, Paris",
    namePlaceholder: "Entrez votre nom",
    emailPlaceholder: "Entrez votre e-mail",
    phonePlaceholder: "Entrez votre numéro",
    messagePlaceholder: "Écrivez votre message ici",
    sendMessage: "Envoyer le Message",
    success: "Message envoyé avec succès !",
    successDescription: "Nous vous contacterons bientôt.",
    error: "Erreur lors de l'envoi du message. Veuillez réessayer."
  },
  booking: {
    title: "Réserver Votre Voyage",
    pickup: "Lieu de Prise en Charge",
    dropoff: "Lieu de Dépose",
    pickupPlaceholder: "Entrez le lieu de prise en charge",
    dropoffPlaceholder: "Entrez le lieu de dépose",
    date: "Date",
    time: "Heure",
    returnDate: "Date de Retour",
    returnTime: "Heure de Retour",
    passengers: "Passagers",
    service: "Type de Service",
    tripType: "Type de Trajet",
    oneWay: "Aller Simple",
    roundTrip: "Aller-Retour",
    continue: "Continuer la Réservation",
    assignedVehicles: "Véhicules Assignés",
    largeLuggage: "Grand Bagage",
    smallLuggage: "Petit Bagage",
    maxWeight: "poids maximum",
    services: {
      airport: "Transfert Aéroport",
      city: "Visite de la Ville",
      daytrip: "Excursion",
      chauffeur: "Chauffeur Privé",
    },
    payment: {
      title: "Détails du Paiement",
      cardDetails: "Détails de la Carte"
    },
    submit: "Réserver",
    extras: {
      title: "Services Additionnels",
      tourGuide: "Guide Touristique",
      tourGuideDesc: "Guide professionnel qui vous accompagnera pendant la visite",
    },
    vehicle: {
      title: "Sélectionnez votre Véhicule",
      capacity: "passagers",
      luggage: "bagages",
      berline: "Classe E",
      van: "Classe V"
    },
    price: {
      total: "Prix Total",
      estimated: "Prix Estimé",
      distance: "Distance estimée",
      basePrice: "Prix de base à partir de",
      roundTripIncluded: "*Prix incluant l'aller-retour"
    },
    success: {
      title: "Paiement Réussi",
      description: "Votre réservation a été confirmée. Merci d'avoir choisi notre service !"
    },
    passengerDetails: "Détails du Passager",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    email: "Email",
    emailPlaceholder: "Entrez votre email",
    phone: "Téléphone",
    phonePlaceholder: "+33 XXXXXXXXX",
    flightNumber: "Numéro de Vol (optionnel)",
    flightNumberPlaceholder: "ex. AF1234",
    specialInstructions: "Instructions Spéciales",
    specialInstructionsPlaceholder: "Informations supplémentaires pour le chauffeur...",
    errors: {
      invalidEmail: "Email Invalide",
      emailDescription: "Veuillez entrer une adresse email valide",
      invalidName: "Nom Invalide",
      nameDescription: "Veuillez entrer votre nom complet",
      locationsNotLoaded: "Impossible de charger les emplacements",
      selectLocations: "Veuillez sélectionner les lieux de départ et d'arrivée",
      selectDateTime: "Veuillez sélectionner la date et l'heure",
      selectReturnDateTime: "Veuillez sélectionner la date et l'heure de retour",
      selectPassengers: "Veuillez spécifier le nombre de passagers",
      noVehiclesAvailable: "Aucun véhicule disponible pour cette réservation",
      bookingCreationError: "Erreur lors de la création de la réservation",
      acceptTerms: "Veuillez accepter les conditions générales",
      paymentIntentError: "Erreur lors de la création du paiement. Veuillez réessayer.",
      generalPaymentError: "Une erreur s'est produite lors du paiement",
      missingIds: "Informations de réservation ou de paiement manquantes",
      finalizationError: "Erreur lors de la finalisation de la réservation",
      noBookingData: "Aucune donnée de réservation trouvée",
      requiredFields: "Veuillez remplir tous les champs obligatoires",
      invalidPassengerInfo: "Informations passager non valides",
      invalidPhone: "Numéro de téléphone invalide"
    },
    summary: {
      title: "Résumé de la Réservation",
      journey: "Détails du Trajet",
      schedule: "Horaire",
      vehicle: "Détails du Véhicule",
      luggage: "Bagages",
      contact: "Informations de Contact",
      total: "Montant Total"
    },
    form: {
      from: "De",
      to: "À",
      vehicleType: "Type de Véhicule",
      passengers: "Passagers",
      largeLuggage: "Grand Bagage",
      smallLuggage: "Petit Bagage",
      name: "Nom",
      email: "Email",
      phone: "Téléphone"
    }
  },
  common: {
    back: "Retour",
    continue: "Continuer",
    processing: "Traitement...",
    error: "Erreur",
    from: "De"
  },
  services: {
    title: "Nos Services Premium",
    subtitle: "Découvrez le transport de luxe à son meilleur",
    airport: {
      title: "Transferts Aéroport",
      description: "Transport fluide vers et depuis les aéroports CDG, Orly et Beauvais.",
    },
    chauffeur: {
      title: "Chauffeur Privé",
      description: "Véhicule de luxe avec chauffeur professionnel à votre disposition.",
    },
    cityTours: {
      title: "Visites de la Ville",
      description: "Découvrez les monuments les plus emblématiques de Paris avec nos guides experts.",
    },
    dayTrips: {
      title: "Excursions",
      description: "Explorez au-delà de Paris avec des excursions personnalisées vers des destinations françaises.",
    },
  },
  about: {
    title: "À Propos de Paris Elite Services",
    subtitle: "L'Excellence du Transport Privé à Paris",
    years: "40 ans d'expertise",
    description: "Depuis 40 ans, nous incarnons l'excellence du transport privé à Paris. Notre expertise s'est forgée dans l'accompagnement d'une clientèle internationale exigeante, des transferts aéroport aux excursions culturelles.",
    commitment: {
      title: "Notre Engagement",
      items: [
        "Service personnalisé adapté à chaque client",
        "Chauffeurs multilingues sélectionnés pour leur professionnalisme",
        "Véhicules haut de gamme régulièrement renouvelés",
        "Flexibilité et réactivité 24/7"
      ]
    },
    expertise: {
      title: "Notre Expertise",
      items: [
        "Accueil VIP aux aéroports",
        "Organisation d'excursions sur mesure",
        "Accompagnement événementiel",
        "Service de conciergerie transport"
      ]
    },
    conclusion: {
      satisfaction: "La satisfaction de nos clients internationaux témoigne de notre engagement constant pour un service d'exception. Chaque trajet est une occasion de démontrer notre professionnalisme et notre attention aux détails.",
      partnerships: "Nos partenariats de longue date avec des agences de voyage internationales et des hôtels de luxe parisiens reflètent la confiance acquise au fil des années."
    }
  },
  premium: {
    title: "Services Premium",
    exclusive: {
      title: "Services Exclusifs",
      items: [
        "Accueil VIP personnalisé",
        "Chauffeur dédié multilingue",
        "Service conciergerie transport",
        "Flexibilité totale itinéraire"
      ]
    },
    guarantees: {
      title: "Garanties Premium",
      items: [
        "Ponctualité garantie",
        "Véhicules haut de gamme",
        "Assistance 24/7",
        "Meet & Greet aéroport"
      ]
    },
    vip: {
      title: "Options VIP",
      items: [
        "Champagne à bord",
        "Wifi et chargeurs",
        "Choix du véhicule",
        "Guide privé disponible"
      ]
    }
  },
  fleet: {
    title: "Véhicules Disponibles",
    subtitle: "Flotte premium Mercedes-Benz de moins de 3 ans",
    exterior: "Extérieur",
    interior: "Intérieur",
    features: "Caractéristiques incluses",
    passengers: "passagers",
    luggage: "bagages",
    noVehicles: "Aucun véhicule disponible pour le moment",
    vehicleFeatures: {
      wifi: "Wifi gratuit",
      water: "Eau en bouteille",
      airConditioning: "Climatisation individuelle",
      leatherSeats: "Sièges en cuir",
      cleaning: "Nettoyage garanti"
    }
  },
  versailles: {
    title: "Château de Versailles",
    description: "Le Château de Versailles, site du patrimoine mondial de l'UNESCO",
    distance: "23 km de Paris",
    duration: "4-12 heures",
    highlights: [
      "Galerie des Glaces",
      "Jardins Royaux",
      "Grands Appartements"
    ],
    whyVisit: [
      "Site du patrimoine mondial de l'UNESCO",
      "Plus grand palais d'Europe",
      "Histoire de la monarchie française"
    ],
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ"
    }
  },
  footer: {
    description: "Service de transport de luxe et visites exclusives à Paris et ses environs.",
    links: {
      title: "Liens Rapides",
      services: "Services",
      fleet: "Flotte",
      about: "À Propos",
      contact: "Contact",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    },
    schedule: {
      title: "Heures d'Ouverture",
      description: "Service disponible 24h/24, 7j/7"
    },
    payment: {
      title: "Moyens de Paiement Acceptés"
    },
    copyright: " 2025 Paris Elite Services. Tous droits réservés."
  },
  toast: {
    languageChanged: "Langue changée avec succès"
  }
};

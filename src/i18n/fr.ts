import { Translation } from "@/types/i18n";

export const fr: Translation = {
  nav: {
    home: "Accueil",
    services: "Services",
    about: "À Propos",
    contact: "Contact",
    fleet: "Flotte",
    excursions: "Excursions",
    events: "Événements",
    blog: "Blog",
    agencies: "Agences",
    companies: "Entreprises",
  },
  home: {
    b2b: {
      title: "Pour les agences et entreprises",
      desc: "Tarifs B2B, facturation et support dédié.",
      cta: "Voir les options B2B",
    },
  },
  agencies: {
    metaTitle: "Pour les agences de voyages | Tarifs spéciaux à Paris",
    h1: "Travaillez avec nous comme partenaire de confiance",
    intro:
      "Nous collaborons avec des agences du Mexique, du Brésil et d'Amérique latine. Service professionnel, véhicules impeccables et support réactif en espagnol.",
    bullets: {
      volume: "Tarifs spéciaux selon le volume",
      invoicing: "Facturation claire et rapports",
      support: "Support dédié via WhatsApp",
      availability: "Disponibilité 24/7",
    },
    contactHint:
      "Dans votre message, indiquez : Agence + pays + volume estimé.",
    cta: "Demander des tarifs agences",
  },
  companies: {
    metaTitle: "Chauffeur professionnel pour entreprises à Paris",
    h1: "Solutions de mobilité pour votre équipe",
    intro:
      "Transferts, événements et trajets d'entreprise avec ponctualité, discrétion et facturation claire.",
    bullets: {
      billing: "Comptes entreprises et facturation mensuelle",
      routes: "Transferts aéroports, La Défense, gares et salons",
      chauffeurs: "Chauffeurs discrets et bilingues",
      support: "Support 24/7",
    },
    contactHint:
      "Dans votre message, indiquez : Entreprise + transferts par mois + type de service.",
    cta: "Demander une proposition entreprise",
  },
  hero: {
    title: "Chauffeur professionnel a Paris",
    subtitle: "Transferts confortables et prix clairs",
    proofline:
      "Transferts aeroport des 110€ · 24/7 · Meet & Greet · Suivi de vol",
    langProof: "Nous parlons espagnol",
    bullet1: "Ponctualite et chauffeurs professionnels",
    bullet2: "Pour affaires, familles et touristes",
    bullet3: "Reservation rapide, confirmation immediate",
    ctaPrimary: "Obtenir mon devis maintenant",
    ctaSecondary: "Nous contacter",
    selectPickup: "Sélectionner…",
    selectDropoff: "Sélectionner…",
    getInstantQuote: "Obtenir mon devis maintenant",
    fixedPrice: "Prix fixe",
    freeCancellation: "Annulation gratuite",
    support247: "Support 24/7",
    luggageIncluded: "1 bagage/passager inclus",
    licensedInsured: "Licence VTC & assuré",
    freeCancellation24h: "Annulation gratuite 24h",
    viewFleet: "Voir notre flotte premium",
  },
  trustBar: {
    securePayment: "Paiement Sécurisé",
    securePaymentDesc: "Cryptage SSL",
    licensed: "Licencié & Assuré",
    licensedDesc: "Licence VTC officielle",
    available: "Disponible 24/7",
    availableDesc: "Toujours à votre service",
    insurance: "Assurance Complète",
    insuranceDesc: "Couverture totale",
  },
  trust: {
    title: "Confiance & garanties",
    subtitle: "Des standards de service clairs avant votre reservation.",
    items: {
      licensed: {
        title: "Service de chauffeur prive avec licence",
        body: "Service VTC professionnel opere selon la reglementation francaise.",
      },
      pricing: {
        title: "Tarification transparente",
        body: "Devis fixe avant confirmation, sans frais caches.",
      },
      flexibility: {
        title: "Service porte-a-porte flexible",
        body: "Prise en charge privee et ajustements d'itineraire quand possible.",
      },
      payment: {
        title: "Paiement securise et facture",
        body: "Paiement protege avec facture disponible sur demande.",
      },
      support: {
        title: "Support WhatsApp et e-mail",
        body: "Assistance rapide avant la reservation et pendant le trajet.",
      },
    },
  },
  routes: {
    title: "Trajets Populaires",
    subtitle: "Nos destinations les plus demandées à prix fixes",
    cdg: "Aéroport CDG",
    cdgDesc: "Paris ⇄ Charles de Gaulle",
    orly: "Aéroport Orly",
    orlyDesc: "Paris ⇄ Orly",
    disney: "Disneyland Paris",
    disneyDesc: "Journée magique",
    versailles: "Versailles",
    versaillesDesc: "Visite du château royal",
    perTrip: "1-3 passagers",
    bookNow: "Réserver",
    allInclusive: "✓ Tous les prix incluent péages, parking et temps d'attente",
  },
  airports: {
    nav: {
      terminalGuide: "Guide des terminaux",
      whyChooseUs: "Pourquoi nous choisir",
      getPrice: "Obtenir un tarif",
    },
    cta: {
      title: "Besoin d'un tarif aeroport fixe ?",
      subtitle:
        "Reservez en moins d'une minute ou demandez un devis instantane sur WhatsApp.",
      fixedPrice: "Obtenir un tarif fixe",
      whatsapp: "WhatsApp devis instantane",
      mobileFixedPrice: "Obtenir un tarif fixe",
    },
    terminalGuide: {
      title: "Guide des terminaux",
      subtitle:
        "Points de rendez-vous pratiques et conseils de prise en charge pour CDG, Orly et Beauvais.",
      lastUpdated: "Derniere mise a jour :",
      meetPoint: "Point de rendez-vous conseille",
      tips: "Conseils pratiques",
      transferTimeHint: "Temps estime pour se retrouver",
      disclaimer:
        "Les operations des terminaux peuvent evoluer. Suivez toujours la signalisation aeroport et votre confirmation de reservation.",
      airports: {
        cdg: "Charles de Gaulle (CDG)",
        ory: "Paris Orly (ORY)",
        bva: "Beauvais-Tille (BVA)",
      },
      terminals: {
        cdg_t1: {
          name: "Terminal 1",
          airlinesHint:
            "Souvent utilise pour de nombreuses arrivees internationales.",
          meetPoint:
            "Hall public des arrivees pres du point d'information principal.",
          transferTimeHint:
            "Environ 8-12 min de la porte d'arrivee au hall public.",
          tips: {
            tip1: "Envoyez votre statut apres le controle passeport.",
            tip2: "Suivez la signalisation Arrivees et gardez votre telephone actif.",
            tip3: "En cas de retard bagages, informez immediatement votre chauffeur.",
          },
        },
        cdg_t2ac: {
          name: "Terminal 2A-2C",
          airlinesHint: "Flux Schengen et international frequents.",
          meetPoint:
            "Sortie Arrivees la plus proche de votre zone de livraison bagages.",
          transferTimeHint:
            "Environ 6-10 min du couloir d'arrivee au point de rendez-vous.",
          tips: {
            tip1: "Confirmez la lettre exacte du terminal dans votre message.",
            tip2: "Utilisez les sorties Arrivees, pas les niveaux Depart.",
            tip3: "Attendez dans la zone publique proche des panneaux pickup.",
          },
        },
        cdg_t2df: {
          name: "Terminal 2D-2F",
          airlinesHint: "Zones tres frequentees avec plusieurs flux d'arrivee.",
          meetPoint:
            "Zone publique des arrivees proche de la signalisation pickup.",
          transferTimeHint:
            "Environ 8-14 min selon la porte et la livraison bagages.",
          tips: {
            tip1: "Verifiez la lettre du terminal avant de contacter le chauffeur.",
            tip2: "Prenez escalators/ascenseurs vers le niveau Arrivees.",
            tip3: "Restez dans une zone publique eclairee et identifiable.",
          },
        },
        cdg_t2g: {
          name: "Terminal 2G",
          airlinesHint: "Terminal eloigne avec navette de connexion.",
          meetPoint: "Sortie principale publique des arrivees apres navette.",
          transferTimeHint:
            "Environ 12-18 min en incluant le transfert navette.",
          tips: {
            tip1: "Prevoyez un delai supplementaire lie a la navette.",
            tip2: "Gardez les donnees mobiles actives pour les mises a jour.",
            tip3: "Envoyez un message quand vous approchez du hall public Arrivees.",
          },
        },
        cdg_t3: {
          name: "Terminal 3",
          airlinesHint: "Utilise par des vols low-cost et charters.",
          meetPoint: "Devant les portes Arrivees, au point pickup indique.",
          transferTimeHint:
            "Environ 5-9 min de la sortie terminal au point de rendez-vous.",
          tips: {
            tip1: "Sortez cote voirie apres recuperation complete des bagages.",
            tip2: "Verifiez la plaque du vehicule avant de monter.",
            tip3: "En cas d'affluence, utilisez le repere partage par message.",
          },
        },
        ory_123: {
          name: "Orly 1-2-3",
          airlinesHint: "Batiment connecte avec circulation commune.",
          meetPoint:
            "Sortie publique Arrivees proche de la zone officielle pickup.",
          transferTimeHint:
            "Environ 5-10 min de la porte au point de rendez-vous.",
          tips: {
            tip1: "Verifiez si vous arrivez en 1, 2 ou 3 avant la sortie.",
            tip2: "Les escalators peuvent etre charges aux heures de pointe.",
            tip3: "Gardez WhatsApp ouvert pour la coordination finale.",
          },
        },
        ory_4: {
          name: "Orly 4",
          airlinesHint: "Hall dedie avec acces direct aux zones publiques.",
          meetPoint:
            "Zone publique Arrivees proche du point information terminal.",
          transferTimeHint:
            "Environ 6-11 min selon la porte et la livraison bagages.",
          tips: {
            tip1: "Suivez la signalisation Arrivees jusqu'a la zone publique.",
            tip2: "Si vous voyagez en famille, demandez un point proche.",
            tip3: "Informez le chauffeur apres douane et bagages.",
          },
        },
        bva_t1: {
          name: "Terminal 1",
          airlinesHint: "Zone principale pour de nombreux vols low-cost.",
          meetPoint: "Exterieur Arrivees au point pickup convenu.",
          transferTimeHint:
            "Environ 4-8 min entre Arrivees et la zone de prise en charge.",
          tips: {
            tip1: "Beauvais peut etre venteux; prevoyez un vetement adapte.",
            tip2: "Envoyez un message rapide apres recuperation bagages.",
            tip3: "Restez devant le terminal pour un reperage facile.",
          },
        },
        bva_t2: {
          name: "Terminal 2",
          airlinesHint: "Operations low-cost supplementaires selon horaires.",
          meetPoint: "Sortie Arrivees Terminal 2 pres de la voie pickup.",
          transferTimeHint:
            "Environ 4-8 min entre Arrivees et la zone de prise en charge.",
          tips: {
            tip1: "Confirmez le numero de terminal sur votre rappel de reservation.",
            tip2: "Suivez la signalisation officielle pickup avant le parking.",
            tip3: "En cas de mauvais temps, attendez sous zone couverte.",
          },
        },
      },
    },
  },
  exitPopup: {
    title: "Attendez ! Ne Partez Pas Encore",
    subtitle: "Obtenez 10% de Réduction sur Votre Premier Transfert",
    emailPlaceholder: "Votre adresse email",
    button: "OBTENIR MA RÉDUCTION",
    benefit1: "Prix fixe, sans surprises",
    benefit2: "Chauffeur bilingue (Anglais/Français)",
    benefit3: "Annulation gratuite jusqu'à 24h",
    validity: "*Valable pour les réservations dans les 7 prochains jours",
    success: "Vérifiez votre email pour votre code de réduction !",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    invalidEmail: "Veuillez entrer une adresse email valide",
    sending: "Envoi en cours...",
  },
  excursions: {
    title: "Découvrez les Trésors de France",
    subtitle:
      "Explorez les sites les plus emblématiques et les secrets les mieux gardés de France avec nos visites personnalisées",
    cta: "Explorer les Destinations",
    searchPlaceholder: "Rechercher des destinations...",
    viewDetails: "Voir les Détails",
    noResults: "Aucune excursion ne correspond à vos critères",
    clearFilters: "Effacer les Filtres",
    highlights: "Points Forts",
    fromPrice: "À partir de €{price}",
    tourOptionsCount: "{count} options de visite disponibles",
    search: {
      placeholder: "Rechercher des destinations...",
      duration: "Toutes les durées",
      type: "Tous les types",
    },
    card: {
      moreInfo: "Plus d'informations",
      from: "À partir de",
      duration: "Durée",
    },
    filters: {
      duration: {
        halfDay: "Demi-journée",
        fullDay: "Journée complète",
        multiDay: "Plusieurs jours",
      },
      type: {
        private: "Visites privées",
        group: "Visites en groupe",
        luxury: "Expériences de luxe",
      },
      allDurations: "Toutes les durées",
      allTypes: "Tous les types",
      flexible: "Flexible",
      standard: "Standard",
      clearAll: "Tout Effacer",
      price: "Gamme de Prix",
      allPrices: "Tous les prix",
      above: "Au-dessus de",
    },
    types: {
      private: "Privé",
      group: "Groupe",
      luxury: "Luxe",
      standard: "Standard",
      cultural: "Culturel",
      adventure: "Aventure",
      romantic: "Romantique",
      family: "Familial",
    },
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ",
    },
  },
  faq: {
    title: "Questions Fréquentes",
    subtitle: "Trouvez des réponses aux questions courantes sur nos services",
    categories: {
      bookings: "Réservations",
      services: "Services",
      payment: "Paiements",
      vehicles: "Véhicules",
    },
    questions: {
      howToBook: {
        question: "Comment fonctionne le service de réservation ?",
        answer:
          "Notre système de réservation est simple et intuitif. Sélectionnez votre type de service, indiquez vos points de départ et d'arrivée, choisissez la date et l'heure, et complétez vos informations personnelles. Vous recevrez une confirmation immédiate par email.",
      },
      cancellation: {
        question: "Quelle est la politique d'annulation ?",
        answer:
          "Les annulations effectuées 24 heures avant le service sont entièrement remboursées. Pour les annulations plus tardives, des frais peuvent s'appliquer. Contactez-nous pour plus de détails.",
      },
      advanceBooking: {
        question: "Combien de temps à l'avance dois-je réserver ?",
        answer:
          "Nous recommandons de réserver au moins 24 heures à l'avance pour garantir la disponibilité. Pour les services spéciaux ou pendant les périodes de forte affluence, une réservation plus anticipée est conseillée.",
      },
      modifyBooking: {
        question: "Puis-je modifier ma réservation ?",
        answer:
          "Oui, vous pouvez modifier votre réservation jusqu'à 24 heures avant le service. Contactez notre équipe pour effectuer les changements nécessaires.",
      },
      flightDelay: {
        question: "Que se passe-t-il si mon vol est retardé ?",
        answer:
          "Nous surveillons les horaires des vols et ajustons notre service en conséquence, sans frais supplémentaires. Notre chauffeur vous attendra à votre arrivée.",
      },
      airportTransfer: {
        question: "Quel est le processus pour les transferts aéroportuaires ?",
        answer:
          "Notre chauffeur vous attendra dans la zone d'arrivée avec une pancarte à votre nom. Il vous aidera avec vos bagages et vous conduira directement à votre destination.",
      },
      tourGuide: {
        question: "Proposez-vous des services de guide touristique ?",
        answer:
          "Oui, nous proposons des guides professionnels multilingues pour tous nos circuits touristiques. Ils sont experts en histoire et culture locales.",
      },
      privateDriver: {
        question: "Que comprend le service de chauffeur privé ?",
        answer:
          "Notre service de chauffeur privé inclut un véhicule de luxe avec chauffeur professionnel, disponible selon vos besoins. Le service peut être réservé à l'heure, à la journée ou pour plusieurs jours.",
      },
      outsideParis: {
        question: "Faites-vous des excursions en dehors de Paris ?",
        answer:
          "Oui, nous organisons des excursions vers les châteaux de la Loire, Versailles, Giverny, et d'autres destinations populaires autour de Paris.",
      },
      pricesIncluded: {
        question: "Les prix incluent-ils tous les frais ?",
        answer:
          "Oui, nos prix sont tout compris : carburant, péages, taxes et assurance. Il n'y a pas de frais cachés.",
      },
      paymentMethods: {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Nous acceptons les principales cartes de crédit (Visa, MasterCard, American Express), les virements bancaires et les paiements en ligne sécurisés.",
      },
      deposit: {
        question: "Un acompte est-il nécessaire pour réserver ?",
        answer:
          "Pour certains services, un acompte de 30% peut être demandé pour confirmer la réservation. Le solde est payable avant le service.",
      },
      vehicleTypes: {
        question: "Quels types de véhicules proposez-vous ?",
        answer:
          "Notre flotte comprend des berlines de luxe (Mercedes Classe E), des vans (Mercedes Classe V) et des véhicules haut de gamme pour tous vos besoins.",
      },
    },
  },
  contact: {
    title: "Contactez-nous",
    description:
      "Póngase en contacto con nuestro equipo para cualquier consulta o asistencia",
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
    error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
  },
  booking: {
    title: "Réserver Votre Voyage",
    pickup: "Lieu de Prise en Charge",
    dropoff: "Lieu de Dépose",
    pickupPlaceholder: "CDG Terminal 1, 2, 3 ou adresse Paris",
    dropoffPlaceholder: "CDG Terminal 1, 2, 3 ou adresse Paris",
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
    luggagePolicy: {
      title: "Politique de Bagages",
      included:
        "Inclus : 1 grande valise (23kg) + 1 bagage cabine par passager",
      extraLarge:
        "Valises grandes supplémentaires : 15€ chacune (selon capacité du véhicule)",
      extraSmall:
        "Petits bagages gratuits, dans la limite de la capacité du véhicule",
    },
    services: {
      airport: "Transfert Aéroport",
      city: "Visite de la Ville",
      daytrip: "Excursion",
      chauffeur: "Chauffeur Privé",
    },
    serviceLevel: "Niveau de Service",
    priceSummary: "Résumé du Prix",
    validatingPrice: "Validation du prix...",
    payment: {
      title: "Détails du Paiement",
      cardDetails: "Détails de la Carte",
      securePaymentNotice:
        "Votre paiement sera traité de manière sécurisée. Vous recevrez un email de confirmation après la réservation.",
      sessionExpired: "Session expirée",
      sessionExpiredDesc:
        "Veuillez remplir le formulaire de réservation à nouveau.",
      loadingLocations: "Chargement des données de localisation...",
      locationError: "Erreur lors du chargement des données",
      paymentDetails: "Détails du Paiement",
      secureCardIntro:
        "Continuez pour saisir vos coordonnées bancaires de manière sécurisée.",
      acceptTerms: "J'accepte les conditions générales du service",
      confirmAndPay: "Confirmer et Payer",
      pay: "Payer",
      retryPayment: "Réessayer le paiement",
      fixDetails: "Corriger les données",
      processingPayment: "Traitement du paiement...",
      bookingConfirmed: "Réservation confirmée !",
      bookingConfirmedDesc:
        "Votre réservation a été confirmée. Nous vous avons envoyé un email de confirmation.",
      emailWarning:
        "Réservation confirmée mais un problème est survenu lors de l'envoi des emails de confirmation.",
      finalizationError:
        "Une erreur est survenue lors de la finalisation de la réservation.",
      paymentError: "Erreur de paiement",
      incompleteLocationData:
        "Données de localisation incomplètes. Veuillez réessayer.",
      paymentSuccessRedirect: "Paiement effectué ! Redirection...",
    },
    submit: "Réserver",
    submitButton: "Voir Votre Prix Fixe",
    noPaymentRequired:
      "Aucun paiement requis - l'étape suivante affiche votre prix final",
    extras: {
      title: "Services Additionnels",
      tourGuide: "Guide Touristique",
      tourGuideDesc:
        "Guide professionnel qui vous accompagnera pendant la visite",
    },
    vehicle: {
      title: "Sélectionnez votre Véhicule",
      capacity: "passagers",
      luggage: "Bagages",
      berline: "Classe E",
      van: "Classe V",
    },
    groupTransfer: {
      title: "Besoin d'un transfert pour 8+ passagers ?",
      description:
        "Nous organisons des solutions multi-véhicules ou minibus sur demande.",
      cta: "Demander un devis groupe",
    },
    price: {
      total: "Prix Total",
      estimated: "Prix Estimé",
      distance: "Distance estimée",
      basePrice: "Prix de base",
      roundTripIncluded: "*Prix incluant l'aller-retour",
      luggageSurcharge: "Bagages supplémentaires",
      passengerSurcharge: "Supplément groupe (4–7 pax)",
      luggageIncluded: "Inclus : 1 grand + 1 petit par passager",
      selectedLuggage: "Bagages sélectionnés",
    },
    success: {
      title: "Réservation Confirmée !",
      description:
        "Nous vous avons envoyé un email avec les détails de votre réservation",
      confirmationNumber: "Numéro de confirmation :",
      bookingDetails: "Détails de la Réservation",
      route: "Itinéraire",
      pickupDateTime: "Date et Heure de Prise en Charge",
      passengers: "Passagers",
      passenger: "passager",
      luggage: "Bagages",
      largeSuitcase: "grande valise",
      largeSuitcases: "grandes valises",
      smallBag: "petit sac",
      smallBags: "petits sacs",
      totalPaid: "Total Payé :",
      cancellationPolicy: "Politique d'Annulation",
      freeCancellation:
        "Annulation gratuite jusqu'à 24 heures avant la prise en charge",
      partialRefund:
        "Remboursement de 50% pour les annulations 12-24 heures avant la prise en charge",
      noRefund:
        "Aucun remboursement pour les annulations moins de 12 heures avant la prise en charge",
      whatHappensNext: "Que se passe-t-il ensuite ?",
      step1:
        "Vous recevrez un email de confirmation avec tous les détails de la réservation",
      step2:
        "24 heures avant la prise en charge, nous vous enverrons les coordonnées et la photo de votre chauffeur",
      step3:
        "Votre chauffeur suivra votre vol et ajustera l'heure de prise en charge si nécessaire",
      step4:
        "Votre chauffeur vous attendra dans le hall des arrivées avec une pancarte à votre nom",
      addToCalendar: "Ajouter au Calendrier",
      backToHome: "Retour à l'Accueil",
    },
    groupNotice: {
      title: "Groupes de 8+ passagers",
      description:
        "Pour les groupes de 8 passagers ou plus, veuillez nous contacter via WhatsApp pour un devis personnalisé.",
      cta: "Contacter via WhatsApp",
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
    specialInstructionsPlaceholder:
      "Informations supplémentaires pour le chauffeur...",
    errors: {
      invalidEmail: "Email Invalide",
      emailDescription: "Veuillez entrer une adresse email valide",
      invalidName: "Nom Invalide",
      nameDescription: "Veuillez entrer votre nom complet",
      locationsNotLoaded: "Impossible de charger les emplacements",
      selectLocations: "Veuillez sélectionner les lieux de départ et d'arrivée",
      selectDateTime: "Veuillez sélectionner la date et l'heure",
      selectReturnDateTime:
        "Veuillez sélectionner la date et l'heure de retour",
      selectPassengers: "Veuillez spécifier le nombre de passagers",
      noVehiclesAvailable: "Aucun véhicule disponible pour cette réservation",
      bookingCreationError: "Erreur lors de la création de la réservation",
      acceptTerms: "Veuillez accepter les conditions générales",
      paymentIntentError:
        "Erreur lors de la création du paiement. Veuillez réessayer.",
      generalPaymentError: "Une erreur s'est produite lors du paiement",
      missingIds: "Informations de réservation ou de paiement manquantes",
      finalizationError: "Erreur lors de la finalisation de la réservation",
      noBookingData: "Aucune donnée de réservation trouvée",
      requiredFields: "Veuillez remplir tous les champs obligatoires",
      vehicleUnavailable:
        "Ce véhicule est déjà réservé pour ce créneau. Veuillez choisir un autre horaire ou véhicule.",
      invalidPassengerInfo: "Informations passager non valides",
      invalidPhone: "Numéro de téléphone invalide",
      serviceLevelsNotLoaded: "Impossible de charger les niveaux de service",
      selectServiceLevel: "Veuillez sélectionner un niveau de service",
      priceStale: "Le prix a changé. Veuillez vérifier le nouveau prix.",
      networkError:
        "Erreur réseau. Veuillez vérifier votre connexion et réessayer.",
    },
    summary: {
      title: "Résumé de la Réservation",
      journey: "Détails du Trajet",
      schedule: "Horaire",
      vehicle: "Détails du Véhicule",
      luggage: "Bagages",
      contact: "Informations de Contact",
      total: "Montant Total",
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
      phone: "Téléphone",
    },
    coupon: {
      label: "Code de Réduction",
      placeholder: "Entrez votre code de réduction",
      apply: "Appliquer",
      remove: "Retirer",
      applied: "Réduction appliquée",
      discount: "Réduction",
    },
    couponApplied: "Code promo appliqué !",
    invalidCoupon: "Code promo invalide",
    couponExpired: "Ce code promo est invalide ou a expiré.",
    couponError: "Échec de la validation du code. Veuillez réessayer.",
    couponRemoved: "Code promo retiré",
    couponRemovedDesc: "La réduction a été retirée de votre réservation.",
  },
  common: {
    back: "Retour",
    continue: "Continuer",
    processing: "Traitement...",
    error: "Erreur",
    from: "De",
    sending: "Envoi...",
    warning: "Avertissement",
  },
  services: {
    title: "Nos services",
    subtitle:
      "Transferts fiables et tours prives avec tarifs clairs. Transferts gares et intra-Paris des 70€.",
    decorativeSubtitle: "Service professionnel et fiable",
    cta: "Voir les options",
    groupDisclaimer:
      "Pour les groupes de 8+ passagers, veuillez nous contacter",
    airport: {
      title: "Transferts aeroport",
      description:
        "CDG · Orly · Beauvais -> votre hotel. Des 110€ avec Meet & Greet, suivi de vol et prix fixe. Le tarif varie selon aeroport, zone et nombre de passagers.",
      cta: "Obtenir un devis",
      priceFrom: "À partir de 110€",
      features: [
        "Service d'Accueil",
        "Suivi des Vols",
        "Temps d'Attente Gratuit",
        "1 Bagage/Pax Inclus",
        "Chauffeurs Professionnels",
      ],
    },
    chauffeur: {
      title: "Chauffeur a l'heure",
      description:
        "Transferts gares et intra-Paris des 70€. Service chauffeur a l'heure des 70€/heure.",
      cta: "Reserver a l'heure",
      priceFrom: "A partir de 70€/heure",
      features: [
        "Réservation à l'Heure Disponible",
        "Disponibilité 24/7",
        "Service Multilingue",
        "Itinéraires et Arrêts Personnalisés",
      ],
    },
    cityTours: {
      title: "Tours prives",
      description: "Avec ou sans guide. Adapte a vos besoins.",
      cta: "Voir les options",
      priceFrom: "Sur devis",
      features: [
        "Itinéraires Personnalisés",
        "Chauffeurs Professionnels",
        "Véhicules Premium",
        "Mercedes Classe E et Classe V",
      ],
    },
    dayTrips: {
      title: "Excursions",
      description:
        "Explorez au-delà de Paris avec des excursions personnalisées vers des destinations françaises.",
    },
    dropdown: {
      transfers: "Service de Transfert Aéroport",
      chauffeur: "Chauffeur à l'Heure",
      excursions: "Excursions",
    },
  },
  about: {
    title: "À Propos de Paris Elite Services",
    subtitle: "L'Excellence du Transport Privé à Paris",
    years: "40 ans d'expertise",
    description:
      "Depuis 40 ans, nous incarnons l'excellence du transport privé à Paris. Notre expertise s'est forgée dans l'accompagnement d'une clientèle internationale exigeante, des transferts aéroport aux excursions culturelles.",
    commitment: {
      title: "Notre Engagement",
      items: [
        "Service personnalisé adapté à chaque client",
        "Chauffeurs multilingues sélectionnés pour leur professionnalisme",
        "Véhicules haut de gamme régulièrement renouvelés",
        "Flexibilité et réactivité 24/7",
      ],
    },
    expertise: {
      title: "Notre Expertise",
      items: [
        "Accueil VIP aux aéroports",
        "Organisation d'excursions sur mesure",
        "Accompagnement événementiel",
        "Service de conciergerie transport",
      ],
    },
    conclusion: {
      satisfaction:
        "La satisfaction de nos clients internationaux témoigne de notre engagement constant pour un service d'exception. Chaque trajet est une occasion de démontrer notre professionnalisme et notre attention aux détails.",
      partnerships:
        "Nos partenariats de longue date avec des agences de voyage internationales et des hôtels de luxe parisiens reflètent la confiance acquise au fil des années.",
    },
  },
  premium: {
    title: "Services Premium",
    exclusive: {
      title: "Services Exclusifs",
      items: [
        "Accueil VIP personnalisé",
        "Chauffeur dédié multilingue",
        "Service conciergerie transport",
        "Flexibilité totale itinéraire",
      ],
    },
    guarantees: {
      title: "Garanties Premium",
      items: [
        "Ponctualité garantie",
        "Véhicules haut de gamme",
        "Assistance 24/7",
        "Meet & Greet aéroport",
      ],
    },
    vip: {
      title: "Options VIP",
      items: [
        "Champagne à bord",
        "Wifi et chargeurs",
        "Choix du véhicule",
        "Guide privé disponible",
      ],
    },
  },
  fleet: {
    label: "Notre flotte",
    title: "Véhicules Disponibles",
    subtitle: "Flotte Mercedes-Benz moderne et confortable.",
    exterior: "Extérieur",
    interior: "Intérieur",
    features: "Caractéristiques incluses",
    passengers: "passagers",
    luggage: "Bagages",
    bookNow: "Réserver Maintenant",
    noVehicles: "Aucun véhicule disponible pour le moment",
    vehicleFeatures: {
      wifi: "Wifi gratuit",
      water: "Eau en bouteille",
      airConditioning: "Climatisation individuelle",
      leatherSeats: "Sièges en cuir",
      cleaning: "Nettoyage garanti",
    },
  },
  versailles: {
    title: "Château de Versailles",
    description:
      "Le Château de Versailles, site du patrimoine mondial de l'UNESCO",
    distance: "23 km de Paris",
    duration: "4-12 heures",
    highlights: ["Galerie des Glaces", "Jardins Royaux", "Grands Appartements"],
    whyVisit: [
      "Site du patrimoine mondial de l'UNESCO",
      "Plus grand palais d'Europe",
      "Histoire de la monarchie française",
    ],
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ",
    },
  },
  loire: {
    title: "Châteaux de la Loire",
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ",
    },
  },
  champagne: {
    title: "Région Champagne",
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ",
    },
  },
  giverny: {
    title: "Giverny & Honfleur",
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
    navigation: {
      description: "Vue d'ensemble",
      tours: "Nos Visites",
      map: "Comment s'y rendre",
      events: "Événements",
      faq: "FAQ",
    },
  },
  footer: {
    description:
      "Transferts privés à Paris et en région. Solutions pour agences et entreprises.",
    links: {
      title: "Liens Rapides",
      services: "Services",
      fleet: "Flotte",
      about: "À Propos",
      contact: "Contact",
      travelGuides: "Guides de Voyage",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      faq: "FAQ",
    },
    schedule: {
      title: "Heures d'Ouverture",
      description: "Service disponible 24h/24, 7j/7",
    },
    payment: {
      title: "Moyens de Paiement Acceptés",
    },
    copyright: " 2025 Paris Elite Services. Tous droits réservés.",
  },
  toast: {
    languageChanged: "Langue changée avec succès",
  },
  avoidFakeTaxis: {
    badge: "Guide de Sécurité",
    hero: {
      title:
        "Faux Taxis aux Aéroports de Paris : Comment Éviter les Arnaques et Réserver un Transfert Sûr",
      subtitle:
        "Des milliers de touristes sont victimes d'arnaques de faux taxis à CDG et Orly chaque année. Apprenez à les repérer et choisissez un transfert agréé à prix fixe.",
    },
    problem: {
      title: "Le Problème est Réel",
      paragraph1:
        "Vous venez d'atterrir à Charles de Gaulle après un long vol. Vous êtes fatigué, vous avez des bagages et vous voulez juste arriver à votre hôtel. À la sortie des arrivées, quelqu'un vous aborde en proposant un 'taxi' à un prix avantageux. Ça semble pratique, non ? Faux.",
      paragraph2:
        "C'est ainsi que des milliers de touristes se font arnaquer chaque année dans les aéroports parisiens. L'arnaque au faux taxi est l'un des pièges à touristes les plus courants à Paris, coûtant aux victimes des centaines d'euros et gâchant leur première impression de la ville.",
    },
    howScamWorks: {
      title: "Comment Fonctionne l'Arnaque",
      paragraph1:
        "Les chauffeurs de faux taxis ciblent les touristes à CDG, Orly et Beauvais. Ils portent de faux badges, utilisent des voitures non marquées et proposent des prix bas pour vous attirer.",
      paragraph2:
        "Une fois dans la voiture, ils prennent des itinéraires plus longs, prétendent que le compteur est 'cassé' ou exigent 3 à 4 fois le tarif normal. Certains menacent même les passagers qui refusent de payer. Quand vous réalisez ce qui se passe, vous êtes déjà dans la voiture et loin de l'aéroport.",
    },
    redFlags: {
      title: "Signaux d'Alerte à Surveiller",
      flag1: {
        title: "Le chauffeur vous aborde à l'intérieur du terminal",
        description:
          "Les vrais taxis attendent aux stations officielles à l'extérieur. Si quelqu'un vous aborde à l'intérieur en proposant un taxi, c'est une arnaque.",
      },
      flag2: {
        title: "Pas de compteur ou de licence officielle affichée",
        description:
          "Tout taxi légal à Paris doit avoir un compteur visible et un numéro de licence.",
      },
      flag3: {
        title: 'La voiture n\'a pas de panneau lumineux "TAXI PARISIEN"',
        description:
          "Les taxis officiels ont un panneau lumineux sur le toit. Pas de panneau = pas un vrai taxi.",
      },
      flag4: {
        title:
          'Le chauffeur insiste sur le paiement en espèces et propose un "prix spécial"',
        description:
          "La loi française oblige les taxis à accepter les cartes. Espèces uniquement est un signal d'alerte majeur.",
      },
      flag5: {
        title: "Véhicule non marqué ou avec des panneaux manuscrits",
        description:
          "Les taxis officiels ont une signalétique professionnelle. Les panneaux manuscrits sont une arnaque.",
      },
    },
    protection: {
      title: "Comment Vous Protéger",
      intro: "Si vous devez prendre un taxi à l'aéroport :",
      tip1: 'Utilisez uniquement les stations de taxis officielles (suivez les panneaux "TAXI")',
      tip2: "Vérifiez que le véhicule a un panneau lumineux et un compteur",
      tip3: "Demandez une estimation avant de monter",
      tip4: "Insistez pour payer par carte (obligation légale en France)",
      betterOption:
        "Meilleure option : Réservez un transfert privé agréé à l'avance avec un prix fixe.",
    },
    whyVTC: {
      title: "Pourquoi un Transfert VTC Agréé est l'Alternative Sûre",
      intro:
        "Contrairement aux taxis de rue, les services VTC (voiture de transport avec chauffeur) agréés comme Paris Elite Services offrent :",
      benefit1: {
        title: "Prix fixe confirmé avant votre voyage",
        description: "Pas de surprises, pas de tours de compteur",
      },
      benefit2: {
        title: "Chauffeurs professionnels vérifiés",
        description: "Conducteurs avec vérification d'antécédents",
      },
      benefit3: {
        title: "Suivi des vols",
        description: "Le chauffeur attend même si votre vol est retardé",
      },
      benefit4: {
        title: "Service d'accueil personnalisé",
        description: "Le chauffeur attend aux arrivées avec votre nom",
      },
      benefit5: {
        title: "Véhicules premium",
        description: "Mercedes Classe E, vans spacieux pour familles",
      },
      benefit6: {
        title: "Support client 24/7",
        description: "WhatsApp, email, téléphone",
      },
    },
    pricing: {
      title: "Ce Que Vous Devriez Réellement Payer",
      intro:
        "Voici ce que vous devriez vous attendre à payer pour un transfert sûr et agréé depuis les aéroports parisiens :",
      tableHeaders: {
        route: "Trajet",
        passengers1to3: "1-3 Passagers",
        passengers4to7: "4-7 Passagers",
      },
      routes: {
        cdg: "Aéroport CDG → Paris",
        orly: "Aéroport Orly → Paris",
        beauvais: "Aéroport Beauvais → Paris",
      },
      warning:
        "⚠️ Attention : Si quelqu'un vous propose €30-40 pour CDG-Paris, c'est soit une arnaque, soit ils ajouteront des frais cachés plus tard. Le tarif officiel de taxi depuis CDG vers Paris est d'environ €50-60, et un VTC agréé avec prix fixe est €70.",
    },
    cta: {
      title: "Ne Risquez Pas Votre Arrivée à Paris",
      subtitle:
        "Réservez votre transfert d'aéroport sûr et agréé maintenant avec des prix fixes et un service professionnel.",
      bookNow: "Voir les Prix et Réserver",
      whatsapp: "Nous Contacter par WhatsApp",
      groupsNotice:
        "Pour les groupes de 8+ passagers ou demandes spéciales, contactez-nous via WhatsApp : +33 6 68 25 11 02",
    },
  },
  blog: {
    title: "Blog de Voyage",
    subtitle:
      "Conseils d'experts, guides et informations pour votre voyage à Paris",
    heroTitle: "Blog de Voyage",
    heroSubtitle:
      "Conseils d'experts, guides et informations pour votre voyage à Paris",
    searchPlaceholder: "Rechercher des articles...",
    featured: "Articles en Vedette",
    allArticles: "Tous les Articles",
    categoryArticles: "Articles",
    noArticles:
      "Aucun article trouvé. Essayez une autre recherche ou catégorie.",
    noArticlesFound:
      "Aucun article trouvé. Essayez un autre terme de recherche.",
    relatedArticles: "Articles Connexes",
    needTransfer: "Besoin d'un transfert ?",
    calculatePrice: "Obtenez un devis instantané pour votre transfert",
    getQuote: "Obtenir un Devis",
    bookNow: "Réserver Maintenant",
    readyToBook: "Prêt à Réserver Votre Transfert ?",
    professionalService: "Service de chauffeur professionnel",
    freeCancellation: "Annulation gratuite jusqu'à 24h",
    flightMonitoring: "Suivi de vol inclus",
    premiumVehicles: "Véhicules premium (Mercedes, BMW)",
    sidebar: {
      quickQuote: "Devis Rapide",
      quickQuoteDesc: "Obtenez un prix instantané pour votre transfert",
      calculatePrice: "Calculer le Prix",
      whatsapp: "Devis WhatsApp",
      popularRoutes: "Routes Populaires",
      fixedPrices: "Prix fixes • Sans frais cachés",
      available247: "Disponible 24/7",
      flightTracking: "Suivi de vol inclus",
      freeCancellation: "Annulation gratuite 24h",
      premiumVehicles: "Véhicules premium",
    },
    newsletter: {
      title: "Recevez des Conseils de Voyage et des Offres Exclusives",
      description:
        "Abonnez-vous à notre newsletter et recevez un code de réduction de 10% pour votre première réservation, ainsi que des conseils d'initiés pour voyager à Paris.",
      subscribe: "S'abonner",
      privacy:
        "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
    },
  },
  events: {
    pageTitle: "Événements à Paris | Paris Luxe Journey",
    pageDescription:
      "Découvrez les meilleurs événements, concerts, expositions et activités à Paris cette semaine et ce mois. Réservez votre transfert de luxe pour tout événement.",
    heroTitle: "Événements à Paris",
    heroSubtitle:
      "Découvrez les meilleurs concerts, expositions, spectacles et événements culturels à Paris. Réservez votre transfert de luxe pour arriver avec style.",
    liveUpdates: "Mises à Jour en Direct",
    navigation: "Navigation",
    comingSoon: "Bientôt",
    planAhead: "Planifiez à l'Avance",
    thisWeek: "Cette Semaine à Paris",
    thisMonth: "Ce Mois à Paris",
    bookTransfer: "Réserver un Transfert",
    readGuides: "Lire les Guides",
    ctaTitle: "Besoin d'un Transfert pour Votre Événement ?",
    ctaDescription:
      "Réservez un transfert de luxe pour tout événement à Paris. Chauffeur professionnel, véhicules premium, prix fixes.",
    bookNow: "Réserver Maintenant",
    noEvents: "Aucun événement disponible pour le moment.",
    updatedOn: "Mis à jour le",
    sourcesVerified: "Sources officielles verifiees",
    featured: "En Vedette",
    bookRide: "Réserver un Transfert",
    officialDetails: "Détails Officiels",
    source: "Source",
    getQuote: "Demander un Devis",
    whatsappMicrocopy: "Nous répondons vite sur WhatsApp",
    ctaWhatsApp: "Demander un Devis sur WhatsApp",
    ctaEmail: "Nous Écrire",
  },
  seo: {
    home: {
      title: "Transfert Aéroport Paris VTC Luxe | CDG, Orly | À partir de 70€",
      description:
        "Service de transfert aéroport premium à Paris. Réservez votre chauffeur privé pour CDG, Orly ou transferts en ville. Prix fixes dès 70€, disponibilité 24/7, véhicules de luxe.",
    },
    airports: {
      title:
        "Transferts aéroports Paris | Guide terminaux CDG, Orly et Beauvais",
      description:
        "Transferts privés aéroport à Paris avec tarif fixe, guide pratique des points de rendez-vous à CDG, Orly et Beauvais, et assistance chauffeur 24/7.",
    },
  },
};

export type Language = "en" | "fr" | "es" | "pt";

export interface Translation {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    fleet: string;
    excursions: string;
    events: string;
    blog: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  common: {
    back: string;
    continue: string;
    processing: string;
    error: string;
    from: string;
    sending: string;
    warning: string;
  };
  excursions: {
    title: string;
    subtitle: string;
    cta: string;
    searchPlaceholder: string;
    viewDetails: string;
    noResults: string;
    clearFilters: string;
    highlights: string;
    fromPrice: string;
    tourOptionsCount: string;
    search: {
      placeholder: string;
      duration: string;
      type: string;
    };
    card: {
      moreInfo: string;
      from: string;
      duration: string;
    };
    filters: {
      duration: {
        halfDay: string;
        fullDay: string;
        multiDay: string;
      };
      type: {
        private: string;
        group: string;
        luxury: string;
      };
      allDurations: string;
      allTypes: string;
      flexible: string;
      standard: string;
      clearAll: string;
      price: string;
      allPrices: string;
      above: string;
    };
    types: {
      [key: string]: string;
    };
    navigation: {
      description: string;
      tours: string;
      map: string;
      events: string;
      faq: string;
    };
  };
  contact: {
    title: string;
    description: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    name: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    success: string;
    successDescription: string;
    error: string;
  };
  trustBar: {
    securePayment: string;
    securePaymentDesc: string;
    licensed: string;
    licensedDesc: string;
    available: string;
    availableDesc: string;
    insurance: string;
    insuranceDesc: string;
  };
  routes: {
    title: string;
    subtitle: string;
    cdg: string;
    cdgDesc: string;
    orly: string;
    orlyDesc: string;
    disney: string;
    disneyDesc: string;
    versailles: string;
    versaillesDesc: string;
    perTrip: string;
    bookNow: string;
    allInclusive: string;
  };
  fleet: {
    title: string;
    subtitle: string;
    exterior: string;
    interior: string;
    bookNow: string;
    features: string;
    passengers: string;
    luggage: string;
    noVehicles: string;
    vehicleFeatures: {
      wifi: string;
      water: string;
      airConditioning: string;
      leatherSeats: string;
      cleaning: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    categories: {
      bookings: string;
      services: string;
      payment: string;
      vehicles: string;
    };
    questions: Record<
      string,
      {
        question: string;
        answer: string;
      }
    >;
  };
  footer: {
    description: string;
    companyName?: string;
    links: {
      title: string;
      services: string;
      fleet: string;
      about: string;
      contact: string;
      travelGuides: string;
      privacy: string;
      terms: string;
    };
    schedule: {
      title: string;
      description: string;
      note?: string;
    };
    payment: {
      title: string;
    };
    copyright: string;
  };
  services: {
    title: string;
    subtitle: string;
    decorativeSubtitle: string;
    cta: string;
    groupDisclaimer: string;
    airport: {
      title: string;
      description: string;
      priceFrom: string;
      features: string[];
    };
    chauffeur: {
      title: string;
      description: string;
      priceFrom: string;
      features: string[];
    };
    cityTours: {
      title: string;
      description: string;
      priceFrom: string;
      features: string[];
    };
    dayTrips: {
      title: string;
      description: string;
    };
    dropdown: {
      transfers: string;
      chauffeur: string;
      excursions: string;
    };
  };
  versailles: {
    title: string;
    description: string;
    distance: string;
    duration: string;
    highlights: string[];
    whyVisit: string[];
    navigation: {
      description: string;
      tours: string;
      map: string;
      events: string;
      faq: string;
    };
  };
  premium: {
    title: string;
    subtitle?: string;
    exclusive: {
      title: string;
      items: string[];
    };
    guarantees: {
      title: string;
      items: string[];
    };
    vip: {
      title: string;
      items: string[];
    };
  };
  about: {
    title: string;
    description: string;
    subtitle: string;
    years: string;
    commitment: {
      title: string;
      items: string[];
    };
    expertise: {
      title: string;
      items: string[];
    };
    conclusion: {
      satisfaction: string;
      partnerships: string;
    };
  };
  booking: {
    title: string;
    pickup: string;
    dropoff: string;
    pickupPlaceholder: string;
    dropoffPlaceholder: string;
    swapLocations?: string;
    date: string;
    time: string;
    returnDate: string;
    returnTime: string;
    passengers: string;
    service: string;
    tripType: string;
    oneWay: string;
    roundTrip: string;
    continue: string;
    assignedVehicles: string;
    largeLuggage: string;
    smallLuggage: string;
    maxWeight: string;
    serviceLevel: string;
    priceSummary: string;
    validatingPrice: string;
    luggagePolicy: {
      title: string;
      included: string;
      extraLarge: string;
      extraSmall: string;
    };
    services: {
      airport: string;
      city: string;
      daytrip: string;
      chauffeur: string;
    };
    payment: {
      title: string;
      cardDetails: string;
    };
    submit: string;
    submitButton?: string;
    noPaymentRequired?: string;
    extras: {
      title: string;
      tourGuide: string;
      tourGuideDesc: string;
    };
    couponError: string;
    couponRemoved: string;
    couponRemovedDesc: string;
    vehicle: {
      title: string;
      capacity: string;
      luggage: string;
      berline: string;
      van: string;
    };
    groupTransfer: {
      title: string;
      description: string;
      cta: string;
    };
    price: {
      total: string;
      estimated: string;
      distance: string;
      basePrice: string;
      roundTripIncluded: string;
    };
    summary: {
      title: string;
      journey: string;
      schedule: string;
      vehicle: string;
      luggage: string;
      contact: string;
      total: string;
    };
    form: {
      from: string;
      to: string;
      vehicleType: string;
      passengers: string;
      largeLuggage: string;
      smallLuggage: string;
      name: string;
      email: string;
      phone: string;
    };
    success: {
      title: string;
      description: string;
      confirmationNumber: string;
      bookingDetails: string;
      addToCalendar: string;
      backToHome: string;
    };
    groupNotice: {
      title: string;
      description: string;
      cta: string;
    };
    passengerDetails: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    flightNumber: string;
    flightNumberPlaceholder: string;
    specialInstructions: string;
    specialInstructionsPlaceholder: string;
    errors: {
      invalidEmail: string;
      emailDescription: string;
      invalidName: string;
      nameDescription: string;
      locationsNotLoaded: string;
      locationNotFound?: string;
      selectLocations: string;
      selectDateTime: string;
      selectReturnDateTime: string;
      selectPassengers: string;
      noVehiclesAvailable: string;
      bookingCreationError: string;
      acceptTerms: string;
      paymentIntentError: string;
      generalPaymentError: string;
      missingIds: string;
      finalizationError: string;
      noBookingData: string;
      requiredFields: string;
      invalidPassengerInfo: string;
      invalidPhone: string;
      serviceLevelsNotLoaded: string;
      selectServiceLevel: string;
      priceStale: string;
      networkError: string;
    };
  };
  toast: {
    languageChanged: string;
  };
  avoidFakeTaxis: {
    badge: string;
    hero: {
      title: string;
      subtitle: string;
    };
    problem: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    howScamWorks: {
      title: string;
      paragraph1: string;
      paragraph2: string;
    };
    redFlags: {
      title: string;
      flag1: {
        title: string;
        description: string;
      };
      flag2: {
        title: string;
        description: string;
      };
      flag3: {
        title: string;
        description: string;
      };
      flag4: {
        title: string;
        description: string;
      };
      flag5: {
        title: string;
        description: string;
      };
    };
    protection: {
      title: string;
      intro: string;
      tip1: string;
      tip2: string;
      tip3: string;
      tip4: string;
      betterOption: string;
    };
    whyVTC: {
      title: string;
      intro: string;
      benefit1: {
        title: string;
        description: string;
      };
      benefit2: {
        title: string;
        description: string;
      };
      benefit3: {
        title: string;
        description: string;
      };
      benefit4: {
        title: string;
        description: string;
      };
      benefit5: {
        title: string;
        description: string;
      };
      benefit6: {
        title: string;
        description: string;
      };
    };
    pricing: {
      title: string;
      intro: string;
      tableHeaders: {
        route: string;
        passengers1to3: string;
        passengers4to7: string;
      };
      routes: {
        cdg: string;
        orly: string;
        beauvais: string;
      };
      warning: string;
    };
    cta: {
      title: string;
      subtitle: string;
      bookNow: string;
      whatsapp: string;
      groupsNotice: string;
    };
  };
}

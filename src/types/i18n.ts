export type Language = 'en' | 'fr' | 'es' | 'pt';

export interface Translation {
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    fleet: string;
    excursions: string;
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
  };
  excursions: {
    title: string;
    subtitle: string;
    cta: string;
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
  fleet: {
    title: string;
    subtitle: string;
    exterior: string;
    interior: string;
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
    categories: {
      bookings: string;
      services: string;
      payment: string;
      vehicles: string;
    };
    questions: Record<string, {
      question: string;
      answer: string;
    }>;
  };
  footer: {
    description: string;
    links: {
      title: string;
      services: string;
      fleet: string;
      about: string;
      contact: string;
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
    airport: {
      title: string;
      description: string;
    };
    chauffeur: {
      title: string;
      description: string;
    };
    cityTours: {
      title: string;
      description: string;
    };
    dayTrips: {
      title: string;
      description: string;
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
    extras: {
      title: string;
      tourGuide: string;
      tourGuideDesc: string;
    };
    vehicle: {
      title: string;
      capacity: string;
      luggage: string;
      berline: string;
      van: string;
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
    }
  };
  toast: {
    languageChanged: string;
  };
}

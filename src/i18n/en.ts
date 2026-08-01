import { Translation } from "@/types/i18n";

export const en: Translation = {
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    fleet: "Fleet",
    excursions: "Excursions",
    events: "Events",
    blog: "Blog",
    agencies: "Agencies",
    companies: "Companies",
  },
  home: {
    b2b: {
      title: "For agencies and companies",
      desc: "B2B rates, invoicing, and dedicated support.",
      cta: "View B2B options",
    },
    events: {
      title: "Upcoming Events in Paris",
      seeAll: "See all events →",
      fallback:
        "Planning to attend an event in Paris? Contact us for a private transfer.",
    },
    excursions: {
      title: "Day Trips from Paris",
      seeAll: "Explore all excursions →",
      from: "from",
    },
  },
  agencies: {
    metaTitle: "For travel agencies | Special rates in Paris",
    h1: "Work with us as your trusted partner",
    intro:
      "We collaborate with agencies in Mexico, Brazil, and Latin America. Professional service, impeccable vehicles, and responsive support in Spanish.",
    bullets: {
      volume: "Special volume rates",
      invoicing: "Clear invoicing and reports",
      support: "Dedicated WhatsApp support",
      availability: "24/7 availability",
    },
    contactHint:
      "In your message, include: Agency + country + estimated volume.",
    cta: "Request agency rates",
  },
  companies: {
    metaTitle: "Professional chauffeur services for companies in Paris",
    h1: "Mobility solutions for your team",
    intro:
      "Transfers, events, and corporate rides with punctuality, discretion, and clear invoicing.",
    bullets: {
      billing: "Corporate accounts and monthly invoicing",
      routes: "Transfers for airports, La Défense, stations, and trade fairs",
      chauffeurs: "Discreet bilingual chauffeurs",
      support: "24/7 support",
    },
    contactHint:
      "In your message, include: Company + transfers per month + service type.",
    cta: "Request a corporate proposal",
  },
  hero: {
    title: "Private chauffeur service, tailored to your Paris journey",
    subtitle:
      "Airport transfers, private tours and hourly service. Send your request — we confirm availability and price within 2 hours.",
    humanSignal: "A Paris-based team confirms every request",
    proofline: "",
    langProof: "English · Español · Français",
    bullet1: "Licensed VTC chauffeur",
    bullet2: "Confirmed price, no surprises",
    bullet3: "Available 24/7",
    ctaPrimary: "Plan my private transfer",
    ctaSecondary: "Explore events & excursions",
    labelPickup: "Pick-up",
    labelDropoff: "Drop-off",
    selectPickup: "Origin",
    selectDropoff: "Destination",
    getInstantQuote: "Request a transfer",
    fixedPrice: "Fixed Price",
    freeCancellation: "Free Cancellation",
    support247: "24/7 Support",
    luggageIncluded: "1 Luggage/Pax Included",
    licensedInsured: "Licensed & Insured",
    freeCancellation24h: "Free Cancellation 24h",
    viewFleet: "View Our Premium Fleet",
  },
  trustBar: {
    securePayment: "Secure Payment",
    securePaymentDesc: "SSL encrypted",
    licensed: "Licensed & Insured",
    licensedDesc: "Official VTC license",
    available: "24/7 Available",
    availableDesc: "Always at your service",
    insurance: "Full Insurance",
    insuranceDesc: "Complete coverage",
  },
  trust: {
    title: "Trust & Guarantees",
    subtitle: "Clear service standards before you book.",
    items: {
      licensed: {
        title: "Licensed private chauffeur service",
        body: "Professional VTC service operated under French transport rules.",
      },
      pricing: {
        title: "Transparent pricing",
        body: "Fixed quote before confirmation with no hidden fees.",
      },
      flexibility: {
        title: "Door-to-door flexibility",
        body: "Private pickup and drop-off with itinerary adjustments when feasible.",
      },
      payment: {
        title: "Secure payment and invoice",
        body: "Protected checkout with invoice available on request.",
      },
      support: {
        title: "WhatsApp and email support",
        body: "Fast pre-booking support and trip updates through our channels.",
      },
    },
  },
  routes: {
    title: "Popular Routes",
    subtitle: "Our most requested destinations with fixed prices",
    cdg: "CDG Airport",
    cdgDesc: "Paris ⇄ Charles de Gaulle",
    orly: "Orly Airport",
    orlyDesc: "Paris ⇄ Orly",
    disney: "Disneyland Paris",
    disneyDesc: "Magical day trip",
    versailles: "Versailles",
    versaillesDesc: "Royal palace tour",
    perTrip: "1-3 passengers",
    bookNow: "Book Now",
    allInclusive: "✓ All prices include tolls, parking & waiting time",
  },
  airports: {
    nav: {
      terminalGuide: "Terminal Guide",
      whyChooseUs: "Why Choose Us",
      getPrice: "Get Price",
    },
    cta: {
      title: "Need a fixed airport transfer quote?",
      subtitle:
        "Book in under a minute or request an instant WhatsApp quote from our team.",
      fixedPrice: "Get a Fixed Price",
      whatsapp: "WhatsApp instant quote",
      mobileFixedPrice: "Get a Fixed Price",
    },
    terminalGuide: {
      title: "Terminal Guide",
      subtitle:
        "Practical meeting points and pickup notes for CDG, Orly, and Beauvais.",
      lastUpdated: "Last updated:",
      meetPoint: "Best meet point",
      tips: "Practical tips",
      transferTimeHint: "Estimated meeting time",
      disclaimer:
        "Terminal operations can change. Always follow airport signage and your booking confirmation.",
      airports: {
        cdg: "Charles de Gaulle (CDG)",
        ory: "Paris Orly (ORY)",
        bva: "Beauvais-Tille (BVA)",
      },
      terminals: {
        cdg_t1: {
          name: "Terminal 1",
          airlinesHint: "Common for many international arrivals.",
          meetPoint: "Public arrivals hall near the main information point.",
          transferTimeHint: "Approx. 8-12 min from gate to arrivals.",
          tips: {
            tip1: "Share your landing status once you clear passport control.",
            tip2: "Follow Arrivals signage and keep your phone reachable.",
            tip3: "If baggage is delayed, inform your driver immediately.",
          },
        },
        cdg_t2ac: {
          name: "Terminal 2A-2C",
          airlinesHint: "Frequent Schengen and international operations.",
          meetPoint: "Arrivals exit closest to your baggage carousel section.",
          transferTimeHint:
            "Approx. 6-10 min from arrivals corridor to meet point.",
          tips: {
            tip1: "Confirm your exact terminal letter in your booking message.",
            tip2: "Use designated arrivals exits, not departure levels.",
            tip3: "Wait in the public area closest to official pickup signs.",
          },
        },
        cdg_t2df: {
          name: "Terminal 2D-2F",
          airlinesHint: "High-volume areas with multiple arrival flows.",
          meetPoint: "Public arrivals area near official pickup signage.",
          transferTimeHint: "Approx. 8-14 min depending on gate and baggage.",
          tips: {
            tip1: "Check terminal letter after landing before messaging driver.",
            tip2: "Use elevators/escalators to reach arrivals level directly.",
            tip3: "Stay in well-lit public zones with clear terminal markers.",
          },
        },
        cdg_t2g: {
          name: "Terminal 2G",
          airlinesHint: "Remote terminal with shuttle connections.",
          meetPoint: "Main public arrivals exit after shuttle drop-off.",
          transferTimeHint: "Approx. 12-18 min including shuttle transfer.",
          tips: {
            tip1: "Allow extra time due shuttle transfer from aircraft area.",
            tip2: "Keep mobile data active for real-time driver updates.",
            tip3: "Message your driver when approaching public arrivals hall.",
          },
        },
        cdg_t3: {
          name: "Terminal 3",
          airlinesHint: "Used by low-cost and charter operations.",
          meetPoint: "Outside arrivals doors at the signed pickup point.",
          transferTimeHint: "Approx. 5-9 min from terminal exit to meeting.",
          tips: {
            tip1: "Move curbside only after collecting all checked baggage.",
            tip2: "Confirm vehicle plate before boarding.",
            tip3: "If crowded, use the agreed landmark shared by message.",
          },
        },
        ory_123: {
          name: "Orly 1-2-3",
          airlinesHint: "Connected terminal building with shared circulation.",
          meetPoint: "Public arrivals exit near official rides pickup area.",
          transferTimeHint: "Approx. 5-10 min from gate to meeting point.",
          tips: {
            tip1: "Verify whether you arrived in 1, 2, or 3 before exit.",
            tip2: "Escalators can be busy at peak times; allow extra minutes.",
            tip3: "Keep WhatsApp open for final pickup coordination.",
          },
        },
        ory_4: {
          name: "Orly 4",
          airlinesHint: "Dedicated hall with direct access routes.",
          meetPoint: "Arrivals public area near terminal information desk.",
          transferTimeHint: "Approx. 6-11 min depending on gate and baggage.",
          tips: {
            tip1: "Follow Arrivals signs until you reach public pickup area.",
            tip2: "If traveling with children, request a nearby meet spot.",
            tip3: "Inform driver once customs and baggage steps are complete.",
          },
        },
        bva_t1: {
          name: "Terminal 1",
          airlinesHint: "Main area for many low-cost operations.",
          meetPoint: "Outside arrivals at the pre-arranged pickup bay.",
          transferTimeHint: "Approx. 4-8 min from arrivals to curbside.",
          tips: {
            tip1: "Beauvais can be windy; keep outerwear ready for curbside.",
            tip2: "Send a quick message after baggage collection.",
            tip3: "Stay near terminal frontage for quick vehicle recognition.",
          },
        },
        bva_t2: {
          name: "Terminal 2",
          airlinesHint: "Additional low-cost operations by schedule.",
          meetPoint: "Terminal 2 arrivals exit near marked pickup lane.",
          transferTimeHint: "Approx. 4-8 min from arrivals to pickup point.",
          tips: {
            tip1: "Confirm terminal number in your booking reminder.",
            tip2: "Follow official pickup-lane signage before crossing parking.",
            tip3: "In bad weather, wait in covered zone and message driver.",
          },
        },
      },
    },
  },
  exitPopup: {
    title: "Wait! Don't Leave Yet",
    subtitle: "Get 10% OFF Your First Transfer",
    emailPlaceholder: "Your email address",
    button: "GET MY DISCOUNT",
    benefit1: "Fixed price, no surprises",
    benefit2: "Bilingual driver (English/French)",
    benefit3: "Free cancellation up to 24h",
    validity: "*Valid for bookings in next 7 days",
    success: "Check your email for your discount code!",
    error: "Something went wrong. Please try again.",
    invalidEmail: "Please enter a valid email address",
    sending: "Sending...",
  },
  excursions: {
    title: "Discover France's Treasures",
    subtitle:
      "Explore France's most iconic landmarks and best-kept secrets with our customized tours",
    cta: "Explore Destinations",
    searchPlaceholder: "Search destinations...",
    viewDetails: "View Details",
    noResults: "No excursions found matching your criteria",
    clearFilters: "Clear Filters",
    highlights: "Highlights",
    fromPrice: "From €{price}",
    tourOptionsCount: "{count} tour options available",
    search: {
      placeholder: "Search destinations...",
      duration: "All durations",
      type: "All types",
    },
    card: {
      moreInfo: "More information",
      from: "From",
      duration: "Duration",
    },
    filters: {
      duration: {
        halfDay: "Half day",
        fullDay: "Full day",
        multiDay: "Multiple days",
      },
      type: {
        private: "Private tours",
        group: "Group tours",
        luxury: "Luxury experiences",
      },
      allDurations: "All durations",
      allTypes: "All types",
      flexible: "Flexible",
      standard: "Standard",
      clearAll: "Clear All",
      price: "Price Range",
      allPrices: "All prices",
      above: "Above",
    },
    types: {
      private: "Private",
      group: "Group",
      luxury: "Luxury",
      standard: "Standard",
      cultural: "Cultural",
      adventure: "Adventure",
      romantic: "Romantic",
      family: "Family",
    },
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ",
    },
  },
  booking: {
    title: "Book Your Journey",
    pickup: "Pickup Location",
    dropoff: "Drop-off Location",
    pickupPlaceholder: "CDG Terminal 1, 2, 3 or Paris address",
    dropoffPlaceholder: "CDG Terminal 1, 2, 3 or Paris address",
    date: "Date",
    time: "Time",
    returnDate: "Return Date",
    returnTime: "Return Time",
    passengers: "Passengers",
    service: "Service Type",
    tripType: "Trip Type",
    oneWay: "One Way",
    roundTrip: "Round Trip",
    continue: "Continue Booking",
    assignedVehicles: "Assigned Vehicles",
    largeLuggage: "Large Luggage",
    smallLuggage: "Small Luggage",
    maxWeight: "max weight",
    luggagePolicy: {
      title: "Luggage Policy",
      included:
        "Included: 1 large suitcase (23kg) + 1 small cabin bag per passenger",
      extraLarge: "Extra large bags: €15 each (subject to vehicle capacity)",
      extraSmall: "Small bags are free, up to vehicle capacity",
    },
    services: {
      airport: "Airport Transfer",
      city: "City Tour",
      daytrip: "Day Trip",
      chauffeur: "Private Chauffeur",
    },
    serviceLevel: "Service Level",
    priceSummary: "Price Summary",
    validatingPrice: "Validating price...",
    payment: {
      title: "Payment Details",
      cardDetails: "Card Details",
      securePaymentNotice:
        "Your payment will be securely processed. You will receive a confirmation email after completing the booking.",
      sessionExpired: "Session expired",
      sessionExpiredDesc: "Please complete the booking form again.",
      loadingLocations: "Loading location data...",
      locationError: "Error loading location data",
      paymentDetails: "Payment Details",
      secureCardIntro: "Continue to securely enter your card details.",
      acceptTerms: "I accept the terms and conditions",
      confirmAndPay: "Confirm & Pay",
      pay: "Pay",
      retryPayment: "Retry payment",
      fixDetails: "Fix details",
      processingPayment: "Processing payment...",
      bookingConfirmed: "Booking confirmed!",
      bookingConfirmedDesc:
        "Your booking has been confirmed. We've sent a confirmation email.",
      emailWarning:
        "Booking confirmed but there was an issue sending confirmation emails.",
      finalizationError: "There was an error finalizing the booking.",
      paymentError: "Payment error",
      incompleteLocationData: "Incomplete location data. Please try again.",
      paymentSuccessRedirect: "Payment completed! Redirecting...",
    },
    submit: "Book Now",
    submitButton: "Request a transfer",
    submitNote: "Reply within 2 h · No upfront payment",
    noPaymentRequired: "Confirmed by a human team in Paris",
    extras: {
      title: "Additional Services",
      tourGuide: "Tour Guide",
      tourGuideDesc:
        "Professional guide who will accompany you during the tour",
    },
    vehicle: {
      title: "Select your Vehicle",
      capacity: "passengers",
      luggage: "Luggage",
      berline: "E-Class",
      van: "V-Class",
    },
    groupTransfer: {
      title: "Need a transfer for 8+ passengers?",
      description: "We organise multi-vehicle or minibus solutions on request.",
      cta: "Request a group quote",
    },
    price: {
      total: "Total Price",
      estimated: "Initial estimate",
      distance: "Estimated distance",
      basePrice: "Base price",
      roundTripIncluded: "*Price includes round trip",
      luggageSurcharge: "Extra luggage",
      passengerSurcharge: "Group surcharge (4–7 pax)",
      luggageIncluded: "Included: 1 large + 1 small per passenger",
      selectedLuggage: "Selected luggage",
    },
    success: {
      title: "Booking Confirmed!",
      description: "We have sent an email with your booking details",
      confirmationNumber: "Confirmation number:",
      bookingDetails: "Booking Details",
      route: "Route",
      pickupDateTime: "Pickup Date & Time",
      passengers: "Passengers",
      passenger: "passenger",
      luggage: "Luggage",
      largeSuitcase: "large suitcase",
      largeSuitcases: "large suitcases",
      smallBag: "small bag",
      smallBags: "small bags",
      totalPaid: "Total Paid:",
      cancellationPolicy: "Cancellation Policy",
      freeCancellation: "Free cancellation up to 24 hours before pickup",
      partialRefund: "50% refund for cancellations 12-24 hours before pickup",
      noRefund: "No refund for cancellations less than 12 hours before pickup",
      whatHappensNext: "What happens next?",
      step1: "You'll receive a confirmation email with all booking details",
      step2:
        "24 hours before pickup, we'll send you your driver's contact details and photo",
      step3:
        "Your driver will track your flight and adjust pickup time if needed",
      step4: "Your driver will wait at the arrivals hall with a name sign",
      addToCalendar: "Add to Calendar",
      backToHome: "Back to Home",
    },
    groupNotice: {
      title: "Groups of 8+ passengers",
      description:
        "For groups of 8 or more passengers, please contact us via WhatsApp for a personalized quote.",
      cta: "Contact via WhatsApp",
    },
    passengerDetails: "Passenger Details",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email",
    emailPlaceholder: "Enter your email",
    phone: "Phone Number",
    phonePlaceholder: "+33 XXXXXXXXX",
    flightNumber: "Flight Number (optional)",
    flightNumberPlaceholder: "e.g. AF1234",
    specialInstructions: "Special Instructions",
    specialInstructionsPlaceholder:
      "Any additional information for the driver...",
    errors: {
      invalidEmail: "Invalid Email",
      emailDescription: "Please enter a valid email address",
      invalidName: "Invalid Name",
      nameDescription: "Please enter your full name",
      locationsNotLoaded: "Could not load locations",
      selectLocations: "Please select pickup and drop-off locations",
      selectDateTime: "Please select date and time",
      selectReturnDateTime: "Please select return date and time",
      selectPassengers: "Please specify number of passengers",
      noVehiclesAvailable: "No vehicles available for this booking",
      bookingCreationError: "Error creating booking",
      acceptTerms: "Please accept the terms and conditions",
      paymentIntentError: "Error creating payment. Please try again.",
      generalPaymentError: "An error occurred during payment",
      missingIds: "Missing booking or payment information",
      finalizationError: "Error finalizing booking",
      noBookingData: "No booking data found",
      requiredFields: "Please fill in all required fields",
      vehicleUnavailable:
        "This vehicle is already booked for that time slot. Please choose a different time or vehicle.",
      invalidPassengerInfo: "Invalid passenger information provided",
      invalidPhone: "Invalid phone number",
      serviceLevelsNotLoaded: "Could not load service levels",
      selectServiceLevel: "Please select a service level",
      priceStale: "Price has changed. Please review the new price.",
      networkError:
        "Network error. Please check your connection and try again.",
    },
    summary: {
      title: "Booking Summary",
      journey: "Journey Details",
      schedule: "Schedule",
      vehicle: "Vehicle Details",
      luggage: "Luggage",
      contact: "Contact Information",
      total: "Total Amount",
    },
    form: {
      from: "From",
      to: "To",
      vehicleType: "Vehicle Type",
      passengers: "Passengers",
      largeLuggage: "Large Luggage",
      smallLuggage: "Small Luggage",
      name: "Name",
      email: "Email",
      phone: "Phone",
    },
    coupon: {
      label: "Discount Code",
      placeholder: "Enter your discount code",
      apply: "Apply",
      remove: "Remove",
      applied: "Discount applied",
      discount: "Discount",
    },
    couponApplied: "Coupon applied!",
    invalidCoupon: "Invalid coupon",
    couponExpired: "This coupon is invalid or has expired.",
    couponError: "Failed to validate coupon. Please try again.",
    couponRemoved: "Coupon removed",
    couponRemovedDesc: "The discount has been removed from your booking.",
    moreRoutes: "Train stations, hotels or more routes? Use full form →",
    moreRoutesMobile: "More routes →",
  },
  common: {
    back: "Back",
    continue: "Continue",
    processing: "Processing...",
    error: "Error",
    from: "From",
    sending: "Sending...",
    warning: "Warning",
  },
  services: {
    title: "Our services",
    subtitle:
      "Reliable transfers and private tours with clear pricing. Paris station transfers from €70.",
    decorativeSubtitle: "Professional and reliable service",
    cta: "View options",
    groupDisclaimer: "For groups of 8+ passengers, please contact us",
    airport: {
      title: "Airport Transfers",
      description:
        "CDG · Orly · Beauvais -> your hotel. From €110 with Meet & Greet, flight tracking, and fixed pricing. Prices vary by airport, area, and passenger count.",
      cta: "Get a quote",
      priceFrom: "From €110",
      features: [
        "Meet & Greet Service",
        "Flight Tracking",
        "Free Waiting Time",
        "1 Luggage/Pax Included",
        "Professional Chauffeurs",
      ],
    },
    chauffeur: {
      title: "Hourly chauffeur",
      description:
        "Paris and station transfers from €70. Hourly chauffeur service from €70/hour.",
      cta: "Book by the hour",
      priceFrom: "From €70/hour",
      features: [
        "Hourly Booking Available",
        "24/7 Availability",
        "Multilingual Service",
        "Custom Routes & Stops",
      ],
    },
    cityTours: {
      title: "Private tours",
      description: "With or without a guide. Tailored to your needs.",
      cta: "View options",
      priceFrom: "Tailored quote",
      features: [
        "Customized Itineraries",
        "Professional Drivers",
        "Premium Vehicles",
        "Mercedes E-Class & V-Class",
      ],
    },
    dayTrips: {
      title: "Day Trips",
      description:
        "Explore beyond Paris with customized day trips to French destinations.",
    },
    dropdown: {
      transfers: "Airport Transfer Service",
      chauffeur: "Chauffeur by the Hour",
      excursions: "Excursions",
    },
  },
  versailles: {
    title: "Palace of Versailles",
    description: "The Palace of Versailles, a UNESCO World Heritage site",
    distance: "23 km from Paris",
    duration: "4-12 hours",
    tourName: "Private Chauffeur to Versailles",
    highlights: ["Hall of Mirrors", "Royal Gardens", "Grand Apartments"],
    whyVisit: [
      "UNESCO World Heritage Site",
      "Largest Palace in Europe",
      "Historic French Monarchy",
    ],
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ",
    },
  },
  loire: {
    title: "Loire Valley Castles",
    description:
      "Explore the fairytale châteaux of the Loire Valley on a private day trip from Paris with your dedicated chauffeur.",
    distance: "170 km from Paris",
    duration: "10–12 hours",
    highlights: [
      "Château de Chambord — Renaissance masterpiece",
      "Château de Chenonceau — spanning the River Cher",
      "Scenic Loire Valley countryside",
      "Flexible itinerary with suggested stops",
    ],
    whyVisit: [
      "UNESCO World Heritage Valley",
      "France's largest concentration of royal châteaux",
      "Your chauffeur waits at every stop",
    ],
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ",
    },
  },
  champagne: {
    title: "Champagne Region",
    description:
      "Discover the prestigious Champagne houses of Épernay and Reims on a private chauffeured day trip from Paris.",
    distance: "145 km from Paris",
    duration: "8 hours",
    highlights: [
      "Avenue de Champagne, Épernay",
      "Grande Maisons — Moët, Taittinger, Ruinart",
      "UNESCO-listed Champagne cellars",
      "Rolling hillside vineyards of Côte des Blancs",
    ],
    whyVisit: [
      "Birthplace of the world's finest sparkling wines",
      "Cellars listed as UNESCO World Heritage",
      "Private transport — your schedule, your pace",
    ],
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ",
    },
  },
  giverny: {
    title: "Giverny & Honfleur",
    description:
      "Visit Monet's iconic gardens in Giverny and the charming port of Honfleur on a private day trip with your chauffeur.",
    distance: "80–200 km from Paris",
    duration: "10 hours",
    highlights: [
      "Monet's house and water lily garden, Giverny",
      "Honfleur old harbour and Vieux Bassin",
      "Normandy countryside",
      "Flexible stops at your request",
    ],
    whyVisit: [
      "Monet's gardens — birthplace of Impressionism",
      "Honfleur — one of France's most picturesque ports",
      "Your chauffeur adapts the itinerary to your pace",
    ],
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ",
    },
  },
  toast: {
    languageChanged: "Language changed successfully",
  },
  about: {
    title: "About Paris Elite Services",
    subtitle: "Excellence in Private Transportation in Paris",
    years: "Years of experience in Paris",
    description:
      "We provide private transportation in Paris and Ile-de-France for corporate clients and international travelers, with a focus on punctuality, discretion, and personalized service.",
    commitment: {
      title: "Our Commitment",
      items: [
        "Personalized service adapted to each client",
        "Multilingual chauffeurs selected for their professionalism",
        "Regularly renewed high-end vehicles",
        "24/7 flexibility and responsiveness",
      ],
    },
    expertise: {
      title: "Our Expertise",
      items: [
        "VIP airport reception",
        "Custom excursion organization",
        "Event support",
        "Transportation concierge service",
      ],
    },
    conclusion: {
      satisfaction:
        "The satisfaction of our international clients testifies to our constant commitment to exceptional service. Each journey is an opportunity to demonstrate our professionalism and attention to detail.",
      partnerships:
        "Our long-standing partnerships with international travel agencies and luxury Parisian hotels reflect the trust earned over the years.",
    },
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with our team for any inquiries or assistance",
    subtitle: "Get in touch with us",
    phone: "Phone",
    email: "Email",
    name: "Name",
    message: "Message",
    address: "Vanves (92170), Ile-de-France",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    messagePlaceholder: "Enter your message",
    sendMessage: "Send Message",
    success: "Message sent successfully!",
    successDescription: "We'll get back to you soon!",
    error: "Error sending message. Please try again.",
  },
  premium: {
    title: "Elite Experience",
    subtitle: "Experience luxury transportation at its finest",
    exclusive: {
      title: "Exclusive Services",
      items: [
        "Priority Event Access",
        "VIP Restaurant Reservations",
        "Personalized Meet & Greet",
        "24/7 Concierge Service",
      ],
    },
    guarantees: {
      title: "Premium Guarantees",
      items: [
        "Guaranteed Punctuality",
        "High-end Vehicles",
        "24/7 Assistance",
        "Airport Meet & Greet",
      ],
    },
    vip: {
      title: "VIP Experience",
      items: [
        "Elite Multilingual Chauffeurs",
        "24/7 Availability",
        "Complete Itinerary Flexibility",
        "Dedicated Personal Assistant",
      ],
    },
  },
  fleet: {
    label: "Our fleet",
    title: "Available Vehicles",
    subtitle: "Modern and comfortable Mercedes-Benz fleet.",
    exterior: "Exterior",
    interior: "Interior",
    features: "Included features",
    passengers: "passengers",
    luggage: "Luggage",
    bookNow: "Book Now",
    noVehicles: "No vehicles available at this time",
    vehicleFeatures: {
      wifi: "Free WiFi",
      water: "Bottled water",
      airConditioning: "Individual air conditioning",
      leatherSeats: "Leather seats",
      cleaning: "Guaranteed cleaning",
    },
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about our services",
    categories: {
      bookings: "Bookings",
      services: "Services",
      payment: "Payment",
      vehicles: "Vehicles",
    },
    questions: {
      howToBook: {
        question: "How does the booking service work?",
        answer:
          "Our booking system is simple and straightforward. Select your vehicle type, date and time, and complete your pickup and destination details. You will receive an immediate confirmation by email.",
      },
      cancellation: {
        question: "What is the cancellation policy?",
        answer:
          "Cancellation and refund eligibility depend on when we receive your cancellation request. Please review the Terms and contact us before cancelling. Any refund is handled according to the confirmed booking conditions and is not automatic.",
      },
      advanceBooking: {
        question: "How far in advance should I book?",
        answer:
          "We recommend making reservations at least 48 hours in advance to ensure availability. However, we can also accommodate last-minute bookings subject to availability.",
      },
      modifyBooking: {
        question: "Can I modify my reservation?",
        answer:
          "Yes, you can modify your reservation up to 24 hours before the service at no additional charge. Changes are subject to availability.",
      },
      flightDelay: {
        question: "What happens if my flight is delayed?",
        answer:
          "We monitor all flights. Don't worry, we'll adjust the pickup time at no additional charge. Our team will keep track of any changes to your arrival time.",
      },
      airportTransfer: {
        question: "What is the process for airport transfers?",
        answer:
          "For airport transfers, we recommend scheduling pickup 3 hours before international flights and 2 hours for domestic flights. Our team monitors traffic in real-time to ensure your timely arrival.",
      },
      tourGuide: {
        question: "Do you offer tour guide services?",
        answer:
          "Yes, we have professional multilingual guides for customized tours of Paris and its surroundings. They can adapt the tour according to your specific interests.",
      },
      privateDriver: {
        question: "What does the private chauffeur service include?",
        answer:
          "The service includes a multilingual professional chauffeur, luxury vehicle, bottled water, onboard wifi, and 24/7 assistance. We can also add additional services according to your needs.",
      },
      outsideParis: {
        question: "Do you conduct excursions outside Paris?",
        answer:
          "Yes, we offer excursions to popular destinations such as the Loire Valley Castles, Versailles, Giverny, Champagne, and other points of interest. All tours are customizable according to your preferences.",
      },
      pricesIncluded: {
        question: "Do prices include all charges?",
        answer:
          "Yes, our prices include VAT, insurance, and all associated charges. There are no hidden costs. The price you see is the final price you'll pay.",
      },
      paymentMethods: {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, MasterCard, American Express), bank transfers, and cash payments. For corporate bookings, we offer monthly billing.",
      },
      deposit: {
        question: "Is a deposit required to book?",
        answer:
          "Full online payment is required to confirm the reservation. Payment details are shown before confirmation.",
      },
      vehicleTypes: {
        question: "What types of vehicles do you offer?",
        answer:
          "Our fleet includes premium sedans such as the Mercedes E-Class or equivalent, and premium vans such as the Mercedes V-Class or equivalent. The vehicle category is confirmed with your request.",
      },
    },
  },
  footer: {
    description:
      "Private transfers in Paris and beyond. Solutions for agencies and companies.",
    links: {
      title: "Quick Links",
      services: "Services",
      fleet: "Fleet",
      about: "About Us",
      contact: "Contact",
      travelGuides: "Travel Guides",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      faq: "FAQ",
    },
    schedule: {
      title: "Opening Hours",
      description: "Service available 24 hours, 7 days a week",
    },
    payment: {
      title: "Accepted Payment Methods",
    },
    copyright: " Paris Elite Services. All rights reserved.",
  },
  avoidFakeTaxis: {
    badge: "Safety Guide",
    hero: {
      title:
        "Fake Taxis at Paris Airports: How to Avoid Scams & Book a Safe Transfer",
      subtitle:
        "Thousands of tourists fall victim to fake taxi scams at CDG and Orly every year. Learn how to spot them and choose a licensed, fixed-price transfer instead.",
    },
    problem: {
      title: "The Problem is Real",
      paragraph1:
        "You've just landed at Charles de Gaulle after a long flight. You're tired, you have luggage, and you just want to get to your hotel. Outside arrivals, someone approaches you offering a 'taxi' with a great price. Sounds convenient, right? Wrong.",
      paragraph2:
        "This is how thousands of tourists get scammed every year in Paris airports. The fake taxi scam is one of the most common tourist traps in Paris, costing victims hundreds of euros and ruining their first impression of the city.",
    },
    howScamWorks: {
      title: "How the Scam Works",
      paragraph1:
        "Fake taxi drivers target tourists at CDG, Orly, and Beauvais. They wear fake badges, use unmarked cars, and quote low prices to lure you in.",
      paragraph2:
        "Once you're in the car, they take longer routes, claim the meter is 'broken', or demand 3-4x the normal fare. Some even threaten passengers who refuse to pay. By the time you realize what's happening, you're already in the car and far from the airport.",
    },
    redFlags: {
      title: "Red Flags to Watch For",
      flag1: {
        title: "Driver approaches you inside the terminal",
        description:
          "Real taxis wait at official ranks outside. If someone approaches you inside offering a taxi, it's a scam.",
      },
      flag2: {
        title: "No taxi meter or official license displayed",
        description:
          "Every legal taxi in Paris must have a visible meter and license number.",
      },
      flag3: {
        title: 'Car has no "TAXI PARISIEN" roof sign',
        description:
          "Official taxis have an illuminated roof sign. No sign = not a real taxi.",
      },
      flag4: {
        title: 'Driver insists on cash only and quotes a "special price"',
        description:
          "French law requires taxis to accept cards. Cash-only is a major red flag.",
      },
      flag5: {
        title: "Vehicle is unmarked or has handwritten signs",
        description:
          "Official taxis have professional signage and branding. Handwritten signs are a scam.",
      },
    },
    protection: {
      title: "How to Protect Yourself",
      intro: "If you must take a taxi at the airport:",
      tip1: 'Only use official taxi ranks (follow "TAXI" signs)',
      tip2: "Check the vehicle has a roof light and meter",
      tip3: "Ask for an estimate before getting in",
      tip4: "Insist on paying by card (legal requirement in France)",
      betterOption:
        "Better option: Book a licensed private transfer in advance with a fixed price.",
    },
    whyVTC: {
      title: "Why a Licensed VTC Transfer is the Safe Alternative",
      intro:
        "Unlike street taxis, licensed VTC (private hire) services like Paris Elite Services offer:",
      benefit1: {
        title: "Fixed price confirmed before you travel",
        description: "No surprises, no meter tricks",
      },
      benefit2: {
        title: "Professional, vetted chauffeurs",
        description: "Background-checked drivers",
      },
      benefit3: {
        title: "Flight tracking",
        description: "Driver waits even if your flight is delayed",
      },
      benefit4: {
        title: "Meet & greet service",
        description: "Driver waits at arrivals with your name",
      },
      benefit5: {
        title: "Premium vehicles",
        description: "Mercedes E-Class, spacious vans for families",
      },
      benefit6: {
        title: "24/7 customer support",
        description: "WhatsApp, email, phone",
      },
    },
    pricing: {
      title: "What You Should Actually Pay",
      intro:
        "Here's what you should expect to pay for a safe, licensed transfer from Paris airports:",
      tableHeaders: {
        route: "Route",
        passengers1to3: "1-3 Passengers",
        passengers4to7: "4-7 Passengers",
      },
      routes: {
        cdg: "CDG Airport → Paris",
        orly: "Orly Airport → Paris",
        beauvais: "Beauvais Airport → Paris",
      },
      warning:
        "⚠️ Warning: If someone quotes you €30-40 for CDG-Paris, it's either a scam or they'll add hidden fees later. The official taxi fare from CDG to Paris is around €50-60, and a licensed VTC with fixed price is €70.",
    },
    cta: {
      title: "Don't Risk Your Paris Arrival",
      subtitle:
        "Book your safe, licensed airport transfer now with fixed prices and professional service.",
      bookNow: "Check Prices & Book Now",
      whatsapp: "WhatsApp Us",
      groupsNotice:
        "For groups of 8+ passengers or special requests, contact us via WhatsApp: +33 6 68 25 11 02",
    },
  },
  blog: {
    title: "Travel Blog",
    subtitle: "Expert tips, guides, and insights for your Paris journey",
    heroTitle: "Travel Blog",
    heroSubtitle: "Expert tips, guides, and insights for your Paris journey",
    searchPlaceholder: "Search articles...",
    featured: "Featured Articles",
    allArticles: "All Articles",
    categoryArticles: "Articles",
    noArticles: "No articles found. Try a different search or category.",
    noArticlesFound: "No articles found. Try a different search term.",
    relatedArticles: "Related Articles",
    needTransfer: "Need a transfer?",
    calculatePrice: "Get an instant quote for your airport transfer",
    getQuote: "Get Quote",
    bookNow: "Book Now",
    readyToBook: "Ready to Book Your Transfer?",
    professionalService: "Professional chauffeur service",
    freeCancellation: "Free cancellation up to 24h",
    flightMonitoring: "Flight monitoring included",
    premiumVehicles: "Premium vehicles (Mercedes and equivalent)",
    heroEyebrow: "Discover Paris",
    featuredEyebrow: "Featured Story",
    pageTitle: "Travel Blog | Paris Elite Services",
    pageDescription:
      "Expert travel tips, guides and insights for visiting Paris. Airport transfers, excursions and luxury chauffeur services.",
    readMore: "Read More",
    article: "article",
    articles: "articles",
    searchInCategory: "Search in this category...",
    notFound: {
      title: "404 - Article Not Found | Blog",
      heading: "Article Not Found",
      description:
        "The article you're looking for doesn't exist or has been moved.",
      backToBlog: "Back to Blog",
      backToHome: "Back to Home",
      suggestedTitle: "You Might Be Interested In",
      suggestedDescription: "Check out these popular articles instead",
      helpTitle: "Need Help?",
      helpDescription:
        "If you need help finding something, don't hesitate to contact us.",
      contactUs: "Contact Us",
    },
    sidebar: {
      quickQuote: "Quick Quote",
      quickQuoteDesc: "Get an instant price for your transfer",
      calculatePrice: "Calculate Price",
      whatsapp: "WhatsApp Quote",
      waTextAirport:
        "Hello, I'm planning a trip from a Paris airport. Can you confirm availability and price for a private transfer?",
      popularRoutes: "Popular Routes",
      fixedPrices: "Fixed prices • No hidden fees",
      available247: "Available 24/7",
      flightTracking: "Flight tracking included",
      freeCancellation: "Free cancellation 24h",
      premiumVehicles: "Premium vehicles",
    },
    excursionUpsell: {
      heading: "Already sorted your transfer? Add an excursion",
      subheading: "Same private chauffeur — on the day you choose",
      cta: "See all excursions →",
      waButton: "Ask via WhatsApp",
      waText:
        "Hello, I just read about airport transfers. Could you help me with a private excursion from Paris?",
      versailles: "Versailles — 45 km",
      champagne: "Champagne — 145 km",
      loireValley: "Loire Valley — 200 km",
    },
    newsletter: {
      title: "Get Travel Tips & Exclusive Offers",
      description:
        "Subscribe to our newsletter and receive a 10% discount code for your first booking, plus insider tips for traveling in Paris.",
      subscribe: "Subscribe",
      privacy: "We respect your privacy. Unsubscribe at any time.",
    },
    shareArticle: "Share this article",
    copyLink: "Copy Link",
    ctaBody: "Fixed prices, no hidden fees, and premium vehicles.",
    cta: {
      generic: {
        heading: "Ready to book your transfer?",
        body: "Fixed prices, no hidden fees, and premium vehicles for your Paris journey.",
        button: "Book now",
      },
      airportTransfer: {
        heading: "Prefer a fixed-price airport transfer?",
        body: "Book a private chauffeur to or from CDG, Orly, or Beauvais with a clear quote before you travel.",
        button: "Book airport transfer",
      },
      transportComparison: {
        heading: "Want private chauffeur comfort after comparing your options?",
        body: "Choose fixed pricing, professional drivers, and direct pickup instead of guessing between taxi, app, or train.",
        button: "Get my quote",
      },
      cityGuide: {
        heading: "Planning several stops in Paris?",
        body: "Keep your itinerary simple with a private chauffeur and one booking route for transfers across the city.",
        button: "Plan my ride",
      },
      eventLogistics: {
        heading: "Going to an event in Paris?",
        body: "Arrive on schedule with a private chauffeur for stadiums, fashion venues, concerts, and late-night return trips.",
        button: "Book event transfer",
      },
      excursion: {
        heading: "Planning a private day trip from Paris?",
        body: "Travel in comfort with a chauffeur-driven excursion and a fixed quote tailored to your schedule.",
        button: "Plan day trip transfer",
      },
    },
  },
  events: {
    pageTitle: "Events in Paris | Paris Elite Services",
    pageDescription:
      "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event.",
    heroTitle: "Events in Paris",
    heroSubtitle:
      "Discover the best concerts, exhibitions, shows and cultural events happening in Paris. Book your luxury transfer to arrive in style.",
    editorialIntro:
      "Each month, we curate major Paris events for travellers who want to plan their visit with confidence — from international sport and fashion to city-wide cultural moments. Every listing includes official details and a direct chauffeur quote request, so you can organise your arrival without friction.",
    liveUpdates: "Updated",
    navigation: "Navigation",
    comingSoon: "Coming Soon",
    planAhead: "Plan Ahead",
    thisWeek: "This Week in Paris",
    thisMonth: "This Month in Paris",
    bookTransfer: "Book Event Transfer",
    readGuides: "Read Travel Guides",
    ctaTitle: "Need a Ride to Your Event?",
    ctaDescription:
      "Book a luxury transfer to any event in Paris. Professional chauffeur, premium vehicles, fixed prices.",
    bookNow: "Book Now",
    noEvents: "No events available at the moment.",
    updatedOn: "Updated on",
    sourcesVerified: "Official sources verified",
    featured: "Featured",
    bookRide: "Book a Ride",
    officialDetails: "Official Details",
    source: "Source",
    getQuote: "Get a Quote",
    whatsappMicrocopy: "We reply fast on WhatsApp",
    ctaWhatsApp: "Get a Quote on WhatsApp",
    ctaEmail: "Email Us",
    fallbackTitle: "Private Chauffeur Service for Paris Events",
    fallbackSubtitle:
      "Plan luxury transport for any event in Paris — fashion shows, exhibitions, concerts, sports fixtures, and business conferences.",
    fallbackCatFashion: "Fashion Shows & Luxury Events",
    fallbackCatFashionDesc:
      "Arrive in style at Fashion Week, private showrooms, and exclusive brand presentations.",
    fallbackCatExhibitions: "Exhibitions & Art Fairs",
    fallbackCatExhibitionsDesc:
      "Door-to-door service for museum exhibitions, gallery openings, and art fair visits across Paris.",
    fallbackCatConcerts: "Concerts & Performances",
    fallbackCatConcertsDesc:
      "Premium transfers to concerts, opera, theatre, and live performances.",
    fallbackCatSports: "Sports Fixtures",
    fallbackCatSportsDesc:
      "Private transfers to Roland-Garros, the Stade de France, and major sporting events.",
    fallbackCatBusiness: "Conferences & Private Dinners",
    fallbackCatBusinessDesc:
      "Discreet, punctual transport for business events, galas, and private evening engagements.",
    fallbackCta: "Request Event Transfer",
    fallbackCtaAlt: "Get Chauffeur Quote",
    fallbackDisclaimer:
      "We provide chauffeured transport to events — not event tickets.",
    stalePill: "Event Transport",
    categories: {
      all: "All",
      exhibition: "Exhibition",
      fashion: "Fashion",
      festival: "Festival",
      concert: "Concert",
      opera: "Opera",
      museum: "Museum",
      family: "Family",
    },
    recentlyEnded: "Recently Ended",
  },
  hourly: {
    pageTitle:
      "Hourly Chauffeur Service Paris | From €75/hour | Paris Elite Services",
    pageDescription:
      "Professional chauffeur by the hour in Paris. Meetings, shopping, city tours, Versailles day trips, multi-venue events. From €75/hour, minimum 3 hours. Final quote required.",
    badge: "Mise à Disposition",
    heroTitle: "Chauffeur by the Hour",
    heroSubtitle:
      "Professional chauffeur at your disposal for meetings, shopping, tours, and flexible itineraries in Paris and Île-de-France.",
    ctaQuote: "Request a Quote",
    ctaWhatsApp: "WhatsApp Us",
    trustFlexible: "Flexible Hours",
    trustProfessional: "Professional",
    trustAsDirected: "As-Directed",
    trustAvailability: "On Request",
    useCasesTitle: "When Hourly Service Makes Sense",
    useCasesSubtitle:
      "Five scenarios where a chauffeur at your disposal is the right choice.",
    useCases: {
      meetings: {
        title: "Business Meetings",
        description:
          "Back-to-back meetings across central Paris. Your chauffeur waits between appointments so you move without delay.",
        duration: "Typical: 3–4 hours",
      },
      shopping: {
        title: "Premium Shopping",
        description:
          "Faubourg Saint-Honoré, Le Marais, Saint-Germain. Packages loaded, chauffeur on standby between boutiques.",
        duration: "Typical: 3–5 hours",
      },
      cityTour: {
        title: "Paris City Tour",
        description:
          "Personalised route covering the landmarks that matter to you. No fixed schedule, no group timing.",
        duration: "Typical: 3–4 hours",
      },
      versailles: {
        title: "Versailles Day Trip",
        description:
          "Door-to-door from Paris. Chauffeur waits at the palace while you visit at your own pace, then drives you back.",
        duration: "Typical: 5–6 hours",
      },
      multiEvent: {
        title: "Multi-Venue Events",
        description:
          "Fashion shows, art openings, evening programmes with multiple stops. One booking covers the full schedule.",
        duration: "Typical: 4–6 hours",
      },
    },
    pricingTitle: "Indicative Pricing",
    pricingSubtitle:
      "Transparent starting point. Final quote required before confirmation.",
    pricingFrom: "From €75/hour",
    pricingMinimum: "Minimum booking: 3 hours",
    pricingNote:
      "Final price depends on itinerary, vehicle category, timing and availability. Quote required before confirmation.",
    pricingCta: "Get a Quote on WhatsApp",
    pricingCtaAlt: "Email Us",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "How hourly chauffeur service works in practice.",
    faqs: {
      minHours: {
        q: "What is the minimum booking?",
        a: "The minimum booking is 3 hours. This applies to sedan, luxury sedan, and van categories.",
      },
      whatsIncluded: {
        q: "What is included in the hourly rate?",
        a: "Chauffeur, vehicle, waiting time, and standard Île-de-France driving. Tolls, parking, and out-of-region distances may be added to the final quote.",
      },
      multipleStops: {
        q: "Can I add stops during the booking?",
        a: "Yes. Hourly service is designed for flexible itineraries. You can change your route or add stops at any point during your booking.",
      },
      versaillesDay: {
        q: "Is hourly service suitable for a Versailles day trip?",
        a: "Yes. A typical Versailles round trip takes 5–6 hours. Your chauffeur drives you from Paris, waits at the palace, and returns you to your hotel or destination.",
      },
      vehicleType: {
        q: "Which vehicle categories are available for hourly service?",
        a: "Sedan (1–3 passengers), luxury sedan (1–3 passengers), and van (up to 7 passengers). Group and VIP vehicles are available on request.",
      },
    },
    heroCtaVersailles: "Versailles Day Trip",
    ctaTitle: "Ready to Book?",
    ctaDescription:
      "Tell us your date, duration, and itinerary. We will confirm availability and send a fixed quote.",
    ctaWhatsAppFull: "Get a Quote on WhatsApp",
    ctaEmail: "Email Us",
  },
  seo: {
    home: {
      title:
        "Paris Elite Services | Private Chauffeur & Airport Transfers in Paris",
      description:
        "Premium airport transfer service in Paris. Book your private chauffeur for CDG, Orly, or city transfers. Fixed prices from €70, 24/7 availability, luxury vehicles. Book now!",
    },
    airports: {
      title: "Paris Airport Transfers | CDG, Orly, Beauvais Terminal Guide",
      description:
        "Private airport transfers in Paris with fixed pricing, terminal pickup guidance for CDG, Orly and Beauvais, and 24/7 chauffeur support.",
    },
  },
  parisFashion: {
    meta: {
      title: "Paris Fashion Guide: How to Experience It With Style",
      description:
        "Best fashion districts, boutiques, concept stores and Fashion Week tips. The essential guide for fashion lovers traveling to Paris.",
    },
    badge: "Editorial Guide",
    hero: {
      eyebrow: "Paris & Fashion",
      title: "Paris fashion guide: how to experience it properly",
      subtitle:
        "Districts, boutiques, fashion week and practical tips for style-minded travelers.",
    },
    forWho: {
      title: "Who is this guide for",
      intro:
        "This guide is for those who come to Paris with fashion in mind — not just as backdrop, but as destination.",
      profile1: {
        label: "Fashion-minded travelers",
        desc: "You want more than the Louvre and macarons. Fashion is part of your reason to travel.",
      },
      profile2: {
        label: "Specialist shoppers",
        desc: "You're looking for pieces you can't find at home: French designers, authentic vintage, limited editions.",
      },
      profile3: {
        label: "Agencies with discerning clients",
        desc: "You're planning experiences for travelers who want fashion, luxury and culture integrated into their Paris itinerary.",
      },
      profile4: {
        label: "Fashion Week visitors",
        desc: "You're coming during a show week and want to know how to move around, what to see and how to make the most of the city.",
      },
    },
    districts: {
      title: "Best fashion districts in Paris",
      intro:
        "Paris doesn't have one fashion centre. It has several, each with its own energy.",
      marais: {
        name: "Le Marais (3rd & 4th)",
        desc: "The most creative neighbourhood in the city. Concept stores, independent designers, international brands and an urban atmosphere that blends art and fashion effortlessly. Rue des Francs-Bourgeois is essential.",
      },
      saintGermain: {
        name: "Saint-Germain-des-Prés (6th)",
        desc: "Intellectual elegance. Boutiques of established French designers, galleries integrated with fashion stores and a quieter pace than the Marais. Perfect for considered shopping.",
      },
      montaigne: {
        name: "Avenue Montaigne (8th)",
        desc: "Haute couture in its purest form. Dior, Chanel, Louis Vuitton, Valentino. For those who want the Parisian luxury experience without detours.",
      },
      faubourg: {
        name: "Rue du Faubourg Saint-Honoré (8th)",
        desc: "Parallel to Montaigne in spirit. Hermès, Balenciaga, Gucci. A street that has maintained its exclusive character for decades.",
      },
      pigalle: {
        name: "South Pigalle / Oberkampf (9th–11th)",
        desc: "Paris's alternative and emerging fashion scene. Local brands, sneaker culture, quality streetwear. The antidote to the grand luxury boulevards.",
      },
    },
    prioritize: {
      title: "What to prioritise by your style",
      intro:
        "Not everything is in the same neighbourhood or the same register.",
      luxury: {
        title: "Haute couture and established luxury",
        desc: "Montaigne, Faubourg Saint-Honoré. Book an appointment at Dior or Chanel if you're looking for a personal shopping experience. Some maisons offer private shopping for international clients.",
      },
      conceptStores: {
        title: "Concept stores and editorial retail",
        desc: "Colette closed, but its spirit lives on in places like Merci (Le Marais), The Broken Arm (3rd) or Kiliwatch. Limited editions, curated selection, the shop as cultural proposition.",
      },
      vintage: {
        title: "Quality vintage and second-hand",
        desc: "Paris has the best vintage market in Europe. Find it at Porte de Vanves (weekends), les marchés des Batignolles and specialist shops in the Marais like Kilo Shop or Episode.",
      },
      emerging: {
        title: "Emerging designers",
        desc: "Galeries Lafayette Champs-Élysées dedicates space to new French designers. Also worth exploring temporary exhibitions during Fashion Week and open showrooms in the 11th.",
      },
    },
    fashionWeek: {
      title: "If you're coming during Fashion Week",
      eyebrow: "Fashion Week",
      intro:
        "Paris has four Fashion Weeks a year. January–February for Haute Couture and menswear. September–October for prêt-à-porter. The city changes: events, showrooms, pop-ups and a particular energy in the key neighbourhoods.",
      tip1: "Don't expect to see the main shows without accreditation. You can attend parallel events, exhibitions and public presentations.",
      tip2: "Palais Royal, Carrousel du Louvre and Grand Palais are regular venues. Check the official calendar of the Fédération de la Haute Couture et de la Mode.",
      tip3: "Hotels and restaurants in the 8th fill up fast. Book weeks in advance if you're coming during those dates.",
      tip4: "Traffic in central Paris during Fashion Week is unpredictable. A private transfer with a chauffeur guarantees you'll arrive on time for every appointment.",
    },
    practical: {
      title: "Practical tips",
      hours: {
        title: "Opening hours",
        desc: "Boutiques in Paris typically open 10:00–19:00 Monday to Saturday. Many close on Sundays or open late. Department stores (Galeries Lafayette, Le Bon Marché) have extended hours and some Sundays open.",
      },
      transport: {
        title: "Getting around",
        desc: "Between Le Marais, Saint-Germain and the Grands Boulevards you can walk. For Montaigne and Faubourg, the metro (line 9) or a private transfer are the best options. A VTC is practical if you're carrying bulky shopping.",
      },
      rhythm: {
        title: "Pace of the day",
        desc: "Midday is the worst time for smaller boutiques: some close 12:30–14:00. Tuesday to Friday afternoon is the calmest time for a shopping experience without crowds.",
      },
      weather: {
        title: "Weather and footwear",
        desc: "Paris is a walking city, but its cobblestones don't forgive unsuitable shoes. If your day includes several boutiques and perhaps a market, combine comfort with style. In autumn and winter, a good jacket is essential.",
      },
    },
    cta: {
      title: "Need a private transfer for your Paris fashion day?",
      subtitle:
        "We can arrange your transport between boutiques, maisons and events. Punctuality and discretion included.",
      bookTransfer: "Request private transfer",
      planning: "Ask about tailored planning",
      whatsapp: "Chat on WhatsApp",
    },
  },
};

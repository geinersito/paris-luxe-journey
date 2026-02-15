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
  },
  home: {
    b2b: {
      title: "For agencies and companies",
      desc: "B2B rates, invoicing, and dedicated support.",
      cta: "View B2B options",
    },
  },
  hero: {
    title: "Professional chauffeur in Paris",
    subtitle: "Comfortable transfers with clear pricing",
    proofline:
      "From €120 airport transfer · €70/hour · Mercedes Vito and V-Class",
    langProof: "We speak Spanish",
    bullet1: "Punctual service with professional chauffeurs",
    bullet2: "For business trips, families, and tourists",
    bullet3: "Fast booking, immediate confirmation",
    ctaPrimary: "Get my transfer quote now",
    ctaSecondary: "Contact us",
    selectPickup: "Select…",
    selectDropoff: "Select…",
    getInstantQuote: "Get my transfer quote now",
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
    submitButton: "See Your Fixed Price",
    noPaymentRequired: "No payment required - next step shows your final price",
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
      estimated: "Estimated Price",
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
    subtitle: "Reliable transfers and private tours with clear pricing",
    decorativeSubtitle: "Professional and reliable service",
    cta: "View options",
    groupDisclaimer: "For groups of 8+ passengers, please contact us",
    airport: {
      title: "Airport Transfers",
      description:
        "CDG · Orly · Beauvais -> your hotel. Meet & Greet, flight tracking, and fixed pricing.",
      cta: "Get a quote",
      priceFrom: "From €70",
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
        "Move around Paris at your pace with flexible stops and door-to-door service. From €70/hour.",
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
      priceFrom: "From €95",
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
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
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
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
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
    description: "",
    distance: "",
    duration: "",
    highlights: [],
    whyVisit: [],
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
    years: "40 years of expertise",
    description:
      "For 40 years, we have embodied excellence in private transportation in Paris. Our expertise has been forged through serving demanding international clientele, from airport transfers to cultural excursions.",
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
    address: "123 Avenue des Champs-Élysées, Paris",
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
    title: "Available Vehicles",
    subtitle: "Premium Mercedes-Benz fleet less than 3 years old",
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
          "You can cancel your reservation up to 24 hours before the service without charge. Later cancellations may be subject to a 50% service fee.",
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
          "For most services, a 30% deposit is required to confirm the reservation. The remaining balance can be paid before or after the service, according to your preference.",
      },
      vehicleTypes: {
        question: "What types of vehicles do you offer?",
        answer:
          "Our premium fleet includes luxury sedans (Mercedes E-Class, BMW 7 Series), executive vans (Mercedes V-Class), and high-end SUVs. All our vehicles are less than 2 years old.",
      },
    },
  },
  footer: {
    description:
      "Luxury transportation service and exclusive tours in Paris and surroundings.",
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
    copyright: " 2025 Paris Elite Services. All rights reserved.",
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
    premiumVehicles: "Premium vehicles (Mercedes, BMW)",
    sidebar: {
      quickQuote: "Quick Quote",
      quickQuoteDesc: "Get an instant price for your transfer",
      calculatePrice: "Calculate Price",
      whatsapp: "WhatsApp Quote",
      popularRoutes: "Popular Routes",
      fixedPrices: "Fixed prices • No hidden fees",
      available247: "Available 24/7",
      flightTracking: "Flight tracking included",
      freeCancellation: "Free cancellation 24h",
      premiumVehicles: "Premium vehicles",
    },
    newsletter: {
      title: "Get Travel Tips & Exclusive Offers",
      description:
        "Subscribe to our newsletter and receive a 10% discount code for your first booking, plus insider tips for traveling in Paris.",
      subscribe: "Subscribe",
      privacy: "We respect your privacy. Unsubscribe at any time.",
    },
  },
  events: {
    pageTitle: "Events in Paris | Paris Luxe Journey",
    pageDescription:
      "Discover the best events, concerts, exhibitions and activities happening in Paris this week and month. Book your luxury transfer to any event.",
    heroTitle: "Events in Paris",
    heroSubtitle:
      "Discover the best concerts, exhibitions, shows and cultural events happening in Paris. Book your luxury transfer to arrive in style.",
    liveUpdates: "Live Updates",
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
  },
  seo: {
    home: {
      title:
        "Paris Luxury Transfers | Airport VTC Service CDG, Orly | From €70",
      description:
        "Premium airport transfer service in Paris. Book your private chauffeur for CDG, Orly, or city transfers. Fixed prices from €70, 24/7 availability, luxury vehicles. Book now!",
    },
    airports: {
      title: "Paris Airport Transfers | CDG, Orly, Beauvais Terminal Guide",
      description:
        "Private airport transfers in Paris with fixed pricing, terminal pickup guidance for CDG, Orly and Beauvais, and 24/7 chauffeur support.",
    },
  },
};

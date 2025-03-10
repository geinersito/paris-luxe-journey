import { Translation } from "@/types/i18n";

export const en: Translation = {
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    fleet: "Fleet",
    excursions: "Excursions"
  },
  hero: {
    title: "Luxury Transportation in Paris",
    subtitle: "Experience the elegance of Paris with our premium chauffeur services and exclusive tours."
  },
  excursions: {
    title: "Discover France's Treasures",
    subtitle: "Explore France's most iconic landmarks and best-kept secrets with our customized tours",
    cta: "Explore Destinations",
    search: {
      placeholder: "Search destinations...",
      duration: "All durations",
      type: "All types"
    },
    card: {
      moreInfo: "More information",
      from: "From",
      duration: "Duration"
    },
    filters: {
      duration: {
        halfDay: "Half day",
        fullDay: "Full day",
        multiDay: "Multiple days"
      },
      type: {
        private: "Private tours",
        group: "Group tours",
        luxury: "Luxury experiences"
      }
    },
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ"
    }
  },
  booking: {
    title: "Book Your Journey",
    pickup: "Pickup Location",
    dropoff: "Drop-off Location",
    pickupPlaceholder: "Enter pickup location",
    dropoffPlaceholder: "Enter drop-off location",
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
    services: {
      airport: "Airport Transfer",
      city: "City Tour",
      daytrip: "Day Trip",
      chauffeur: "Private Chauffeur",
    },
    serviceLevel: "Service Level",
    payment: {
      title: "Payment Details",
      cardDetails: "Card Details"
    },
    submit: "Book Now",
    extras: {
      title: "Additional Services",
      tourGuide: "Tour Guide",
      tourGuideDesc: "Professional guide who will accompany you during the tour",
    },
    vehicle: {
      title: "Select your Vehicle",
      capacity: "passengers",
      luggage: "luggage",
      berline: "E-Class",
      van: "V-Class"
    },
    price: {
      total: "Total Price",
      estimated: "Estimated Price",
      distance: "Estimated distance",
      basePrice: "Base price from",
      roundTripIncluded: "*Price includes round trip"
    },
    success: {
      title: "Payment Successful",
      description: "Your booking has been confirmed. Thank you for choosing our service!"
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
    specialInstructionsPlaceholder: "Any additional information for the driver...",
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
      invalidPassengerInfo: "Invalid passenger information provided",
      invalidPhone: "Invalid phone number",
      serviceLevelsNotLoaded: "Could not load service levels",
      selectServiceLevel: "Please select a service level",
    },
    summary: {
      title: "Booking Summary",
      journey: "Journey Details",
      schedule: "Schedule",
      vehicle: "Vehicle Details",
      luggage: "Luggage",
      contact: "Contact Information",
      total: "Total Amount"
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
      phone: "Phone"
    }
  },
  common: {
    back: "Back",
    continue: "Continue",
    processing: "Processing...",
    error: "Error",
    from: "From",
    sending: "Sending..."
  },
  services: {
    title: "Our Premium Services",
    subtitle: "Experience luxury transportation at its finest",
    airport: {
      title: "Airport Transfers",
      description: "Seamless transportation to and from CDG, Orly, and Beauvais airports."
    },
    chauffeur: {
      title: "Private Chauffeur",
      description: "Luxury vehicle with professional chauffeur at your disposal."
    },
    cityTours: {
      title: "City Tours",
      description: "Discover Paris's most iconic landmarks with our expert guides."
    },
    dayTrips: {
      title: "Day Trips",
      description: "Explore beyond Paris with customized day trips to French destinations."
    }
  },
  versailles: {
    title: "Palace of Versailles",
    description: "The Palace of Versailles, a UNESCO World Heritage site",
    distance: "23 km from Paris",
    duration: "4-12 hours",
    highlights: [
      "Hall of Mirrors",
      "Royal Gardens",
      "Grand Apartments"
    ],
    whyVisit: [
      "UNESCO World Heritage Site",
      "Largest Palace in Europe",
      "Historic French Monarchy"
    ],
    navigation: {
      description: "Overview",
      tours: "Our Tours",
      map: "How to Get There",
      events: "Events",
      faq: "FAQ"
    }
  },
  toast: {
    languageChanged: "Language changed successfully"
  },
  about: {
    title: "About Paris Elite Services",
    subtitle: "Excellence in Private Transportation in Paris",
    years: "40 years of expertise",
    description: "For 40 years, we have embodied excellence in private transportation in Paris. Our expertise has been forged through serving demanding international clientele, from airport transfers to cultural excursions.",
    commitment: {
      title: "Our Commitment",
      items: [
        "Personalized service adapted to each client",
        "Multilingual chauffeurs selected for their professionalism",
        "Regularly renewed high-end vehicles",
        "24/7 flexibility and responsiveness"
      ]
    },
    expertise: {
      title: "Our Expertise",
      items: [
        "VIP airport reception",
        "Custom excursion organization",
        "Event support",
        "Transportation concierge service"
      ]
    },
    conclusion: {
      satisfaction: "The satisfaction of our international clients testifies to our constant commitment to exceptional service. Each journey is an opportunity to demonstrate our professionalism and attention to detail.",
      partnerships: "Our long-standing partnerships with international travel agencies and luxury Parisian hotels reflect the trust earned over the years."
    }
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
    error: "Error sending message. Please try again."
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
        "24/7 Concierge Service"
      ]
    },
    guarantees: {
      title: "Premium Guarantees",
      items: [
        "Guaranteed Punctuality",
        "High-end Vehicles",
        "24/7 Assistance",
        "Airport Meet & Greet"
      ]
    },
    vip: {
      title: "VIP Experience",
      items: [
        "Elite Multilingual Chauffeurs",
        "24/7 Availability",
        "Complete Itinerary Flexibility",
        "Dedicated Personal Assistant"
      ]
    }
  },
  fleet: {
    title: "Available Vehicles",
    subtitle: "Premium Mercedes-Benz fleet less than 3 years old",
    exterior: "Exterior",
    interior: "Interior",
    features: "Included features",
    passengers: "passengers",
    luggage: "suitcases",
    noVehicles: "No vehicles available at this time",
    vehicleFeatures: {
      wifi: "Free WiFi",
      water: "Bottled water",
      airConditioning: "Individual air conditioning",
      leatherSeats: "Leather seats",
      cleaning: "Guaranteed cleaning"
    }
  },
  faq: {
    title: "Frequently Asked Questions",
    categories: {
      bookings: "Bookings",
      services: "Services",
      payment: "Payment",
      vehicles: "Vehicles"
    },
    questions: {
      howToBook: {
        question: "How does the booking service work?",
        answer: "Our booking system is simple and straightforward. Select your vehicle type, date and time, and complete your pickup and destination details. You will receive an immediate confirmation by email."
      },
      cancellation: {
        question: "What is the cancellation policy?",
        answer: "You can cancel your reservation up to 24 hours before the service without charge. Later cancellations may be subject to a 50% service fee."
      },
      advanceBooking: {
        question: "How far in advance should I book?",
        answer: "We recommend making reservations at least 48 hours in advance to ensure availability. However, we can also accommodate last-minute bookings subject to availability."
      },
      modifyBooking: {
        question: "Can I modify my reservation?",
        answer: "Yes, you can modify your reservation up to 24 hours before the service at no additional charge. Changes are subject to availability."
      },
      flightDelay: {
        question: "What happens if my flight is delayed?",
        answer: "We monitor all flights. Don't worry, we'll adjust the pickup time at no additional charge. Our team will keep track of any changes to your arrival time."
      },
      airportTransfer: {
        question: "What is the process for airport transfers?",
        answer: "For airport transfers, we recommend scheduling pickup 3 hours before international flights and 2 hours for domestic flights. Our team monitors traffic in real-time to ensure your timely arrival."
      },
      tourGuide: {
        question: "Do you offer tour guide services?",
        answer: "Yes, we have professional multilingual guides for customized tours of Paris and its surroundings. They can adapt the tour according to your specific interests."
      },
      privateDriver: {
        question: "What does the private chauffeur service include?",
        answer: "The service includes a multilingual professional chauffeur, luxury vehicle, bottled water, onboard wifi, and 24/7 assistance. We can also add additional services according to your needs."
      },
      outsideParis: {
        question: "Do you conduct excursions outside Paris?",
        answer: "Yes, we offer excursions to popular destinations such as the Loire Valley Castles, Versailles, Giverny, Champagne, and other points of interest. All tours are customizable according to your preferences."
      },
      pricesIncluded: {
        question: "Do prices include all charges?",
        answer: "Yes, our prices include VAT, insurance, and all associated charges. There are no hidden costs. The price you see is the final price you'll pay."
      },
      paymentMethods: {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), bank transfers, and cash payments. For corporate bookings, we offer monthly billing."
      },
      deposit: {
        question: "Is a deposit required to book?",
        answer: "For most services, a 30% deposit is required to confirm the reservation. The remaining balance can be paid before or after the service, according to your preference."
      },
      vehicleTypes: {
        question: "What types of vehicles do you offer?",
        answer: "Our premium fleet includes luxury sedans (Mercedes E-Class, BMW 7 Series), executive vans (Mercedes V-Class), and high-end SUVs. All our vehicles are less than 2 years old."
      }
    }
  },
  footer: {
    description: "Luxury transportation service and exclusive tours in Paris and surroundings.",
    links: {
      title: "Quick Links",
      services: "Services",
      fleet: "Fleet",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    schedule: {
      title: "Opening Hours",
      description: "Service available 24 hours, 7 days a week"
    },
    payment: {
      title: "Accepted Payment Methods"
    },
    copyright: " 2025 Paris Elite Services. All rights reserved."
  }
};

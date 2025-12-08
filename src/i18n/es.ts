import { Translation } from "@/types/i18n";

export const es: Translation = {
  nav: {
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
    fleet: "Flota",
    excursions: "Excursiones"
  },
  hero: {
    title: "Paris Elite Services",
    subtitle: "Transfers aeropuerto París ⇄ CDG / Orly desde 70€ (1–3 pasajeros, todo incluido)"
  },
  excursions: {
    title: "Descubre los Tesoros de Francia",
    subtitle: "Explora los lugares más emblemáticos y secretos mejor guardados de Francia con nuestros tours personalizados",
    cta: "Explorar Destinos",
    search: {
      placeholder: "Buscar destinos...",
      duration: "Todas las duraciones",
      type: "Todos los tipos"
    },
    card: {
      moreInfo: "Más información",
      from: "Desde",
      duration: "Duración"
    },
    filters: {
      duration: {
        halfDay: "Medio día",
        fullDay: "Día completo",
        multiDay: "Varios días"
      },
      type: {
        private: "Tours privados",
        group: "Tours en grupo",
        luxury: "Experiencias de lujo"
      }
    },
    navigation: {
      description: "Descripción General",
      tours: "Nuestros Tours",
      map: "Cómo Llegar",
      events: "Eventos",
      faq: "Preguntas Frecuentes"
    }
  },
  booking: {
    title: "Reserve su Viaje",
    pickup: "Lugar de Recogida",
    dropoff: "Lugar de Destino",
    pickupPlaceholder: "CDG Terminal 1, 2, 3 o dirección París",
    dropoffPlaceholder: "CDG Terminal 1, 2, 3 o dirección París",
    date: "Fecha",
    time: "Hora",
    returnDate: "Fecha de Regreso",
    returnTime: "Hora de Regreso",
    passengers: "Pasajeros",
    service: "Tipo de Servicio",
    tripType: "Tipo de Viaje",
    oneWay: "Solo Ida",
    roundTrip: "Ida y Vuelta",
    continue: "Continuar Reserva",
    assignedVehicles: "Vehículos Asignados",
    largeLuggage: "Maleta Grande",
    smallLuggage: "Maleta Pequeña",
    maxWeight: "peso máximo",
    services: {
      airport: "Traslado Aeropuerto",
      city: "Tour por la Ciudad",
      daytrip: "Excursión",
      chauffeur: "Chófer Privado",
    },
    submit: "Reservar Ahora",
    extras: {
      title: "Servicios Adicionales",
      tourGuide: "Guía Turístico",
      tourGuideDesc: "Guía profesional que le acompañará durante el recorrido",
    },
    vehicle: {
      title: "Seleccione su Vehículo",
      capacity: "pasajeros",
      luggage: "Equipaje",
      berline: "Clase E",
      van: "Clase V"
    },
    price: {
      total: "Precio Total",
      estimated: "Precio Estimado",
      distance: "Distancia estimada",
      basePrice: "Precio base desde",
      roundTripIncluded: "*Precio incluye ida y vuelta"
    },
    passengerDetails: "Detalles del Pasajero",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingrese su nombre completo",
    email: "Correo Electrónico",
    emailPlaceholder: "Ingrese su correo electrónico",
    phone: "Teléfono",
    phonePlaceholder: "+33 XXXXXXXXX",
    flightNumber: "Número de Vuelo (opcional)",
    flightNumberPlaceholder: "ej. AF1234",
    specialInstructions: "Instrucciones Especiales",
    specialInstructionsPlaceholder: "Información adicional para el conductor...",
    payment: {
      title: "Detalles del Pago",
      cardDetails: "Detalles de la Tarjeta"
    },
    success: {
      title: "Pago Exitoso",
      description: "Tu reserva ha sido confirmada. ¡Gracias por elegir nuestro servicio!"
    },
    errors: {
      invalidEmail: "Email Inválido",
      emailDescription: "Por favor ingresa un email válido",
      invalidName: "Nombre Inválido",
      nameDescription: "Por favor ingresa tu nombre completo",
      locationsNotLoaded: "No se pudieron cargar las ubicaciones",
      selectLocations: "Por favor selecciona los lugares de recogida y destino",
      selectDateTime: "Por favor selecciona fecha y hora",
      selectReturnDateTime: "Por favor selecciona fecha y hora de regreso",
      selectPassengers: "Por favor especifica el número de pasajeros",
      noVehiclesAvailable: "No hay vehículos disponibles para esta reserva",
      bookingCreationError: "Error al crear la reserva",
      acceptTerms: "Por favor acepta los términos y condiciones",
      paymentIntentError: "Error al crear el pago. Por favor intenta de nuevo.",
      generalPaymentError: "Ocurrió un error durante el pago",
      missingIds: "Falta información de la reserva o el pago",
      finalizationError: "Error al finalizar la reserva",
      noBookingData: "No se encontraron datos de la reserva",
      requiredFields: "Por favor completa todos los campos requeridos",
      invalidPassengerInfo: "Información del pasajero no válida",
      invalidPhone: "Número de teléfono inválido"
    },
    summary: {
      title: "Resumen de la Reserva",
      journey: "Detalles del Viaje",
      schedule: "Horario",
      vehicle: "Detalles del Vehículo",
      luggage: "Equipaje",
      contact: "Información de Contacto",
      total: "Importe Total"
    },
    form: {
      from: "Desde",
      to: "Hasta",
      vehicleType: "Tipo de Vehículo",
      passengers: "Pasajeros",
      largeLuggage: "Equipaje Grande",
      smallLuggage: "Equipaje Pequeño",
      name: "Nombre",
      email: "Correo Electrónico",
      phone: "Teléfono"
    }
  },
  common: {
    back: "Volver",
    continue: "Continuar",
    processing: "Procesando...",
    error: "Error",
    from: "Desde"
  },
  services: {
    title: "Nuestros Servicios Premium",
    subtitle: "Experimente el transporte de lujo en su máxima expresión",
    airport: {
      title: "Traslados Aeropuerto",
      description: "Transporte sin contratiempos desde y hacia los aeroportos CDG, Orly y Beauvais.",
    },
    chauffeur: {
      title: "Chófer Privado",
      description: "Vehículo de lujo con chófer profesional a su disposición.",
    },
    cityTours: {
      title: "Tours por la Ciudad",
      description: "Descubra los lugares más emblemáticos de París con nuestros guías expertos.",
    },
    dayTrips: {
      title: "Excursiones",
      description: "Explore más allá de París con excursiones personalizadas a destinos franceses.",
    },
    dropdown: {
      transfers: "Traslados Aeropuerto",
      chauffeur: "Servicio por Hora",
      excursions: "Excursiones"
    }
  },
  about: {
    title: "Sobre Paris Elite Services",
    subtitle: "Excelencia en Transporte Privado en París",
    years: "40 años de experiencia",
    description: "Durante 40 años, hemos encarnado la excelencia en el transporte privado en París. Nuestra experiencia se ha forjado atendiendo a una exigente clientela internacional, desde traslados al aeropuerto hasta excursiones culturales.",
    commitment: {
      title: "Nuestro Compromiso",
      items: [
        "Servicio personalizado adaptado a cada cliente",
        "Chóferes multilingües seleccionados por su profesionalismo",
        "Vehículos de alta gama renovados regularmente",
        "Flexibilidad y capacidad de respuesta 24/7"
      ]
    },
    expertise: {
      title: "Nuestra Experiencia",
      items: [
        "Recepción VIP en aeropuertos",
        "Organización de excursiones personalizadas",
        "Apoyo en eventos",
        "Servicio de conserjería de transporte"
      ]
    },
    conclusion: {
      satisfaction: "La satisfacción de nuestros clientes internacionales testimonia nuestro compromiso constante con un servicio excepcional. Cada viaje es una oportunidad para demostrar nuestro profesionalismo y atención al detalle.",
      partnerships: "Nuestras asociaciones de larga duración con agencias de viajes internacionales y hoteles de lujo parisinos reflejan la confianza ganada a lo largo de los años."
    }
  },
  contact: {
    title: "Contáctenos",
    description: "Póngase en contacto con nuestro equipo para cualquier consulta o asistencia",
    subtitle: "Póngase en contacto con nosotros",
    phone: "Teléfono",
    email: "Correo Electrónico",
    address: "123 Avenue des Champs-Élysées, Paris",
    name: "Nombre",
    message: "Mensaje",
    namePlaceholder: "Ingrese su nombre",
    emailPlaceholder: "Ingrese su correo electrónico",
    phonePlaceholder: "Ingrese su teléfono",
    messagePlaceholder: "Escriba su mensaje aquí",
    sendMessage: "Enviar Mensaje",
    success: "¡Mensaje enviado con éxito!",
    successDescription: "¡Nos pondremos en contacto pronto!",
    error: "Error al enviar el mensaje. Por favor, inténtelo de nuevo."
  },
  premium: {
    title: "Servicios Premium",
    exclusive: {
      title: "Servicios Exclusivos",
      items: [
        "Recibimiento VIP personalizado",
        "Chófer dedicado multilingüe",
        "Servicio de conserjería",
        "Flexibilidad total de itinerario"
      ]
    },
    guarantees: {
      title: "Garantías Premium",
      items: [
        "Puntualidad garantizada",
        "Vehículos de alta gama",
        "Asistencia 24/7",
        "Meet & Greet aeropuerto"
      ]
    },
    vip: {
      title: "Opciones VIP",
      items: [
        "Champagne a bordo",
        "Wifi y cargadores",
        "Elección de vehículo",
        "Guía privado disponible"
      ]
    }
  },
  fleet: {
    title: "Vehículos Disponibles",
    subtitle: "Flota premium de Mercedes-Benz con menos de 3 años de antigüedad",
    exterior: "Exterior",
    interior: "Interior",
    features: "Características incluidas",
    passengers: "pasajeros",
    luggage: "Equipaje",
    noVehicles: "No hay vehículos disponibles en este momento",
    vehicleFeatures: {
      wifi: "Wifi gratuito",
      water: "Agua embotellada",
      airConditioning: "Climatización individual",
      leatherSeats: "Asientos de cuero",
      cleaning: "Limpieza garantizada"
    }
  },
  versailles: {
    title: "Palacio de Versalles",
    description: "El Palacio de Versalles, patrimonio mundial de la UNESCO",
    distance: "23 km desde París",
    duration: "4-12 horas",
    highlights: [
      "Galería de los Espejos",
      "Jardines Reales",
      "Apartamentos Reales"
    ],
    whyVisit: [
      "Patrimonio Mundial de la UNESCO",
      "El palacio más grande de Europa",
      "Historia de la monarquía francesa"
    ],
    navigation: {
      description: "Descripción General",
      tours: "Nuestros Tours",
      map: "Cómo Llegar",
      events: "Eventos",
      faq: "Preguntas Frecuentes"
    }
  },
  toast: {
    languageChanged: "Idioma cambiado correctamente"
  },
  footer: {
    description: "Servicio de transporte de lujo y tours exclusivos en París y sus alrededores.",
    links: {
      title: "Enlaces Rápidos",
      services: "Servicios",
      fleet: "Flota",
      about: "Sobre Nosotros",
      contact: "Contacto",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio"
    },
    schedule: {
      title: "Horario de Atención",
      description: "Servicio disponible las 24 horas, los 7 días de la semana"
    },
    payment: {
      title: "Métodos de pago aceptados"
    },
    copyright: " 2025 Paris Elite Services. Todos los derechos reservados."
  },
  faq: {
    title: "Preguntas Frecuentes",
    categories: {
      bookings: "Reservas",
      services: "Servicios",
      payment: "Pago",
      vehicles: "Vehículos"
    },
    questions: {
      howToBook: {
        question: "¿Cómo funciona el servicio de reserva?",
        answer: "Nuestro sistema de reservas es simple y directo. Seleccione su tipo de vehículo, fecha y hora, y complete los detalles de recogida y destino. Recibirá una confirmación inmediata por correo electrónico."
      },
      cancellation: {
        question: "¿Cuál es la política de cancelación?",
        answer: "Puede cancelar su reserva hasta 24 horas antes del servicio sin cargo. Las cancelaciones posteriores pueden estar sujetas a un cargo del 50% del servicio."
      },
      advanceBooking: {
        question: "¿Con cuánta antelación debo reservar?",
        answer: "Recomendamos hacer las reservas con al menos 48 horas de antelación para garantizar la disponibilidad. Sin embargo, también podemos acomodar reservas de última hora sujetas a disponibilidad."
      },
      modifyBooking: {
        question: "¿Puedo modificar mi reserva?",
        answer: "Sí, puede modificar su reserva hasta 24 horas antes del servicio sin cargo adicional. Los cambios están sujetos a disponibilidad."
      },
      flightDelay: {
        question: "¿Qué sucede si mi vuelo se retrasa?",
        answer: "Monitoreamos todos los vuelos. No se preocupe, ajustaremos la hora de recogida sin cargo adicional. Nuestro equipo estará pendiente de cualquier cambio en su hora de llegada."
      },
      airportTransfer: {
        question: "¿Cuál es el proceso para los traslados al aeropuerto?",
        answer: "Para traslados al aeropuerto, recomendamos programar la recogida 3 horas antes de los vuelos internacionales y 2 horas para vuelos nacionales. Nuestro equipo monitorea el tráfico en tiempo real para garantizar su llegada a tiempo."
      },
      tourGuide: {
        question: "¿Ofrecen servicios de guía turístico?",
        answer: "Sí, contamos con guías profesionales multilingües para tours personalizados de París y sus alrededores. Pueden adaptar el tour según sus intereses específicos."
      },
      privateDriver: {
        question: "¿Qué incluye el servicio de chófer privado?",
        answer: "El servicio incluye un chófer profesional multilingüe, vehículo de lujo, agua embotellada, wifi a bordo y asistencia 24/7. También podemos agregar servicios adicionales según sus necesidades."
      },
      outsideParis: {
        question: "¿Realizan excursiones fuera de París?",
        answer: "Sí, ofrecemos excursiones a destinos populares como los Castillos del Loira, Versalles, Giverny, Champagne y otros puntos de interés. Todos los tours son personalizables según sus preferencias."
      },
      pricesIncluded: {
        question: "¿Los precios incluyen todos los cargos?",
        answer: "Sí, nuestros precios incluyen IVA, seguro y todos los cargos asociados. No hay costos ocultos. El precio que ve es el precio final que pagará."
      },
      paymentMethods: {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, MasterCard, American Express), transferencias bancarias y pagos en efectivo. Para reservas corporativas, ofrecemos facturación mensual."
      },
      deposit: {
        question: "¿Se requiere un depósito para reservar?",
        answer: "Para la mayoría de los servicios, se requiere un depósito del 30% para confirmar la reserva. El saldo restante se puede pagar antes o después del servicio, según su preferencia."
      },
      vehicleTypes: {
        question: "¿Qué tipos de vehículos ofrecen?",
        answer: "Nuestra flota premium incluye sedanes de lujo (Mercedes Clase E, BMW Serie 7), vans ejecutivas (Mercedes Clase V) y SUVs de alta gama. Todos nuestros vehículos tienen menos de 2 años de antigüedad."
      }
    }
  }
};

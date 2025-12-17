import { Translation } from "@/types/i18n";

export const es: Translation = {
  nav: {
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
    fleet: "Flota",
    excursions: "Excursiones",
    events: "Eventos",
    blog: "Blog",
  },
  hero: {
    title: "Paris Elite Services",
    subtitle:
      "Transfers aeropuerto París ⇄ CDG / Orly desde 70€ (1–3 pasajeros, todo incluido)",
  },
  trustBar: {
    securePayment: "Pago Seguro",
    securePaymentDesc: "Encriptación SSL",
    licensed: "Licenciado y Asegurado",
    licensedDesc: "Licencia VTC oficial",
    available: "Disponible 24/7",
    availableDesc: "Siempre a su servicio",
    insurance: "Seguro Completo",
    insuranceDesc: "Cobertura total",
  },
  routes: {
    title: "Rutas Populares",
    subtitle: "Nuestros destinos más solicitados con precios fijos",
    cdg: "Aeropuerto CDG",
    cdgDesc: "París ⇄ Charles de Gaulle",
    orly: "Aeropuerto Orly",
    orlyDesc: "París ⇄ Orly",
    disney: "Disneyland París",
    disneyDesc: "Día mágico",
    versailles: "Versalles",
    versaillesDesc: "Tour del palacio real",
    perTrip: "1-3 pasajeros",
    bookNow: "Reservar",
    allInclusive:
      "✓ Todos los precios incluyen peajes, parking y tiempo de espera",
  },
  exitPopup: {
    title: "¡Espera! No Te Vayas Aún",
    subtitle: "Obtén 10% de Descuento en Tu Primer Traslado",
    emailPlaceholder: "Tu dirección de email",
    button: "OBTENER MI DESCUENTO",
    benefit1: "Precio fijo, sin sorpresas",
    benefit2: "Conductor bilingüe (Español/Francés)",
    benefit3: "Cancelación gratuita hasta 24h",
    validity: "*Válido para reservas en los próximos 7 días",
    success: "¡Revisa tu email para tu código de descuento!",
    error: "Algo salió mal. Por favor intenta de nuevo.",
    invalidEmail: "Por favor ingresa un email válido",
    sending: "Enviando...",
  },
  excursions: {
    title: "Descubre los Tesoros de Francia",
    subtitle:
      "Explora los lugares más emblemáticos y secretos mejor guardados de Francia con nuestros tours personalizados",
    cta: "Explorar Destinos",
    searchPlaceholder: "Buscar destinos...",
    viewDetails: "Ver Detalles",
    noResults: "No se encontraron excursiones que coincidan con tus criterios",
    clearFilters: "Limpiar Filtros",
    highlights: "Destacados",
    fromPrice: "Desde €{price}",
    tourOptionsCount: "{count} opciones de tour disponibles",
    search: {
      placeholder: "Buscar destinos...",
      duration: "Todas las duraciones",
      type: "Todos los tipos",
    },
    card: {
      moreInfo: "Más información",
      from: "Desde",
      duration: "Duración",
    },
    filters: {
      duration: {
        halfDay: "Medio día",
        fullDay: "Día completo",
        multiDay: "Varios días",
      },
      type: {
        private: "Tours privados",
        group: "Tours en grupo",
        luxury: "Experiencias de lujo",
      },
      allDurations: "Todas las duraciones",
      allTypes: "Todos los tipos",
      flexible: "Flexible",
      standard: "Estándar",
      clearAll: "Limpiar Todo",
      price: "Rango de Precio",
      allPrices: "Todos los precios",
      above: "Más de",
    },
    types: {
      private: "Privado",
      group: "Grupo",
      luxury: "Lujo",
      standard: "Estándar",
      cultural: "Cultural",
      adventure: "Aventura",
      romantic: "Romántico",
      family: "Familiar",
    },
    navigation: {
      description: "Descripción General",
      tours: "Nuestros Tours",
      map: "Cómo Llegar",
      events: "Eventos",
      faq: "Preguntas Frecuentes",
    },
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
    luggagePolicy: {
      title: "Política de Equipaje",
      included:
        "Incluido: 1 maleta grande (23kg) + 1 bolso de cabina por pasajero",
      extraLarge:
        "Maletas grandes extra: 15€ cada una (según capacidad del vehículo)",
      extraSmall: "Bolsos pequeños gratis, hasta la capacidad del vehículo",
    },
    services: {
      airport: "Traslado Aeropuerto",
      city: "Tour por la Ciudad",
      daytrip: "Excursión",
      chauffeur: "Chófer Privado",
    },
    serviceLevel: "Nivel de Servicio",
    priceSummary: "Resumen de Precio",
    validatingPrice: "Validando precio...",
    submit: "Reservar Ahora",
    submitButton: "Ver Tu Precio Fijo",
    noPaymentRequired:
      "No se requiere pago - el siguiente paso muestra tu precio final",
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
      van: "Clase V",
    },
    groupTransfer: {
      title: "¿Necesita un traslado para 8+ pasajeros?",
      description:
        "Organizamos soluciones multi-vehículo o minibús bajo solicitud.",
      cta: "Solicitar cotización para grupo",
    },
    price: {
      total: "Precio Total",
      estimated: "Precio Estimado",
      distance: "Distancia estimada",
      basePrice: "Precio base desde",
      roundTripIncluded: "*Precio incluye ida y vuelta",
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
    specialInstructionsPlaceholder:
      "Información adicional para el conductor...",
    payment: {
      title: "Detalles del Pago",
      cardDetails: "Detalles de la Tarjeta",
    },
    success: {
      title: "¡Reserva Confirmada!",
      description: "Te hemos enviado un email con los detalles de tu reserva",
      confirmationNumber: "Número de confirmación:",
      bookingDetails: "Detalles de la Reserva",
      route: "Ruta",
      pickupDateTime: "Fecha y Hora de Recogida",
      passengers: "Pasajeros",
      passenger: "pasajero",
      luggage: "Equipaje",
      largeSuitcase: "maleta grande",
      largeSuitcases: "maletas grandes",
      smallBag: "bolso pequeño",
      smallBags: "bolsos pequeños",
      totalPaid: "Total Pagado:",
      cancellationPolicy: "Política de Cancelación",
      freeCancellation:
        "Cancelación gratuita hasta 24 horas antes de la recogida",
      partialRefund:
        "Reembolso del 50% para cancelaciones 12-24 horas antes de la recogida",
      noRefund:
        "Sin reembolso para cancelaciones con menos de 12 horas antes de la recogida",
      whatHappensNext: "¿Qué sucede ahora?",
      step1:
        "Recibirás un email de confirmación con todos los detalles de la reserva",
      step2:
        "24 horas antes de la recogida, te enviaremos los datos de contacto y foto de tu conductor",
      step3:
        "Tu conductor rastreará tu vuelo y ajustará la hora de recogida si es necesario",
      step4:
        "Tu conductor te esperará en la sala de llegadas con un cartel con tu nombre",
      addToCalendar: "Añadir al Calendario",
      backToHome: "Volver al Inicio",
    },
    groupNotice: {
      title: "Grupos de 8+ pasajeros",
      description:
        "Para grupos de 8 o más pasajeros, por favor contáctenos vía WhatsApp para un presupuesto personalizado.",
      cta: "Contactar vía WhatsApp",
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
      invalidPhone: "Número de teléfono inválido",
      serviceLevelsNotLoaded: "No se pudieron cargar los niveles de servicio",
      selectServiceLevel: "Por favor selecciona un nivel de servicio",
      priceStale: "El precio ha cambiado. Por favor revisa el nuevo precio.",
      networkError:
        "Error de red. Por favor verifica tu conexión e intenta de nuevo.",
    },
    summary: {
      title: "Resumen de la Reserva",
      journey: "Detalles del Viaje",
      schedule: "Horario",
      vehicle: "Detalles del Vehículo",
      luggage: "Equipaje",
      contact: "Información de Contacto",
      total: "Importe Total",
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
      phone: "Teléfono",
    },
    coupon: {
      label: "Código de Descuento",
      placeholder: "Ingresa tu código de descuento",
      apply: "Aplicar",
      remove: "Quitar",
      applied: "Descuento aplicado",
      discount: "Descuento",
    },
    couponApplied: "¡Cupón aplicado!",
    invalidCoupon: "Cupón inválido",
    couponExpired: "Este cupón es inválido o ha expirado.",
    couponError: "Error al validar el cupón. Por favor intenta de nuevo.",
    couponRemoved: "Cupón eliminado",
    couponRemovedDesc: "El descuento ha sido eliminado de tu reserva.",
  },
  common: {
    back: "Volver",
    continue: "Continuar",
    processing: "Procesando...",
    error: "Error",
    from: "Desde",
    sending: "Enviando...",
    warning: "Advertencia",
  },
  services: {
    title: "Nuestros Servicios Premium",
    subtitle: "Experimente el transporte de lujo en su máxima expresión",
    decorativeSubtitle: "Experimente el transporte de lujo",
    cta: "Reservar Ahora",
    groupDisclaimer: "Para grupos de 8+ pasajeros, por favor contáctenos",
    airport: {
      title: "Traslados Aeropuerto",
      description:
        "Transporte sin contratiempos desde y hacia los aeroportos CDG, Orly y Beauvais.",
      priceFrom: "Desde €70",
      features: [
        "Servicio Meet & Greet",
        "Seguimiento de Vuelos",
        "Tiempo de Espera Gratis",
        "1 Maleta/Pax Incluida",
        "Chóferes Profesionales",
      ],
    },
    chauffeur: {
      title: "Chófer Privado",
      description: "Vehículo de lujo con chófer profesional a su disposición.",
      priceFrom: "Desde €60/hora",
      features: [
        "Reserva por Horas Disponible",
        "Disponibilidad 24/7",
        "Servicio Multilingüe",
        "Rutas y Paradas Personalizadas",
      ],
    },
    cityTours: {
      title: "Tours por la Ciudad",
      description:
        "Descubra los lugares más emblemáticos de París con nuestros chóferes profesionales.",
      priceFrom: "Desde €95",
      features: [
        "Itinerarios Personalizados",
        "Chóferes Profesionales",
        "Vehículos Premium",
        "Mercedes Clase E y Clase V",
      ],
    },
    dayTrips: {
      title: "Excursiones",
      description:
        "Explore más allá de París con excursiones personalizadas a destinos franceses.",
    },
    dropdown: {
      transfers: "Traslados Aeropuerto",
      chauffeur: "Servicio por Hora",
      excursions: "Excursiones",
    },
  },
  about: {
    title: "Sobre Paris Elite Services",
    subtitle: "Excelencia en Transporte Privado en París",
    years: "40 años de experiencia",
    description:
      "Durante 40 años, hemos encarnado la excelencia en el transporte privado en París. Nuestra experiencia se ha forjado atendiendo a una exigente clientela internacional, desde traslados al aeropuerto hasta excursiones culturales.",
    commitment: {
      title: "Nuestro Compromiso",
      items: [
        "Servicio personalizado adaptado a cada cliente",
        "Chóferes multilingües seleccionados por su profesionalismo",
        "Vehículos de alta gama renovados regularmente",
        "Flexibilidad y capacidad de respuesta 24/7",
      ],
    },
    expertise: {
      title: "Nuestra Experiencia",
      items: [
        "Recepción VIP en aeropuertos",
        "Organización de excursiones personalizadas",
        "Apoyo en eventos",
        "Servicio de conserjería de transporte",
      ],
    },
    conclusion: {
      satisfaction:
        "La satisfacción de nuestros clientes internacionales testimonia nuestro compromiso constante con un servicio excepcional. Cada viaje es una oportunidad para demostrar nuestro profesionalismo y atención al detalle.",
      partnerships:
        "Nuestras asociaciones de larga duración con agencias de viajes internacionales y hoteles de lujo parisinos reflejan la confianza ganada a lo largo de los años.",
    },
  },
  contact: {
    title: "Contáctenos",
    description:
      "Póngase en contacto con nuestro equipo para cualquier consulta o asistencia",
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
    error: "Error al enviar el mensaje. Por favor, inténtelo de nuevo.",
  },
  premium: {
    title: "Servicios Premium",
    exclusive: {
      title: "Servicios Exclusivos",
      items: [
        "Recibimiento VIP personalizado",
        "Chófer dedicado multilingüe",
        "Servicio de conserjería",
        "Flexibilidad total de itinerario",
      ],
    },
    guarantees: {
      title: "Garantías Premium",
      items: [
        "Puntualidad garantizada",
        "Vehículos de alta gama",
        "Asistencia 24/7",
        "Meet & Greet aeropuerto",
      ],
    },
    vip: {
      title: "Opciones VIP",
      items: [
        "Champagne a bordo",
        "Wifi y cargadores",
        "Elección de vehículo",
        "Guía privado disponible",
      ],
    },
  },
  fleet: {
    title: "Vehículos Disponibles",
    subtitle:
      "Flota premium de Mercedes-Benz con menos de 3 años de antigüedad",
    exterior: "Exterior",
    interior: "Interior",
    features: "Características incluidas",
    passengers: "pasajeros",
    luggage: "Equipaje",
    bookNow: "Reservar Ahora",
    noVehicles: "No hay vehículos disponibles en este momento",
    vehicleFeatures: {
      wifi: "Wifi gratuito",
      water: "Agua embotellada",
      airConditioning: "Climatización individual",
      leatherSeats: "Asientos de cuero",
      cleaning: "Limpieza garantizada",
    },
  },
  versailles: {
    title: "Palacio de Versalles",
    description: "El Palacio de Versalles, patrimonio mundial de la UNESCO",
    distance: "23 km desde París",
    duration: "4-12 horas",
    highlights: [
      "Galería de los Espejos",
      "Jardines Reales",
      "Apartamentos Reales",
    ],
    whyVisit: [
      "Patrimonio Mundial de la UNESCO",
      "El palacio más grande de Europa",
      "Historia de la monarquía francesa",
    ],
    navigation: {
      description: "Descripción General",
      tours: "Nuestros Tours",
      map: "Cómo Llegar",
      events: "Eventos",
      faq: "Preguntas Frecuentes",
    },
  },
  toast: {
    languageChanged: "Idioma cambiado correctamente",
  },
  footer: {
    description:
      "Servicio de transporte de lujo y tours exclusivos en París y sus alrededores.",
    links: {
      title: "Enlaces Rápidos",
      services: "Servicios",
      fleet: "Flota",
      about: "Sobre Nosotros",
      contact: "Contacto",
      travelGuides: "Guías de Viaje",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      faq: "Preguntas Frecuentes",
    },
    schedule: {
      title: "Horario de Atención",
      description: "Servicio disponible las 24 horas, los 7 días de la semana",
    },
    payment: {
      title: "Métodos de pago aceptados",
    },
    copyright: " 2025 Paris Elite Services. Todos los derechos reservados.",
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle:
      "Encuentra respuestas a preguntas comunes sobre nuestros servicios",
    categories: {
      bookings: "Reservas",
      services: "Servicios",
      payment: "Pago",
      vehicles: "Vehículos",
    },
    questions: {
      howToBook: {
        question: "¿Cómo funciona el servicio de reserva?",
        answer:
          "Nuestro sistema de reservas es simple y directo. Seleccione su tipo de vehículo, fecha y hora, y complete los detalles de recogida y destino. Recibirá una confirmación inmediata por correo electrónico.",
      },
      cancellation: {
        question: "¿Cuál es la política de cancelación?",
        answer:
          "Puede cancelar su reserva hasta 24 horas antes del servicio sin cargo. Las cancelaciones posteriores pueden estar sujetas a un cargo del 50% del servicio.",
      },
      advanceBooking: {
        question: "¿Con cuánta antelación debo reservar?",
        answer:
          "Recomendamos hacer las reservas con al menos 48 horas de antelación para garantizar la disponibilidad. Sin embargo, también podemos acomodar reservas de última hora sujetas a disponibilidad.",
      },
      modifyBooking: {
        question: "¿Puedo modificar mi reserva?",
        answer:
          "Sí, puede modificar su reserva hasta 24 horas antes del servicio sin cargo adicional. Los cambios están sujetos a disponibilidad.",
      },
      flightDelay: {
        question: "¿Qué sucede si mi vuelo se retrasa?",
        answer:
          "Monitoreamos todos los vuelos. No se preocupe, ajustaremos la hora de recogida sin cargo adicional. Nuestro equipo estará pendiente de cualquier cambio en su hora de llegada.",
      },
      airportTransfer: {
        question: "¿Cuál es el proceso para los traslados al aeropuerto?",
        answer:
          "Para traslados al aeropuerto, recomendamos programar la recogida 3 horas antes de los vuelos internacionales y 2 horas para vuelos nacionales. Nuestro equipo monitorea el tráfico en tiempo real para garantizar su llegada a tiempo.",
      },
      tourGuide: {
        question: "¿Ofrecen servicios de guía turístico?",
        answer:
          "Sí, contamos con guías profesionales multilingües para tours personalizados de París y sus alrededores. Pueden adaptar el tour según sus intereses específicos.",
      },
      privateDriver: {
        question: "¿Qué incluye el servicio de chófer privado?",
        answer:
          "El servicio incluye un chófer profesional multilingüe, vehículo de lujo, agua embotellada, wifi a bordo y asistencia 24/7. También podemos agregar servicios adicionales según sus necesidades.",
      },
      outsideParis: {
        question: "¿Realizan excursiones fuera de París?",
        answer:
          "Sí, ofrecemos excursiones a destinos populares como los Castillos del Loira, Versalles, Giverny, Champagne y otros puntos de interés. Todos los tours son personalizables según sus preferencias.",
      },
      pricesIncluded: {
        question: "¿Los precios incluyen todos los cargos?",
        answer:
          "Sí, nuestros precios incluyen IVA, seguro y todos los cargos asociados. No hay costos ocultos. El precio que ve es el precio final que pagará.",
      },
      paymentMethods: {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos todas las tarjetas de crédito y débito principales (Visa, MasterCard, American Express), transferencias bancarias y pagos en efectivo. Para reservas corporativas, ofrecemos facturación mensual.",
      },
      deposit: {
        question: "¿Se requiere un depósito para reservar?",
        answer:
          "Para la mayoría de los servicios, se requiere un depósito del 30% para confirmar la reserva. El saldo restante se puede pagar antes o después del servicio, según su preferencia.",
      },
      vehicleTypes: {
        question: "¿Qué tipos de vehículos ofrecen?",
        answer:
          "Nuestra flota premium incluye sedanes de lujo (Mercedes Clase E, BMW Serie 7), vans ejecutivas (Mercedes Clase V) y SUVs de alta gama. Todos nuestros vehículos tienen menos de 2 años de antigüedad.",
      },
    },
  },
  avoidFakeTaxis: {
    badge: "Guía de Seguridad",
    hero: {
      title:
        "Taxis Falsos en Aeropuertos de París: Cómo Evitar Estafas y Reservar un Traslado Seguro",
      subtitle:
        "Miles de turistas son víctimas de estafas de taxis falsos en CDG y Orly cada año. Aprende a identificarlos y elige un traslado con licencia y precio fijo.",
    },
    problem: {
      title: "El Problema es Real",
      paragraph1:
        "Acabas de aterrizar en Charles de Gaulle después de un largo vuelo. Estás cansado, tienes equipaje y solo quieres llegar a tu hotel. Fuera de llegadas, alguien se acerca ofreciéndote un 'taxi' con un precio excelente. Suena conveniente, ¿verdad? Incorrecto.",
      paragraph2:
        "Así es como miles de turistas son estafados cada año en los aeropuertos de París. La estafa del taxi falso es una de las trampas turísticas más comunes en París, costando a las víctimas cientos de euros y arruinando su primera impresión de la ciudad.",
    },
    howScamWorks: {
      title: "Cómo Funciona la Estafa",
      paragraph1:
        "Los conductores de taxis falsos se dirigen a turistas en CDG, Orly y Beauvais. Usan insignias falsas, coches sin identificación y cotizan precios bajos para atraerte.",
      paragraph2:
        "Una vez que estás en el coche, toman rutas más largas, afirman que el taxímetro está 'roto' o exigen 3-4 veces la tarifa normal. Algunos incluso amenazan a los pasajeros que se niegan a pagar. Cuando te das cuenta de lo que está pasando, ya estás en el coche y lejos del aeropuerto.",
    },
    redFlags: {
      title: "Señales de Alerta a Vigilar",
      flag1: {
        title: "El conductor se acerca a ti dentro de la terminal",
        description:
          "Los taxis reales esperan en paradas oficiales afuera. Si alguien se acerca a ti dentro ofreciendo un taxi, es una estafa.",
      },
      flag2: {
        title: "Sin taxímetro o licencia oficial visible",
        description:
          "Todo taxi legal en París debe tener un taxímetro visible y número de licencia.",
      },
      flag3: {
        title: 'El coche no tiene letrero de techo "TAXI PARISIEN"',
        description:
          "Los taxis oficiales tienen un letrero de techo iluminado. Sin letrero = no es un taxi real.",
      },
      flag4: {
        title:
          'El conductor insiste en efectivo solo y cotiza un "precio especial"',
        description:
          "La ley francesa requiere que los taxis acepten tarjetas. Solo efectivo es una gran señal de alerta.",
      },
      flag5: {
        title: "Vehículo sin identificación o con letreros escritos a mano",
        description:
          "Los taxis oficiales tienen señalización profesional y marca. Los letreros escritos a mano son una estafa.",
      },
    },
    protection: {
      title: "Cómo Protegerte",
      intro: "Si debes tomar un taxi en el aeropuerto:",
      tip1: 'Solo usa paradas oficiales de taxis (sigue las señales "TAXI")',
      tip2: "Verifica que el vehículo tenga luz de techo y taxímetro",
      tip3: "Pide un presupuesto antes de subir",
      tip4: "Insiste en pagar con tarjeta (requisito legal en Francia)",
      betterOption:
        "Mejor opción: Reserva un traslado privado con licencia por adelantado con precio fijo.",
    },
    whyVTC: {
      title: "Por Qué un Traslado VTC con Licencia es la Alternativa Segura",
      intro:
        "A diferencia de los taxis de la calle, los servicios VTC (alquiler privado) con licencia como Paris Elite Services ofrecen:",
      benefit1: {
        title: "Precio fijo confirmado antes de viajar",
        description: "Sin sorpresas, sin trucos de taxímetro",
      },
      benefit2: {
        title: "Chóferes profesionales verificados",
        description: "Conductores con verificación de antecedentes",
      },
      benefit3: {
        title: "Seguimiento de vuelos",
        description: "El conductor espera incluso si tu vuelo se retrasa",
      },
      benefit4: {
        title: "Servicio de recepción",
        description: "El conductor espera en llegadas con tu nombre",
      },
      benefit5: {
        title: "Vehículos premium",
        description: "Mercedes Clase E, vans espaciosas para familias",
      },
      benefit6: {
        title: "Soporte al cliente 24/7",
        description: "WhatsApp, email, teléfono",
      },
    },
    pricing: {
      title: "Lo Que Deberías Pagar Realmente",
      intro:
        "Esto es lo que deberías esperar pagar por un traslado seguro y con licencia desde los aeropuertos de París:",
      tableHeaders: {
        route: "Ruta",
        passengers1to3: "1-3 Pasajeros",
        passengers4to7: "4-7 Pasajeros",
      },
      routes: {
        cdg: "Aeropuerto CDG → París",
        orly: "Aeropuerto Orly → París",
        beauvais: "Aeropuerto Beauvais → París",
      },
      warning:
        "⚠️ Advertencia: Si alguien te cotiza €30-40 para CDG-París, es una estafa o añadirán cargos ocultos después. La tarifa oficial de taxi desde CDG a París es alrededor de €50-60, y un VTC con licencia con precio fijo es €70.",
    },
    cta: {
      title: "No Arriesgues Tu Llegada a París",
      subtitle:
        "Reserva tu traslado de aeropuerto seguro y con licencia ahora con precios fijos y servicio profesional.",
      bookNow: "Ver Precios y Reservar Ahora",
      whatsapp: "Escríbenos por WhatsApp",
      groupsNotice:
        "Para grupos de 8+ pasajeros o solicitudes especiales, contáctanos vía WhatsApp: +33 6 68 25 11 02",
    },
  },
  blog: {
    title: "Blog de Viajes",
    subtitle: "Consejos expertos, guías e información para tu viaje a París",
    heroTitle: "Blog de Viajes",
    heroSubtitle:
      "Consejos expertos, guías e información para tu viaje a París",
    searchPlaceholder: "Buscar artículos...",
    featured: "Artículos Destacados",
    allArticles: "Todos los Artículos",
    categoryArticles: "Artículos",
    noArticles:
      "No se encontraron artículos. Prueba con otra búsqueda o categoría.",
    noArticlesFound:
      "No se encontraron artículos. Prueba con otro término de búsqueda.",
    relatedArticles: "Artículos Relacionados",
    needTransfer: "¿Necesitas un transfer?",
    calculatePrice: "Obtén un presupuesto instantáneo para tu transfer",
    getQuote: "Obtener Presupuesto",
    bookNow: "Reservar Ahora",
    readyToBook: "¿Listo para Reservar tu Transfer?",
    professionalService: "Servicio de chofer profesional",
    freeCancellation: "Cancelación gratuita hasta 24h",
    flightMonitoring: "Monitoreo de vuelo incluido",
    premiumVehicles: "Vehículos premium (Mercedes, BMW)",
    sidebar: {
      quickQuote: "Presupuesto Rápido",
      quickQuoteDesc: "Obtén un precio instantáneo para tu transfer",
      calculatePrice: "Calcular Precio",
      whatsapp: "Presupuesto WhatsApp",
      popularRoutes: "Rutas Populares",
      fixedPrices: "Precios fijos • Sin cargos ocultos",
      available247: "Disponible 24/7",
      flightTracking: "Seguimiento de vuelo incluido",
      freeCancellation: "Cancelación gratuita 24h",
      premiumVehicles: "Vehículos premium",
    },
    newsletter: {
      title: "Recibe Consejos de Viaje y Ofertas Exclusivas",
      description:
        "Suscríbete a nuestro boletín y recibe un código de descuento del 10% para tu primera reserva, además de consejos internos para viajar en París.",
      subscribe: "Suscribirse",
      privacy:
        "Respetamos tu privacidad. Cancela tu suscripción en cualquier momento.",
    },
  },
  events: {
    pageTitle: "Eventos en París | Paris Luxe Journey",
    pageDescription:
      "Descubre los mejores eventos, conciertos, exposiciones y actividades en París esta semana y este mes. Reserva tu transfer de lujo a cualquier evento.",
    heroTitle: "Eventos en París",
    heroSubtitle:
      "Descubre los mejores conciertos, exposiciones, espectáculos y eventos culturales en París. Reserva tu transfer de lujo para llegar con estilo.",
    liveUpdates: "Actualizaciones en Vivo",
    comingSoon: "Próximamente",
    planAhead: "Planifica con Anticipación",
    thisWeek: "Esta Semana en París",
    thisMonth: "Este Mes en París",
    bookTransfer: "Reservar Transfer a Evento",
    readGuides: "Leer Guías de Viaje",
    ctaTitle: "¿Necesitas un Transfer a tu Evento?",
    ctaDescription:
      "Reserva un transfer de lujo a cualquier evento en París. Chofer profesional, vehículos premium, precios fijos.",
    bookNow: "Reservar Ahora",
    noEvents: "No hay eventos disponibles en este momento.",
    updatedOn: "Actualizado el",
    featured: "Destacado",
    bookRide: "Reservar Transfer",
    officialDetails: "Detalles Oficiales",
    source: "Fuente",
  },
};

import { Translation } from "@/types/i18n";

export const pt: Translation = {
  nav: {
    home: "Início",
    services: "Serviços",
    about: "Sobre",
    contact: "Contato",
    fleet: "Frota",
    excursions: "Excursões"
  },
  hero: {
    title: "Paris Elite Services",
    subtitle: "Transfers aeroporto Paris ⇄ CDG / Orly a partir de 70€ (1–3 passageiros, tudo incluído)"
  },
  excursions: {
    title: "Descubra os Tesouros da França",
    subtitle: "Explore os pontos turísticos mais icônicos e os segredos mais bem guardados da França com nossos tours personalizados",
    cta: "Explorar Destinos",
    search: {
      placeholder: "Buscar destinos...",
      duration: "Todas as durações",
      type: "Todos os tipos"
    },
    card: {
      moreInfo: "Mais informações",
      from: "A partir de",
      duration: "Duração"
    },
    filters: {
      duration: {
        halfDay: "Meio dia",
        fullDay: "Dia inteiro",
        multiDay: "Vários dias"
      },
      type: {
        private: "Tours privados",
        group: "Tours em grupo",
        luxury: "Experiências de luxo"
      }
    },
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "FAQ"
    }
  },
  booking: {
    title: "Reserve sua Viagem",
    pickup: "Local de Partida",
    dropoff: "Local de Destino",
    pickupPlaceholder: "CDG Terminal 1, 2, 3 ou endereço Paris",
    dropoffPlaceholder: "CDG Terminal 1, 2, 3 ou endereço Paris",
    date: "Data",
    time: "Hora",
    returnDate: "Data de Retorno",
    returnTime: "Hora de Retorno",
    passengers: "Passageiros",
    service: "Tipo de Serviço",
    tripType: "Tipo de Viagem",
    oneWay: "Somente Ida",
    roundTrip: "Ida e Volta",
    continue: "Continuar Reserva",
    assignedVehicles: "Veículos Designados",
    largeLuggage: "Bagagem Grande",
    smallLuggage: "Bagagem Pequena",
    maxWeight: "peso máximo",
    services: {
      airport: "Transfer Aeroporto",
      city: "Tour pela Cidade",
      daytrip: "Passeio de Dia",
      chauffeur: "Motorista Privado",
    },
    serviceLevel: "Nível de Serviço",
    submit: "Reservar Agora",
    extras: {
      title: "Serviços Adicionais",
      tourGuide: "Guia Turístico",
      tourGuideDesc: "Guia profissional que acompanhará você durante o passeio",
    },
    vehicle: {
      title: "Selecione seu Veículo",
      capacity: "passageiros",
      luggage: "Bagagem",
      berline: "Classe E",
      van: "Classe V"
    },
    price: {
      total: "Preço Total",
      estimated: "Preço Estimado",
      distance: "Distância estimada",
      basePrice: "Preço base a partir de",
      roundTripIncluded: "*Preço inclui ida e volta"
    },
    payment: {
      title: "Detalhes do Pagamento",
      cardDetails: "Detalhes do Cartão"
    },
    success: {
      title: "Pagamento bem-sucedido",
      description: "Sua reserva foi confirmada. Obrigado por escolher nosso serviço!"
    },
    passengerDetails: "Detalhes do Passageiro",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Digite seu nome completo",
    email: "Email",
    emailPlaceholder: "Digite seu email",
    phone: "Telefone",
    phonePlaceholder: "+33 XXXXXXXXX",
    flightNumber: "Número do Voo (opcional)",
    flightNumberPlaceholder: "ex. AF1234",
    specialInstructions: "Instruções Especiais",
    specialInstructionsPlaceholder: "Qualquer informação adicional para o motorista...",
    errors: {
      invalidEmail: "Email Inválido",
      emailDescription: "Por favor, insira um email válido",
      invalidName: "Nome Inválido",
      nameDescription: "Por favor, insira seu nome completo",
      locationsNotLoaded: "Não foi possível carregar as localizações",
      selectLocations: "Por favor, selecione os locais de partida e chegada",
      selectDateTime: "Por favor, selecione data e hora",
      selectReturnDateTime: "Por favor, selecione data e hora de retorno",
      selectPassengers: "Por favor, especifique o número de passageiros",
      noVehiclesAvailable: "Não há veículos disponíveis para esta reserva",
      bookingCreationError: "Erro ao criar a reserva",
      acceptTerms: "Por favor, aceite os termos e condições",
      paymentIntentError: "Erro ao criar o pagamento. Por favor, tente novamente.",
      generalPaymentError: "Ocorreu um erro durante o pagamento",
      missingIds: "Faltam informações da reserva ou pagamento",
      finalizationError: "Erro ao finalizar a reserva",
      noBookingData: "Nenhum dado de reserva encontrado",
      requiredFields: "Por favor, preencha todos os campos obrigatórios",
      invalidPassengerInfo: "Informações do passageiro inválidas",
      invalidPhone: "Número de telefone inválido",
      serviceLevelsNotLoaded: "Não foi possível carregar os níveis de serviço",
      selectServiceLevel: "Por favor, selecione um nível de serviço",
    },
    summary: {
      title: "Resumo da Reserva",
      journey: "Detalhes da Viagem",
      schedule: "Horário",
      vehicle: "Detalhes do Veículo",
      luggage: "Bagagem",
      contact: "Informações de Contato",
      total: "Valor Total"
    },
    form: {
      from: "De",
      to: "Para",
      vehicleType: "Tipo de Veículo",
      passengers: "Passageiros",
      largeLuggage: "Bagagem Grande",
      smallLuggage: "Bagagem Pequena",
      name: "Nome",
      email: "Email",
      phone: "Telefone"
    },
  },
  common: {
    back: "Voltar",
    continue: "Continuar",
    processing: "Processando...",
    error: "Erro",
    from: "De"
  },
  services: {
    title: "Nossos Serviços Premium",
    subtitle: "Experimente o transporte de luxo em sua melhor forma",
    airport: {
      title: "Transfers Aeroporto",
      description: "Transporte sem complicações de e para os aeroportos CDG, Orly e Beauvais.",
    },
    chauffeur: {
      title: "Motorista Privado",
      description: "Veículo de luxo com motorista profissional à sua disposição.",
    },
    cityTours: {
      title: "Tours pela Cidade",
      description: "Descubra os pontos turísticos mais icônicos de Paris com nossos guias especialistas.",
    },
    dayTrips: {
      title: "Passeios de Dia",
      description: "Explore além de Paris com passeios personalizados para destinos franceses.",
    },
    dropdown: {
      transfers: "Transfers Aeroporto",
      chauffeur: "Serviço por Hora",
      excursions: "Excursões"
    }
  },
  about: {
    title: "Sobre a Paris Elite Services",
    subtitle: "Excelência em Transporte Privado em Paris",
    years: "40 anos de experiência",
    description: "Há 40 anos, personificamos a excelência em transporte privado em Paris. Nossa experiência foi construída atendendo a uma exigente clientela internacional, desde transfers de aeroporto até excursões culturais.",
    commitment: {
      title: "Nosso Compromisso",
      items: [
        "Serviço personalizado adaptado a cada cliente",
        "Motoristas multilíngues selecionados por seu profissionalismo",
        "Veículos de luxo regularmente renovados",
        "Flexibilidade e resposta 24/7"
      ]
    },
    expertise: {
      title: "Nossa Expertise",
      items: [
        "Recepção VIP em aeroportos",
        "Organização de excursões personalizadas",
        "Suporte para eventos",
        "Serviço de concierge de transporte"
      ]
    },
    conclusion: {
      satisfaction: "A satisfação de nossos clientes internacionais demonstra nosso compromisso constante com um serviço excepcional. Cada viagem é uma oportunidade de demonstrar nosso profissionalismo e atenção aos detalhes.",
      partnerships: "Nossas parcerias de longa data com agências de viagem internacionais e hotéis de luxo parisienses refletem a confiança conquistada ao longo dos anos."
    }
  },
  contact: {
    title: "Entre em Contato",
    description: "Entre em contato com nossa equipe para qualquer consulta ou assistência",
    subtitle: "Estamos aqui para ajudar",
    phone: "Telefone",
    email: "E-mail",
    address: "75008 Paris, France",
    name: "Nome",
    message: "Mensagem",
    namePlaceholder: "Digite seu nome",
    emailPlaceholder: "Digite seu e-mail",
    phonePlaceholder: "Digite seu telefone",
    messagePlaceholder: "Digite sua mensagem",
    sendMessage: "Enviar mensagem",
    success: "Mensagem enviada com sucesso!",
    successDescription: "Entraremos em contato em breve.",
    error: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente."
  },
  premium: {
    title: "Serviços Premium",
    exclusive: {
      title: "Serviços Exclusivos",
      items: [
        "Recepção VIP personalizada",
        "Motorista dedicado multilíngue",
        "Serviço de concierge",
        "Flexibilidade total de itinerário"
      ]
    },
    guarantees: {
      title: "Garantias Premium",
      items: [
        "Pontualidade garantida",
        "Veículos de luxo",
        "Assistência 24/7",
        "Meet & Greet aeroporto"
      ]
    },
    vip: {
      title: "Opções VIP",
      items: [
        "Champagne a bordo",
        "Wifi e carregadores",
        "Escolha do veículo",
        "Guia privado disponível"
      ]
    }
  },
  fleet: {
    title: "Veículos Disponíveis",
    subtitle: "Frota premium Mercedes-Benz com menos de 3 anos",
    exterior: "Exterior",
    interior: "Interior",
    features: "Características incluídas",
    passengers: "passageiros",
    luggage: "Bagagem",
    noVehicles: "Nenhum veículo disponível no momento",
    vehicleFeatures: {
      wifi: "Wifi gratuito",
      water: "Água engarrafada",
      airConditioning: "Ar condicionado individual",
      leatherSeats: "Bancos em couro",
      cleaning: "Limpeza garantida"
    }
  },
  versailles: {
    title: "Palácio de Versalhes",
    description: "O Palácio de Versalhes, patrimônio mundial da UNESCO",
    distance: "23 km de Paris",
    duration: "4-12 horas",
    highlights: [
      "Galeria dos Espelhos",
      "Jardins Reais",
      "Aposentos Reais"
    ],
    whyVisit: [
      "Patrimônio Mundial da UNESCO",
      "Maior palácio da Europa",
      "História da monarquia francesa"
    ],
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "FAQ"
    }
  },
  faq: {
    title: "Perguntas Frequentes",
    categories: {
      bookings: "Reservas",
      services: "Serviços",
      payment: "Pagamentos",
      vehicles: "Veículos"
    },
    questions: {
      howToBook: {
        question: "Como funciona o serviço de reserva?",
        answer: "Nosso sistema de reservas é simples e direto. Selecione seu tipo de veículo, data e hora, e complete os detalhes de coleta e destino. Você receberá uma confirmação imediata por e-mail."
      },
      cancellation: {
        question: "Qual é a política de cancelamento?",
        answer: "Você pode cancelar sua reserva até 24 horas antes do serviço sem custo. Cancelamentos posteriores podem estar sujeitos a uma taxa de 50% do valor do serviço."
      },
      advanceBooking: {
        question: "Com quanta antecedência devo reservar?",
        answer: "Recomendamos fazer as reservas com pelo menos 48 horas de antecedência para garantir a disponibilidade. No entanto, também podemos atender reservas de última hora sujeitas à disponibilidade."
      },
      modifyBooking: {
        question: "Posso modificar minha reserva?",
        answer: "Sim, você pode modificar sua reserva até 24 horas antes do serviço sem custo adicional. As alterações estão sujeitas à disponibilidade."
      },
      flightDelay: {
        question: "O que acontece se meu voo atrasar?",
        answer: "Monitoramos todos os voos. Não se preocupe, ajustaremos o horário de coleta sem custo adicional. Nossa equipe estará atenta a qualquer mudança no seu horário de chegada."
      },
      airportTransfer: {
        question: "Qual é o processo para transferências do aeroporto?",
        answer: "Para transferências do aeroporto, recomendamos programar a coleta com 3 horas de antecedência para voos internacionais e 2 horas para voos domésticos. Nossa equipe monitora o tráfego em tempo real para garantir sua chegada pontual."
      },
      tourGuide: {
        question: "Vocês oferecem serviços de guia turístico?",
        answer: "Sim, contamos com guias profissionais multilíngues para tours personalizados em Paris e arredores. Eles podem adaptar o roteiro de acordo com seus interesses específicos."
      },
      privateDriver: {
        question: "O que inclui o serviço de motorista particular?",
        answer: "O serviço inclui um motorista profissional multilíngue, veículo de luxo, água engarrafada, wifi a bordo e assistência 24/7. Também podemos adicionar serviços adicionais de acordo com suas necessidades."
      },
      outsideParis: {
        question: "Vocês realizam excursões fora de Paris?",
        answer: "Sim, oferecemos excursões para destinos populares como os Castelos do Loire, Versalhes, Giverny, Champagne e outros pontos de interesse. Todos os tours são personalizáveis de acordo com suas preferências."
      },
      pricesIncluded: {
        question: "Os preços incluem todas as taxas?",
        answer: "Sim, nossos preços incluem IVA, seguro e todas as taxas associadas. Não há custos ocultos. O preço que você vê é o preço final que você pagará."
      },
      paymentMethods: {
        question: "Quais métodos de pagamento vocês aceitam?",
        answer: "Aceitamos todos os principais cartões de crédito e débito (Visa, MasterCard, American Express), transferências bancárias e pagamentos em dinheiro. Para reservas corporativas, oferecemos faturamento mensal."
      },
      deposit: {
        question: "É necessário um depósito para reservar?",
        answer: "Para a maioria dos serviços, é necessário um depósito de 30% para confirmar a reserva. O saldo restante pode ser pago antes ou após o serviço, de acordo com sua preferência."
      },
      vehicleTypes: {
        question: "Quais tipos de veículos vocês oferecem?",
        answer: "Nossa frota premium inclui sedãs de luxo (Mercedes Classe E, BMW Série 7), vans executivas (Mercedes Classe V) e SUVs de alto padrão. Todos os nossos veículos têm menos de 2 anos de idade."
      }
    }
  },
  toast: {
    languageChanged: "Idioma alterado com sucesso"
  },
  footer: {
    description: "Serviço de transporte de luxo e tours exclusivos em Paris e arredores.",
    links: {
      title: "Links Rápidos",
      services: "Serviços",
      fleet: "Frota",
      about: "Sobre Nós",
      contact: "Contato",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço"
    },
    schedule: {
      title: "Horário de Atendimento",
      description: "Serviço disponível 24 horas, 7 dias por semana"
    },
    payment: {
      title: "Métodos de pagamento aceitos"
    },
    copyright: " 2025 Paris Elite Services. Todos os direitos reservados."
  }
};

import { Translation } from "@/types/i18n";

export const pt: Translation = {
  nav: {
    home: "Início",
    services: "Serviços",
    about: "Sobre",
    contact: "Contato",
    fleet: "Frota",
    excursions: "Excursões",
    events: "Eventos",
    blog: "Blog",
    agencies: "Agências",
    companies: "Empresas",
  },
  home: {
    b2b: {
      title: "Para agências e empresas",
      desc: "Tarifas B2B, faturamento e suporte dedicado.",
      cta: "Ver opções B2B",
    },
    events: {
      title: "Próximos eventos em Paris",
      seeAll: "Ver todos os eventos →",
      fallback:
        "Vai a um evento em Paris? Contacte-nos para o seu transfer privado.",
    },
    excursions: {
      title: "Excursões a partir de Paris",
      seeAll: "Explorar todas as excursões →",
      from: "a partir de",
    },
  },
  agencies: {
    metaTitle: "Para agências de viagens | Tarifas especiais em Paris",
    h1: "Trabalhamos com você como parceiro de confiança",
    intro:
      "Colaboramos com agências do México, Brasil e América Latina. Serviço profissional, veículos impecáveis e atendimento rápido em espanhol.",
    bullets: {
      volume: "Tarifas especiais por volume",
      invoicing: "Faturamento claro e relatórios",
      support: "Suporte dedicado por WhatsApp",
      availability: "Disponibilidade 24/7",
    },
    contactHint: "Na mensagem, informe: Agência + país + volume estimado.",
    cta: "Solicitar tarifas para agências",
  },
  companies: {
    metaTitle: "Motorista profissional para empresas em Paris",
    h1: "Soluções de mobilidade para sua equipe",
    intro:
      "Transfers, eventos e deslocamentos corporativos com pontualidade, discrição e faturamento claro.",
    bullets: {
      billing: "Contas corporativas e faturamento mensal",
      routes: "Transfers para aeroportos, La Défense, estações e feiras",
      chauffeurs: "Motoristas discretos e bilíngues",
      support: "Suporte 24/7",
    },
    contactHint:
      "Na mensagem, informe: Empresa + transfers por mês + tipo de serviço.",
    cta: "Solicitar proposta corporativa",
  },
  hero: {
    title: "Serviço de chauffeur privado, pensado para a sua estadia em Paris",
    subtitle:
      "Transfers de aeroporto, excursões e serviço à hora. Envie o seu pedido — confirmamos disponibilidade e preço em 2 horas.",
    humanSignal: "Uma equipa sediada em Paris confirma cada pedido",
    proofline: "",
    langProof: "Português · Español · English · Français",
    bullet1: "Chauffeur VTC licenciado",
    bullet2: "Preço confirmado, sem surpresas",
    bullet3: "Disponível 24/7",
    ctaPrimary: "Planear o meu transfer privado",
    ctaSecondary: "Explorar eventos e excursões",
    labelPickup: "Partida",
    labelDropoff: "Destino",
    selectPickup: "Origem",
    selectDropoff: "Destino",
    getInstantQuote: "Solicitar transferência",
    fixedPrice: "Preço fixo",
    freeCancellation: "Cancelamento gratuito",
    support247: "Suporte 24/7",
    luggageIncluded: "1 bagagem/passageiro incluída",
    licensedInsured: "Licenciado e segurado",
    freeCancellation24h: "Cancelamento gratuito 24h",
    viewFleet: "Ver nossa frota premium",
  },
  trustBar: {
    securePayment: "Pagamento Seguro",
    securePaymentDesc: "Criptografia SSL",
    licensed: "Licenciado e Segurado",
    licensedDesc: "Licença VTC oficial",
    available: "Disponível 24/7",
    availableDesc: "Sempre ao seu serviço",
    insurance: "Seguro Completo",
    insuranceDesc: "Cobertura total",
  },
  trust: {
    title: "Confianca e garantias",
    subtitle: "Padroes de servico claros antes da reserva.",
    items: {
      licensed: {
        title: "Servico privado de motorista licenciado",
        body: "Servico VTC profissional operado sob regras francesas.",
      },
      pricing: {
        title: "Preco transparente",
        body: "Orcamento fixo antes da confirmacao, sem taxas ocultas.",
      },
      flexibility: {
        title: "Flexibilidade porta a porta",
        body: "Recolha privada e ajustes de itinerario quando viavel.",
      },
      payment: {
        title: "Pagamento seguro e fatura",
        body: "Checkout protegido com fatura disponivel mediante pedido.",
      },
      support: {
        title: "Suporte por WhatsApp e e-mail",
        body: "Atendimento rapido antes da reserva e durante o servico.",
      },
    },
  },
  routes: {
    title: "Rotas Populares",
    subtitle: "Nossos destinos mais solicitados com preços fixos",
    cdg: "Aeroporto CDG",
    cdgDesc: "Paris ⇄ Charles de Gaulle",
    orly: "Aeroporto Orly",
    orlyDesc: "Paris ⇄ Orly",
    disney: "Disneyland Paris",
    disneyDesc: "Dia mágico",
    versailles: "Versalhes",
    versaillesDesc: "Tour do palácio real",
    perTrip: "1-3 passageiros",
    bookNow: "Reservar",
    allInclusive:
      "✓ Todos os preços incluem pedágios, estacionamento e tempo de espera",
  },
  airports: {
    nav: {
      terminalGuide: "Guia de terminais",
      whyChooseUs: "Por que nos escolher",
      getPrice: "Obter preco",
    },
    cta: {
      title: "Precisa de um preco fixo para aeroporto?",
      subtitle:
        "Reserve em menos de um minuto ou solicite um orcamento instantaneo no WhatsApp.",
      fixedPrice: "Obter preco fixo",
      whatsapp: "WhatsApp orcamento instantaneo",
      mobileFixedPrice: "Obter preco fixo",
    },
    terminalGuide: {
      title: "Guia de terminais",
      subtitle:
        "Pontos de encontro praticos e orientacoes de recolha para CDG, Orly e Beauvais.",
      lastUpdated: "Ultima atualizacao:",
      meetPoint: "Ponto de encontro recomendado",
      tips: "Dicas praticas",
      transferTimeHint: "Tempo estimado para encontro",
      disclaimer:
        "A operacao dos terminais pode mudar. Siga sempre a sinalizacao do aeroporto e sua confirmacao de reserva.",
      airports: {
        cdg: "Charles de Gaulle (CDG)",
        ory: "Paris Orly (ORY)",
        bva: "Beauvais-Tille (BVA)",
      },
      terminals: {
        cdg_t1: {
          name: "Terminal 1",
          airlinesHint: "Frequente para muitas chegadas internacionais.",
          meetPoint:
            "Sala publica de chegadas perto do ponto principal de informacao.",
          transferTimeHint:
            "Aprox. 8-12 min da porta de chegada ate a area publica.",
          tips: {
            tip1: "Partilhe seu status ao sair do controle de passaporte.",
            tip2: "Siga a sinalizacao de Chegadas e mantenha o telefone ativo.",
            tip3: "Se a bagagem atrasar, avise o motorista imediatamente.",
          },
        },
        cdg_t2ac: {
          name: "Terminal 2A-2C",
          airlinesHint: "Operacao frequente Schengen e internacional.",
          meetPoint: "Saida de Chegadas mais proxima da sua zona de bagagem.",
          transferTimeHint:
            "Aprox. 6-10 min do corredor de chegadas ao encontro.",
          tips: {
            tip1: "Confirme a letra exata do terminal por mensagem.",
            tip2: "Use saidas de Chegadas, nao niveis de Partidas.",
            tip3: "Espere em area publica junto da sinalizacao pickup.",
          },
        },
        cdg_t2df: {
          name: "Terminal 2D-2F",
          airlinesHint: "Areas de alto fluxo com varias frentes de chegada.",
          meetPoint:
            "Area publica de chegadas perto da sinalizacao oficial pickup.",
          transferTimeHint:
            "Aprox. 8-14 min conforme porta e recolha de bagagem.",
          tips: {
            tip1: "Verifique a letra do terminal antes de falar com o motorista.",
            tip2: "Use elevadores ou escadas ate o nivel de Chegadas.",
            tip3: "Permaneça em zona publica iluminada e facil de identificar.",
          },
        },
        cdg_t2g: {
          name: "Terminal 2G",
          airlinesHint: "Terminal remoto com conexao por shuttle.",
          meetPoint: "Saida principal publica de chegadas apos o shuttle.",
          transferTimeHint: "Aprox. 12-18 min incluindo o transporte interno.",
          tips: {
            tip1: "Considere tempo extra por causa do shuttle interno.",
            tip2: "Mantenha dados moveis ativos para atualizacoes em tempo real.",
            tip3: "Envie mensagem ao se aproximar da area publica.",
          },
        },
        cdg_t3: {
          name: "Terminal 3",
          airlinesHint: "Usado por voos low-cost e operacoes charter.",
          meetPoint: "Exterior de Chegadas no ponto de recolha sinalizado.",
          transferTimeHint:
            "Aprox. 5-9 min da saida do terminal ate o encontro.",
          tips: {
            tip1: "Vá para a area externa somente apos recolher toda bagagem.",
            tip2: "Confirme a matricula do veiculo antes de entrar.",
            tip3: "Com lotacao alta, use o ponto de referencia combinado.",
          },
        },
        ory_123: {
          name: "Orly 1-2-3",
          airlinesHint: "Edificio conectado com circulacao compartilhada.",
          meetPoint:
            "Saida publica de Chegadas perto da area oficial de recolha.",
          transferTimeHint: "Aprox. 5-10 min da porta ate o ponto de encontro.",
          tips: {
            tip1: "Confirme se sua chegada foi em 1, 2 ou 3 antes de sair.",
            tip2: "Escadas e corredores podem estar cheios em horario de pico.",
            tip3: "Mantenha o WhatsApp aberto para coordenacao final.",
          },
        },
        ory_4: {
          name: "Orly 4",
          airlinesHint: "Sala dedicada com acesso direto a zonas publicas.",
          meetPoint: "Area publica de Chegadas perto do ponto de informacao.",
          transferTimeHint:
            "Aprox. 6-11 min conforme porta e recolha de bagagem.",
          tips: {
            tip1: "Siga as placas de Chegadas ate a area publica.",
            tip2: "Se viajar com criancas, solicite ponto de encontro proximo.",
            tip3: "Avise o motorista apos concluir aduana e bagagens.",
          },
        },
        bva_t1: {
          name: "Terminal 1",
          airlinesHint: "Area principal para muitas operacoes low-cost.",
          meetPoint: "Exterior de Chegadas na baia de recolha combinada.",
          transferTimeHint:
            "Aprox. 4-8 min das chegadas ate a zona de recolha.",
          tips: {
            tip1: "Beauvais pode ter vento forte; tenha agasalho para exterior.",
            tip2: "Envie mensagem rapida apos recolher bagagem.",
            tip3: "Permaneça em frente ao terminal para identificacao facil.",
          },
        },
        bva_t2: {
          name: "Terminal 2",
          airlinesHint: "Operacoes low-cost adicionais conforme temporada.",
          meetPoint:
            "Saida de Chegadas do Terminal 2 junto da faixa de recolha.",
          transferTimeHint:
            "Aprox. 4-8 min das chegadas ate a zona de recolha.",
          tips: {
            tip1: "Confirme o numero do terminal no lembrete da reserva.",
            tip2: "Siga a sinalizacao oficial pickup antes de atravessar o parque.",
            tip3: "Com mau tempo, aguarde em zona coberta e avise o motorista.",
          },
        },
      },
    },
  },
  exitPopup: {
    title: "Espere! Não Vá Ainda",
    subtitle: "Ganhe 10% de Desconto no Seu Primeiro Transfer",
    emailPlaceholder: "Seu endereço de email",
    button: "OBTER MEU DESCONTO",
    benefit1: "Preço fixo, sem surpresas",
    benefit2: "Motorista bilíngue (Português/Francês)",
    benefit3: "Cancelamento gratuito até 24h",
    validity: "*Válido para reservas nos próximos 7 dias",
    success: "Verifique seu email para seu código de desconto!",
    error: "Algo deu errado. Por favor tente novamente.",
    invalidEmail: "Por favor insira um email válido",
    sending: "Enviando...",
  },
  excursions: {
    title: "Descubra os Tesouros da França",
    subtitle:
      "Explore os pontos turísticos mais icônicos e os segredos mais bem guardados da França com nossos tours personalizados",
    cta: "Explorar Destinos",
    searchPlaceholder: "Buscar destinos...",
    viewDetails: "Ver Detalhes",
    noResults: "Nenhuma excursão encontrada que corresponda aos seus critérios",
    clearFilters: "Limpar Filtros",
    highlights: "Destaques",
    fromPrice: "A partir de €{price}",
    tourOptionsCount: "{count} opções de tour disponíveis",
    search: {
      placeholder: "Buscar destinos...",
      duration: "Todas as durações",
      type: "Todos os tipos",
    },
    card: {
      moreInfo: "Mais informações",
      from: "A partir de",
      duration: "Duração",
    },
    filters: {
      duration: {
        halfDay: "Meio dia",
        fullDay: "Dia inteiro",
        multiDay: "Vários dias",
      },
      type: {
        private: "Tours privados",
        group: "Tours em grupo",
        luxury: "Experiências de luxo",
      },
      allDurations: "Todas as durações",
      allTypes: "Todos os tipos",
      flexible: "Flexível",
      standard: "Padrão",
      clearAll: "Limpar Tudo",
      price: "Faixa de Preço",
      allPrices: "Todos os preços",
      above: "Acima de",
    },
    types: {
      private: "Privado",
      group: "Grupo",
      luxury: "Luxo",
      standard: "Padrão",
      cultural: "Cultural",
      adventure: "Aventura",
      romantic: "Romântico",
      family: "Familiar",
    },
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "FAQ",
    },
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
    luggagePolicy: {
      title: "Política de Bagagem",
      included:
        "Incluído: 1 mala grande (23kg) + 1 bolsa de cabine por passageiro",
      extraLarge:
        "Malas grandes extras: €15 cada (sujeito à capacidade do veículo)",
      extraSmall: "Bolsas pequenas grátis, até a capacidade do veículo",
    },
    services: {
      airport: "Transfer Aeroporto",
      city: "Tour pela Cidade",
      daytrip: "Passeio de Dia",
      chauffeur: "Motorista Privado",
    },
    serviceLevel: "Nível de Serviço",
    priceSummary: "Resumo do Preço",
    validatingPrice: "Validando preço...",
    submit: "Reservar Agora",
    submitButton: "Solicitar transferência",
    submitNote: "Resposta em menos de 2 h · Sem pagamento antecipado",
    noPaymentRequired: "Confirmação por uma equipa humana em Paris",
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
      van: "Classe V",
    },
    groupTransfer: {
      title: "Precisa de um transfer para 8+ passageiros?",
      description:
        "Organizamos soluções multi-veículo ou minibus sob solicitação.",
      cta: "Solicitar cotação para grupo",
    },
    price: {
      total: "Preço Total",
      estimated: "Estimativa indicativa",
      distance: "Distância estimada",
      basePrice: "Preço base",
      roundTripIncluded: "*Preço inclui ida e volta",
      luggageSurcharge: "Bagagem extra",
      passengerSurcharge: "Suplemento grupo (4–7 pax)",
      luggageIncluded: "Incluído: 1 grande + 1 pequena por passageiro",
      selectedLuggage: "Bagagem selecionada",
    },
    payment: {
      title: "Detalhes do Pagamento",
      cardDetails: "Detalhes do Cartão",
      securePaymentNotice:
        "O seu pagamento será processado de forma segura. Receberá um email de confirmação após concluir a reserva.",
      sessionExpired: "Sessão expirada",
      sessionExpiredDesc:
        "Por favor, preencha o formulário de reserva novamente.",
      loadingLocations: "A carregar dados de localização...",
      locationError: "Erro ao carregar dados de localização",
      paymentDetails: "Detalhes do Pagamento",
      secureCardIntro:
        "Continue para introduzir os dados do seu cartão de forma segura.",
      acceptTerms: "Aceito os termos e condições do serviço",
      confirmAndPay: "Confirmar e Pagar",
      pay: "Pagar",
      retryPayment: "Tentar novamente",
      fixDetails: "Corrigir dados",
      processingPayment: "A processar pagamento...",
      bookingConfirmed: "Reserva confirmada!",
      bookingConfirmedDesc:
        "A sua reserva foi confirmada. Enviámos um email de confirmação.",
      emailWarning:
        "Reserva confirmada mas houve um problema ao enviar os emails de confirmação.",
      finalizationError: "Ocorreu um erro ao finalizar a reserva.",
      paymentError: "Erro no pagamento",
      incompleteLocationData:
        "Dados de localização incompletos. Por favor, tente novamente.",
      paymentSuccessRedirect: "Pagamento concluído! A redirecionar...",
    },
    success: {
      title: "Reserva Confirmada!",
      description: "Enviamos um email com os detalhes da sua reserva",
      confirmationNumber: "Número de confirmação:",
      bookingDetails: "Detalhes da Reserva",
      route: "Rota",
      pickupDateTime: "Data e Hora de Recolha",
      passengers: "Passageiros",
      passenger: "passageiro",
      luggage: "Bagagem",
      largeSuitcase: "mala grande",
      largeSuitcases: "malas grandes",
      smallBag: "bolsa pequena",
      smallBags: "bolsas pequenas",
      totalPaid: "Total Pago:",
      cancellationPolicy: "Política de Cancelamento",
      freeCancellation: "Cancelamento gratuito até 24 horas antes da recolha",
      partialRefund:
        "Reembolso de 50% para cancelamentos 12-24 horas antes da recolha",
      noRefund:
        "Sem reembolso para cancelamentos com menos de 12 horas antes da recolha",
      whatHappensNext: "O que acontece a seguir?",
      step1:
        "Você receberá um email de confirmação com todos os detalhes da reserva",
      step2:
        "24 horas antes da recolha, enviaremos os dados de contato e foto do seu motorista",
      step3:
        "Seu motorista rastreará seu voo e ajustará o horário de recolha se necessário",
      step4:
        "Seu motorista aguardará na sala de chegadas com uma placa com seu nome",
      addToCalendar: "Adicionar ao Calendário",
      backToHome: "Voltar ao Início",
    },
    groupNotice: {
      title: "Grupos de 8+ passageiros",
      description:
        "Para grupos de 8 ou mais passageiros, entre em contato conosco via WhatsApp para um orçamento personalizado.",
      cta: "Contatar via WhatsApp",
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
    specialInstructionsPlaceholder:
      "Qualquer informação adicional para o motorista...",
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
      paymentIntentError:
        "Erro ao criar o pagamento. Por favor, tente novamente.",
      generalPaymentError: "Ocorreu um erro durante o pagamento",
      missingIds: "Faltam informações da reserva ou pagamento",
      finalizationError: "Erro ao finalizar a reserva",
      noBookingData: "Nenhum dado de reserva encontrado",
      requiredFields: "Por favor, preencha todos os campos obrigatórios",
      vehicleUnavailable:
        "Este veículo já está reservado para esse horário. Escolha outro horário ou veículo.",
      invalidPassengerInfo: "Informações do passageiro inválidas",
      invalidPhone: "Número de telefone inválido",
      serviceLevelsNotLoaded: "Não foi possível carregar os níveis de serviço",
      selectServiceLevel: "Por favor, selecione um nível de serviço",
      priceStale: "O preço mudou. Por favor, revise o novo preço.",
      networkError:
        "Erro de rede. Por favor, verifique sua conexão e tente novamente.",
    },
    summary: {
      title: "Resumo da Reserva",
      journey: "Detalhes da Viagem",
      schedule: "Horário",
      vehicle: "Detalhes do Veículo",
      luggage: "Bagagem",
      contact: "Informações de Contato",
      total: "Valor Total",
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
      phone: "Telefone",
    },
    coupon: {
      label: "Código de Desconto",
      placeholder: "Digite seu código de desconto",
      apply: "Aplicar",
      remove: "Remover",
      applied: "Desconto aplicado",
      discount: "Desconto",
    },
    couponApplied: "Cupom aplicado!",
    invalidCoupon: "Cupom inválido",
    couponExpired: "Este cupom é inválido ou expirou.",
    couponError: "Falha ao validar cupom. Por favor tente novamente.",
    couponRemoved: "Cupom removido",
    couponRemovedDesc: "O desconto foi removido da sua reserva.",
    moreRoutes: "Estações, hotéis ou mais rotas? Formulário completo →",
    moreRoutesMobile: "Mais rotas →",
  },
  common: {
    back: "Voltar",
    continue: "Continuar",
    processing: "Processando...",
    error: "Erro",
    from: "De",
    sending: "Enviando...",
    warning: "Aviso",
  },
  services: {
    title: "Nossos servicos",
    subtitle:
      "Traslados confiaveis e tours privados com preco claro. Estacoes e trajetos em Paris a partir de €70.",
    decorativeSubtitle: "Servico profissional e confiavel",
    cta: "Ver opcoes",
    groupDisclaimer:
      "Para grupos de 8+ passageiros, por favor entre em contato",
    airport: {
      title: "Traslados para aeroportos",
      description:
        "CDG · Orly · Beauvais -> seu hotel. A partir de €110 com Meet & Greet, monitoramento de voo e preco fixo. Precos variam por aeroporto, zona e numero de passageiros.",
      cta: "Solicitar orcamento",
      priceFrom: "A partir de €110",
      features: [
        "Serviço de Recepção",
        "Rastreamento de Voos",
        "Tempo de Espera Grátis",
        "1 Bagagem/Pax Incluída",
        "Motoristas Profissionais",
      ],
    },
    chauffeur: {
      title: "Motorista por hora",
      description:
        "Traslados em Paris e estacoes a partir de €70. Servico por hora a partir de €70/hora.",
      cta: "Reservar por hora",
      priceFrom: "A partir de €70/hora",
      features: [
        "Reserva por Hora Disponível",
        "Disponibilidade 24/7",
        "Serviço Multilíngue",
        "Rotas e Paradas Personalizadas",
      ],
    },
    cityTours: {
      title: "Tours privados",
      description: "Com ou sem guia. Sob medida para voce.",
      cta: "Ver opcoes",
      priceFrom: "Sob medida",
      features: [
        "Itinerários Personalizados",
        "Motoristas Profissionais",
        "Veículos Premium",
        "Mercedes Classe E e Classe V",
      ],
    },
    dayTrips: {
      title: "Passeios de Dia",
      description:
        "Explore além de Paris com passeios personalizados para destinos franceses.",
    },
    dropdown: {
      transfers: "Serviço de Transfer de Aeroporto",
      chauffeur: "Motorista por Hora",
      excursions: "Excursões",
    },
  },
  about: {
    title: "Sobre a Paris Elite Services",
    subtitle: "Excelência em Transporte Privado em Paris",
    years: "Anos de experiencia em Paris",
    description:
      "Oferecemos transporte privado em Paris e Ile-de-France para clientes corporativos e viajantes internacionais, com foco em pontualidade, discricao e servico personalizado.",
    commitment: {
      title: "Nosso Compromisso",
      items: [
        "Serviço personalizado adaptado a cada cliente",
        "Motoristas multilíngues selecionados por seu profissionalismo",
        "Veículos de luxo regularmente renovados",
        "Flexibilidade e resposta 24/7",
      ],
    },
    expertise: {
      title: "Nossa Expertise",
      items: [
        "Recepção VIP em aeroportos",
        "Organização de excursões personalizadas",
        "Suporte para eventos",
        "Serviço de concierge de transporte",
      ],
    },
    conclusion: {
      satisfaction:
        "A satisfação de nossos clientes internacionais demonstra nosso compromisso constante com um serviço excepcional. Cada viagem é uma oportunidade de demonstrar nosso profissionalismo e atenção aos detalhes.",
      partnerships:
        "Nossas parcerias de longa data com agências de viagem internacionais e hotéis de luxo parisienses refletem a confiança conquistada ao longo dos anos.",
    },
  },
  contact: {
    title: "Entre em Contato",
    description:
      "Entre em contato com nossa equipe para qualquer consulta ou assistência",
    subtitle: "Estamos aqui para ajudar",
    phone: "Telefone",
    email: "E-mail",
    address: "Vanves (92170), Ile-de-France",
    name: "Nome",
    message: "Mensagem",
    namePlaceholder: "Digite seu nome",
    emailPlaceholder: "Digite seu e-mail",
    phonePlaceholder: "Digite seu telefone",
    messagePlaceholder: "Digite sua mensagem",
    sendMessage: "Enviar mensagem",
    success: "Mensagem enviada com sucesso!",
    successDescription: "Entraremos em contato em breve.",
    error:
      "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
  },
  premium: {
    title: "Serviços Premium",
    exclusive: {
      title: "Serviços Exclusivos",
      items: [
        "Recepção VIP personalizada",
        "Motorista dedicado multilíngue",
        "Serviço de concierge",
        "Flexibilidade total de itinerário",
      ],
    },
    guarantees: {
      title: "Garantias Premium",
      items: [
        "Pontualidade garantida",
        "Veículos de luxo",
        "Assistência 24/7",
        "Meet & Greet aeroporto",
      ],
    },
    vip: {
      title: "Opções VIP",
      items: [
        "Champagne a bordo",
        "Wifi e carregadores",
        "Escolha do veículo",
        "Guia privado disponível",
      ],
    },
  },
  fleet: {
    label: "Nossa frota",
    title: "Veículos Disponíveis",
    subtitle: "Frota Mercedes-Benz moderna e confortavel.",
    exterior: "Exterior",
    interior: "Interior",
    features: "Características incluídas",
    passengers: "passageiros",
    luggage: "Bagagem",
    bookNow: "Reservar Agora",
    noVehicles: "Nenhum veículo disponível no momento",
    vehicleFeatures: {
      wifi: "Wifi gratuito",
      water: "Água engarrafada",
      airConditioning: "Ar condicionado individual",
      leatherSeats: "Bancos em couro",
      cleaning: "Limpeza garantida",
    },
  },
  versailles: {
    title: "Palácio de Versalhes",
    description: "O Palácio de Versalhes, patrimônio mundial da UNESCO",
    distance: "23 km de Paris",
    duration: "4-12 horas",
    tourName: "Motorista Privado para Versalhes",
    highlights: ["Galeria dos Espelhos", "Jardins Reais", "Aposentos Reais"],
    whyVisit: [
      "Patrimônio Mundial da UNESCO",
      "Maior palácio da Europa",
      "História da monarquia francesa",
    ],
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "FAQ",
    },
  },
  loire: {
    title: "Castelos do Vale do Loire",
    description:
      "Explore os castelos de conto de fadas do Vale do Loire numa excursão privada a partir de Paris com o seu motorista dedicado.",
    distance: "170 km de Paris",
    duration: "10–12 horas",
    highlights: [
      "Château de Chambord — obra-prima da Renascença",
      "Château de Chenonceau — sobre o rio Cher",
      "Paisagem do Vale do Loire",
      "Itinerário flexível com paragens sugeridas",
    ],
    whyVisit: [
      "Vale classificado como Património Mundial da UNESCO",
      "Maior concentração de castelos reais em França",
      "O seu motorista aguarda em cada paragem",
    ],
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "Perguntas Frequentes",
    },
  },
  champagne: {
    title: "Região de Champagne",
    description:
      "Descubra as prestigiosas maisons de Champagne em Épernay e Reims numa excursão privada com motorista a partir de Paris.",
    distance: "145 km de Paris",
    duration: "8 horas",
    highlights: [
      "Avenida de Champagne em Épernay",
      "Grandes Maisons — Moët, Taittinger, Ruinart",
      "Caves de Champagne inscritas na UNESCO",
      "Vinhas da Côte des Blancs",
    ],
    whyVisit: [
      "Berço dos melhores espumantes do mundo",
      "Caves inscritas no Património Mundial da UNESCO",
      "Transporte privado — o seu horário, o seu ritmo",
    ],
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "Perguntas Frequentes",
    },
  },
  giverny: {
    title: "Giverny e Honfleur",
    description:
      "Visite os jardins icónicos de Monet em Giverny e o pitoresco porto de Honfleur numa excursão privada com motorista.",
    distance: "80–200 km de Paris",
    duration: "10 horas",
    highlights: [
      "Casa e jardim dos nenúfares de Monet, Giverny",
      "Porto antigo de Honfleur e o Vieux Bassin",
      "Campo normando",
      "Paragens flexíveis a pedido",
    ],
    whyVisit: [
      "Os jardins de Monet, berço do Impressionismo",
      "Honfleur, um dos portos mais pitorescos de França",
      "O seu motorista adapta o itinerário ao seu ritmo",
    ],
    navigation: {
      description: "Visão Geral",
      tours: "Nossos Tours",
      map: "Como Chegar",
      events: "Eventos",
      faq: "Perguntas Frequentes",
    },
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Encontre respostas para perguntas comuns sobre nossos serviços",
    categories: {
      bookings: "Reservas",
      services: "Serviços",
      payment: "Pagamentos",
      vehicles: "Veículos",
    },
    questions: {
      howToBook: {
        question: "Como funciona o serviço de reserva?",
        answer:
          "Nosso sistema de reservas é simples e direto. Selecione seu tipo de veículo, data e hora, e complete os detalhes de coleta e destino. Você receberá uma confirmação imediata por e-mail.",
      },
      cancellation: {
        question: "Qual é a política de cancelamento?",
        answer:
          "A possibilidade de cancelamento e reembolso depende de quando recebemos o pedido de cancelamento. Consulte os Termos e entre em contato conosco antes de cancelar. Qualquer reembolso é tratado de acordo com as condições confirmadas da reserva e não é automático.",
      },
      advanceBooking: {
        question: "Com quanta antecedência devo reservar?",
        answer:
          "Envie a sua solicitação com a maior antecedência possível. A disponibilidade é confirmada após a análise do itinerário e dos requisitos do veículo. Pedidos com pouca antecedência são tratados sob consulta e não podem ser garantidos.",
      },
      modifyBooking: {
        question: "Posso modificar minha reserva?",
        answer:
          "Sim, você pode modificar sua reserva até 24 horas antes do serviço sem custo adicional. As alterações estão sujeitas à disponibilidade.",
      },
      flightDelay: {
        question: "O que acontece se meu voo atrasar?",
        answer:
          "Monitoramos todos os voos. Não se preocupe, ajustaremos o horário de coleta sem custo adicional. Nossa equipe estará atenta a qualquer mudança no seu horário de chegada.",
      },
      airportTransfer: {
        question: "Qual é o processo para transferências do aeroporto?",
        answer:
          "Para transferências do aeroporto, recomendamos programar a coleta com 3 horas de antecedência para voos internacionais e 2 horas para voos domésticos. Nossa equipe monitora o tráfego em tempo real para garantir sua chegada pontual.",
      },
      tourGuide: {
        question: "Vocês oferecem serviços de guia turístico?",
        answer:
          "Sim, contamos com guias profissionais multilíngues para tours personalizados em Paris e arredores. Eles podem adaptar o roteiro de acordo com seus interesses específicos.",
      },
      privateDriver: {
        question: "O que inclui o serviço de motorista particular?",
        answer:
          "O serviço inclui um motorista profissional multilíngue, veículo de luxo, água engarrafada e wifi a bordo. Serviços adicionais podem ser solicitados e estão sujeitos a confirmação.",
      },
      outsideParis: {
        question: "Vocês realizam excursões fora de Paris?",
        answer:
          "Sim, oferecemos excursões para destinos populares como os Castelos do Loire, Versalhes, Giverny, Champagne e outros pontos de interesse. Todos os tours são personalizáveis de acordo com suas preferências.",
      },
      pricesIncluded: {
        question: "Os preços incluem todas as taxas?",
        answer:
          "Sim, nossos preços incluem IVA, seguro e todas as taxas associadas. Não há custos ocultos. O preço que você vê é o preço final que você pagará.",
      },
      paymentMethods: {
        question: "Quais métodos de pagamento vocês aceitam?",
        answer:
          "Aceitamos todos os principais cartões de crédito e débito (Visa, MasterCard, American Express), transferências bancárias e pagamentos em dinheiro. Para reservas corporativas, oferecemos faturamento mensal.",
      },
      deposit: {
        question: "É necessário um depósito para reservar?",
        answer:
          "O pagamento integral online é necessário para confirmar a reserva. Os detalhes do pagamento são apresentados antes da confirmação.",
      },
      vehicleTypes: {
        question: "Quais tipos de veículos vocês oferecem?",
        answer:
          "Nossa frota inclui sedãs premium, como o Mercedes Classe E ou equivalente, e vans premium, como o Mercedes Classe V ou equivalente. A categoria do veículo é confirmada com a sua solicitação.",
      },
    },
  },
  toast: {
    languageChanged: "Idioma alterado com sucesso",
  },
  footer: {
    description:
      "Transfers privados em Paris e região. Soluções para agências e empresas.",
    links: {
      title: "Links Rápidos",
      services: "Serviços",
      fleet: "Frota",
      about: "Sobre Nós",
      contact: "Contato",
      travelGuides: "Guias de Viagem",
      privacy: "Política de Privacidade",
      terms: "Termos de Serviço",
      faq: "Perguntas Frequentes",
    },
    schedule: {
      title: "Horário de Atendimento",
      description: "Serviço disponível 24 horas, 7 dias por semana",
    },
    payment: {
      title: "Métodos de pagamento aceitos",
    },
    copyright: " Paris Elite Services. Todos os direitos reservados.",
  },
  avoidFakeTaxis: {
    badge: "Guia de Segurança",
    hero: {
      title:
        "Táxis Falsos nos Aeroportos de Paris: Como Evitar Golpes e Reservar um Transfer Seguro",
      subtitle:
        "Milhares de turistas são vítimas de golpes de táxis falsos em CDG e Orly todos os anos. Aprenda a identificá-los e escolha um transfer licenciado com preço fixo.",
    },
    problem: {
      title: "O Problema é Real",
      paragraph1:
        "Você acabou de pousar em Charles de Gaulle após um longo voo. Está cansado, tem bagagem e só quer chegar ao hotel. Na saída de desembarque, alguém se aproxima oferecendo um 'táxi' com um ótimo preço. Parece conveniente, certo? Errado.",
      paragraph2:
        "É assim que milhares de turistas são enganados todos os anos nos aeroportos de Paris. O golpe do táxi falso é uma das armadilhas turísticas mais comuns em Paris, custando às vítimas centenas de euros e arruinando sua primeira impressão da cidade.",
    },
    howScamWorks: {
      title: "Como Funciona o Golpe",
      paragraph1:
        "Motoristas de táxis falsos visam turistas em CDG, Orly e Beauvais. Usam crachás falsos, carros sem identificação e cotam preços baixos para atraí-lo.",
      paragraph2:
        "Uma vez no carro, fazem rotas mais longas, alegam que o taxímetro está 'quebrado' ou exigem 3-4 vezes a tarifa normal. Alguns até ameaçam passageiros que se recusam a pagar. Quando você percebe o que está acontecendo, já está no carro e longe do aeroporto.",
    },
    redFlags: {
      title: "Sinais de Alerta a Observar",
      flag1: {
        title: "Motorista se aproxima de você dentro do terminal",
        description:
          "Táxis reais esperam em pontos oficiais do lado de fora. Se alguém se aproxima dentro oferecendo táxi, é golpe.",
      },
      flag2: {
        title: "Sem taxímetro ou licença oficial visível",
        description:
          "Todo táxi legal em Paris deve ter taxímetro visível e número de licença.",
      },
      flag3: {
        title: 'Carro não tem placa de teto "TAXI PARISIEN"',
        description:
          "Táxis oficiais têm placa iluminada no teto. Sem placa = não é táxi real.",
      },
      flag4: {
        title:
          'Motorista insiste em dinheiro apenas e cota um "preço especial"',
        description:
          "A lei francesa exige que táxis aceitem cartões. Apenas dinheiro é um grande sinal de alerta.",
      },
      flag5: {
        title: "Veículo sem identificação ou com placas manuscritas",
        description:
          "Táxis oficiais têm sinalização profissional. Placas manuscritas são golpe.",
      },
    },
    protection: {
      title: "Como Se Proteger",
      intro: "Se você precisar pegar um táxi no aeroporto:",
      tip1: 'Use apenas pontos oficiais de táxi (siga as placas "TAXI")',
      tip2: "Verifique se o veículo tem luz de teto e taxímetro",
      tip3: "Peça uma estimativa antes de entrar",
      tip4: "Insista em pagar com cartão (requisito legal na França)",
      betterOption:
        "Melhor opção: Reserve um transfer privado licenciado com antecedência com preço fixo.",
    },
    whyVTC: {
      title: "Por Que um Transfer VTC Licenciado é a Alternativa Segura",
      intro:
        "Ao contrário dos táxis de rua, serviços VTC (aluguel privado) licenciados como Paris Elite Services oferecem:",
      benefit1: {
        title: "Preço fixo confirmado antes de viajar",
        description: "Sem surpresas, sem truques de taxímetro",
      },
      benefit2: {
        title: "Motoristas profissionais verificados",
        description: "Condutores com verificação de antecedentes",
      },
      benefit3: {
        title: "Rastreamento de voos",
        description: "Motorista espera mesmo se seu voo atrasar",
      },
      benefit4: {
        title: "Serviço de recepção",
        description: "Motorista espera no desembarque com seu nome",
      },
      benefit5: {
        title: "Veículos premium",
        description: "Mercedes Classe E, vans espaçosas para famílias",
      },
      benefit6: {
        title: "Suporte ao cliente 24/7",
        description: "WhatsApp, email, telefone",
      },
    },
    pricing: {
      title: "O Que Você Deveria Realmente Pagar",
      intro:
        "Aqui está o que você deve esperar pagar por um transfer seguro e licenciado dos aeroportos de Paris:",
      tableHeaders: {
        route: "Rota",
        passengers1to3: "1-3 Passageiros",
        passengers4to7: "4-7 Passageiros",
      },
      routes: {
        cdg: "Aeroporto CDG → Paris",
        orly: "Aeroporto Orly → Paris",
        beauvais: "Aeroporto Beauvais → Paris",
      },
      warning:
        "⚠️ Aviso: Se alguém cotar €30-40 para CDG-Paris, é golpe ou adicionarão taxas ocultas depois. A tarifa oficial de táxi de CDG para Paris é cerca de €50-60, e um VTC licenciado com preço fixo é €70.",
    },
    cta: {
      title: "Não Arrisque Sua Chegada a Paris",
      subtitle:
        "Reserve seu transfer de aeroporto seguro e licenciado agora com preços fixos e serviço profissional.",
      bookNow: "Ver Preços e Reservar Agora",
      whatsapp: "Fale Conosco no WhatsApp",
      groupsNotice:
        "Para grupos de 8+ passageiros ou solicitações especiais, entre em contato via WhatsApp: +33 6 68 25 11 02",
    },
  },
  blog: {
    title: "Blog de Viagem",
    subtitle:
      "Dicas de especialistas, guias e informações para sua viagem a Paris",
    heroTitle: "Blog de Viagem",
    heroSubtitle:
      "Dicas de especialistas, guias e informações para sua viagem a Paris",
    searchPlaceholder: "Pesquisar artigos...",
    featured: "Artigos em Destaque",
    allArticles: "Todos os Artigos",
    categoryArticles: "Artigos",
    noArticles: "Nenhum artigo encontrado. Tente outra pesquisa ou categoria.",
    noArticlesFound: "Nenhum artigo encontrado. Tente outro termo de pesquisa.",
    relatedArticles: "Artigos Relacionados",
    needTransfer: "Precisa de um transfer?",
    calculatePrice: "Obtenha um orçamento instantâneo para seu transfer",
    getQuote: "Obter Orçamento",
    bookNow: "Reservar Agora",
    readyToBook: "Pronto para Reservar seu Transfer?",
    professionalService: "Serviço de motorista profissional",
    freeCancellation: "Cancelamento gratuito até 24h",
    flightMonitoring: "Monitoramento de voo incluído",
    premiumVehicles: "Veículos premium (Mercedes e equivalente)",
    heroEyebrow: "Descobrir Paris",
    featuredEyebrow: "Artigo em Destaque",
    pageTitle: "Blog de Viagem | Paris Elite Services",
    pageDescription:
      "Dicas de especialistas, guias e informações para visitar Paris. Transfers para aeroporto, excursões e serviço de motorista de luxo.",
    readMore: "Ler Mais",
    article: "artigo",
    articles: "artigos",
    searchInCategory: "Pesquisar nesta categoria...",
    notFound: {
      title: "404 - Artigo Não Encontrado | Blog",
      heading: "Artigo Não Encontrado",
      description:
        "O artigo que você está procurando não existe ou foi movido.",
      backToBlog: "Voltar ao Blog",
      backToHome: "Voltar ao Início",
      suggestedTitle: "Você Pode Se Interessar Por",
      suggestedDescription: "Confira estes artigos populares",
      helpTitle: "Precisa de Ajuda?",
      helpDescription:
        "Se precisar de ajuda para encontrar algo, não hesite em nos contatar.",
      contactUs: "Fale Conosco",
    },
    sidebar: {
      quickQuote: "Orçamento Rápido",
      quickQuoteDesc: "Obtenha um preço instantâneo para seu transfer",
      calculatePrice: "Calcular Preço",
      whatsapp: "Orçamento WhatsApp",
      waTextAirport:
        "Olá, estou planejando uma viagem a partir de um aeroporto de Paris. Podem confirmar disponibilidade e preço para um transfer privado?",
      popularRoutes: "Rotas Populares",
      fixedPrices: "Preços fixos • Sem taxas ocultas",
      available247: "Disponível 24/7",
      flightTracking: "Rastreamento de voo incluído",
      freeCancellation: "Cancelamento gratuito 24h",
      premiumVehicles: "Veículos premium",
    },
    excursionUpsell: {
      heading: "Transfer resolvido? Adicione uma excursão",
      subheading: "Mesmo motorista privado — no dia que você escolher",
      cta: "Ver todas as excursões →",
      waButton: "Consultar pelo WhatsApp",
      waText:
        "Olá, acabei de ler sobre transfers do aeroporto. Podem me ajudar com uma excursão privada saindo de Paris?",
      versailles: "Versalhes — 45 km",
      champagne: "Champagne — 145 km",
      loireValley: "Vale do Loire — 200 km",
    },
    newsletter: {
      title: "Receba Dicas de Viagem e Ofertas Exclusivas",
      description:
        "Assine nossa newsletter e receba um código de desconto de 10% para sua primeira reserva, além de dicas privilegiadas para viajar em Paris.",
      subscribe: "Assinar",
      privacy:
        "Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.",
    },
    shareArticle: "Compartilhar este artigo",
    copyLink: "Copiar Link",
    ctaBody: "Preços fixos, sem taxas ocultas e veículos premium.",
    cta: {
      generic: {
        heading: "Pronto para reservar seu transfer?",
        body: "Preços fixos, sem taxas ocultas e veículos premium para sua viagem em Paris.",
        button: "Reservar agora",
      },
      airportTransfer: {
        heading: "Prefere um transfer do aeroporto com preço fixo?",
        body: "Reserve um motorista privado de ou para CDG, Orly ou Beauvais com orçamento claro antes da viagem.",
        button: "Reservar transfer",
      },
      transportComparison: {
        heading:
          "Quer o conforto de um motorista privado depois de comparar as opções?",
        body: "Escolha preço fixo, motorista profissional e recolha direta em vez de decidir entre táxi, app ou trem.",
        button: "Pedir orçamento",
      },
      cityGuide: {
        heading: "Vai fazer várias paradas em Paris?",
        body: "Simplifique seu itinerário com um motorista privado e uma única reserva para seus deslocamentos pela cidade.",
        button: "Planejar trajeto",
      },
      eventLogistics: {
        heading: "Vai a um evento em Paris?",
        body: "Chegue no horário com um motorista privado para estádios, desfiles, concertos e retorno noturno.",
        button: "Reservar transfer",
      },
      excursion: {
        heading: "Planeja uma excursão privada saindo de Paris?",
        body: "Viaje com conforto em uma excursão com motorista e um orçamento fixo adaptado ao seu horário.",
        button: "Planejar excursão",
      },
    },
  },
  events: {
    pageTitle: "Eventos em Paris | Paris Elite Services",
    pageDescription:
      "Descubra os melhores eventos, concertos, exposições e atividades em Paris esta semana e este mês. Reserve seu transfer de luxo para qualquer evento.",
    heroTitle: "Eventos em Paris",
    heroSubtitle:
      "Descubra os melhores concertos, exposições, shows e eventos culturais em Paris. Reserve seu transfer de luxo para chegar com estilo.",
    editorialIntro:
      "Todos os meses, selecionamos os grandes eventos de Paris para viajantes que querem planear a visita com confiança, desde desporto internacional e moda até aos grandes momentos culturais da cidade. Cada evento inclui detalhes oficiais e um pedido direto de transfer privado para organizar a sua chegada sem atritos.",
    liveUpdates: "Atualizado",
    navigation: "Navegação",
    comingSoon: "Em Breve",
    planAhead: "Planeje com Antecedência",
    thisWeek: "A decorrer agora em Paris",
    thisMonth: "Este Mês em Paris",
    until: "Até",
    bookTransfer: "Reservar Transfer para Evento",
    readGuides: "Ler Guias de Viagem",
    ctaTitle: "Precisa de um Transfer para seu Evento?",
    ctaDescription:
      "Reserve um transfer de luxo para qualquer evento em Paris. Motorista profissional, veículos premium, preços fixos.",
    bookNow: "Reservar Agora",
    noEvents: "Nenhum evento disponível no momento.",
    updatedOn: "Atualizado em",
    sourcesVerified: "Fontes oficiais verificadas",
    featured: "Destaque",
    bookRide: "Reservar Transfer",
    officialDetails: "Detalhes Oficiais",
    source: "Fonte",
    getQuote: "Pedir Orçamento",
    whatsappMicrocopy: "Atendimento em português. Respondemos rapidamente.",
    ctaWhatsApp: "Fale pelo WhatsApp 🇧🇷",
    ctaEmail: "Envie-nos um Email",
    fallbackTitle: "Serviço de Motorista Privado para Eventos em Paris",
    fallbackSubtitle:
      "Planeje transporte de luxo para qualquer evento em Paris — desfiles de moda, exposições, concertos, eventos esportivos e conferências.",
    fallbackCatFashion: "Desfiles de Moda & Eventos de Luxo",
    fallbackCatFashionDesc:
      "Chegue com estilo na Fashion Week, showrooms privados e apresentações exclusivas.",
    fallbackCatExhibitions: "Exposições & Feiras de Arte",
    fallbackCatExhibitionsDesc:
      "Serviço porta-a-porta para exposições de museus, aberturas de galerias e visitas a feiras de arte em Paris.",
    fallbackCatConcerts: "Concertos & Espetáculos",
    fallbackCatConcertsDesc:
      "Transferências premium para concertos, ópera, teatro e espetáculos ao vivo.",
    fallbackCatSports: "Eventos Esportivos",
    fallbackCatSportsDesc:
      "Transferências privadas para Roland-Garros, o Stade de France e grandes eventos esportivos.",
    fallbackCatBusiness: "Conferências & Jantares Privados",
    fallbackCatBusinessDesc:
      "Transporte discreto e pontual para conferências de negócios, galás e compromissos noturnos.",
    fallbackCta: "Solicitar Transfer para Evento",
    fallbackCtaAlt: "Obter Cotação de Motorista",
    fallbackDisclaimer:
      "Oferecemos transporte com motorista para eventos — não vendemos ingressos.",
    stalePill: "Transporte para Eventos",
    categories: {
      all: "Todos",
      exhibition: "Exposição",
      fashion: "Moda",
      festival: "Festival",
      concert: "Concerto",
      opera: "Ópera",
      museum: "Museu",
      family: "Família",
    },
    recentlyEnded: "Eventos Recentes",
  },
  hourly: {
    pageTitle:
      "Motorista por Hora em Paris | A partir de 75 €/h | Paris Elite Services",
    pageDescription:
      "Motorista profissional por hora em Paris. Reuniões, compras, passeio pela cidade, excursão a Versalhes, eventos em múltiplos locais. A partir de 75 €/h, mínimo 3 horas. Orçamento obrigatório.",
    badge: "Serviço por Hora",
    heroTitle: "Motorista à Sua Disposição",
    heroSubtitle:
      "Motorista profissional para reuniões, compras, passeios e itinerários flexíveis em Paris e Île-de-France.",
    ctaQuote: "Solicitar Orçamento",
    ctaWhatsApp: "WhatsApp",
    trustFlexible: "Horário Flexível",
    trustProfessional: "Profissional",
    trustAsDirected: "Ao Seu Ritmo",
    trustAvailability: "Sob Consulta",
    useCasesTitle: "Quando Usar o Serviço por Hora",
    useCasesSubtitle:
      "Cinco situações em que um motorista à sua disposição é a escolha certa.",
    useCases: {
      meetings: {
        title: "Reuniões de Negócios",
        description:
          "Várias reuniões seguidas no centro de Paris. O motorista aguarda entre compromissos para que se desloque sem atrasos.",
        duration: "Típico: 3–4 horas",
      },
      shopping: {
        title: "Compras Premium",
        description:
          "Faubourg Saint-Honoré, Le Marais, Saint-Germain. Bagagem carregada, motorista disponível entre as boutiques.",
        duration: "Típico: 3–5 horas",
      },
      cityTour: {
        title: "Passeio por Paris",
        description:
          "Roteiro personalizado pelos pontos de interesse. Sem horário fixo nem grupos.",
        duration: "Típico: 3–4 horas",
      },
      versailles: {
        title: "Excursão a Versalhes",
        description:
          "Ida e volta de Paris de porta a porta. O motorista aguarda no palácio enquanto visita ao seu ritmo e leva-o de volta.",
        duration: "Típico: 5–6 horas",
      },
      multiEvent: {
        title: "Eventos em Múltiplos Locais",
        description:
          "Desfiles, vernissages, programas noturnos com várias paragens. Uma reserva cobre todo o programa.",
        duration: "Típico: 4–6 horas",
      },
    },
    pricingTitle: "Preços Indicativos",
    pricingSubtitle:
      "Ponto de partida transparente. Orçamento definitivo obrigatório antes da confirmação.",
    pricingFrom: "A partir de 75 €/hora",
    pricingMinimum: "Reserva mínima: 3 horas",
    pricingNote:
      "O preço final depende do itinerário, categoria do veículo, horário e disponibilidade. Orçamento obrigatório antes da confirmação.",
    pricingCta: "Orçamento pelo WhatsApp",
    pricingCtaAlt: "Enviar Email",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Como funciona o serviço por hora na prática.",
    faqs: {
      minHours: {
        q: "Qual é a reserva mínima?",
        a: "A reserva mínima é de 3 horas, para as categorias berlina, berlina de luxo e minivan.",
      },
      whatsIncluded: {
        q: "O que está incluído no preço por hora?",
        a: "Motorista, veículo, tempo de espera e deslocamentos padrão na Île-de-France. Portagens, estacionamento e distâncias fora da região podem ser adicionados ao orçamento final.",
      },
      multipleStops: {
        q: "Posso adicionar paragens durante o serviço?",
        a: "Sim. O serviço por hora é concebido para itinerários flexíveis. Pode alterar o percurso ou adicionar paragens a qualquer momento.",
      },
      versaillesDay: {
        q: "O serviço é adequado para uma excursão a Versalhes?",
        a: "Sim. Uma viagem típica de ida e volta a Versalhes dura entre 5 e 6 horas. O motorista leva-o de Paris, aguarda no palácio e leva-o de volta ao hotel ou destino.",
      },
      vehicleType: {
        q: "Quais as categorias de veículos disponíveis para o serviço por hora?",
        a: "Berlina (1–3 passageiros), berlina de luxo (1–3 passageiros) e minivan (até 7 passageiros). Veículos para grupos e VIP disponíveis sob consulta.",
      },
    },
    heroCtaVersailles: "Excursão a Versalhes",
    ctaTitle: "Pronto para Reservar?",
    ctaDescription:
      "Diga-nos a data, duração e itinerário. Confirmamos disponibilidade e enviamos orçamento fixo.",
    ctaWhatsAppFull: "Orçamento pelo WhatsApp",
    ctaEmail: "Enviar Email",
  },
  seo: {
    home: {
      title:
        "Paris Elite Services | Motorista privado e transfer aeroporto em Paris",
      description:
        "Serviço premium de transfer aeroporto em Paris. Reserve seu motorista particular para CDG, Orly ou transfers na cidade. Preços fixos desde 70€, disponibilidade 24/7, veículos de luxo.",
    },
    airports: {
      title:
        "Transfers aeroporto Paris | Guia de terminais CDG, Orly e Beauvais",
      description:
        "Transfers privados de aeroporto em Paris com preço fixo, guia prático de encontro em CDG, Orly e Beauvais, e suporte de motorista 24/7.",
    },
  },
  parisFashion: {
    meta: {
      title: "Guia de moda em Paris: como vivê-la com estilo",
      description:
        "Bairros de moda, boutiques, concept stores e Fashion Week. O guia essencial para os amantes do estilo que visitam Paris.",
    },
    badge: "Guia editorial",
    hero: {
      eyebrow: "Paris & Moda",
      title: "Moda em Paris: o guia para vivê-la de verdade",
      subtitle:
        "Bairros, boutiques, semana da moda e dicas práticas para viajantes com estilo.",
    },
    forWho: {
      title: "Para quem é este guia",
      intro:
        "Este guia é para quem vai a Paris com a moda em mente — não apenas como cenário, mas como destino.",
      profile1: {
        label: "Viajantes apaixonados por moda",
        desc: "Você quer ir além do Louvre e dos macarons. A moda é parte do seu motivo de viajar.",
      },
      profile2: {
        label: "Compradores especializados",
        desc: "Você procura peças que não encontra em casa: designers franceses, vintage autêntico, edições limitadas.",
      },
      profile3: {
        label: "Agências com clientes exigentes",
        desc: "Você organiza experiências para viajantes que querem moda, luxo e cultura integrados na agenda parisiense.",
      },
      profile4: {
        label: "Visitantes da Fashion Week",
        desc: "Você vem durante uma semana de desfiles e quer saber como se deslocar, o que ver e como aproveitar ao máximo a cidade.",
      },
    },
    districts: {
      title: "Os melhores bairros de moda em Paris",
      intro:
        "Paris não tem um único centro da moda. Tem vários, cada um com a sua energia.",
      marais: {
        name: "Le Marais (3e e 4e)",
        desc: "O bairro mais criativo da cidade. Concept stores, designers independentes, marcas internacionais e uma atmosfera urbana que mistura arte e moda sem esforço. O eixo Rue des Francs-Bourgeois é essencial.",
      },
      saintGermain: {
        name: "Saint-Germain-des-Prés (6e)",
        desc: "Elegância intelectual. Boutiques de designers franceses estabelecidos, galerias integradas com lojas de moda e um ritmo mais tranquilo que o Marais. Perfeito para compras ponderadas.",
      },
      montaigne: {
        name: "Avenue Montaigne (8e)",
        desc: "Alta costura em estado puro. Dior, Chanel, Louis Vuitton, Valentino. Para quem quer a experiência do luxo parisiense sem rodeios.",
      },
      faubourg: {
        name: "Rue du Faubourg Saint-Honoré (8e)",
        desc: "Paralela à Montaigne em espírito. Hermès, Balenciaga, Gucci. Uma rua que mantém o seu carácter exclusivo há décadas.",
      },
      pigalle: {
        name: "South Pigalle / Oberkampf (9e–11e)",
        desc: "A cena de moda alternativa e emergente de Paris. Marcas locais, sneaker culture, streetwear de qualidade. O antídoto às grandes avenidas do luxo.",
      },
    },
    prioritize: {
      title: "O que priorizar segundo o seu estilo",
      intro: "Nem tudo está no mesmo bairro nem no mesmo registo.",
      luxury: {
        title: "Alta costura e luxo consolidado",
        desc: "Montaigne, Faubourg Saint-Honoré. Reserve consulta em Dior ou Chanel se procura uma experiência de compra personalizada. Algumas maisons oferecem private shopping para clientes internacionais.",
      },
      conceptStores: {
        title: "Concept stores e retalho editorial",
        desc: "A Colette fechou, mas o seu espírito continua em lugares como Merci (Le Marais), The Broken Arm (3e) ou Kiliwatch. Edição limitada, seleção curada, a loja como proposta cultural.",
      },
      vintage: {
        title: "Vintage e segunda mão de qualidade",
        desc: "Paris tem o melhor mercado vintage da Europa. Encontre-o na Porte de Vanves (fim de semana), les marchés des Batignolles e lojas especializadas no Marais como Kilo Shop ou Episode.",
      },
      emerging: {
        title: "Designers emergentes",
        desc: "As Galeries Lafayette Champs-Élysées dedicam espaço a novos designers franceses. Vale também explorar exposições temporárias durante a Fashion Week e showrooms abertos no 11e.",
      },
    },
    fashionWeek: {
      title: "Se vem durante a Fashion Week",
      eyebrow: "Semana da Moda",
      intro:
        "Paris tem quatro Fashion Weeks por ano. Janeiro–fevereiro para Haute Couture e menswear. Setembro–outubro para o prêt-à-porter. A cidade muda: eventos, showrooms, pop-ups e uma energia particular nos bairros chave.",
      tip1: "Não espere ver os principais desfiles sem credencial. Pode assistir a eventos paralelos, exposições e apresentações abertas ao público.",
      tip2: "O Palais Royal, o Carrousel du Louvre e o Grand Palais são sedes habituais. Consulte o calendário oficial da Fédération de la Haute Couture et de la Mode.",
      tip3: "Os hotéis e restaurantes do 8e enchem rapidamente. Reserve com semanas de antecedência se vier nessas datas.",
      tip4: "O trânsito no centro de Paris durante a Fashion Week é imprevisível. Um transfer privado com motorista garante chegar a horas a cada compromisso.",
    },
    practical: {
      title: "Dicas práticas",
      hours: {
        title: "Horários",
        desc: "As boutiques em Paris geralmente abrem das 10h às 19h de segunda a sábado. Muitas fecham aos domingos ou abrem tarde. As grandes lojas (Galeries Lafayette, Le Bon Marché) têm horários alargados e alguns domingos abertos.",
      },
      transport: {
        title: "Deslocamentos",
        desc: "Entre Le Marais, Saint-Germain e as Grands Boulevards pode ir a pé. Para Montaigne e Faubourg, o metro (linha 9) ou um transfer privado são as melhores opções. O VTC é prático se tiver compras volumosas.",
      },
      rhythm: {
        title: "Ritmo do dia",
        desc: "O meio-dia é o pior momento para as boutiques mais pequenas: algumas fecham entre as 12h30 e as 14h. Da terça à sexta à tarde é o momento mais tranquilo para fazer compras sem multidões.",
      },
      weather: {
        title: "Clima e calçado",
        desc: "Paris é uma cidade para andar, mas as suas pedras não perdoam calçado inadequado. Se o seu dia inclui várias boutiques e talvez um mercado, combine conforto com estilo. No outono e inverno, um bom casaco é indispensável.",
      },
    },
    cta: {
      title: "Precisa de um transfer privado para o seu dia de moda em Paris?",
      subtitle:
        "Podemos organizar o seu deslocamento entre boutiques, maisons e eventos. Pontualidade e discrição incluídas.",
      bookTransfer: "Solicitar transfer privado",
      planning: "Consultar planeamento personalizado",
      whatsapp: "Escrever no WhatsApp",
    },
  },
};

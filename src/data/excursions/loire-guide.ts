import type { Language } from "@/types/i18n";

interface GuideFaqItem {
  question: string;
  answer: string;
}

interface GuideCard {
  title: string;
  duration: string;
  priceLabel: string;
  description: string;
  includes: string[];
  button: string;
}

interface LoireGuideContent {
  title: string;
  distance: string;
  duration: string;
  navigation: {
    description: string;
    tours: string;
    map: string;
    events: string;
    faq: string;
  };
  intro: string;
  overviewTitle: string;
  whyVisitTitle: string;
  whyVisitPoints: string[];
  regionChoiceTitle: string;
  regionChoiceIntro: string;
  regionChoices: Array<{ title: string; text: string }>;
  firstStopsTitle: string;
  firstStopsIntro: string;
  firstStops: Array<{ title: string; text: string }>;
  itineraryTitle: string;
  itineraryIntro: string;
  itinerarySteps: string[];
  midCta: {
    title: string;
    body: string;
    button: string;
  };
  visitOptionsTitle: string;
  visitOptionsIntro: string;
  halfDayTitle: string;
  halfDayBody: string;
  fullDayTitle: string;
  fullDayBody: string;
  chauffeurTitle: string;
  chauffeurIntro: string;
  chauffeurPoints: string[];
  gettingThereTitle: string;
  gettingThereIntro: string;
  gettingThereOptions: Array<{ title: string; text: string }>;
  practicalTitle: string;
  practicalIntro: string;
  practicalTips: Array<{ title: string; text: string }>;
  faqTitle: string;
  faqItems: GuideFaqItem[];
  finalCta: {
    title: string;
    body: string;
    button: string;
  };
  sidebar: {
    title: string;
    note: string;
    cards: [GuideCard, GuideCard];
  };
}

export const loireGuideContent: Record<Language, LoireGuideContent> = {
  en: {
    title: "Loire Valley Castles",
    distance: "About 180 km from Paris",
    duration: "10-12 hours",
    navigation: {
      description: "Guide",
      tours: "Visit Options",
      map: "Getting There",
      events: "Practical Tips",
      faq: "FAQ",
    },
    intro:
      "A Loire Valley day trip from Paris rewards travelers who want a change of scale: river landscapes, château silhouettes, quieter towns, and a rhythm that feels very different from central Paris. The challenge is not whether the region is worth the drive. It is deciding how many castles you can realistically enjoy in one day, which stops matter most for a first visit, and how to avoid turning a beautiful route into a long sequence of rushed arrivals. This guide is built to help you shape a practical Loire outing while keeping the transport side private and straightforward.",
    overviewTitle: "Why visit the Loire Valley from Paris",
    whyVisitTitle: "Why the Loire Valley stands out from other Paris day trips",
    whyVisitPoints: [
      "It gives you a strong contrast with Paris: river scenery, Renaissance architecture, and a wider, slower landscape built around château visits rather than city movement.",
      "The region works especially well for travelers who want one elegant long day rather than several short urban stops packed into the same trip.",
      "Private transport becomes valuable here because the distances between castles, lunch stops, and return timing matter more than they do on closer excursions.",
    ],
    regionChoiceTitle: "Chambord vs Chenonceau vs Amboise: how to choose",
    regionChoiceIntro:
      "For a first Loire day, the best outcome usually comes from choosing two priorities well rather than trying to collect every famous château name in one outing. Each of the major stops creates a different impression.",
    regionChoices: [
      {
        title: "Chambord for scale and architectural drama",
        text: "Choose Chambord if you want the largest visual impact. It feels grand, theatrical, and especially rewarding for first-time visitors who want one iconic Loire landmark with real presence.",
      },
      {
        title: "Chenonceau for elegance and river setting",
        text: "Chenonceau usually feels more intimate and refined. It is often the best choice for travelers who care about atmosphere, proportion, and one of the most photogenic château settings in the region.",
      },
      {
        title: "Amboise for town context and easier pairing",
        text: "Amboise works well when you want a château visit that also connects naturally with lunch, a walkable center, and a day that feels less isolated around a single monument.",
      },
    ],
    firstStopsTitle: "Which châteaux to prioritize for a first visit",
    firstStopsIntro:
      "The best first Loire itinerary usually starts with a clear anchor château and then builds outward. That approach gives structure to the day and reduces the temptation to overfill the route.",
    firstStops: [
      {
        title: "Start with one headline château",
        text: "Most first visits work best when you commit to one major site early, such as Chambord or Chenonceau, and let the rest of the day support that choice instead of competing with it.",
      },
      {
        title: "Pair with one lighter second stop",
        text: "A second château or town stop can add variety, but it should feel complementary rather than equal in scale. That keeps the day elegant instead of exhausting.",
      },
      {
        title: "Leave room for the route itself",
        text: "Part of the Loire experience is the transition between towns, river landscapes, and lunch stops. A schedule with no margin often misses that wider charm.",
      },
    ],
    itineraryTitle: "Suggested Loire Valley itinerary from Paris",
    itineraryIntro:
      "A strong Loire day usually begins with an early departure from Paris and a realistic decision about how much time to spend inside each stop. The region looks compact on a map, but château visits, entry flow, and road segments can quickly stretch the day.",
    itinerarySteps: [
      "Leave Paris in the morning with pickup, route, and return timing already established before the day begins.",
      "Drive directly to your first anchor château and plan the opening part of the day around that main visit rather than splitting focus too early.",
      "Use the middle of the day for lunch and one lighter second stop, especially if the group wants to keep the return to Paris comfortable.",
      "Keep late afternoon for the scenic drive back or a final short stop instead of forcing a third major château that makes the day feel rushed.",
    ],
    midCta: {
      title: "Planning a private Loire Valley transfer from Paris?",
      body: "Keep the château day simple with hotel pickup, private chauffeur service, and a direct return to Paris through the existing booking flow.",
      button: "Plan my Loire transfer",
    },
    visitOptionsTitle: "Half-day or full-day: what is realistic for Loire",
    visitOptionsIntro:
      "Loire Valley planning is different from Versailles or another nearby excursion. The distance from Paris means this destination is usually a full-day commitment if you want the route to feel worthwhile.",
    halfDayTitle: "A half-day Loire trip is rarely realistic from Paris",
    halfDayBody:
      "For most travelers, a half-day format does not leave enough room for long-distance driving, château entry flow, lunch, and a meaningful visit on site. It may work only as a highly focused transport block with very limited expectations, not as a full sightseeing day.",
    fullDayTitle:
      "A full-day format is the right baseline for a first Loire outing",
    fullDayBody:
      "A full-day transfer gives the region enough space to make sense. It leaves room for one major château, a second lighter stop, lunch, and a calmer return to Paris without turning every transition into a time check.",
    chauffeurTitle: "Why a private chauffeur makes sense for Loire",
    chauffeurIntro:
      "Public transport can get you into parts of the Loire region, but it rarely supports the way most visitors want to experience the day. Château visits, lunch plans, and changing between towns become much easier when the route stays door to door and privately coordinated.",
    chauffeurPoints: [
      "Hotel pickup and return in Paris, without train changes or station transfers before a long day already starts.",
      "A clearer route between castles, lunch stops, and town centers, with waiting time handled inside the excursion format.",
      "A more comfortable choice for couples, families, and small groups who want the day to feel premium instead of logistical.",
    ],
    gettingThereTitle: "Getting from Paris to the Loire Valley",
    gettingThereIntro:
      "Most travelers compare train connections, self-drive plans, or a private chauffeur. The right choice depends on whether you want the day built around transport effort or around the castles themselves.",
    gettingThereOptions: [
      {
        title: "Train plus local onward transport",
        text: "Possible in some areas, but usually fragmented once you add station timing, onward taxis, and the distance between château stops that are not naturally walkable from one another.",
      },
      {
        title: "Self-drive",
        text: "Flexible in theory, but it places the long road day, parking decisions, and time pressure on the travelers themselves. That can dilute the pleasure of the outing.",
      },
      {
        title: "Private chauffeur transfer",
        text: "Best when you want hotel pickup, a private route, and a direct return to Paris without having to rebuild the day around separate transport decisions.",
      },
    ],
    practicalTitle: "Practical tips before you go",
    practicalIntro:
      "The Loire works best when expectations are realistic. Distances can be longer than they appear on a map, château operations can vary, and the most enjoyable day usually includes fewer major visits than first-time travelers expect.",
    practicalTips: [
      {
        title: "Tickets and entry reservations",
        text: "Check official availability before visiting and buy any château entry separately through official channels. Our service covers transport, not ticket sales or entry reservations.",
      },
      {
        title: "Opening variations",
        text: "Opening days and access rules can vary by château and by season. Confirm official information before departure, especially if you are building the day around one specific stop.",
      },
      {
        title: "Distance between castles",
        text: "Even short regional segments add up over a full day. Trying to fit too many castles into one route usually weakens the experience rather than improving it.",
      },
      {
        title: "Lunch timing",
        text: "Protect lunch in the middle of the route instead of treating it as an afterthought. This makes the pacing more comfortable and prevents the afternoon from becoming compressed.",
      },
      {
        title: "Weekends and holidays",
        text: "Allow extra time on weekends and holidays. Roads, parking, restaurant service, and château entry flow can all feel slower during busier periods.",
      },
    ],
    faqTitle: "Loire Valley transfer FAQ",
    faqItems: [
      {
        question: "Is the Loire Valley possible as a day trip from Paris?",
        answer:
          "Yes, but it is best treated as a long full-day excursion. The route can work very well from Paris when expectations stay realistic and the itinerary is not overloaded.",
      },
      {
        question: "Which Loire castles should I visit first?",
        answer:
          "Many first-time visitors begin with Chambord or Chenonceau, then add one lighter second stop such as Amboise. The best pairing depends on whether you want scale, atmosphere, or a stronger town setting.",
      },
      {
        question: "Are château tickets included?",
        answer:
          "No. This service is transport only. Château entries should be checked and booked separately through official sources when needed.",
      },
      {
        question: "Can the chauffeur wait between castles?",
        answer:
          "Yes, within the booked excursion format. That makes it easier to move between château visits, lunch, and town stops without reorganizing transport during the day.",
      },
      {
        question: "Is a half-day Loire trip realistic?",
        answer:
          "Usually no. From Paris, a Loire outing normally needs a full-day structure to feel worthwhile and comfortable.",
      },
      {
        question: "What time should we leave Paris?",
        answer:
          "Morning departures are usually the smoothest because they give you more flexibility if entry timing, traffic, or lunch service takes longer than expected.",
      },
    ],
    finalCta: {
      title:
        "Prefer Loire castles without train changes or self-drive planning?",
      body: "Reserve a private Paris to Loire Valley transfer and keep the day focused on the route, not on transport logistics.",
      button: "Book Loire transfer",
    },
    sidebar: {
      title: "Private Loire transfer options",
      note: "Transport only. Château entries, guided visits, tastings, and meals are not included.",
      cards: [
        {
          title: "Loire Day Trip",
          duration: "10 hours",
          priceLabel: "From €490",
          description:
            "Best for one main château, a lighter second stop, and a clear same-day return to Paris.",
          includes: [
            "Hotel pickup and return in Paris",
            "Private chauffeur transport and waiting time",
            "Tolls, parking, and fuel included",
          ],
          button: "Book day trip transfer",
        },
        {
          title: "Loire Premium Day",
          duration: "8 hours",
          priceLabel: "From €2,900",
          description:
            "Best for a high-touch premium transfer format with a shorter but more exclusive route structure around selected Loire stops.",
          includes: [
            "Hotel pickup and return in Paris",
            "Premium transport coordination",
            "Tolls, parking, and fuel included",
          ],
          button: "Book premium transfer",
        },
      ],
    },
  },
  es: {
    title: "Castillos del Valle del Loira",
    distance: "Aproximadamente 180 km desde Paris",
    duration: "10-12 horas",
    navigation: {
      description: "Guia",
      tours: "Opciones de visita",
      map: "Como llegar",
      events: "Consejos practicos",
      faq: "FAQ",
    },
    intro:
      "Una excursion al Valle del Loira desde Paris recompensa a quienes buscan un cambio real de escala: paisajes de rio, siluetas de castillos, pueblos mas tranquilos y un ritmo muy distinto al de Paris. La cuestion no es si merece la pena, sino como elegir bien cuantos castillos visitar en un solo dia, cuales priorizar en una primera salida y como evitar que una ruta bonita se convierta en una cadena de llegadas apresuradas. Esta guia esta pensada para ayudarte a construir una jornada practica en Loira con transporte privado y sencillo.",
    overviewTitle: "Por que visitar el Valle del Loira desde Paris",
    whyVisitTitle:
      "Por que el Loira destaca frente a otras excursiones desde Paris",
    whyVisitPoints: [
      "Ofrece un contraste claro con Paris: paisaje fluvial, arquitectura renacentista y una sensacion de amplitud que cambia por completo el tono del dia.",
      "Funciona especialmente bien para viajeros que prefieren una gran jornada elegante en lugar de varias paradas urbanas comprimidas.",
      "El transporte privado gana valor aqui porque las distancias entre castillos, pueblos y comida pesan mucho mas que en excursiones cercanas.",
    ],
    regionChoiceTitle: "Chambord vs Chenonceau vs Amboise: como elegir",
    regionChoiceIntro:
      "En una primera visita suele funcionar mejor elegir dos prioridades bien pensadas que intentar encajar todos los nombres famosos del Loira en una sola salida. Cada gran parada deja una impresion distinta.",
    regionChoices: [
      {
        title: "Chambord por escala y efecto monumental",
        text: "Elige Chambord si buscas el mayor impacto visual. Se siente amplio, teatral y especialmente potente para una primera visita.",
      },
      {
        title: "Chenonceau por elegancia y paisaje sobre el rio",
        text: "Chenonceau suele sentirse mas refinado e intimo. Encaja muy bien si priorizas atmosfera, proporciones y uno de los entornos mas fotogenicos del Loira.",
      },
      {
        title: "Amboise por contexto de pueblo y combinacion mas facil",
        text: "Amboise funciona muy bien si quieres combinar castillo, comida y paseo por un centro mas accesible sin que todo el dia gire alrededor de un unico monumento.",
      },
    ],
    firstStopsTitle: "Que castillos priorizar en una primera visita",
    firstStopsIntro:
      "La mejor primera ruta por Loira suele empezar con un castillo ancla claro y construirse a partir de ahi. Eso da estructura al dia y reduce la tentacion de sobrecargar la ruta.",
    firstStops: [
      {
        title: "Empieza con un castillo principal",
        text: "La mayoria de primeras visitas funcionan mejor si te comprometes con un gran castillo desde el inicio, como Chambord o Chenonceau, y dejas que el resto del dia lo complemente.",
      },
      {
        title: "Anade una segunda parada mas ligera",
        text: "Un segundo castillo o un pueblo puede aportar variedad, pero conviene que no compita en escala con la visita principal.",
      },
      {
        title: "Deja espacio para la ruta",
        text: "Parte del atractivo del Loira esta en el trayecto entre pueblos, rio y castillos. Un horario sin margen suele perder ese encanto intermedio.",
      },
    ],
    itineraryTitle: "Itinerario sugerido desde Paris",
    itineraryIntro:
      "Un buen dia en Loira suele empezar temprano y con una idea realista del tiempo que vas a dedicar a cada parada. La region parece compacta sobre el mapa, pero entradas, carretera y visitas alargan rapido la jornada.",
    itinerarySteps: [
      "Salir de Paris por la mañana con recogida, ruta y hora de regreso ya definidas.",
      "Ir directamente al castillo ancla y organizar la primera parte del dia alrededor de esa visita principal.",
      "Usar la parte central del dia para comida y una segunda parada mas ligera, especialmente si quieres que el regreso a Paris siga siendo comodo.",
      "Dejar la tarde final para el trayecto panoramico de vuelta o una ultima parada corta, en lugar de forzar un tercer gran castillo.",
    ],
    midCta: {
      title: "¿Planeas un traslado privado al Valle del Loira desde Paris?",
      body: "Mantén el dia simple con recogida en hotel, chofer privado y regreso directo a Paris a traves del flujo actual de booking.",
      button: "Planificar traslado al Loira",
    },
    visitOptionsTitle: "Medio dia o dia completo: que es realista",
    visitOptionsIntro:
      "Planificar Loira no es como organizar Versalles u otra escapada cercana. La distancia desde Paris hace que este destino funcione casi siempre como una jornada completa.",
    halfDayTitle: "Un medio dia en Loira casi nunca es realista desde Paris",
    halfDayBody:
      "Para la mayoria de viajeros, un medio dia no deja margen suficiente para trayecto largo, acceso a castillos, comida y una visita que realmente merezca la pena. Solo podria funcionar como bloque de transporte muy limitado, no como excursion completa.",
    fullDayTitle:
      "El dia completo es la base correcta para una primera salida al Loira",
    fullDayBody:
      "Un formato de dia completo deja espacio para un gran castillo, una segunda parada ligera, comida y vuelta a Paris sin convertir cada transicion en una carrera.",
    chauffeurTitle: "Por que un chofer privado tiene sentido para Loira",
    chauffeurIntro:
      "El transporte publico puede llevarte a partes de la region, pero rara vez acompaña la forma en que la mayoria quiere vivir el dia. Visitas de castillos, comida y cambios entre pueblos se vuelven mucho mas faciles cuando la ruta sigue una logistica privada puerta a puerta.",
    chauffeurPoints: [
      "Recogida y regreso en hotel en Paris, sin cambios de tren ni estaciones antes de una jornada ya larga.",
      "Ruta mas clara entre castillos, comida y pueblos, con tiempo de espera integrado en el formato de excursion.",
      "Opcion mas comoda para parejas, familias y pequenos grupos que quieren que el dia se sienta premium y no logistico.",
    ],
    gettingThereTitle: "Como llegar de Paris al Valle del Loira",
    gettingThereIntro:
      "La mayoria compara tren, coche propio o chofer privado. La mejor opcion depende de si quieres que el dia gire alrededor del esfuerzo de transporte o alrededor de los castillos.",
    gettingThereOptions: [
      {
        title: "Tren mas traslados locales",
        text: "Posible en ciertas zonas, pero suele fragmentarse rapido cuando sumas horarios, taxis locales y distancias entre castillos que no se recorren andando entre si.",
      },
      {
        title: "Conducir por cuenta propia",
        text: "Flexible en teoria, pero coloca sobre los viajeros el peso de la carretera, el parking y la gestion de tiempos durante todo el dia.",
      },
      {
        title: "Traslado privado con chofer",
        text: "La mejor opcion si quieres recogida en hotel, ruta privada y regreso directo a Paris sin reconstruir el dia alrededor del transporte.",
      },
    ],
    practicalTitle: "Consejos practicos antes de ir",
    practicalIntro:
      "Loira funciona mejor con expectativas realistas. Las distancias pueden ser mayores de lo que parecen, la operativa de los castillos puede variar y las mejores jornadas suelen incluir menos grandes visitas de lo que muchos imaginan.",
    practicalTips: [
      {
        title: "Entradas y reservas",
        text: "Consulta la disponibilidad oficial antes de visitar y compra cualquier entrada por separado a traves de canales oficiales. Nuestro servicio cubre transporte, no venta ni reserva de entradas.",
      },
      {
        title: "Variaciones de apertura",
        text: "Los dias de apertura y reglas de acceso pueden variar segun castillo y temporada. Conviene confirmarlo antes de salir, sobre todo si todo el dia gira alrededor de una parada concreta.",
      },
      {
        title: "Distancia entre castillos",
        text: "Incluso los tramos regionales cortos se acumulan en una jornada larga. Intentar meter demasiados castillos suele debilitar la experiencia.",
      },
      {
        title: "Horario de comida",
        text: "Protege la comida en el centro de la ruta y no como un hueco improvisado. Asi el ritmo resulta mas comodo y la tarde no se comprime tanto.",
      },
      {
        title: "Fines de semana y festivos",
        text: "Deja margen extra en fines de semana y festivos. Carretera, parking, servicio de restaurantes y flujo de entrada pueden sentirse mas lentos.",
      },
    ],
    faqTitle: "FAQ traslado Valle del Loira",
    faqItems: [
      {
        question: "¿Es posible hacer el Valle del Loira en un dia desde Paris?",
        answer:
          "Si, pero conviene tratarlo como una excursion larga de dia completo. Funciona muy bien desde Paris cuando el itinerario es realista y no esta sobrecargado.",
      },
      {
        question: "¿Que castillos del Loira deberia visitar primero?",
        answer:
          "Muchos primeros visitantes empiezan por Chambord o Chenonceau y añaden una segunda parada mas ligera como Amboise. La mejor combinacion depende de si priorizas escala, atmosfera o contexto de pueblo.",
      },
      {
        question: "¿Las entradas a castillos estan incluidas?",
        answer:
          "No. Este servicio es solo transporte. Las entradas deben comprobarse y reservarse por separado a traves de fuentes oficiales cuando haga falta.",
      },
      {
        question: "¿El chofer puede esperar entre castillos?",
        answer:
          "Si, dentro del formato de excursion reservado. Eso facilita moverse entre castillos, comida y pueblos sin reorganizar el transporte durante el dia.",
      },
      {
        question: "¿Es realista un viaje de medio dia al Loira?",
        answer:
          "Normalmente no. Desde Paris, Loira suele necesitar una estructura de dia completo para que la salida merezca la pena y resulte comoda.",
      },
      {
        question: "¿A que hora conviene salir de Paris?",
        answer:
          "Las salidas por la mañana suelen ser las mas fluidas porque dejan margen si el trafico, la entrada o la comida tardan mas de lo previsto.",
      },
    ],
    finalCta: {
      title:
        "¿Prefieres los castillos del Loira sin cambios de tren ni plan de conduccion?",
      body: "Reserva un traslado privado Paris-Loira y mantén el foco del dia en la ruta, no en la logistica de transporte.",
      button: "Reservar traslado al Loira",
    },
    sidebar: {
      title: "Opciones privadas para Loira",
      note: "Solo transporte. Entradas, visitas guiadas, catas y comidas no estan incluidas.",
      cards: [
        {
          title: "Loire Day Trip",
          duration: "10 horas",
          priceLabel: "Desde €490",
          description:
            "Ideal para un castillo principal, una segunda parada ligera y vuelta clara a Paris el mismo dia.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Transporte con chofer privado y tiempo de espera",
            "Peajes, parking y combustible incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Loire Premium Day",
          duration: "8 horas",
          priceLabel: "Desde €2,900",
          description:
            "Ideal para un formato premium con ruta mas exclusiva y seleccion de paradas concretas en Loira.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Coordinacion premium de transporte",
            "Peajes, parking y combustible incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
  fr: {
    title: "Chateaux de la Loire",
    distance: "Environ 180 km de Paris",
    duration: "10-12 heures",
    navigation: {
      description: "Guide",
      tours: "Formats de visite",
      map: "Acces",
      events: "Conseils pratiques",
      faq: "FAQ",
    },
    intro:
      "Une excursion dans la Loire depuis Paris convient tres bien aux voyageurs qui veulent changer d'echelle: paysages de riviere, silhouettes de chateaux, villes plus calmes et rythme tres different de Paris. La vraie question n'est pas de savoir si la region merite le trajet, mais comment choisir le bon nombre de visites, quels chateaux privilegier lors d'une premiere sortie, et comment eviter qu'une belle route devienne une succession d'arrivees trop rapides. Ce guide aide a construire une journee Loire pratique avec une logistique privee et simple.",
    overviewTitle: "Pourquoi visiter la Loire depuis Paris",
    whyVisitTitle:
      "Pourquoi la Loire se distingue des autres excursions parisiennes",
    whyVisitPoints: [
      "Elle offre un contraste net avec Paris: paysage fluvial, architecture Renaissance et sensation d'espace beaucoup plus large.",
      "Le format convient tres bien aux voyageurs qui preferent une grande journee elegante a plusieurs petites etapes urbaines compressees.",
      "Le transport prive prend ici une vraie valeur car les distances entre chateaux, dejeuners et retour comptent davantage que sur une excursion proche.",
    ],
    regionChoiceTitle: "Chambord vs Chenonceau vs Amboise: comment choisir",
    regionChoiceIntro:
      "Pour une premiere journee Loire, le meilleur resultat vient souvent de deux priorites bien choisies plutot que d'une accumulation de noms celebres. Chaque grande etape cree une impression differente.",
    regionChoices: [
      {
        title: "Chambord pour l'ampleur et l'effet monumental",
        text: "Choisissez Chambord si vous voulez le plus fort impact visuel. Le site est grand, spectaculaire, et tres marquant pour une premiere visite.",
      },
      {
        title: "Chenonceau pour l'elegance et le cadre sur l'eau",
        text: "Chenonceau parait souvent plus raffine et plus intime. C'est un excellent choix si vous privilegiez l'atmosphere et la photogenie du lieu.",
      },
      {
        title:
          "Amboise pour le contexte de ville et la facilite de combinaison",
        text: "Amboise convient bien si vous voulez associer chateau, dejeuner et centre accessible sans faire tourner toute la journee autour d'un seul monument.",
      },
    ],
    firstStopsTitle: "Quels chateaux privilegier lors d'une premiere visite",
    firstStopsIntro:
      "Une bonne premiere route Loire commence souvent par un chateau ancre clair, puis se construit autour de lui. Cette approche donne du rythme et evite de trop charger la journee.",
    firstStops: [
      {
        title: "Commencer par un grand chateau principal",
        text: "La plupart des premieres visites fonctionnent mieux si vous assumez une visite phare des le debut, comme Chambord ou Chenonceau, puis laissez le reste de la journee l'accompagner.",
      },
      {
        title: "Ajouter une seconde etape plus legere",
        text: "Un deuxieme chateau ou une ville peut apporter de la variete, mais il vaut mieux qu'il complete la visite principale plutot qu'il ne rivalise avec elle.",
      },
      {
        title: "Laisser de la place a la route",
        text: "Une partie du charme de la Loire se joue entre les etapes: paysages, villages, route et pause dejeuner. Un programme sans marge perd souvent cette dimension.",
      },
    ],
    itineraryTitle: "Itineraire conseille depuis Paris",
    itineraryIntro:
      "Une bonne journee Loire commence generalement par un depart matinal et par une idee realiste du temps a passer dans chaque etape. La region semble compacte sur une carte, mais les visites et trajets allongent vite la journee.",
    itinerarySteps: [
      "Quittez Paris le matin avec prise en charge, route et heure de retour deja fixees.",
      "Rejoignez directement le chateau ancre et organisez la premiere partie du jour autour de cette visite principale.",
      "Gardez le milieu de journee pour le dejeuner et une seconde etape plus legere, surtout si vous voulez un retour plus confortable vers Paris.",
      "Reserve l'apres-midi tardif a la route de retour ou a un dernier arret court plutot qu'a un troisieme grand chateau.",
    ],
    midCta: {
      title: "Vous preparez un transfert prive vers la Loire depuis Paris ?",
      body: "Gardez la journee simple avec prise en charge a l'hotel, chauffeur prive et retour direct vers Paris via le parcours de reservation existant.",
      button: "Planifier mon transfert Loire",
    },
    visitOptionsTitle:
      "Demi-journee ou journee complete: qu'est-ce qui est realiste",
    visitOptionsIntro:
      "La Loire ne se planifie pas comme Versailles ou une escapade plus proche. La distance depuis Paris fait de cette destination une vraie journee complete dans la plupart des cas.",
    halfDayTitle: "Une demi-journee Loire est rarement realiste depuis Paris",
    halfDayBody:
      "Pour la plupart des voyageurs, une demi-journee ne laisse pas assez de place pour la route, les entrees, le dejeuner et une visite qui ait du sens. Cela peut seulement convenir a un bloc de transport tres limite, pas a une vraie excursion.",
    fullDayTitle:
      "La journee complete reste la bonne base pour une premiere sortie Loire",
    fullDayBody:
      "Une journee complete laisse assez d'espace pour un grand chateau, une seconde etape plus legere, un dejeuner et un retour plus calme sans transformer chaque transition en contrainte horaire.",
    chauffeurTitle: "Pourquoi un chauffeur prive a du sens pour la Loire",
    chauffeurIntro:
      "Le train peut vous rapprocher d'une partie de la region, mais il correspond rarement a la maniere dont les visiteurs veulent vivre la journee. Les visites de chateaux, le dejeuner et les changements de ville sont bien plus simples avec une route privee porte a porte.",
    chauffeurPoints: [
      "Prise en charge et retour a l'hotel a Paris, sans correspondances de gare avant une longue journee.",
      "Route plus lisible entre chateaux, dejeuner et centres-villes, avec attente integree dans la formule.",
      "Option plus confortable pour les couples, familles et petits groupes qui veulent une journee premium plutot que logistique.",
    ],
    gettingThereTitle: "Aller de Paris vers la Loire",
    gettingThereIntro:
      "La plupart des voyageurs hesitent entre train, voiture autonome et chauffeur prive. Le bon choix depend de savoir si vous voulez que la journee tourne autour du transport ou autour des chateaux.",
    gettingThereOptions: [
      {
        title: "Train puis transferts locaux",
        text: "Possible dans certaines zones, mais vite fragmente des qu'il faut ajouter horaires, taxis locaux et distance entre plusieurs chateaux.",
      },
      {
        title: "Conduite autonome",
        text: "Souple en theorie, mais cela transfere sur les voyageurs le poids de la route, du parking et du rythme tout au long de la journee.",
      },
      {
        title: "Transfert prive avec chauffeur",
        text: "La meilleure option si vous voulez une prise en charge a l'hotel, une route privee et un retour direct a Paris sans reconstruire la journee autour du transport.",
      },
    ],
    practicalTitle: "Conseils pratiques avant de partir",
    practicalIntro:
      "La Loire se visite mieux avec des attentes realistes. Les distances paraissent parfois courtes sur une carte, mais les chateaux, les entrees et les trajets font rapidement monter le temps total.",
    practicalTips: [
      {
        title: "Billets et reservations d'entree",
        text: "Verifiez la disponibilite officielle avant la visite et achetez toute entree de chateau separement via les canaux officiels. Notre service couvre le transport, pas la billetterie.",
      },
      {
        title: "Variations d'ouverture",
        text: "Les jours d'ouverture et les regles d'acces peuvent varier selon les chateaux et les saisons. Confirmez l'information officielle avant le depart.",
      },
      {
        title: "Distance entre les chateaux",
        text: "Meme les segments regionaux relativement courts s'accumulent sur une longue journee. Vouloir trop de chateaux affaiblit souvent l'experience.",
      },
      {
        title: "Moment du dejeuner",
        text: "Mieux vaut proteger le dejeuner au milieu de la route que de le laisser comme un simple trou entre deux etapes. Le rythme en devient plus confortable.",
      },
      {
        title: "Week-ends et jours feries",
        text: "Prevoyez davantage de marge les week-ends et jours feries. Route, parking, service en restaurant et entree des chateaux peuvent ralentir.",
      },
    ],
    faqTitle: "FAQ transfert Loire",
    faqItems: [
      {
        question:
          "La Loire est-elle possible en excursion d'une journee depuis Paris ?",
        answer:
          "Oui, mais il vaut mieux la traiter comme une longue journee complete. Cela fonctionne tres bien depuis Paris si l'itineraire reste realiste.",
      },
      {
        question: "Quels chateaux de la Loire faut-il voir en premier ?",
        answer:
          "Beaucoup de premiers visiteurs commencent par Chambord ou Chenonceau, puis ajoutent une seconde etape plus legere comme Amboise. Le bon duo depend de votre priorite: ampleur, atmosphere ou ville.",
      },
      {
        question: "Les billets de chateau sont-ils inclus ?",
        answer:
          "Non. Le service couvre uniquement le transport. Les entrees doivent etre verifiees et reservees separement via les sources officielles si besoin.",
      },
      {
        question: "Le chauffeur peut-il attendre entre les chateaux ?",
        answer:
          "Oui, dans le cadre de la formule reservee. Cela simplifie les mouvements entre chateaux, dejeuner et centres-villes sans refaire la logistique pendant la journee.",
      },
      {
        question: "Une demi-journee Loire est-elle realiste ?",
        answer:
          "En general non. Depuis Paris, une sortie Loire a besoin d'une vraie structure journee complete pour rester confortable et cohérente.",
      },
      {
        question: "A quelle heure faut-il partir de Paris ?",
        answer:
          "Les departs matinaux sont en general les plus fluides, car ils laissent plus de marge si la route, l'entree ou le dejeuner prennent plus de temps.",
      },
    ],
    finalCta: {
      title:
        "Vous preferez les chateaux de la Loire sans changements de train ni plan de conduite ?",
      body: "Reservez un transfert prive Paris-Loire et gardez la journee centree sur l'itineraire, pas sur la logistique transport.",
      button: "Reserver transfert Loire",
    },
    sidebar: {
      title: "Options privees Loire",
      note: "Transport uniquement. Entrees, visites guidees, degustations et repas non inclus.",
      cards: [
        {
          title: "Loire Day Trip",
          duration: "10 heures",
          priceLabel: "A partir de 490 EUR",
          description:
            "Ideal pour un grand chateau, une seconde etape plus legere et un retour clair vers Paris le jour meme.",
          includes: [
            "Prise en charge et retour a Paris",
            "Transport avec chauffeur prive et attente",
            "Peages, parking et carburant inclus",
          ],
          button: "Reserver day trip",
        },
        {
          title: "Loire Premium Day",
          duration: "8 heures",
          priceLabel: "A partir de 2 900 EUR",
          description:
            "Ideal pour un format premium plus exclusif avec une route plus selective autour de quelques etapes Loire.",
          includes: [
            "Prise en charge et retour a Paris",
            "Coordination transport premium",
            "Peages, parking et carburant inclus",
          ],
          button: "Reserver premium",
        },
      ],
    },
  },
  pt: {
    title: "Castelos do Vale do Loire",
    distance: "Cerca de 180 km de Paris",
    duration: "10-12 horas",
    navigation: {
      description: "Guia",
      tours: "Opcoes de visita",
      map: "Como chegar",
      events: "Dicas praticas",
      faq: "FAQ",
    },
    intro:
      "Um bate-volta ao Vale do Loire saindo de Paris funciona muito bem para viajantes que querem mudar de escala: paisagens de rio, silhuetas de castelos, cidades menores e um ritmo muito diferente do centro de Paris. A questao real nao e se a regiao vale a viagem, mas como escolher quantos castelos visitar num dia, quais priorizar numa primeira saida e como evitar que uma rota bonita vire uma sequencia de chegadas apressadas. Este guia ajuda a montar um dia pratico no Loire com logistica privada e simples.",
    overviewTitle: "Por que visitar o Vale do Loire saindo de Paris",
    whyVisitTitle:
      "Por que o Loire se destaca entre os bate-voltas saindo de Paris",
    whyVisitPoints: [
      "Ele cria um contraste claro com Paris: paisagem de rio, arquitetura renascentista e uma sensacao de espaco muito maior.",
      "Funciona muito bem para viajantes que preferem um grande dia elegante em vez de varias paradas urbanas comprimidas.",
      "O transporte privado tem mais peso aqui porque as distancias entre castelos, almoco e retorno contam bem mais do que numa escapada curta.",
    ],
    regionChoiceTitle: "Chambord vs Chenonceau vs Amboise: como escolher",
    regionChoiceIntro:
      "Numa primeira visita, o melhor resultado costuma vir de duas prioridades bem escolhidas em vez de tentar colecionar todos os nomes famosos do Loire no mesmo dia. Cada etapa principal deixa uma impressao diferente.",
    regionChoices: [
      {
        title: "Chambord para escala e impacto monumental",
        text: "Escolha Chambord se voce quer o maior impacto visual. O castelo parece amplo, dramatico e muito marcante para uma primeira visita.",
      },
      {
        title: "Chenonceau para elegancia e cenario sobre o rio",
        text: "Chenonceau costuma parecer mais refinado e mais intimista. E uma otima escolha para quem valoriza atmosfera e um dos cenarios mais fotogenicos da regiao.",
      },
      {
        title: "Amboise para contexto urbano e combinacao mais facil",
        text: "Amboise funciona muito bem se voce quiser juntar castelo, almoco e centro acessivel sem fazer o dia girar em torno de um unico monumento.",
      },
    ],
    firstStopsTitle: "Quais castelos priorizar numa primeira visita",
    firstStopsIntro:
      "Uma boa primeira rota pelo Loire normalmente comeca com um castelo ancora claro e se organiza a partir dele. Isso da estrutura ao dia e reduz a tentacao de sobrecarregar o roteiro.",
    firstStops: [
      {
        title: "Comece por um grande castelo principal",
        text: "A maioria das primeiras visitas funciona melhor quando voce assume uma visita central logo no inicio, como Chambord ou Chenonceau, e deixa o resto do dia complementar essa escolha.",
      },
      {
        title: "Adicione uma segunda parada mais leve",
        text: "Um segundo castelo ou uma cidade pode trazer variedade, mas e melhor que complemente a visita principal em vez de disputar o mesmo peso.",
      },
      {
        title: "Deixe espaco para a rota",
        text: "Parte do charme do Loire esta entre as paradas: estrada, paisagem, vilas e pausa para almoco. Um horario sem margem costuma perder essa camada.",
      },
    ],
    itineraryTitle: "Itinerario sugerido saindo de Paris",
    itineraryIntro:
      "Um bom dia no Loire geralmente comeca com saida matinal e com uma visao realista do tempo necessario em cada etapa. A regiao parece compacta no mapa, mas visitas e deslocamentos alongam rapidamente o dia.",
    itinerarySteps: [
      "Saia de Paris pela manha com busca, rota e horario de retorno ja definidos.",
      "Vá direto ao castelo ancora e organize a primeira parte do dia em torno dessa visita principal.",
      "Use o meio do dia para almoco e uma segunda parada mais leve, principalmente se voce quiser manter o retorno a Paris confortavel.",
      "Guarde o fim da tarde para a estrada de volta ou uma ultima parada curta em vez de tentar encaixar um terceiro grande castelo.",
    ],
    midCta: {
      title:
        "Planeja um transfer privado para o Vale do Loire saindo de Paris?",
      body: "Mantenha o dia simples com busca no hotel, motorista privado e retorno direto a Paris pelo fluxo atual de booking.",
      button: "Planejar transfer para Loire",
    },
    visitOptionsTitle: "Meio dia ou dia inteiro: o que e realista",
    visitOptionsIntro:
      "Planejar Loire nao e como planejar Versalhes ou outra escapada mais proxima. A distancia saindo de Paris faz deste destino, na maioria dos casos, um verdadeiro dia inteiro.",
    halfDayTitle: "Meio dia no Loire raramente e realista saindo de Paris",
    halfDayBody:
      "Para a maioria dos viajantes, meio dia nao deixa margem suficiente para estrada longa, entrada, almoco e uma visita que realmente faca sentido. No maximo, serviria como bloco de transporte muito limitado, nao como passeio completo.",
    fullDayTitle:
      "Dia inteiro e a base correta para uma primeira saida ao Loire",
    fullDayBody:
      "Um formato de dia inteiro deixa espaco para um grande castelo, uma segunda parada mais leve, almoco e volta a Paris sem transformar cada transicao numa corrida contra o relogio.",
    chauffeurTitle: "Por que um motorista privado faz sentido para o Loire",
    chauffeurIntro:
      "O trem pode aproximar voce de partes da regiao, mas raramente acompanha a forma como os visitantes querem viver o dia. Visitas a castelos, almoco e mudancas entre cidades ficam bem mais simples quando a rota segue de porta a porta em logistica privada.",
    chauffeurPoints: [
      "Busca e retorno ao hotel em Paris, sem trocas de trem antes de um dia que ja sera longo.",
      "Rota mais clara entre castelos, almoco e centros urbanos, com espera incluida no formato da excursao.",
      "Opcao mais confortavel para casais, familias e pequenos grupos que querem um dia premium e nao logistico.",
    ],
    gettingThereTitle: "Como ir de Paris ao Vale do Loire",
    gettingThereIntro:
      "A maioria compara trem, carro proprio ou motorista privado. A melhor opcao depende de voce querer que o dia gire em torno do transporte ou dos castelos.",
    gettingThereOptions: [
      {
        title: "Trem e deslocamentos locais",
        text: "Possivel em certas zonas, mas se fragmenta rapido quando entram horarios, taxis locais e distancias entre varios castelos.",
      },
      {
        title: "Dirigir por conta propria",
        text: "Flexivel em teoria, mas transfere para os viajantes o peso da estrada, estacionamento e ritmo do dia inteiro.",
      },
      {
        title: "Transfer privado com motorista",
        text: "Melhor opcao se voce quer busca no hotel, rota privada e retorno direto a Paris sem reconstruir o dia em torno do transporte.",
      },
    ],
    practicalTitle: "Dicas praticas antes de ir",
    practicalIntro:
      "Loire funciona melhor com expectativas realistas. As distancias podem parecer curtas no mapa, mas castelos, entradas e estrada somam tempo rapidamente.",
    practicalTips: [
      {
        title: "Ingressos e reservas de entrada",
        text: "Confira a disponibilidade oficial antes de visitar e compre qualquer entrada separadamente em canais oficiais. Nosso servico cobre transporte, nao venda ou reserva de ingressos.",
      },
      {
        title: "Variacoes de abertura",
        text: "Dias de abertura e regras de acesso podem variar conforme castelo e temporada. Confirme a informacao oficial antes da saida.",
      },
      {
        title: "Distancia entre castelos",
        text: "Mesmo trechos regionais relativamente curtos se acumulam num dia longo. Tentar castelos demais costuma enfraquecer a experiencia.",
      },
      {
        title: "Horario do almoco",
        text: "Proteja o almoco no meio da rota em vez de trata-lo como um simples encaixe. O ritmo fica mais confortavel e a tarde menos comprimida.",
      },
      {
        title: "Fins de semana e feriados",
        text: "Deixe margem extra em fins de semana e feriados. Estrada, estacionamento, servico em restaurante e entrada dos castelos podem ficar mais lentos.",
      },
    ],
    faqTitle: "FAQ transfer Loire",
    faqItems: [
      {
        question: "O Vale do Loire e possivel como bate-volta saindo de Paris?",
        answer:
          "Sim, mas o ideal e trata-lo como um passeio longo de dia inteiro. Funciona muito bem saindo de Paris quando o roteiro e realista e nao excessivo.",
      },
      {
        question: "Quais castelos do Loire devo visitar primeiro?",
        answer:
          "Muitos visitantes de primeira viagem comecam por Chambord ou Chenonceau e depois adicionam uma segunda parada mais leve, como Amboise. A melhor combinacao depende da sua prioridade.",
      },
      {
        question: "Os ingressos dos castelos estao incluidos?",
        answer:
          "Nao. O servico cobre apenas transporte. As entradas devem ser verificadas e reservadas separadamente em fontes oficiais quando necessario.",
      },
      {
        question: "O motorista pode esperar entre os castelos?",
        answer:
          "Sim, dentro do formato reservado. Isso facilita circular entre castelos, almoco e centros urbanos sem reorganizar o transporte durante o dia.",
      },
      {
        question: "Um passeio de meio dia ao Loire e realista?",
        answer:
          "Normalmente nao. Saindo de Paris, uma saida ao Loire precisa de estrutura de dia inteiro para continuar coerente e confortavel.",
      },
      {
        question: "Que horas devemos sair de Paris?",
        answer:
          "Saidas pela manha costumam ser as mais fluidas, porque deixam mais margem se estrada, entrada ou almoco demorarem mais do que o previsto.",
      },
    ],
    finalCta: {
      title:
        "Prefere os castelos do Loire sem troca de trem nem plano de direcao?",
      body: "Reserve um transfer privado Paris-Loire e mantenha o foco do dia no roteiro, nao na logistica de transporte.",
      button: "Reservar transfer Loire",
    },
    sidebar: {
      title: "Opcoes privadas para Loire",
      note: "Apenas transporte. Entradas, visitas guiadas, degustacoes e refeicoes nao estao incluidos.",
      cards: [
        {
          title: "Loire Day Trip",
          duration: "10 horas",
          priceLabel: "A partir de EUR 490",
          description:
            "Ideal para um grande castelo, uma segunda parada mais leve e retorno claro a Paris no mesmo dia.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Transporte com motorista privado e espera",
            "Pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Loire Premium Day",
          duration: "8 horas",
          priceLabel: "A partir de EUR 2,900",
          description:
            "Ideal para um formato premium mais exclusivo com rota mais seletiva em torno de etapas escolhidas no Loire.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Coordenacao premium de transporte",
            "Pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
};

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

interface ChampagneGuideContent {
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

export const champagneGuideContent: Record<Language, ChampagneGuideContent> = {
  en: {
    title: "Champagne Region",
    distance: "About 145 km from Paris",
    duration: "8-10 hours",
    navigation: {
      description: "Guide",
      tours: "Visit Options",
      map: "Getting There",
      events: "Practical Tips",
      faq: "FAQ",
    },
    intro:
      "A Champagne day trip from Paris can feel effortless or frustrating depending on how the day is planned. The region is compact once you arrive, but the real experience depends on smart sequencing: whether you focus on Reims, Epernay, or a mix of both, how much time you leave for lunch, and how you handle tastings without turning the return journey into work. This guide is built for travelers who want a polished day outside Paris while keeping transport clear, private, and easy to manage.",
    overviewTitle: "Why visit Champagne from Paris",
    whyVisitTitle: "Why Champagne earns a full day in a Paris itinerary",
    whyVisitPoints: [
      "It offers a different rhythm from Paris: vineyard landscapes, smaller historic centers, and a more relaxed pace built around tasting houses and cellar culture.",
      "The region works especially well for couples, celebratory trips, and small private groups who want the day to feel elevated rather than improvised.",
      "Door-to-door transport matters more here than in many city excursions because the value of the outing often depends on timing, comfort, and not driving after tastings.",
    ],
    regionChoiceTitle: "Reims or Epernay: which stop fits your day best",
    regionChoiceIntro:
      "Many first-time visitors try to fit everything into one outing, but the better approach is usually to decide what kind of Champagne day you want. Reims and Epernay can complement each other, yet each creates a different mood.",
    regionChoices: [
      {
        title: "Reims for cathedral, city structure, and major house context",
        text: "Reims usually feels stronger if you want a more urban stop with clear landmarks, a grand cathedral, and larger Champagne-house names in a city setting. It suits travelers who want culture and Champagne in the same day.",
      },
      {
        title: "Epernay for Avenue de Champagne and a quieter tasting rhythm",
        text: "Epernay often feels more intimate. It is a better fit if you want a softer pace, elegant facades, and a day centered more visibly on Champagne identity than on city sightseeing.",
      },
      {
        title: "Both only if the itinerary stays disciplined",
        text: "Seeing both can work, but only if reservations, lunch timing, and road segments are planned realistically. Without structure, a dual-stop day can feel rushed despite the short regional distances.",
      },
    ],
    firstStopsTitle: "What to see first in Champagne",
    firstStopsIntro:
      "Your first stop should match the shape of the day. If you begin with the wrong priority, it becomes harder to protect lunch, tasting reservations, and return timing later on.",
    firstStops: [
      {
        title: "Avenue de Champagne or central Epernay",
        text: "Start here if the goal is an elegant introduction to the region. It gives a strong visual sense of Champagne prestige before the day spreads into vineyards or cellar visits reserved directly with the houses.",
      },
      {
        title: "Reims cathedral and city center",
        text: "This makes sense if you want architecture and city atmosphere in the same outing. It works well for travelers who want the day to feel cultural as well as culinary.",
      },
      {
        title: "Reserved tasting or cellar slot",
        text: "If you already hold a confirmed reservation, let that lead the day. Availability varies by estate and season, so confirmed timing should shape the route rather than the other way around.",
      },
    ],
    itineraryTitle: "Suggested Champagne itinerary from Paris",
    itineraryIntro:
      "A comfortable Champagne day usually starts with a clear departure from Paris and a realistic view of how much the group wants to do. The strongest itineraries protect one or two meaningful stops instead of overloading the schedule.",
    itinerarySteps: [
      "Leave Paris in the morning with pickup, route, and return window already defined before the day starts.",
      "Reach Reims or Epernay as the first anchor point and keep the opening stop simple, especially if you have later tasting reservations.",
      "Use the middle of the day for lunch and one or two reserved visits, leaving buffer time between estates because appointment patterns and local driving times can vary.",
      "Keep the late afternoon for a final scenic stop or a relaxed return to Paris rather than squeezing in one more visit that makes the journey back feel rushed.",
    ],
    midCta: {
      title: "Planning a private Champagne transfer from Paris?",
      body: "Keep the day elegant and simple with hotel pickup, private chauffeur service, and a direct return to Paris through the existing booking flow.",
      button: "Plan my Champagne transfer",
    },
    visitOptionsTitle: "Half-day or full-day: what makes sense for Champagne",
    visitOptionsIntro:
      "Champagne can technically be approached in a shorter format, but the region is usually more rewarding when the schedule leaves room for appointments, lunch, and a calm return. The right choice depends on whether you want a focused sample or a true day trip.",
    halfDayTitle:
      "Half-day only works for a tightly focused outing with one clear priority",
    halfDayBody:
      "A shorter format can make sense if your plan is narrow, such as one city stop, one reserved tasting, or a celebratory detour from Paris with limited sightseeing expectations. It is less forgiving if reservations move, service runs long, or the group wants an unhurried lunch.",
    fullDayTitle:
      "Full-day is the better fit for first-time visitors and tasting-led days",
    fullDayBody:
      "A full-day format gives enough space for one main base, a meal, and one or two reserved experiences without turning the return to Paris into a race. It is usually the more premium and more comfortable option for travelers who want Champagne to feel like a real escape.",
    chauffeurTitle: "Why a private chauffeur makes sense for Champagne",
    chauffeurIntro:
      "Public transport to the region is possible, but it rarely matches the structure most visitors actually want. Champagne days often include moving between stations, town centers, lunch addresses, and estates with reservations handled separately. A private chauffeur becomes valuable because the logistics stay clear while the group remains free to enjoy the tasting side of the day responsibly.",
    chauffeurPoints: [
      "Hotel pickup and return in Paris, without train changes or separate local transfers once you reach the region.",
      "A predictable private schedule that stays centered on your route instead of forcing the day around rail timetables.",
      "A safer and more comfortable choice after tastings, especially when the group wants a designated driver and a calm return to Paris.",
    ],
    gettingThereTitle: "Getting from Paris to Champagne",
    gettingThereIntro:
      "Most travelers compare train connections, app-based rides, or a pre-booked chauffeur. The best option depends on whether you want the day to revolve around transport logistics or around the experience itself.",
    gettingThereOptions: [
      {
        title: "Train plus local transfers",
        text: "Usually the most economical on paper, but it often becomes fragmented once you add station arrivals, local taxis, and movement between appointments booked in different towns.",
      },
      {
        title: "Taxi or app-based ride",
        text: "Useful for direct transport, but less practical for a full tasting day if you need waiting time, multiple stops, or a structured return after several appointments.",
      },
      {
        title: "Private chauffeur transfer",
        text: "Best when you want hotel pickup, a private day structure, and the convenience of staying with one transport plan from Paris departure to Paris return.",
      },
    ],
    practicalTitle: "Practical tips before you go",
    practicalIntro:
      "Champagne is easier when expectations stay realistic. Availability can vary by estate, lunch service can shape the day more than people expect, and the most comfortable outings leave deliberate margin between stops.",
    practicalTips: [
      {
        title: "Tasting reservations",
        text: "Reserve tastings directly with the houses or estates you want to visit. Availability varies by estate and season, and transport service does not include tasting reservations.",
      },
      {
        title: "Cellar visits and access",
        text: "Some cellar visits need advance booking, while others may be limited on certain days. Check official availability before traveling and avoid assuming walk-in access.",
      },
      {
        title: "Lunch timing",
        text: "Protect lunch in the middle of the day rather than as an afterthought between appointments. This keeps the pacing more comfortable and reduces the risk of stacking tastings too closely together.",
      },
      {
        title: "Weekends and holidays",
        text: "Allow extra time on weekends and holidays. Road timing, restaurant pacing, and reservation availability can all feel tighter during busier periods.",
      },
      {
        title: "Responsible return logistics",
        text: "If the day includes tastings, a private chauffeur can simplify the return by removing the need for anyone in the group to drive after visits.",
      },
    ],
    faqTitle: "Champagne transfer FAQ",
    faqItems: [
      {
        question: "How long is the drive from Paris to Champagne?",
        answer:
          "Drive time depends on the exact base you choose in the region, but Champagne is generally manageable as a day trip from Paris when the route is planned in advance.",
      },
      {
        question: "Reims or Epernay for a first visit?",
        answer:
          "Reims is often stronger for travelers who want cathedral, city atmosphere, and major house context. Epernay is often better for a quieter Champagne-centered mood. Both can work, but first-time visitors usually enjoy the day more when one base leads the plan.",
      },
      {
        question: "Are tastings included?",
        answer:
          "No. This service is transport only. Reserve tastings directly with the houses or estates you want to visit.",
      },
      {
        question: "Can the chauffeur wait between visits?",
        answer:
          "Yes, within the format booked. That makes it easier to move between lunch, town stops, and reservations without reorganizing transport throughout the day.",
      },
      {
        question: "Is Champagne possible as a half-day trip?",
        answer:
          "It is possible for a narrow plan, but most first-time visitors prefer a full day because it leaves more room for reservations, lunch, and a calmer return to Paris.",
      },
      {
        question: "What is the best time to leave Paris?",
        answer:
          "Morning departures are usually the smoothest. They give the day more flexibility and help absorb delays if roads, reservations, or lunch service take longer than expected.",
      },
    ],
    finalCta: {
      title: "Prefer Champagne without train changes or return-drive concerns?",
      body: "Reserve a private Paris to Champagne transfer and keep the day focused on the region, not on transport decisions.",
      button: "Book Champagne transfer",
    },
    sidebar: {
      title: "Private Champagne transfer options",
      note: "Transport only. Tastings, cellar access, meals, and reservations are not included.",
      cards: [
        {
          title: "Champagne Day Trip",
          duration: "8 hours",
          priceLabel: "From €420",
          description:
            "Best for one main regional base with lunch and a focused tasting-led plan.",
          includes: [
            "Hotel pickup and return in Paris",
            "Private chauffeur transport",
            "Waiting time, tolls, parking, and fuel included",
          ],
          button: "Book day trip transfer",
        },
        {
          title: "Champagne Premium Day",
          duration: "10 hours",
          priceLabel: "From €950",
          description:
            "Best for a longer route with more breathing room between Reims, Epernay, lunch, and reserved stops.",
          includes: [
            "Hotel pickup and return in Paris",
            "Extended chauffeur availability",
            "Waiting time, tolls, parking, and fuel included",
          ],
          button: "Book premium transfer",
        },
      ],
    },
  },
  es: {
    title: "Región de Champagne",
    distance: "Aproximadamente 145 km desde París",
    duration: "8-10 horas",
    navigation: {
      description: "Guia",
      tours: "Opciones de visita",
      map: "Como llegar",
      events: "Consejos practicos",
      faq: "FAQ",
    },
    intro:
      "Una excursion a Champagne desde Paris puede sentirse muy fluida o bastante cansada segun como se organice el dia. La region es manejable una vez alli, pero la experiencia depende del orden: si priorizas Reims, Epernay o una combinacion de ambas, cuanto margen dejas para comer y como resuelves las catas sin convertir el regreso en trabajo. Esta guia esta pensada para viajeros que quieren una salida elegante fuera de Paris con transporte claro, privado y facil de gestionar.",
    overviewTitle: "Por que visitar Champagne desde Paris",
    whyVisitTitle: "Por que Champagne merece un dia completo",
    whyVisitPoints: [
      "Ofrece un ritmo muy distinto al de Paris: paisajes de viñedo, centros mas pequenos y una jornada mas relajada en torno a maisons, cavas y gastronomia.",
      "Funciona especialmente bien para parejas, celebraciones y pequenos grupos privados que quieren que la salida se sienta cuidada y no improvisada.",
      "El transporte puerta a puerta importa mucho aqui porque el valor del dia depende del tiempo, la comodidad y no tener que conducir despues de las catas.",
    ],
    regionChoiceTitle: "Reims o Epernay: que parada encaja mejor",
    regionChoiceIntro:
      "Muchos viajeros intentan verlo todo en una sola jornada, pero normalmente funciona mejor decidir primero que tipo de dia quieres tener. Reims y Epernay pueden combinarse, aunque cada una crea una sensacion distinta.",
    regionChoices: [
      {
        title: "Reims para catedral, ciudad y grandes maisons",
        text: "Reims suele encajar mejor si quieres una parada mas urbana con monumentos claros, una gran catedral y nombres importantes en un contexto de ciudad.",
      },
      {
        title: "Epernay para Avenue de Champagne y ritmo mas sereno",
        text: "Epernay suele sentirse mas intima. Encaja mejor si buscas un ritmo mas suave y una jornada centrada de forma visible en la identidad de Champagne.",
      },
      {
        title: "Ambas solo con itinerario disciplinado",
        text: "Ver las dos puede funcionar, pero solo si reservas, comida y trayectos estan planteados de forma realista. Sin estructura, un dia doble suele sentirse apresurado.",
      },
    ],
    firstStopsTitle: "Que ver primero en Champagne",
    firstStopsIntro:
      "La primera parada debe responder a la forma del dia. Si empiezas por una prioridad equivocada, luego es mas dificil proteger la comida, las reservas y la vuelta a Paris.",
    firstStops: [
      {
        title: "Avenue de Champagne o centro de Epernay",
        text: "Buen comienzo si buscas una introduccion elegante a la region antes de ampliar hacia viñedos o visitas reservadas directamente con las maisons.",
      },
      {
        title: "Catedral de Reims y centro historico",
        text: "Tiene sentido si quieres que el dia combine arquitectura, ciudad y Champagne en la misma salida.",
      },
      {
        title: "Reserva confirmada de cata o cava",
        text: "Si ya tienes una reserva confirmada, deja que marque el ritmo del dia. La disponibilidad varia segun maison y temporada.",
      },
    ],
    itineraryTitle: "Itinerario sugerido desde Paris",
    itineraryIntro:
      "Un buen dia en Champagne suele empezar con salida clara desde Paris y con una idea realista de cuanto quiere hacer el grupo. Los mejores itinerarios protegen una o dos paradas con sentido en lugar de acumular demasiadas.",
    itinerarySteps: [
      "Salir de Paris por la mañana con recogida, ruta y ventana de regreso ya definidas.",
      "Llegar a Reims o Epernay como base principal y mantener la primera parada sencilla, sobre todo si despues hay reservas.",
      "Usar la parte central del dia para comida y una o dos visitas reservadas, dejando margen entre ellas porque horarios y trayectos locales pueden variar.",
      "Dejar la tarde final para una ultima parada panoramica o un regreso tranquilo a Paris en lugar de forzar una visita mas.",
    ],
    midCta: {
      title: "¿Planeas un traslado privado a Champagne desde Paris?",
      body: "Mantén el dia elegante y sencillo con recogida en hotel, chofer privado y regreso directo a Paris a traves del flujo actual de booking.",
      button: "Planificar traslado a Champagne",
    },
    visitOptionsTitle: "Medio dia o dia completo: que tiene mas sentido",
    visitOptionsIntro:
      "Champagne puede hacerse en formato mas corto, pero normalmente se disfruta mas cuando el programa deja espacio para reservas, comida y vuelta tranquila. La eleccion depende de si quieres una muestra rapida o una verdadera excursion.",
    halfDayTitle: "El medio dia solo encaja con un plan muy enfocado",
    halfDayBody:
      "Puede tener sentido si el dia gira en torno a una sola ciudad, una unica cata reservada o una salida muy concreta desde Paris. Tiene menos margen si una reserva se retrasa o si quieres comer con calma.",
    fullDayTitle: "El dia completo es mejor para primeras visitas",
    fullDayBody:
      "Da espacio para una base principal, comida y una o dos experiencias reservadas sin que el regreso a Paris se convierta en una carrera. Suele ser la opcion mas premium y comoda.",
    chauffeurTitle: "Por que un chofer privado tiene sentido en Champagne",
    chauffeurIntro:
      "El transporte publico existe, pero rara vez coincide con el tipo de jornada que la mayoria busca. Un dia en Champagne suele implicar estaciones, centros de ciudad, comida y reservas gestionadas aparte. Un chofer privado aporta valor porque mantiene toda la logistica clara mientras el grupo disfruta la parte de catas con responsabilidad.",
    chauffeurPoints: [
      "Recogida y regreso en hotel en Paris, sin cambios de tren ni traslados locales separados.",
      "Horario privado previsible que se adapta a tu ruta en lugar de obligarte a girar alrededor de los trenes.",
      "Opcion mas segura y comoda despues de las catas, especialmente si el grupo quiere conductor designado para volver.",
    ],
    gettingThereTitle: "Como llegar de Paris a Champagne",
    gettingThereIntro:
      "La mayoria compara trenes, apps o chofer pre-reservado. La mejor opcion depende de si quieres que el dia gire alrededor de la logistica o de la experiencia.",
    gettingThereOptions: [
      {
        title: "Tren mas traslados locales",
        text: "Suele parecer la opcion mas economica, pero se fragmenta rapido cuando sumas estaciones, taxis locales y movimientos entre reservas en pueblos distintos.",
      },
      {
        title: "Taxi o app",
        text: "Sirve para un trayecto directo, pero es menos practico si necesitas espera, varias paradas o un regreso estructurado tras varias visitas.",
      },
      {
        title: "Traslado privado con chofer",
        text: "La opcion mas clara si quieres recogida en hotel, estructura privada y una sola logistica desde la salida de Paris hasta la vuelta.",
      },
    ],
    practicalTitle: "Consejos practicos antes de ir",
    practicalIntro:
      "Champagne se disfruta mejor con expectativas realistas. La disponibilidad varia segun maison, el almuerzo condiciona mucho el ritmo y las mejores jornadas dejan margen entre paradas.",
    practicalTips: [
      {
        title: "Reservas de cata",
        text: "Reserva las catas directamente con las maisons o propiedades que quieras visitar. La disponibilidad varia segun casa y temporada, y el transporte no incluye reservas.",
      },
      {
        title: "Cavas y acceso",
        text: "Algunas visitas de cava requieren reserva previa y otras pueden tener acceso limitado ciertos dias. Conviene comprobar disponibilidad oficial antes de viajar.",
      },
      {
        title: "Horario de comida",
        text: "Protege la comida en la parte central del dia y no como un hueco improvisado. Asi el ritmo resulta mas comodo y reduces el riesgo de apilar catas demasiado juntas.",
      },
      {
        title: "Fines de semana y festivos",
        text: "Deja margen extra en fines de semana y festivos. Tiempos de carretera, ritmo de restaurante y disponibilidad pueden sentirse mas ajustados.",
      },
      {
        title: "Regreso responsable",
        text: "Si el dia incluye catas, un chofer privado simplifica la vuelta porque nadie del grupo necesita conducir despues de las visitas.",
      },
    ],
    faqTitle: "FAQ traslado Champagne",
    faqItems: [
      {
        question: "¿Cuanto dura el trayecto de Paris a Champagne?",
        answer:
          "Depende del punto exacto de la region que elijas, pero en general Champagne funciona bien como excursion de un dia desde Paris cuando la ruta esta planificada.",
      },
      {
        question: "¿Reims o Epernay para una primera visita?",
        answer:
          "Reims suele encajar mejor si buscas catedral, ciudad y contexto de grandes maisons. Epernay suele ser mejor si quieres una atmosfera mas tranquila y centrada en Champagne.",
      },
      {
        question: "¿Las catas estan incluidas?",
        answer:
          "No. Este servicio es solo transporte. Las catas deben reservarse directamente con las maisons o propiedades que quieras visitar.",
      },
      {
        question: "¿El chofer puede esperar entre visitas?",
        answer:
          "Si, dentro del formato reservado. Eso hace mas facil moverse entre comida, pueblo y reservas sin reorganizar transporte todo el tiempo.",
      },
      {
        question: "¿Champagne se puede hacer en medio dia?",
        answer:
          "Es posible con un plan muy concreto, pero la mayoria de primeros visitantes prefieren dia completo para tener mas margen para reservas, comida y vuelta tranquila a Paris.",
      },
      {
        question: "¿Cual es la mejor hora para salir de Paris?",
        answer:
          "Las salidas por la mañana suelen ser las mas fluidas. Dejan mas flexibilidad si la carretera, las reservas o el servicio de comida se alargan.",
      },
    ],
    finalCta: {
      title:
        "¿Prefieres Champagne sin cambios de tren ni preocupacion por la vuelta?",
      body: "Reserva un traslado privado Paris-Champagne y mantén el foco del dia en la region, no en las decisiones de transporte.",
      button: "Reservar traslado a Champagne",
    },
    sidebar: {
      title: "Opciones privadas para Champagne",
      note: "Solo transporte. Catas, acceso a cavas, comidas y reservas no estan incluidos.",
      cards: [
        {
          title: "Champagne Day Trip",
          duration: "8 horas",
          priceLabel: "Desde €420",
          description:
            "Ideal para una base principal en la region con comida y plan centrado en una o dos reservas.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Transporte con chofer privado",
            "Tiempo de espera, peajes, parking y combustible incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Champagne Premium Day",
          duration: "10 horas",
          priceLabel: "Desde €950",
          description:
            "Ideal para una ruta mas larga con mas margen entre Reims, Epernay, comida y visitas reservadas.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Disponibilidad ampliada del chofer",
            "Tiempo de espera, peajes, parking y combustible incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
  fr: {
    title: "Region Champagne",
    distance: "Environ 145 km de Paris",
    duration: "8-10 heures",
    navigation: {
      description: "Guide",
      tours: "Formats de visite",
      map: "Acces",
      events: "Conseils pratiques",
      faq: "FAQ",
    },
    intro:
      "Une excursion Champagne depuis Paris peut etre tres fluide ou assez lourde selon l'organisation. La region reste facile a parcourir une fois sur place, mais l'experience depend surtout de l'ordre du jour: Reims, Epernay ou les deux, le temps laisse au dejeuner, et la maniere de gerer les degustations sans compliquer le retour. Ce guide est pense pour les voyageurs qui veulent une journee premium hors de Paris avec une logistique privee, claire et simple.",
    overviewTitle: "Pourquoi visiter la Champagne depuis Paris",
    whyVisitTitle: "Pourquoi la Champagne merite une vraie journee",
    whyVisitPoints: [
      "Le rythme change completement par rapport a Paris: paysages de vignes, centres plus calmes, et ambiance davantage tournee vers les maisons et la table.",
      "Le format convient tres bien aux couples, anniversaires, celebrations et petits groupes qui veulent une sortie plus soignee qu'un simple aller-retour.",
      "Le porte-a-porte compte beaucoup ici car la valeur de la journee depend du confort, du timing et du fait de ne pas conduire apres les degustations.",
    ],
    regionChoiceTitle: "Reims ou Epernay: quelle base choisir",
    regionChoiceIntro:
      "Beaucoup de visiteurs veulent tout voir le meme jour, mais il vaut souvent mieux choisir d'abord le ton de la journee. Reims et Epernay se completent, mais ne produisent pas la meme experience.",
    regionChoices: [
      {
        title: "Reims pour la cathedrale, la ville et les grandes maisons",
        text: "Reims convient mieux si vous cherchez un arret urbain avec un monument fort, un vrai centre-ville et une lecture plus culturelle de la region.",
      },
      {
        title: "Epernay pour l'Avenue de Champagne et un rythme plus doux",
        text: "Epernay donne souvent une sensation plus intime. C'est un meilleur choix si vous voulez une journee plus directement centree sur l'identite Champagne.",
      },
      {
        title: "Les deux seulement avec un itineraire discipline",
        text: "Voir les deux peut fonctionner, mais uniquement si reservations, dejeuner et temps de route sont calibres de maniere realiste.",
      },
    ],
    firstStopsTitle: "Que voir en premier en Champagne",
    firstStopsIntro:
      "Le premier arret doit correspondre a la forme de la journee. Si le depart se fait sur une mauvaise priorite, il devient plus difficile de proteger les horaires de degustation et de retour.",
    firstStops: [
      {
        title: "Avenue de Champagne ou centre d'Epernay",
        text: "Bon point d'entree si vous cherchez une premiere lecture elegante de la region avant de poursuivre vers les vignes ou des visites reservees directement aupres des maisons.",
      },
      {
        title: "Cathedrale de Reims et centre-ville",
        text: "Pertinent si vous voulez melanger architecture, ambiance urbaine et Champagne dans la meme sortie.",
      },
      {
        title: "Reservation confirmee de degustation ou de cave",
        text: "Si vous avez deja un horaire confirme, laissez-le structurer la journee. La disponibilite peut varier selon la maison et la saison.",
      },
    ],
    itineraryTitle: "Itineraire conseille depuis Paris",
    itineraryIntro:
      "Une bonne journee en Champagne commence generalement par un depart clair depuis Paris et par une vision realiste de ce que le groupe veut vraiment faire. Les meilleurs parcours protegent une ou deux etapes fortes au lieu d'en empiler trop.",
    itinerarySteps: [
      "Quittez Paris le matin avec prise en charge, route et fenetre de retour deja fixees.",
      "Rejoignez Reims ou Epernay comme base principale et gardez le premier arret simple, surtout si vous avez ensuite des reservations.",
      "Consacrez le milieu de journee au dejeuner et a une ou deux visites reservees, avec une marge entre les etapes car les horaires et trajets locaux peuvent varier.",
      "Gardez la fin d'apres-midi pour un dernier arret panoramique ou un retour calme a Paris plutot que pour une visite de trop.",
    ],
    midCta: {
      title: "Vous preparez un transfert prive vers la Champagne ?",
      body: "Gardez la journee simple et elegante avec prise en charge a l'hotel, chauffeur prive et retour direct a Paris via le parcours de reservation existant.",
      button: "Planifier mon transfert Champagne",
    },
    visitOptionsTitle: "Demi-journee ou journee complete",
    visitOptionsIntro:
      "La Champagne peut se faire en format plus court, mais elle devient en general plus agreable quand le programme laisse de la place aux reservations, au dejeuner et a un retour calme. Le bon choix depend du niveau d'experience que vous recherchez.",
    halfDayTitle: "La demi-journee ne fonctionne que sur un plan tres cible",
    halfDayBody:
      "Ce format peut convenir pour une seule priorite tres nette, comme un arret principal ou une degustation reservee. Il laisse peu de marge si les horaires glissent ou si vous voulez prendre le temps de dejeuner.",
    fullDayTitle: "La journee complete convient mieux a une premiere visite",
    fullDayBody:
      "Elle donne assez d'espace pour une base regionale, un repas et une ou deux experiences reservees sans transformer le retour a Paris en course. C'est souvent l'option la plus premium et la plus confortable.",
    chauffeurTitle: "Pourquoi un chauffeur prive a du sens en Champagne",
    chauffeurIntro:
      "Le train reste possible, mais il correspond rarement a la journee que les visiteurs veulent reellement vivre. Une sortie Champagne implique souvent gare, centre-ville, dejeuner et reservations gerees separement. Le chauffeur prive garde toute la logistique sous controle pendant que le groupe profite des degustations de maniere responsable.",
    chauffeurPoints: [
      "Prise en charge et retour a l'hotel a Paris, sans changements de train ni transferts locaux supplementaires.",
      "Cadre prive plus previsible, centre sur votre parcours plutot que sur les horaires ferroviaires.",
      "Solution plus sure et plus confortable apres degustation, surtout si vous souhaitez un conducteur designe pour le retour.",
    ],
    gettingThereTitle: "Aller de Paris a la Champagne",
    gettingThereIntro:
      "Les voyageurs hesitent souvent entre train, application de transport ou chauffeur reserve. Le bon choix depend de savoir si vous voulez passer la journee a gerer les segments ou a profiter de la region.",
    gettingThereOptions: [
      {
        title: "Train puis transferts locaux",
        text: "Souvent l'option la moins chere en apparence, mais elle se fragmente vite avec les gares, taxis locaux et deplacements entre reservations.",
      },
      {
        title: "Taxi ou application",
        text: "Pratique pour un trajet direct, mais moins adapte a une vraie journee de degustation avec attente et plusieurs arrets.",
      },
      {
        title: "Transfert prive avec chauffeur",
        text: "La meilleure option si vous voulez une prise en charge a l'hotel, une structure privee et une seule logique transport du depart au retour.",
      },
    ],
    practicalTitle: "Conseils pratiques avant de partir",
    practicalIntro:
      "La Champagne se visite mieux avec des attentes realistes. La disponibilite change selon les maisons, le dejeuner compte beaucoup dans le rythme, et les meilleures journees laissent volontairement de la marge.",
    practicalTips: [
      {
        title: "Reservations de degustation",
        text: "Reservez directement aupres des maisons ou domaines que vous visez. La disponibilite varie selon les etablissements et les saisons, et le transport n'inclut pas ces reservations.",
      },
      {
        title: "Visites de caves et acces",
        text: "Certaines visites demandent une reservation a l'avance, d'autres peuvent etre limitees certains jours. Verifiez la disponibilite officielle avant le depart.",
      },
      {
        title: "Horaire du dejeuner",
        text: "Mieux vaut proteger le dejeuner au milieu de la journee plutot que d'essayer de le glisser entre deux rendez-vous. Le rythme en devient plus confortable.",
      },
      {
        title: "Week-ends et jours feries",
        text: "Prevoyez davantage de marge les week-ends et jours feries. Les temps de route, les restaurants et la disponibilite des reservations peuvent etre moins fluides.",
      },
      {
        title: "Retour responsable",
        text: "Si la journee inclut des degustations, un chauffeur prive simplifie le retour en evitant qu'une personne du groupe doive conduire apres les visites.",
      },
    ],
    faqTitle: "FAQ transfert Champagne",
    faqItems: [
      {
        question: "Combien de temps dure le trajet Paris-Champagne ?",
        answer:
          "Cela depend de la base exacte choisie dans la region, mais la Champagne se prete bien a une excursion d'une journee depuis Paris quand le parcours est prepare a l'avance.",
      },
      {
        question: "Reims ou Epernay pour une premiere visite ?",
        answer:
          "Reims convient souvent mieux si vous cherchez cathedrale, ville et contexte des grandes maisons. Epernay est souvent plus adaptee a une ambiance plus calme et plus directement Champagne.",
      },
      {
        question: "Les degustations sont-elles incluses ?",
        answer:
          "Non. Le service couvre uniquement le transport. Les degustations doivent etre reservees directement aupres des maisons ou domaines.",
      },
      {
        question: "Le chauffeur peut-il attendre entre les visites ?",
        answer:
          "Oui, dans le cadre de la formule reservee. Cela simplifie les mouvements entre dejeuner, centre-ville et reservations sans refaire toute la logistique.",
      },
      {
        question: "La Champagne est-elle faisable en demi-journee ?",
        answer:
          "C'est possible sur un plan tres cible, mais la plupart des premiers visiteurs preferent la journee complete pour garder plus de marge.",
      },
      {
        question: "Quel est le meilleur moment pour quitter Paris ?",
        answer:
          "Les departs matinaux sont en general les plus fluides. Ils laissent plus de souplesse si la route, les reservations ou le service dejeuner prennent plus de temps.",
      },
    ],
    finalCta: {
      title:
        "Vous preferez la Champagne sans changements de train ni souci pour le retour ?",
      body: "Reservez un transfert prive Paris-Champagne et gardez la journee centree sur la region, pas sur les decisions de transport.",
      button: "Reserver transfert Champagne",
    },
    sidebar: {
      title: "Options privees Champagne",
      note: "Transport uniquement. Degustations, acces aux caves, repas et reservations non inclus.",
      cards: [
        {
          title: "Champagne Day Trip",
          duration: "8 heures",
          priceLabel: "A partir de 420 EUR",
          description:
            "Ideal pour une base principale dans la region avec dejeuner et plan centre sur une ou deux reservations.",
          includes: [
            "Prise en charge et retour a Paris",
            "Transport avec chauffeur prive",
            "Attente, peages, parking et carburant inclus",
          ],
          button: "Reserver day trip",
        },
        {
          title: "Champagne Premium Day",
          duration: "10 heures",
          priceLabel: "A partir de 950 EUR",
          description:
            "Ideal pour une route plus large avec plus d'espace entre Reims, Epernay, dejeuner et visites reservees.",
          includes: [
            "Prise en charge et retour a Paris",
            "Disponibilite chauffeur plus longue",
            "Attente, peages, parking et carburant inclus",
          ],
          button: "Reserver premium",
        },
      ],
    },
  },
  pt: {
    title: "Regiao de Champagne",
    distance: "Cerca de 145 km de Paris",
    duration: "8-10 horas",
    navigation: {
      description: "Guia",
      tours: "Opcoes de visita",
      map: "Como chegar",
      events: "Dicas praticas",
      faq: "FAQ",
    },
    intro:
      "Um bate-volta para Champagne saindo de Paris pode ser muito fluido ou cansativo dependendo de como o dia e montado. A regiao fica administravel quando voce ja esta la, mas a experiencia depende da ordem: Reims, Epernay ou as duas, quanto tempo sobra para almoco e como lidar com degustacoes sem transformar a volta em trabalho. Este guia foi pensado para viajantes que querem um dia premium fora de Paris com logistica privada, clara e facil.",
    overviewTitle: "Por que visitar Champagne saindo de Paris",
    whyVisitTitle: "Por que Champagne merece um dia inteiro",
    whyVisitPoints: [
      "O ritmo e bem diferente de Paris: paisagens de vinhedos, centros menores e uma atmosfera mais calma em torno das maisons e da mesa.",
      "Funciona muito bem para casais, comemoracoes e pequenos grupos privados que querem uma saida bem cuidada.",
      "Transporte porta a porta pesa bastante aqui porque o valor do dia depende de conforto, tempo bem usado e de nao dirigir depois das degustacoes.",
    ],
    regionChoiceTitle: "Reims ou Epernay: qual base combina mais",
    regionChoiceIntro:
      "Muitos visitantes tentam ver tudo no mesmo dia, mas normalmente faz mais sentido escolher primeiro o tipo de experiencia desejada. Reims e Epernay se completam, mas criam atmosferas diferentes.",
    regionChoices: [
      {
        title: "Reims para catedral, cidade e grandes maisons",
        text: "Reims costuma funcionar melhor se voce quer uma parada mais urbana com marco forte, centro historico e contexto cultural junto com Champagne.",
      },
      {
        title: "Epernay para Avenue de Champagne e ritmo mais leve",
        text: "Epernay costuma parecer mais intimista. E melhor para quem quer um dia mais visivelmente centrado na identidade da Champagne.",
      },
      {
        title: "As duas apenas com roteiro disciplinado",
        text: "Ver as duas pode dar certo, mas somente se reservas, almoco e tempos de estrada forem tratados de forma realista.",
      },
    ],
    firstStopsTitle: "O que ver primeiro em Champagne",
    firstStopsIntro:
      "A primeira parada deve combinar com a forma do dia. Se voce comeca pela prioridade errada, fica mais dificil proteger horarios de degustacao e retorno.",
    firstStops: [
      {
        title: "Avenue de Champagne ou centro de Epernay",
        text: "Boa porta de entrada para quem quer uma introducao elegante a regiao antes de seguir para vinhedos ou visitas reservadas diretamente com as maisons.",
      },
      {
        title: "Catedral de Reims e centro da cidade",
        text: "Faz sentido se voce quiser misturar arquitetura, cidade e Champagne na mesma saida.",
      },
      {
        title: "Reserva confirmada de degustacao ou cave",
        text: "Se voce ja tem horario confirmado, deixe isso comandar o dia. A disponibilidade varia conforme casa e temporada.",
      },
    ],
    itineraryTitle: "Itinerario sugerido saindo de Paris",
    itineraryIntro:
      "Um bom dia em Champagne normalmente comeca com saida clara de Paris e com visao realista do que o grupo realmente quer fazer. Os melhores roteiros protegem uma ou duas etapas fortes em vez de empilhar demais.",
    itinerarySteps: [
      "Saia de Paris pela manha com busca, rota e janela de retorno ja definidas.",
      "Chegue a Reims ou Epernay como base principal e mantenha a primeira parada simples, especialmente se houver reservas depois.",
      "Use o meio do dia para almoco e uma ou duas visitas reservadas, deixando margem entre as etapas porque horarios e deslocamentos locais podem variar.",
      "Guarde o fim da tarde para uma ultima parada panoramica ou um retorno tranquilo a Paris em vez de tentar encaixar uma visita extra.",
    ],
    midCta: {
      title: "Planeja um transfer privado para Champagne saindo de Paris?",
      body: "Mantenha o dia elegante e simples com busca no hotel, motorista privado e retorno direto a Paris pelo fluxo atual de booking.",
      button: "Planejar transfer para Champagne",
    },
    visitOptionsTitle: "Meio dia ou dia inteiro",
    visitOptionsIntro:
      "Champagne pode ser feita num formato mais curto, mas normalmente fica melhor quando o programa deixa espaco para reservas, almoco e retorno calmo. A escolha depende do tipo de experiencia que voce quer.",
    halfDayTitle: "Meio dia so funciona com plano bem focado",
    halfDayBody:
      "Pode servir para uma unica prioridade muito clara, como uma parada principal ou uma degustacao reservada. Ha menos margem se os horarios escorregarem ou se voce quiser almocar com calma.",
    fullDayTitle: "Dia inteiro costuma ser melhor para primeira visita",
    fullDayBody:
      "Da espaco para uma base regional, refeicao e uma ou duas experiencias reservadas sem transformar a volta a Paris em correria. Costuma ser a opcao mais premium e confortavel.",
    chauffeurTitle: "Por que motorista privado faz sentido em Champagne",
    chauffeurIntro:
      "Ir de trem e possivel, mas raramente combina com o dia que a maioria quer viver. Uma saida para Champagne costuma incluir estacao, centro urbano, almoco e reservas tratadas separadamente. O motorista privado mantem a logistica sob controle enquanto o grupo aproveita as degustacoes com responsabilidade.",
    chauffeurPoints: [
      "Busca e retorno ao hotel em Paris, sem trocas de trem nem deslocamentos locais separados.",
      "Estrutura privada mais previsivel, centrada na sua rota e nao nos horarios ferroviarios.",
      "Opcao mais segura e confortavel depois das degustacoes, especialmente quando o grupo quer motorista designado para o retorno.",
    ],
    gettingThereTitle: "Como ir de Paris a Champagne",
    gettingThereIntro:
      "Muitos viajantes comparam trem, app ou motorista reservado. A melhor escolha depende de voce querer passar o dia gerindo trechos ou aproveitando a regiao.",
    gettingThereOptions: [
      {
        title: "Trem e deslocamentos locais",
        text: "Costuma parecer a opcao mais barata, mas se fragmenta rapido quando voce soma estacoes, taxis locais e movimento entre reservas.",
      },
      {
        title: "Taxi ou aplicativo",
        text: "Pratico para um trecho direto, mas menos adequado para um dia real de degustacao com espera e varias paradas.",
      },
      {
        title: "Transfer privado com motorista",
        text: "Melhor opcao para quem quer busca no hotel, estrutura privada e uma unica logistica do inicio em Paris ao retorno.",
      },
    ],
    practicalTitle: "Dicas praticas antes de ir",
    practicalIntro:
      "Champagne funciona melhor com expectativas realistas. A disponibilidade muda conforme a maison, o almoco pesa bastante no ritmo, e os melhores dias deixam margem de proposito.",
    practicalTips: [
      {
        title: "Reservas de degustacao",
        text: "Reserve degustacoes diretamente com as maisons ou propriedades escolhidas. A disponibilidade varia por casa e temporada, e o transporte nao inclui essas reservas.",
      },
      {
        title: "Visitas a caves e acesso",
        text: "Algumas visitas exigem reserva antecipada, enquanto outras podem ter acesso limitado em certos dias. Confira disponibilidade oficial antes de viajar.",
      },
      {
        title: "Horario do almoco",
        text: "Proteja o almoco no meio do dia em vez de tentar encaixa-lo entre compromissos. O ritmo fica mais confortavel e evita empilhar degustacoes demais.",
      },
      {
        title: "Fins de semana e feriados",
        text: "Deixe margem extra em fins de semana e feriados. Estrada, restaurantes e disponibilidade podem ficar menos fluidos.",
      },
      {
        title: "Retorno responsavel",
        text: "Se o dia inclui degustacoes, um motorista privado simplifica a volta porque ninguem do grupo precisa dirigir depois das visitas.",
      },
    ],
    faqTitle: "FAQ transfer Champagne",
    faqItems: [
      {
        question: "Quanto tempo dura o trajeto de Paris a Champagne?",
        answer:
          "Depende da base exata escolhida na regiao, mas Champagne funciona bem como bate-volta saindo de Paris quando a rota e planejada com antecedencia.",
      },
      {
        question: "Reims ou Epernay para primeira visita?",
        answer:
          "Reims costuma funcionar melhor para quem quer catedral, cidade e contexto das grandes maisons. Epernay costuma ser melhor para uma atmosfera mais tranquila e mais diretamente Champagne.",
      },
      {
        question: "As degustacoes estao incluidas?",
        answer:
          "Nao. O servico cobre apenas transporte. Degustacoes devem ser reservadas diretamente com as maisons ou propriedades escolhidas.",
      },
      {
        question: "O motorista pode esperar entre as visitas?",
        answer:
          "Sim, dentro do formato reservado. Isso facilita a circulacao entre almoco, centro urbano e reservas sem reorganizar transporte o tempo todo.",
      },
      {
        question: "Champagne cabe em meio dia?",
        answer:
          "E possivel com plano bem restrito, mas a maioria dos visitantes de primeira viagem prefere dia inteiro para manter mais margem para reservas, almoco e retorno tranquilo.",
      },
      {
        question: "Qual o melhor horario para sair de Paris?",
        answer:
          "Saidas pela manha costumam ser as mais fluidas. Elas deixam mais flexibilidade se estrada, reservas ou servico de almoco demorarem mais do que o esperado.",
      },
    ],
    finalCta: {
      title: "Prefere Champagne sem troca de trem nem preocupacao na volta?",
      body: "Reserve um transfer privado Paris-Champagne e deixe o dia focado na regiao, nao em decisoes de transporte.",
      button: "Reservar transfer Champagne",
    },
    sidebar: {
      title: "Opcoes privadas para Champagne",
      note: "Apenas transporte. Degustacoes, acesso a caves, refeicoes e reservas nao estao incluidos.",
      cards: [
        {
          title: "Champagne Day Trip",
          duration: "8 horas",
          priceLabel: "A partir de EUR 420",
          description:
            "Ideal para uma base principal na regiao com almoco e plano centrado em uma ou duas reservas.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Transporte com motorista privado",
            "Espera, pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Champagne Premium Day",
          duration: "10 horas",
          priceLabel: "A partir de EUR 950",
          description:
            "Ideal para rota mais ampla com mais espaco entre Reims, Epernay, almoco e visitas reservadas.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Disponibilidade estendida do motorista",
            "Espera, pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
};

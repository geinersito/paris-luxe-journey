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

interface GivernyHonfleurGuideContent {
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

export const givernyHonfleurGuideContent: Record<
  Language,
  GivernyHonfleurGuideContent
> = {
  en: {
    title: "Giverny & Honfleur",
    distance: "About 200 km from Paris",
    duration: "10-12 hours",
    navigation: {
      description: "Guide",
      tours: "Visit Options",
      map: "Getting There",
      events: "Practical Tips",
      faq: "FAQ",
    },
    intro:
      "A Giverny and Honfleur day trip from Paris works best for travelers who want one day that shifts mood as it moves west: garden calm in Giverny, then port-town atmosphere on the Normandy coast. The appeal of the route is not only the stops themselves, but the contrast between them. The challenge is timing. Garden access is seasonal, the coastal weather can change quickly, and the road day is long enough that the order of stops matters. This guide is designed to help you decide how to pace the outing while keeping the transport side private, clear, and comfortable.",
    overviewTitle: "Why visit Giverny and Honfleur from Paris",
    whyVisitTitle: "Why this route feels different from other Paris day trips",
    whyVisitPoints: [
      "It combines two distinct atmospheres in one outing: Monet-inspired garden and village pacing first, then a historic harbour setting with a stronger Normandy character.",
      "The route works especially well for couples, art-minded travelers, and visitors who want scenery and texture rather than one single monumental site.",
      "Private transport matters here because the day covers changing road segments, seasonal timing, and a return from the coast that feels much easier when it is already organized.",
    ],
    regionChoiceTitle: "Giverny first or Honfleur first: how to choose",
    regionChoiceIntro:
      "The order of the route changes the feeling of the day. There is no single right answer, but the most comfortable schedule usually depends on season, weather, and what part of the outing matters most to you.",
    regionChoices: [
      {
        title: "Giverny first for a calmer, more structured morning",
        text: "Starting with Giverny often makes the day feel more orderly. It suits travelers who want the garden stop to feel focused and the coastal section to open more gradually later on.",
      },
      {
        title: "Honfleur first if the coast is the emotional center of the day",
        text: "Starting with Honfleur can work well when the harbour atmosphere, lunch, and coastal pacing matter more than an early garden arrival. It usually asks for slightly firmer time discipline later.",
      },
      {
        title: "Choose based on season and weather, not only distance",
        text: "Seasonal opening dates and access rules can vary in Giverny, while weather on the coast can change quickly. Those two factors often shape the route more than the map does.",
      },
    ],
    firstStopsTitle: "Monet's garden, Normandy coast, and village pacing",
    firstStopsIntro:
      "The strongest first visit usually avoids trying to turn both stops into major deep-dive experiences. The route works better when one stop leads and the other complements it.",
    firstStops: [
      {
        title: "Giverny as the visual anchor",
        text: "If your priority is Monet's world, use Giverny as the clear anchor point. That keeps the first half of the day coherent and leaves Honfleur as a looser atmospheric stop.",
      },
      {
        title: "Honfleur as the slower lunch and harbour stop",
        text: "Honfleur is often best enjoyed with a little room to walk, pause, and look at the harbour rather than trying to rush through it as a checklist stop.",
      },
      {
        title: "Leave margin between the two halves of the route",
        text: "This is not a route that rewards stacking too many extra attractions. The day usually feels more premium when the transfer itself has breathing room.",
      },
    ],
    itineraryTitle: "Suggested itinerary from Paris",
    itineraryIntro:
      "A strong Giverny and Honfleur day begins with an early departure from Paris and a realistic expectation about how much time you want on the coast after the garden stop. The route is long enough that rhythm matters more than ambition.",
    itinerarySteps: [
      "Leave Paris in the morning with pickup, route order, and return timing already clear before the day starts.",
      "Use the first half of the outing for your lead stop, either Giverny or Honfleur, instead of trying to balance both equally from the beginning.",
      "Protect the middle of the day for lunch and road margin, especially if you want the coastal portion to feel relaxed rather than compressed.",
      "Keep the return to Paris simple and direct rather than adding one more unscheduled detour late in the day.",
    ],
    midCta: {
      title: "Planning a private Giverny and Honfleur transfer from Paris?",
      body: "Keep the day simple with hotel pickup, private chauffeur service, and a direct return to Paris through the existing booking flow.",
      button: "Plan my Giverny transfer",
    },
    visitOptionsTitle: "Half-day or full-day: what is realistic",
    visitOptionsIntro:
      "This route is longer and more varied than a nearby cultural outing from Paris. In practice, Giverny plus Honfleur makes sense as a full-day excursion if you want both stops to feel worthwhile.",
    halfDayTitle:
      "A half-day Giverny and Honfleur trip is not realistic from Paris",
    halfDayBody:
      "For most travelers, a half-day format does not leave enough room for the distance, one meaningful stop, lunch timing, and a comfortable return. It may work only as a narrow transport block with very limited sightseeing expectations, not as a full route experience.",
    fullDayTitle: "A full-day format is the right baseline for this route",
    fullDayBody:
      "A full-day transfer gives enough space for a lead stop, a second complementary stop, lunch, and a calmer drive back to Paris. It is usually the only format that lets the day feel elegant instead of rushed.",
    chauffeurTitle:
      "Why a private chauffeur makes sense for Giverny and Honfleur",
    chauffeurIntro:
      "Public transport can reach parts of this route, but it rarely supports the combination of timing, comfort, and flexibility most visitors want. The value of a chauffeur here is not only door-to-door transport. It is the ability to hold together two different destinations inside one long day without forcing every decision around trains or parking.",
    chauffeurPoints: [
      "Hotel pickup and return in Paris, with no station changes before or after a long regional day.",
      "A clearer route between inland stop, lunch, and coast, with waiting time handled inside the excursion format.",
      "A more comfortable option for couples, families, and small groups who want the coastal return to feel easy rather than draining.",
    ],
    gettingThereTitle: "Getting from Paris to Giverny and Honfleur",
    gettingThereIntro:
      "Most travelers compare train combinations, self-drive plans, or a private chauffeur. The best option depends on whether you want the day to revolve around transport problem-solving or around the route itself.",
    gettingThereOptions: [
      {
        title: "Train plus local onward transport",
        text: "Possible in parts, but often fragmented once you combine regional rail, local taxis, and the challenge of linking inland and coastal stops cleanly in one day.",
      },
      {
        title: "Self-drive",
        text: "Flexible on paper, but it places the long road day, parking decisions, and changing conditions on the travelers themselves. That can reduce the pleasure of the outing.",
      },
      {
        title: "Private chauffeur transfer",
        text: "Best when you want hotel pickup, one route plan, and a direct return to Paris without rebuilding the day around separate transport decisions.",
      },
    ],
    practicalTitle: "Practical tips before you go",
    practicalIntro:
      "This route works best when expectations stay realistic. Giverny has a seasonal component, Honfleur is shaped by coastal conditions, and the road day is long enough that pacing matters more than trying to add too much.",
    practicalTips: [
      {
        title: "Garden and museum reservations",
        text: "Check official availability before visiting and book any garden or museum entry separately through official channels. Our service covers transport, not tickets or attraction reservations.",
      },
      {
        title: "Seasonal garden access",
        text: "Seasonal opening dates and access rules can vary. If Giverny is the main reason for the outing, confirm official operating information before locking the route.",
      },
      {
        title: "Coastal weather",
        text: "Weather on the coast can change quickly. Layers, comfortable shoes, and flexible expectations make the Honfleur stop more enjoyable.",
      },
      {
        title: "Lunch timing",
        text: "Protect lunch in the middle of the route rather than trying to improvise it late. This keeps the pacing more relaxed and the return to Paris more comfortable.",
      },
      {
        title: "Weekends and holidays",
        text: "Allow extra time on weekends and holidays. Roads, parking, restaurant service, and attraction entry flow can all feel slower during busier periods.",
      },
    ],
    faqTitle: "Giverny and Honfleur transfer FAQ",
    faqItems: [
      {
        question: "Is Giverny and Honfleur possible in one day from Paris?",
        answer:
          "Yes, but it works best as a full-day excursion with realistic pacing. The route is long enough that trying to do too much usually weakens the experience.",
      },
      {
        question: "Should we visit Giverny or Honfleur first?",
        answer:
          "Many travelers prefer Giverny first for a more structured morning, then Honfleur later for lunch and harbour atmosphere. The better order can also depend on season, weather, and your main priority for the day.",
      },
      {
        question: "Are garden or museum tickets included?",
        answer:
          "No. This service is transport only. Garden, museum, and attraction entries should be checked and booked separately through official sources when needed.",
      },
      {
        question: "Can the chauffeur wait between stops?",
        answer:
          "Yes, within the booked excursion format. That makes it easier to move between Giverny, lunch, and Honfleur without reorganizing transport during the day.",
      },
      {
        question: "Is half-day realistic?",
        answer:
          "Usually no. From Paris, this route generally needs a full-day structure to feel comfortable and worthwhile.",
      },
      {
        question: "What time should we leave Paris?",
        answer:
          "Morning departures are usually the smoothest because they give you more flexibility if traffic, reservations, or lunch service take longer than expected.",
      },
    ],
    finalCta: {
      title:
        "Prefer Giverny and Honfleur without train changes or self-drive planning?",
      body: "Reserve a private Paris to Giverny and Honfleur transfer and keep the day focused on the route, not on transport logistics.",
      button: "Book Giverny transfer",
    },
    sidebar: {
      title: "Private Giverny and Honfleur transfer options",
      note: "Transport only. Garden access, museum entries, guided visits, meals, and attraction reservations are not included.",
      cards: [
        {
          title: "Giverny & Honfleur Day Trip",
          duration: "10 hours",
          priceLabel: "From €680",
          description:
            "Best for one balanced full-day route with Giverny, Honfleur, and a clear same-day return to Paris.",
          includes: [
            "Hotel pickup and return in Paris",
            "Private chauffeur transport and waiting time",
            "Tolls, parking, and fuel included",
          ],
          button: "Book day trip transfer",
        },
        {
          title: "Giverny & Honfleur Premium Day",
          duration: "12 hours",
          priceLabel: "From €1,200",
          description:
            "Best for a longer premium route with more breathing room between inland and coastal stops.",
          includes: [
            "Hotel pickup and return in Paris",
            "Extended chauffeur availability",
            "Tolls, parking, and fuel included",
          ],
          button: "Book premium transfer",
        },
      ],
    },
  },
  es: {
    title: "Giverny & Honfleur",
    distance: "Aproximadamente 200 km desde Paris",
    duration: "10-12 horas",
    navigation: {
      description: "Guia",
      tours: "Opciones de visita",
      map: "Como llegar",
      events: "Consejos practicos",
      faq: "FAQ",
    },
    intro:
      "Una excursion a Giverny y Honfleur desde Paris funciona muy bien para viajeros que quieren un dia con cambio de ambiente a medida que avanza la ruta: calma de jardin en Giverny y atmosfera portuaria en la costa de Normandia. El atractivo no esta solo en las paradas, sino en el contraste entre ellas. La dificultad esta en el ritmo. El acceso a jardines es estacional, el clima de la costa puede cambiar rapido y la jornada por carretera es lo bastante larga como para que el orden importe. Esta guia ayuda a decidir como organizar la salida con transporte privado y comodo.",
    overviewTitle: "Por que visitar Giverny y Honfleur desde Paris",
    whyVisitTitle:
      "Por que esta ruta se siente distinta a otras excursiones desde Paris",
    whyVisitPoints: [
      "Combina dos atmosferas muy diferentes en una sola jornada: jardin y pueblo en Giverny primero, luego ambiente de puerto historico en Honfleur.",
      "Funciona especialmente bien para parejas, viajeros con sensibilidad artistica y quienes buscan paisaje y textura, no solo un gran monumento.",
      "El transporte privado pesa mucho aqui porque el dia mezcla tramos interiores, costa y una vuelta mas comoda cuando ya esta organizada.",
    ],
    regionChoiceTitle: "Giverny primero o Honfleur primero: como elegir",
    regionChoiceIntro:
      "El orden de la ruta cambia bastante la sensacion del dia. No hay una unica respuesta correcta, pero el programa mas comodo suele depender de la temporada, del clima y de que parte de la salida te importa mas.",
    regionChoices: [
      {
        title: "Giverny primero para una manana mas clara y estructurada",
        text: "Empezar por Giverny suele hacer que el dia se sienta mas ordenado. Encaja bien si quieres que la parte de jardin tenga mas foco y dejar la costa para abrir el ritmo despues.",
      },
      {
        title: "Honfleur primero si la costa es el centro emocional del dia",
        text: "Empezar por Honfleur puede funcionar si el puerto, la comida y el ritmo costero pesan mas que una llegada temprana al jardin. Suele exigir algo mas de disciplina horaria despues.",
      },
      {
        title: "Elige segun temporada y clima, no solo por distancia",
        text: "Las fechas estacionales de apertura y las reglas de acceso pueden variar en Giverny, mientras que el tiempo en la costa cambia rapido. Esos factores suelen pesar mas que el mapa.",
      },
    ],
    firstStopsTitle: "Jardin de Monet, costa de Normandia y ritmo de pueblo",
    firstStopsIntro:
      "La mejor primera visita suele evitar convertir ambas paradas en experiencias profundas al mismo nivel. La ruta funciona mejor cuando una lidera y la otra acompana.",
    firstStops: [
      {
        title: "Giverny como ancla visual",
        text: "Si tu prioridad es el universo de Monet, usa Giverny como punto ancla. Eso da coherencia a la primera mitad del dia y deja Honfleur como parada mas atmosferica.",
      },
      {
        title: "Honfleur como parada mas lenta para comida y puerto",
        text: "Honfleur suele disfrutarse mejor con algo de margen para pasear, parar y mirar el puerto, no como una parada de checklist apresurada.",
      },
      {
        title: "Deja margen entre las dos mitades de la ruta",
        text: "No es una ruta que mejore por acumular demasiadas atracciones extra. El dia suele sentirse mas premium cuando el traslado respira.",
      },
    ],
    itineraryTitle: "Itinerario sugerido desde Paris",
    itineraryIntro:
      "Un buen dia Giverny-Honfleur suele empezar temprano y con una expectativa realista sobre cuanto tiempo quieres pasar en la costa despues del jardin. La ruta es lo bastante larga como para que el ritmo importe mas que la ambicion.",
    itinerarySteps: [
      "Salir de Paris por la manana con recogida, orden de ruta y horario de regreso ya claros.",
      "Usar la primera mitad del dia para la parada principal, ya sea Giverny u Honfleur, en lugar de intentar equilibrar ambas desde el inicio.",
      "Proteger la parte central del dia para comida y margen de carretera, sobre todo si quieres que la seccion de costa se sienta relajada.",
      "Mantener la vuelta a Paris simple y directa en lugar de anadir un desvio mas al final del dia.",
    ],
    midCta: {
      title: "¿Planeas un traslado privado a Giverny y Honfleur desde Paris?",
      body: "Mantén el dia simple con recogida en hotel, chofer privado y regreso directo a Paris a traves del flujo actual de booking.",
      button: "Planificar traslado a Giverny",
    },
    visitOptionsTitle: "Medio dia o dia completo: que es realista",
    visitOptionsIntro:
      "Esta ruta es mas larga y variada que una escapada cultural cercana desde Paris. En la practica, Giverny y Honfleur tienen sentido como excursion de dia completo si quieres que ambas paradas merezcan la pena.",
    halfDayTitle: "Un medio dia Giverny-Honfleur no es realista desde Paris",
    halfDayBody:
      "Para la mayoria de viajeros, un medio dia no deja margen para la distancia, una parada significativa, la comida y una vuelta comoda. Solo podria funcionar como bloque de transporte muy limitado, no como experiencia completa de ruta.",
    fullDayTitle:
      "El formato de dia completo es la base correcta para esta ruta",
    fullDayBody:
      "Un traslado de dia completo deja espacio para una parada principal, una segunda parada complementaria, comida y una vuelta mas serena a Paris. Suele ser el unico formato que permite que el dia se sienta elegante y no apresurado.",
    chauffeurTitle:
      "Por que un chofer privado tiene sentido para Giverny y Honfleur",
    chauffeurIntro:
      "El transporte publico puede cubrir partes de esta ruta, pero rara vez acompana la combinacion de tiempos, comodidad y flexibilidad que la mayoria busca. El valor del chofer aqui no es solo puerta a puerta. Es poder unir dos destinos distintos en una jornada larga sin depender de trenes o parking.",
    chauffeurPoints: [
      "Recogida y regreso en hotel en Paris, sin cambios de estacion antes o despues de una jornada larga.",
      "Ruta mas clara entre parada interior, comida y costa, con tiempo de espera integrado en el formato de excursion.",
      "Opcion mas comoda para parejas, familias y grupos pequenos que quieren que el regreso desde la costa se sienta facil.",
    ],
    gettingThereTitle: "Como llegar de Paris a Giverny y Honfleur",
    gettingThereIntro:
      "La mayoria compara trenes, coche propio o chofer privado. La mejor opcion depende de si quieres que el dia gire alrededor de resolver transporte o de la ruta en si.",
    gettingThereOptions: [
      {
        title: "Tren mas traslados locales",
        text: "Posible en parte, pero suele fragmentarse rapido cuando mezclas tren regional, taxis locales y el reto de unir una parada interior y otra costera en el mismo dia.",
      },
      {
        title: "Conducir por cuenta propia",
        text: "Flexible en teoria, pero coloca sobre los viajeros el peso de la carretera, el parking y los cambios de condiciones. Eso puede reducir el placer de la salida.",
      },
      {
        title: "Traslado privado con chofer",
        text: "La mejor opcion si quieres recogida en hotel, una sola logistica y regreso directo a Paris sin reconstruir el dia alrededor del transporte.",
      },
    ],
    practicalTitle: "Consejos practicos antes de ir",
    practicalIntro:
      "Esta ruta funciona mejor con expectativas realistas. Giverny tiene componente estacional, Honfleur depende del clima costero y la jornada por carretera es lo bastante larga como para que el ritmo pese mas que querer anadir demasiado.",
    practicalTips: [
      {
        title: "Reservas de jardin y museo",
        text: "Consulta la disponibilidad oficial antes de visitar y reserva por separado cualquier entrada de jardin o museo en canales oficiales. Nuestro servicio cubre transporte, no tickets ni reservas de atracciones.",
      },
      {
        title: "Acceso estacional al jardin",
        text: "Las fechas estacionales de apertura y las reglas de acceso pueden variar. Si Giverny es la razon principal del dia, conviene confirmar la informacion oficial antes de fijar la ruta.",
      },
      {
        title: "Clima de la costa",
        text: "El tiempo en la costa puede cambiar rapidamente. Capas, calzado comodo y expectativas flexibles ayudan a disfrutar mas la parte de Honfleur.",
      },
      {
        title: "Horario de comida",
        text: "Protege la comida en la parte central de la ruta y no como una improvisacion tardia. Asi el ritmo resulta mas relajado y la vuelta a Paris mas comoda.",
      },
      {
        title: "Fines de semana y festivos",
        text: "Deja margen extra en fines de semana y festivos. Carretera, parking, servicio de restaurantes y entrada a atracciones pueden ir mas lentos.",
      },
    ],
    faqTitle: "FAQ traslado Giverny y Honfleur",
    faqItems: [
      {
        question: "¿Es posible hacer Giverny y Honfleur en un dia desde Paris?",
        answer:
          "Si, pero suele funcionar mejor como excursion de dia completo con un ritmo realista. La ruta es lo bastante larga como para que intentar hacer demasiado debilite la experiencia.",
      },
      {
        question: "¿Debemos visitar primero Giverny o Honfleur?",
        answer:
          "Muchos viajeros prefieren Giverny primero para una manana mas estructurada y Honfleur despues para comida y atmosfera de puerto. El mejor orden tambien puede depender de temporada, clima y prioridad principal.",
      },
      {
        question: "¿Las entradas de jardin o museo estan incluidas?",
        answer:
          "No. Este servicio es solo transporte. Las entradas a jardines, museos y atracciones deben comprobarse y reservarse por separado en fuentes oficiales cuando haga falta.",
      },
      {
        question: "¿El chofer puede esperar entre paradas?",
        answer:
          "Si, dentro del formato de excursion reservado. Eso facilita moverse entre Giverny, comida y Honfleur sin reorganizar el transporte durante el dia.",
      },
      {
        question: "¿Es realista un medio dia?",
        answer:
          "Normalmente no. Desde Paris, esta ruta suele necesitar una estructura de dia completo para ser comoda y valiosa.",
      },
      {
        question: "¿A que hora deberiamos salir de Paris?",
        answer:
          "Las salidas por la manana suelen ser las mas fluidas porque dejan mas margen si trafico, reservas o comida tardan mas de lo previsto.",
      },
    ],
    finalCta: {
      title:
        "¿Prefieres Giverny y Honfleur sin cambios de tren ni plan de conduccion?",
      body: "Reserva un traslado privado Paris-Giverny-Honfleur y mantén el foco del dia en la ruta, no en la logistica de transporte.",
      button: "Reservar traslado a Giverny",
    },
    sidebar: {
      title: "Opciones privadas para Giverny y Honfleur",
      note: "Solo transporte. Acceso a jardines, entradas de museo, visitas guiadas, comidas y reservas de atracciones no estan incluidos.",
      cards: [
        {
          title: "Giverny & Honfleur Day Trip",
          duration: "10 horas",
          priceLabel: "Desde €680",
          description:
            "Ideal para una ruta completa y equilibrada con Giverny, Honfleur y regreso claro a Paris el mismo dia.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Transporte con chofer privado y tiempo de espera",
            "Peajes, parking y combustible incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Giverny & Honfleur Premium Day",
          duration: "12 horas",
          priceLabel: "Desde €1,200",
          description:
            "Ideal para una ruta premium mas larga con mayor margen entre la parada interior y la costa.",
          includes: [
            "Recogida y regreso en hotel en Paris",
            "Disponibilidad ampliada del chofer",
            "Peajes, parking y combustible incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
  fr: {
    title: "Giverny & Honfleur",
    distance: "Environ 200 km de Paris",
    duration: "10-12 heures",
    navigation: {
      description: "Guide",
      tours: "Formats de visite",
      map: "Acces",
      events: "Conseils pratiques",
      faq: "FAQ",
    },
    intro:
      "Une excursion Giverny et Honfleur depuis Paris convient tres bien aux voyageurs qui veulent une journee a deux rythmes: calme de jardin a Giverny puis atmosphere de port sur la cote normande. L'interet du parcours ne vient pas seulement des etapes, mais du contraste entre elles. La difficulte tient surtout au timing. L'acces au jardin est saisonnier, la meteo sur la cote peut changer rapidement, et la route est assez longue pour que l'ordre des stops compte vraiment. Ce guide aide a choisir le bon rythme tout en gardant une logistique privee et fluide.",
    overviewTitle: "Pourquoi visiter Giverny et Honfleur depuis Paris",
    whyVisitTitle:
      "Pourquoi cette route se distingue d'autres excursions parisiennes",
    whyVisitPoints: [
      "Elle combine deux ambiances tres differentes dans une seule journee: jardin et village d'abord, puis port historique et atmosphere normande ensuite.",
      "Le parcours convient particulierement aux couples, aux voyageurs sensibles a l'art et a ceux qui cherchent du paysage et de la matiere plutot qu'un seul grand monument.",
      "Le transport prive prend ici de la valeur parce que la route melange portion interieure, cote, et retour plus simple quand tout est deja organise.",
    ],
    regionChoiceTitle: "Giverny d'abord ou Honfleur d'abord: comment choisir",
    regionChoiceIntro:
      "L'ordre du parcours change beaucoup la sensation de la journee. Il n'existe pas une seule bonne reponse, mais le programme le plus confortable depend souvent de la saison, de la meteo et de votre priorite principale.",
    regionChoices: [
      {
        title: "Giverny d'abord pour une matinee plus claire et structuree",
        text: "Commencer par Giverny rend souvent la journee plus lisible. Cela convient bien si vous voulez que la partie jardin garde un vrai centre de gravite avant d'ouvrir la cote ensuite.",
      },
      {
        title: "Honfleur d'abord si la cote compte le plus",
        text: "Commencer par Honfleur peut fonctionner si l'ambiance du port, le dejeuner et la partie cote sont le coeur emotionnel de la sortie. Cela demande generalement un peu plus de discipline ensuite.",
      },
      {
        title: "Choisir selon saison et meteo, pas seulement selon la carte",
        text: "Les dates d'ouverture saisonnieres et les regles d'acces peuvent varier a Giverny, tandis que la meteo sur la cote peut changer rapidement. Ces facteurs pesent souvent plus que la distance.",
      },
    ],
    firstStopsTitle: "Jardin de Monet, cote normande et rythme de village",
    firstStopsIntro:
      "La meilleure premiere visite evite generalement de transformer les deux etapes en experiences equivalentes. Le parcours fonctionne mieux quand une etape mene et l'autre complete.",
    firstStops: [
      {
        title: "Giverny comme ancrage visuel",
        text: "Si votre priorite est l'univers de Monet, utilisez Giverny comme point d'ancrage principal. Cela donne de la coherence a la premiere moitie de la journee et laisse Honfleur dans un registre plus atmospherique.",
      },
      {
        title: "Honfleur comme arret plus lent pour dejeuner et port",
        text: "Honfleur se savoure souvent mieux avec un peu de marge pour marcher, s'arreter et regarder le port, plutot qu'en simple passage rapide.",
      },
      {
        title: "Laisser de la marge entre les deux moities du parcours",
        text: "Ce n'est pas une route qui gagne a accumuler trop d'etapes supplementaires. La journee parait generalement plus premium quand le transfert respire.",
      },
    ],
    itineraryTitle: "Itineraire conseille depuis Paris",
    itineraryIntro:
      "Une bonne journee Giverny-Honfleur commence generalement par un depart matinal et par une attente realiste sur le temps a passer sur la cote apres le jardin. La route est assez longue pour que le rythme compte plus que l'ambition.",
    itinerarySteps: [
      "Quittez Paris le matin avec prise en charge, ordre de route et fenetre de retour deja fixes.",
      "Utilisez la premiere moitie de journee pour l'etape principale, soit Giverny, soit Honfleur, plutot que d'essayer d'equilibrer les deux des le debut.",
      "Protegez le milieu de journee pour le dejeuner et une vraie marge de route, surtout si vous voulez que la partie cote reste detendue.",
      "Gardez le retour vers Paris simple et direct plutot que d'ajouter un detour non prevu en fin de journee.",
    ],
    midCta: {
      title: "Vous preparez un transfert prive Giverny-Honfleur depuis Paris ?",
      body: "Gardez la journee simple avec prise en charge a l'hotel, chauffeur prive et retour direct a Paris via le parcours de reservation existant.",
      button: "Planifier mon transfert Giverny",
    },
    visitOptionsTitle:
      "Demi-journee ou journee complete: qu'est-ce qui est realiste",
    visitOptionsIntro:
      "Cette route est plus longue et plus variee qu'une sortie culturelle proche de Paris. En pratique, Giverny et Honfleur se visitent surtout sur une vraie journee complete si vous voulez que les deux etapes aient du sens.",
    halfDayTitle:
      "Une demi-journee Giverny-Honfleur n'est pas realiste depuis Paris",
    halfDayBody:
      "Pour la plupart des voyageurs, une demi-journee ne laisse pas assez de place pour la distance, une etape significative, le dejeuner et un retour confortable. Cela peut seulement convenir a un bloc transport tres limite.",
    fullDayTitle: "La journee complete reste la bonne base pour cette route",
    fullDayBody:
      "Une journee complete laisse assez d'espace pour une etape principale, une seconde etape complementaire, le dejeuner et un retour plus calme a Paris. C'est en general le seul format qui garde une vraie elegance au parcours.",
    chauffeurTitle:
      "Pourquoi un chauffeur prive a du sens pour Giverny et Honfleur",
    chauffeurIntro:
      "Les transports publics peuvent couvrir une partie du parcours, mais ils correspondent rarement a la combinaison de timing, de confort et de souplesse que recherchent les visiteurs. La valeur du chauffeur ici ne tient pas seulement au porte-a-porte. Elle vient de la possibilite de tenir ensemble deux destinations tres differentes dans une longue journee sans dependance aux trains ou au stationnement.",
    chauffeurPoints: [
      "Prise en charge et retour a l'hotel a Paris, sans changements de gare avant ou apres une longue journee regionale.",
      "Route plus lisible entre etape interieure, dejeuner et cote, avec attente integree a la formule.",
      "Option plus confortable pour les couples, familles et petits groupes qui veulent un retour depuis la cote plus simple et moins fatigant.",
    ],
    gettingThereTitle: "Aller de Paris a Giverny et Honfleur",
    gettingThereIntro:
      "La plupart des voyageurs comparent combinaisons de train, voiture autonome ou chauffeur prive. Le bon choix depend de savoir si vous voulez passer la journee a resoudre le transport ou a profiter du parcours.",
    gettingThereOptions: [
      {
        title: "Train puis transferts locaux",
        text: "Possible en partie, mais vite fragmente des qu'il faut melanger train regional, taxis locaux et liaison propre entre un stop interieur et un stop sur la cote dans la meme journee.",
      },
      {
        title: "Conduite autonome",
        text: "Souple en theorie, mais cela transfere sur les voyageurs le poids de la route, du stationnement et des changements de conditions. Cela peut diminuer le plaisir de la sortie.",
      },
      {
        title: "Transfert prive avec chauffeur",
        text: "La meilleure option si vous voulez une prise en charge a l'hotel, une seule logique de route et un retour direct a Paris sans reconstruire la journee autour du transport.",
      },
    ],
    practicalTitle: "Conseils pratiques avant de partir",
    practicalIntro:
      "Ce parcours fonctionne mieux avec des attentes realistes. Giverny a une dimension saisonniere, Honfleur depend des conditions cotieres, et la route est assez longue pour que le rythme compte davantage que la multiplication des etapes.",
    practicalTips: [
      {
        title: "Reservations jardin et musee",
        text: "Verifiez la disponibilite officielle avant la visite et reservez separement toute entree de jardin ou de musee via les canaux officiels. Notre service couvre le transport, pas les billets ni les reservations d'attractions.",
      },
      {
        title: "Acces saisonnier au jardin",
        text: "Les dates d'ouverture saisonnieres et les regles d'acces peuvent varier. Si Giverny est la raison principale de la sortie, confirmez l'information officielle avant de figer la route.",
      },
      {
        title: "Meteo sur la cote",
        text: "La meteo sur la cote peut changer rapidement. Couches, chaussures confortables et attentes souples rendent l'etape Honfleur plus agreable.",
      },
      {
        title: "Moment du dejeuner",
        text: "Protegez le dejeuner au milieu du parcours plutot que d'essayer de l'improviser tard. Le rythme devient alors plus detendu et le retour a Paris plus confortable.",
      },
      {
        title: "Week-ends et jours feries",
        text: "Prevoyez davantage de marge les week-ends et jours feries. Route, stationnement, service en restaurant et entree des attractions peuvent ralentir.",
      },
    ],
    faqTitle: "FAQ transfert Giverny et Honfleur",
    faqItems: [
      {
        question:
          "Giverny et Honfleur sont-ils possibles en une journee depuis Paris ?",
        answer:
          "Oui, mais l'itineraire fonctionne mieux comme excursion journee complete avec un rythme realiste. La route est assez longue pour que vouloir tout faire affaiblisse l'experience.",
      },
      {
        question: "Faut-il visiter Giverny ou Honfleur en premier ?",
        answer:
          "Beaucoup de voyageurs preferent Giverny d'abord pour une matinee plus structuree puis Honfleur pour le dejeuner et l'atmosphere portuaire. Le meilleur ordre peut aussi dependre de la saison, de la meteo et de votre priorite principale.",
      },
      {
        question: "Les billets de jardin ou de musee sont-ils inclus ?",
        answer:
          "Non. Le service couvre uniquement le transport. Les entrees de jardin, musee et attraction doivent etre verifiees et reservees separement via des sources officielles si besoin.",
      },
      {
        question: "Le chauffeur peut-il attendre entre les etapes ?",
        answer:
          "Oui, dans le cadre de la formule reservee. Cela simplifie les deplacements entre Giverny, le dejeuner et Honfleur sans refaire la logistique pendant la journee.",
      },
      {
        question: "Une demi-journee est-elle realiste ?",
        answer:
          "En general non. Depuis Paris, ce parcours a besoin d'une vraie structure journee complete pour rester confortable et utile.",
      },
      {
        question: "A quelle heure faut-il quitter Paris ?",
        answer:
          "Les departs matinaux sont en general les plus fluides parce qu'ils laissent plus de marge si trafic, reservations ou dejeuner prennent plus de temps.",
      },
    ],
    finalCta: {
      title:
        "Vous preferez Giverny et Honfleur sans changements de train ni plan de conduite ?",
      body: "Reservez un transfert prive Paris-Giverny-Honfleur et gardez la journee centree sur le parcours, pas sur la logistique transport.",
      button: "Reserver transfert Giverny",
    },
    sidebar: {
      title: "Options privees Giverny et Honfleur",
      note: "Transport uniquement. Acces jardin, billets de musee, visites guidees, repas et reservations d'attractions non inclus.",
      cards: [
        {
          title: "Giverny & Honfleur Day Trip",
          duration: "10 heures",
          priceLabel: "A partir de 680 EUR",
          description:
            "Ideal pour une route complete et equilibree avec Giverny, Honfleur et retour clair a Paris le meme jour.",
          includes: [
            "Prise en charge et retour a Paris",
            "Transport avec chauffeur prive et attente",
            "Peages, parking et carburant inclus",
          ],
          button: "Reserver day trip",
        },
        {
          title: "Giverny & Honfleur Premium Day",
          duration: "12 heures",
          priceLabel: "A partir de 1 200 EUR",
          description:
            "Ideal pour une route premium plus longue avec davantage de marge entre la partie interieure et la cote.",
          includes: [
            "Prise en charge et retour a Paris",
            "Disponibilite chauffeur plus longue",
            "Peages, parking et carburant inclus",
          ],
          button: "Reserver premium",
        },
      ],
    },
  },
  pt: {
    title: "Giverny & Honfleur",
    distance: "Cerca de 200 km de Paris",
    duration: "10-12 horas",
    navigation: {
      description: "Guia",
      tours: "Opcoes de visita",
      map: "Como chegar",
      events: "Dicas praticas",
      faq: "FAQ",
    },
    intro:
      "Um bate-volta a Giverny e Honfleur saindo de Paris funciona muito bem para quem quer um dia com mudanca de atmosfera ao longo da rota: calma de jardim em Giverny e depois clima de porto na costa da Normandia. O valor do percurso nao esta so nas paradas, mas no contraste entre elas. A dificuldade maior esta no ritmo. O acesso ao jardim e sazonal, o tempo na costa pode mudar rapido, e a estrada e longa o bastante para que a ordem das etapas importe. Este guia ajuda a decidir como organizar a saida com transporte privado e confortavel.",
    overviewTitle: "Por que visitar Giverny e Honfleur saindo de Paris",
    whyVisitTitle:
      "Por que esta rota se sente diferente de outros bate-voltas saindo de Paris",
    whyVisitPoints: [
      "Ela combina duas atmosferas bem distintas num unico dia: jardim e vila primeiro, depois porto historico e clima normando.",
      "Funciona especialmente bem para casais, viajantes com interesse artistico e quem procura paisagem e textura em vez de um unico grande monumento.",
      "O transporte privado pesa bastante aqui porque o dia mistura interior, costa e um retorno que fica bem mais facil quando tudo ja esta organizado.",
    ],
    regionChoiceTitle: "Giverny primeiro ou Honfleur primeiro: como escolher",
    regionChoiceIntro:
      "A ordem da rota muda bastante a sensacao do dia. Nao existe uma unica resposta certa, mas o programa mais confortavel geralmente depende da estacao, do clima e da sua prioridade principal.",
    regionChoices: [
      {
        title: "Giverny primeiro para uma manha mais clara e estruturada",
        text: "Comecar por Giverny costuma deixar o dia mais organizado. Funciona bem se voce quer que a parte do jardim tenha mais foco e a costa abra o ritmo depois.",
      },
      {
        title: "Honfleur primeiro se a costa for o centro emocional do dia",
        text: "Comecar por Honfleur pode funcionar se o porto, o almoco e o clima costeiro importarem mais do que uma chegada cedo ao jardim. Normalmente exige um pouco mais de disciplina depois.",
      },
      {
        title: "Escolha pela estacao e pelo clima, nao so pela distancia",
        text: "Datas sazonais de abertura e regras de acesso podem variar em Giverny, enquanto o tempo na costa pode mudar rapidamente. Esses fatores costumam pesar mais do que o mapa.",
      },
    ],
    firstStopsTitle: "Jardim de Monet, costa da Normandia e ritmo de vila",
    firstStopsIntro:
      "A melhor primeira visita normalmente evita transformar as duas etapas em experiencias profundas no mesmo nivel. A rota funciona melhor quando uma lidera e a outra complementa.",
    firstStops: [
      {
        title: "Giverny como ancora visual",
        text: "Se sua prioridade e o universo de Monet, use Giverny como ancora principal. Isso da coerencia a primeira metade do dia e deixa Honfleur num registro mais atmosferico.",
      },
      {
        title: "Honfleur como parada mais lenta para almoco e porto",
        text: "Honfleur costuma ser melhor aproveitada com alguma margem para caminhar, parar e observar o porto, e nao como simples checklist rapido.",
      },
      {
        title: "Deixe margem entre as duas metades da rota",
        text: "Nao e uma rota que melhora por acumular muitas atracoes extras. O dia costuma parecer mais premium quando o transfer respira.",
      },
    ],
    itineraryTitle: "Itinerario sugerido saindo de Paris",
    itineraryIntro:
      "Um bom dia Giverny-Honfleur normalmente comeca cedo e com expectativa realista sobre quanto tempo voce quer passar na costa depois do jardim. A rota e longa o bastante para que o ritmo conte mais do que a ambicao.",
    itinerarySteps: [
      "Saia de Paris pela manha com busca, ordem da rota e horario de retorno ja claros.",
      "Use a primeira metade do dia para a parada principal, seja Giverny ou Honfleur, em vez de tentar equilibrar as duas desde o inicio.",
      "Proteja o meio do dia para almoco e margem de estrada, especialmente se voce quiser que a parte da costa continue relaxada.",
      "Mantenha o retorno a Paris simples e direto em vez de acrescentar mais um desvio no fim do dia.",
    ],
    midCta: {
      title:
        "Planeja um transfer privado para Giverny e Honfleur saindo de Paris?",
      body: "Mantenha o dia simples com busca no hotel, motorista privado e retorno direto a Paris pelo fluxo atual de booking.",
      button: "Planejar transfer para Giverny",
    },
    visitOptionsTitle: "Meio dia ou dia inteiro: o que e realista",
    visitOptionsIntro:
      "Esta rota e mais longa e mais variada do que uma escapada cultural proxima de Paris. Na pratica, Giverny e Honfleur fazem sentido como excursao de dia inteiro se voce quiser que as duas paradas valham a pena.",
    halfDayTitle: "Meio dia Giverny-Honfleur nao e realista saindo de Paris",
    halfDayBody:
      "Para a maioria dos viajantes, meio dia nao deixa espaco para a distancia, uma parada significativa, almoco e um retorno confortavel. No maximo, serviria como bloco de transporte muito limitado, nao como experiencia completa da rota.",
    fullDayTitle: "O formato de dia inteiro e a base correta para esta rota",
    fullDayBody:
      "Um transfer de dia inteiro deixa espaco para uma parada principal, uma segunda etapa complementar, almoco e uma volta mais calma a Paris. Em geral, e o unico formato que deixa o dia elegante em vez de apressado.",
    chauffeurTitle:
      "Por que um motorista privado faz sentido para Giverny e Honfleur",
    chauffeurIntro:
      "O transporte publico pode cobrir parte da rota, mas raramente acompanha a combinacao de tempo, conforto e flexibilidade que a maioria procura. O valor do motorista aqui nao esta so no porta a porta. Esta em conseguir unir dois destinos bem diferentes numa jornada longa sem depender de trem ou estacionamento.",
    chauffeurPoints: [
      "Busca e retorno ao hotel em Paris, sem trocas de estacao antes ou depois de um dia regional longo.",
      "Rota mais clara entre parada interior, almoco e costa, com espera integrada ao formato da excursao.",
      "Opcao mais confortavel para casais, familias e pequenos grupos que querem um retorno desde a costa mais simples e menos cansativo.",
    ],
    gettingThereTitle: "Como ir de Paris a Giverny e Honfleur",
    gettingThereIntro:
      "A maioria compara combinacoes de trem, carro proprio ou motorista privado. A melhor escolha depende de voce querer passar o dia resolvendo transporte ou aproveitando a rota.",
    gettingThereOptions: [
      {
        title: "Trem e deslocamentos locais",
        text: "Possivel em parte, mas costuma se fragmentar rapido quando voce mistura trem regional, taxis locais e a ligacao entre parada interior e parada costeira no mesmo dia.",
      },
      {
        title: "Dirigir por conta propria",
        text: "Flexivel em teoria, mas transfere para os viajantes o peso da estrada, do estacionamento e das condicoes variaveis. Isso pode reduzir o prazer da saida.",
      },
      {
        title: "Transfer privado com motorista",
        text: "Melhor opcao se voce quer busca no hotel, uma unica logistica de rota e retorno direto a Paris sem reconstruir o dia em torno do transporte.",
      },
    ],
    practicalTitle: "Dicas praticas antes de ir",
    practicalIntro:
      "Esta rota funciona melhor com expectativas realistas. Giverny tem componente sazonal, Honfleur depende das condicoes costeiras, e a estrada e longa o bastante para que o ritmo conte mais do que tentar acrescentar demais.",
    practicalTips: [
      {
        title: "Reservas de jardim e museu",
        text: "Confira a disponibilidade oficial antes de visitar e reserve separadamente qualquer entrada de jardim ou museu em canais oficiais. Nosso servico cobre transporte, nao ingressos ou reservas de atracoes.",
      },
      {
        title: "Acesso sazonal ao jardim",
        text: "Datas sazonais de abertura e regras de acesso podem variar. Se Giverny e a principal razao da saida, confirme a informacao oficial antes de fixar a rota.",
      },
      {
        title: "Clima na costa",
        text: "O tempo na costa pode mudar rapidamente. Camadas, sapatos confortaveis e expectativas flexiveis ajudam a aproveitar melhor Honfleur.",
      },
      {
        title: "Horario do almoco",
        text: "Proteja o almoco no meio da rota em vez de tentar improvisa-lo tarde. Isso deixa o ritmo mais relaxado e a volta a Paris mais confortavel.",
      },
      {
        title: "Fins de semana e feriados",
        text: "Deixe margem extra em fins de semana e feriados. Estrada, estacionamento, servico em restaurante e entrada das atracoes podem ficar mais lentos.",
      },
    ],
    faqTitle: "FAQ transfer Giverny e Honfleur",
    faqItems: [
      {
        question: "Giverny e Honfleur sao possiveis em um dia saindo de Paris?",
        answer:
          "Sim, mas normalmente funciona melhor como excursao de dia inteiro com ritmo realista. A rota e longa o bastante para que tentar fazer demais enfraqueca a experiencia.",
      },
      {
        question: "Devemos visitar Giverny ou Honfleur primeiro?",
        answer:
          "Muitos viajantes preferem Giverny primeiro para uma manha mais estruturada e Honfleur depois para almoco e atmosfera de porto. A melhor ordem tambem pode depender da estacao, do clima e da sua prioridade principal.",
      },
      {
        question: "Os ingressos de jardim ou museu estao incluidos?",
        answer:
          "Nao. O servico cobre apenas transporte. Entradas de jardim, museu e atracoes devem ser verificadas e reservadas separadamente em fontes oficiais quando necessario.",
      },
      {
        question: "O motorista pode esperar entre as paradas?",
        answer:
          "Sim, dentro do formato reservado. Isso facilita circular entre Giverny, almoco e Honfleur sem reorganizar o transporte durante o dia.",
      },
      {
        question: "Meio dia e realista?",
        answer:
          "Normalmente nao. Saindo de Paris, esta rota geralmente precisa de estrutura de dia inteiro para ser confortavel e valer a pena.",
      },
      {
        question: "Que horas devemos sair de Paris?",
        answer:
          "Saidas pela manha costumam ser as mais fluidas porque deixam mais margem se transito, reservas ou almoco demorarem mais do que o esperado.",
      },
    ],
    finalCta: {
      title:
        "Prefere Giverny e Honfleur sem troca de trem nem plano de direcao?",
      body: "Reserve um transfer privado Paris-Giverny-Honfleur e mantenha o foco do dia na rota, nao na logistica de transporte.",
      button: "Reservar transfer para Giverny",
    },
    sidebar: {
      title: "Opcoes privadas para Giverny e Honfleur",
      note: "Apenas transporte. Acesso ao jardim, entradas de museu, visitas guiadas, refeicoes e reservas de atracoes nao estao incluidos.",
      cards: [
        {
          title: "Giverny & Honfleur Day Trip",
          duration: "10 horas",
          priceLabel: "A partir de EUR 680",
          description:
            "Ideal para uma rota completa e equilibrada com Giverny, Honfleur e retorno claro a Paris no mesmo dia.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Transporte com motorista privado e espera",
            "Pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar day trip",
        },
        {
          title: "Giverny & Honfleur Premium Day",
          duration: "12 horas",
          priceLabel: "A partir de EUR 1,200",
          description:
            "Ideal para uma rota premium mais longa com mais margem entre a parada interior e a costa.",
          includes: [
            "Busca e retorno ao hotel em Paris",
            "Disponibilidade estendida do motorista",
            "Pedagios, estacionamento e combustivel incluidos",
          ],
          button: "Reservar premium",
        },
      ],
    },
  },
};

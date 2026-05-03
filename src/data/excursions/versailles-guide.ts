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

interface VersaillesGuideContent {
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

export const versaillesGuideContent: Record<Language, VersaillesGuideContent> =
  {
    en: {
      title: "Palace of Versailles",
      distance: "25 km from Paris",
      duration: "5-8 hours",
      navigation: {
        description: "Guide",
        tours: "Visit Options",
        map: "Getting There",
        events: "Practical Tips",
        faq: "FAQ",
      },
      intro:
        "Versailles is one of the easiest and most rewarding day trips from Paris, but it can also feel overwhelming if you arrive without a plan. The palace, formal gardens, Grand Trianon, Petit Trianon, and Marie Antoinette's Estate all compete for your time. This guide is designed to help you decide how much time you need, what to see first, and when a private chauffeur makes the day noticeably smoother.",
      overviewTitle: "Why visit Versailles from Paris",
      whyVisitTitle:
        "Why Versailles still deserves a full place in your Paris itinerary",
      whyVisitPoints: [
        "It gives first-time visitors a clear contrast to central Paris: royal scale, formal gardens, and wide open space.",
        "The estate is large enough that pacing matters. A rushed visit often means spending more time navigating than enjoying the site.",
        "Versailles works well for couples, families, and small groups because door-to-door transport removes one of the hardest parts of the day.",
      ],
      firstStopsTitle: "What to see first at Versailles",
      firstStopsIntro:
        "If this is your first visit, focus on the core areas before adding extra walking. That usually means starting with the palace interiors and then expanding outward depending on energy, weather, and queues.",
      firstStops: [
        {
          title: "State Apartments and Hall of Mirrors",
          text: "Start with the rooms most visitors come to see. They give the strongest sense of royal ceremony and help anchor the rest of the estate in context.",
        },
        {
          title: "Gardens and main axes",
          text: "Once you leave the palace, take time for the formal garden layout, fountains, and long perspectives toward the Grand Canal. Even a short garden walk changes the scale of the visit.",
        },
        {
          title: "Trianon and Marie Antoinette's Estate",
          text: "Leave these for a full-day plan or for visitors who already know they want a slower, wider exploration beyond the main palace rooms.",
        },
      ],
      itineraryTitle: "Suggested Versailles itinerary from Paris",
      itineraryIntro:
        "A strong Versailles day usually starts with an early departure from Paris. Earlier arrival means calmer entry, easier orientation, and more flexibility once the grounds become busier.",
      itinerarySteps: [
        "Leave Paris in the morning with your pickup already arranged and your route confirmed in advance.",
        "Begin with the palace interiors while energy is high and the visit still feels structured.",
        "Move into the gardens before lunch, then decide whether you want a shorter return or time for the Trianon area.",
        "For a full-day visit, keep the afternoon for the wider estate and return to Paris without needing to rush for a train schedule.",
      ],
      midCta: {
        title: "Planning a private Versailles transfer from Paris?",
        body: "Choose a chauffeur-led day with hotel pickup, waiting time, and a simple return to Paris through the existing booking flow.",
        button: "Plan my Versailles transfer",
      },
      visitOptionsTitle:
        "Half-day or full-day: which Versailles visit makes more sense",
      visitOptionsIntro:
        "The right format depends less on distance and more on how much of the estate you want to enjoy without pressure. Versailles is close to Paris, but it is not a quick photo stop once you factor in entry, walking, and the size of the grounds.",
      halfDayTitle:
        "Half-day works best when you want the palace and a measured garden walk",
      halfDayBody:
        "A half-day format suits travelers with limited time, shorter stays in Paris, or a clear focus on the palace itself. It is also the better fit if you already have lunch or evening plans back in the city. Expect a tighter rhythm, especially in busy periods.",
      fullDayTitle:
        "Full-day is the better choice if you want space, gardens, and the wider estate",
      fullDayBody:
        "A full-day transfer gives you room for the palace, the main garden perspectives, and areas such as the Trianon side of the estate without watching the clock all day. It is usually the more comfortable option for visitors who dislike rushed sightseeing.",
      chauffeurTitle: "Why a private chauffeur makes sense for Versailles",
      chauffeurIntro:
        "Public transport to Versailles is possible, but the real friction often appears before and after the visit: getting from your hotel to the station, managing fatigue after hours of walking, and timing the return around crowds. A private chauffeur helps when convenience is part of the value, not just the ride itself.",
      chauffeurPoints: [
        "Hotel pickup and return in Paris, with no station changes at the start or end of the day.",
        "Waiting time built into the excursion format, so the return remains flexible within the booked option.",
        "A calmer option for families, travelers with limited mobility, and anyone carrying strollers, extra layers, or shopping.",
      ],
      gettingThereTitle: "Getting from Paris to Versailles",
      gettingThereIntro:
        "Most visitors compare train, taxi-app options, or a pre-booked private transfer. The best choice depends on how much you value flexibility, comfort, and a predictable return.",
      gettingThereOptions: [
        {
          title: "Public transport",
          text: "Usually the most economical route, but it requires station logistics, timing, and more walking on both ends of the trip.",
        },
        {
          title: "Taxi or app-based ride",
          text: "Convenient one way, but less predictable if you want a driver to remain coordinated with your visit and return timing.",
        },
        {
          title: "Private chauffeur transfer",
          text: "Best when you want a fixed service structure, hotel pickup, waiting time, and a direct return without transport decisions late in the day.",
        },
      ],
      practicalTitle: "Practical tips before you go",
      practicalIntro:
        "Versailles is easier when expectations are realistic. The estate is big, queues can shape the day, and seasonal programming changes how much time you may want outdoors.",
      practicalTips: [
        {
          title: "Tickets",
          text: "Buy only through official channels and check official availability before visiting. Our service covers transport, not ticket sales.",
        },
        {
          title: "Queues and arrival timing",
          text: "Earlier arrivals usually give a calmer start. Allow extra time during weekends and holidays, when the first part of the visit can feel more crowded and fragmented.",
        },
        {
          title: "Gardens and walking",
          text: "Even visitors focused on interiors should plan for outdoor walking. Comfortable shoes and weather-appropriate layers make a bigger difference here than at many central Paris museums.",
        },
        {
          title: "Fountains and night events",
          text: "If you want musical fountains or evening fountain events, check the official Versailles schedule before you travel. Program dates and access rules can vary.",
        },
      ],
      faqTitle: "Versailles transfer FAQ",
      faqItems: [
        {
          question: "How long does a Versailles trip take from Paris?",
          answer:
            "Travel time is relatively short, but the full outing usually takes half a day or more once pickup, arrival, entry, and walking time are included.",
        },
        {
          question: "Is half-day enough for Versailles?",
          answer:
            "It can be enough if your priority is the palace and a lighter garden visit. Travelers who want the wider estate usually prefer the full-day option.",
        },
        {
          question: "Are tickets included?",
          answer:
            "No. This service is transport only. Check official ticket availability before your visit and book separately.",
        },
        {
          question: "Can the chauffeur wait during the visit?",
          answer:
            "Yes, within the excursion format booked. The half-day option is structured for a shorter visit, while the full-day option allows a longer stay on site.",
        },
        {
          question: "What is the best time to leave Paris?",
          answer:
            "Morning departures are usually the smoothest because they help you arrive before the site feels fully crowded. Allow extra time during weekends, holidays, and peak travel periods.",
        },
      ],
      finalCta: {
        title: "Prefer Versailles without train changes or return-time stress?",
        body: "Reserve a private Paris to Versailles transfer and keep the day focused on the visit instead of the logistics.",
        button: "Book Versailles transfer",
      },
      sidebar: {
        title: "Private Versailles transfer options",
        note: "Transport only. Tickets, guides, and meals are not included.",
        cards: [
          {
            title: "Versailles Half-Day",
            duration: "5 hours",
            priceLabel: "From €320",
            description:
              "Best for palace-focused visits with a shorter return window.",
            includes: [
              "Hotel pickup and return in Paris",
              "Private chauffeur and waiting time",
              "Tolls, parking, and fuel included",
            ],
            button: "Book half-day transfer",
          },
          {
            title: "Versailles Full-Day",
            duration: "8 hours",
            priceLabel: "From €480",
            description:
              "Best for a slower visit including gardens and wider estate time.",
            includes: [
              "Hotel pickup and return in Paris",
              "Longer on-site waiting window",
              "Tolls, parking, and fuel included",
            ],
            button: "Book full-day transfer",
          },
        ],
      },
    },
    es: {
      title: "Palacio de Versalles",
      distance: "25 km desde París",
      duration: "5-8 horas",
      navigation: {
        description: "Guía",
        tours: "Opciones de visita",
        map: "Cómo llegar",
        events: "Consejos prácticos",
        faq: "FAQ",
      },
      intro:
        "Versalles es una de las excursiones de un día más fáciles y gratificantes desde París, pero también puede resultar abrumadora si llegas sin plan. El palacio, los jardines, el Gran Trianón, el Petit Trianón y la finca de María Antonieta compiten por tu tiempo. Esta guía está pensada para ayudarte a decidir cuánto tiempo necesitas, qué ver primero y cuándo un chófer privado hace la jornada mucho más cómoda.",
      overviewTitle: "Por qué visitar Versalles desde París",
      whyVisitTitle:
        "Por qué Versalles merece un lugar real en tu itinerario de París",
      whyVisitPoints: [
        "Ofrece un contraste claro con el París central: escala real, jardines formales y mucho más espacio.",
        "El recinto es grande y el ritmo importa. Una visita improvisada suele perder tiempo en traslados internos y orientación.",
        "Funciona muy bien para parejas, familias y grupos pequeños porque el transporte puerta a puerta simplifica la parte más cansada del día.",
      ],
      firstStopsTitle: "Qué ver primero en Versalles",
      firstStopsIntro:
        "Si es tu primera visita, conviene empezar por las zonas esenciales antes de ampliar el recorrido. Lo más lógico suele ser ver primero el interior del palacio y después decidir cuánto tiempo dedicar al resto del recinto.",
      firstStops: [
        {
          title: "Aposentos de Estado y Galería de los Espejos",
          text: "Son las salas más emblemáticas y el mejor punto de partida para entender la dimensión ceremonial de Versalles.",
        },
        {
          title: "Jardines y ejes principales",
          text: "Al salir del palacio, dedica tiempo a la perspectiva de los jardines, las fuentes y el eje hacia el Gran Canal. Ahí cambia por completo la escala de la visita.",
        },
        {
          title: "Trianón y finca de María Antonieta",
          text: "Encajan mejor en un plan de día completo o para viajeros que quieran explorar con calma más allá del núcleo principal.",
        },
      ],
      itineraryTitle: "Itinerario sugerido desde París",
      itineraryIntro:
        "Un buen día en Versalles suele empezar saliendo temprano de París. Llegar antes ayuda a entrar con más calma, orientarte mejor y conservar margen cuando el recinto se llena.",
      itinerarySteps: [
        "Sal de París por la mañana con recogida ya organizada y trayecto confirmado.",
        "Empieza por el interior del palacio mientras todavía tienes energía y el recorrido es más estructurado.",
        "Pasa a los jardines antes del almuerzo y decide después si prefieres volver pronto o ampliar hacia la zona del Trianón.",
        "Si eliges día completo, deja la tarde para el resto de la finca y vuelve a París sin depender del horario de un tren.",
      ],
      midCta: {
        title: "¿Planeas un traslado privado a Versalles desde París?",
        body: "Reserva un día con chófer, recogida en hotel, tiempo de espera y regreso sencillo a París desde el flujo actual de booking.",
        button: "Planificar traslado a Versalles",
      },
      visitOptionsTitle:
        "Medio día o día completo: qué opción tiene más sentido",
      visitOptionsIntro:
        "La elección depende menos de la distancia y más de cuánto quieres ver sin presión. Versalles está cerca de París, pero no es una parada rápida si sumas entrada, caminatas y tamaño del recinto.",
      halfDayTitle:
        "El medio día funciona mejor si quieres centrarte en el palacio y una parte de los jardines",
      halfDayBody:
        "Es la opción más lógica para estancias cortas, agendas apretadas o viajeros con una prioridad muy clara sobre el interior del palacio. El ritmo será más ajustado, sobre todo en fechas concurridas.",
      fullDayTitle:
        "El día completo encaja mejor si quieres espacio, jardines y la finca con calma",
      fullDayBody:
        "Permite ver el palacio, los jardines principales y zonas como el Trianón sin mirar el reloj todo el tiempo. Suele ser la opción más cómoda para quienes no quieren una visita apresurada.",
      chauffeurTitle: "Por qué un chófer privado tiene sentido para Versalles",
      chauffeurIntro:
        "Llegar en transporte público es posible, pero la fricción real suele aparecer antes y después de la visita: salir del hotel, enlazar estaciones, volver cansado y coordinar el regreso. Un chófer privado aporta valor cuando la comodidad forma parte del día, no solo del trayecto.",
      chauffeurPoints: [
        "Recogida y regreso en hotel en París, sin cambios de estación al inicio o al final.",
        "Tiempo de espera integrado en el formato de excursión, con vuelta flexible dentro de la opción reservada.",
        "Más cómodo para familias, viajeros con movilidad limitada o quienes lleven cochecito, abrigo extra o compras.",
      ],
      gettingThereTitle: "Cómo llegar de París a Versalles",
      gettingThereIntro:
        "La mayoría compara tren, taxi o app, y traslado privado pre-reservado. La mejor opción depende de cuánto valores flexibilidad, comodidad y regreso previsible.",
      gettingThereOptions: [
        {
          title: "Transporte público",
          text: "Suele ser la alternativa más económica, pero exige más logística de estaciones, horarios y caminatas en ambos extremos del trayecto.",
        },
        {
          title: "Taxi o app",
          text: "Cómodo para un trayecto, pero menos previsible si quieres coordinar bien la espera y el regreso tras la visita.",
        },
        {
          title: "Chófer privado",
          text: "La opción más clara si quieres estructura fija, recogida en hotel, tiempo de espera y vuelta directa sin tomar decisiones de transporte al final del día.",
        },
      ],
      practicalTitle: "Consejos prácticos antes de ir",
      practicalIntro:
        "Versalles se disfruta mejor con expectativas realistas. El recinto es grande, las colas pueden marcar el ritmo y la programación de temporada influye en el tiempo que querrás pasar fuera.",
      practicalTips: [
        {
          title: "Entradas",
          text: "Compra solo por canales oficiales y revisa la disponibilidad oficial antes de ir. Nuestro servicio cubre transporte, no venta de entradas.",
        },
        {
          title: "Colas y hora de llegada",
          text: "Llegar temprano suele dar un comienzo más tranquilo. Conviene dejar margen extra en fines de semana y festivos, cuando la primera parte de la visita puede sentirse más fragmentada.",
        },
        {
          title: "Jardines y caminata",
          text: "Incluso si priorizas interiores, conviene contar con bastante recorrido exterior. Calzado cómodo y capas según el clima importan mucho.",
        },
        {
          title: "Fuentes y eventos nocturnos",
          text: "Si te interesan las fuentes musicales o espectáculos nocturnos, revisa antes la programación oficial de Versalles. Fechas y condiciones pueden variar.",
        },
      ],
      faqTitle: "FAQ de traslado a Versalles",
      faqItems: [
        {
          question: "¿Cuánto dura una excursión a Versalles desde París?",
          answer:
            "El trayecto no es largo, pero la salida completa suele ocupar medio día o más si sumas recogida, llegada, entrada y tiempo real de visita.",
        },
        {
          question: "¿Medio día es suficiente para Versalles?",
          answer:
            "Puede bastar si tu prioridad es el palacio y una parte de los jardines. Para explorar mejor la finca, suele encajar más el día completo.",
        },
        {
          question: "¿Las entradas están incluidas?",
          answer:
            "No. Es un servicio solo de transporte. Conviene revisar la disponibilidad oficial y comprar las entradas aparte.",
        },
        {
          question: "¿El chófer puede esperar durante la visita?",
          answer:
            "Sí, dentro del formato reservado. La opción de medio día cubre una visita más corta; la de día completo permite permanecer más tiempo en el recinto.",
        },
        {
          question: "¿Cuál es la mejor hora para salir de París?",
          answer:
            "Las salidas por la mañana suelen funcionar mejor porque ayudan a llegar antes de la parte más concurrida del día. Conviene dejar margen extra en fines de semana, festivos y periodos de alta afluencia.",
        },
      ],
      finalCta: {
        title: "¿Prefieres Versalles sin cambios de tren ni estrés al volver?",
        body: "Reserva un traslado privado París-Versalles y deja que el día gire en torno a la visita, no a la logística.",
        button: "Reservar traslado a Versalles",
      },
      sidebar: {
        title: "Opciones privadas para Versalles",
        note: "Solo transporte. Entradas, guías y comidas no incluidas.",
        cards: [
          {
            title: "Versalles Medio Día",
            duration: "5 horas",
            priceLabel: "Desde €320",
            description:
              "Ideal si quieres priorizar palacio y regreso más corto.",
            includes: [
              "Recogida y regreso en hotel en París",
              "Chófer privado y tiempo de espera",
              "Peajes, parking y combustible incluidos",
            ],
            button: "Reservar medio día",
          },
          {
            title: "Versalles Día Completo",
            duration: "8 horas",
            priceLabel: "Desde €480",
            description:
              "Ideal para una visita más lenta con jardines y finca.",
            includes: [
              "Recogida y regreso en hotel en París",
              "Ventana de espera más amplia",
              "Peajes, parking y combustible incluidos",
            ],
            button: "Reservar día completo",
          },
        ],
      },
    },
    fr: {
      title: "Chateau de Versailles",
      distance: "25 km de Paris",
      duration: "5-8 heures",
      navigation: {
        description: "Guide",
        tours: "Formats de visite",
        map: "Acces",
        events: "Conseils pratiques",
        faq: "FAQ",
      },
      intro:
        "Versailles fait partie des excursions les plus faciles et les plus satisfaisantes depuis Paris, mais la visite peut vite sembler lourde sans organisation. Le chateau, les jardins, le Grand Trianon, le Petit Trianon et le domaine de Marie-Antoinette demandent du temps. Ce guide vous aide a choisir le bon format, a savoir quoi voir en premier et a comprendre quand un chauffeur prive rend la journee beaucoup plus fluide.",
      overviewTitle: "Pourquoi visiter Versailles depuis Paris",
      whyVisitTitle:
        "Pourquoi Versailles merite une vraie place dans un sejour parisien",
      whyVisitPoints: [
        "Le site offre un contraste net avec Paris intra-muros: grandeur royale, jardins formalises et grands volumes ouverts.",
        "Le domaine est vaste. Sans rythme clair, on perd souvent du temps en orientation et en deplacements internes.",
        "C'est une excursion tres adaptee aux couples, familles et petits groupes quand le transport porte-a-porte est deja regle.",
      ],
      firstStopsTitle: "Que voir en premier a Versailles",
      firstStopsIntro:
        "Pour une premiere visite, mieux vaut commencer par le coeur du domaine avant d'elargir. En pratique, cela signifie souvent le chateau d'abord, puis les jardins et enfin les parties plus vastes du domaine si le temps le permet.",
      firstStops: [
        {
          title: "Appartements d'Etat et Galerie des Glaces",
          text: "C'est le meilleur point d'entree pour comprendre la mise en scene du pouvoir royal et donner un cadre au reste de la visite.",
        },
        {
          title: "Jardins et grands axes",
          text: "Les perspectives, les bassins et le Grand Canal changent l'echelle de la visite. Meme une promenade partielle vaut le temps consacre.",
        },
        {
          title: "Trianon et domaine de Marie-Antoinette",
          text: "A privilegier surtout sur un format journee complete ou pour les visiteurs qui veulent explorer plus loin que le chateau principal.",
        },
      ],
      itineraryTitle: "Itineraire conseille depuis Paris",
      itineraryIntro:
        "Une bonne journee a Versailles commence generalement par un depart matinal depuis Paris. Arriver plus tot aide a entrer plus calmement et laisse davantage de souplesse ensuite.",
      itinerarySteps: [
        "Quittez Paris le matin avec une prise en charge deja organisee et un trajet confirme.",
        "Commencez par les interieurs du chateau pendant que la visite reste plus lisible et que l'energie est encore haute.",
        "Passez aux jardins avant le dejeuner puis decidez si vous gardez un rythme court ou si vous etendez la visite vers le Trianon.",
        "Avec une journee complete, vous pouvez consacrer l'apres-midi au domaine sans courir apres un horaire de train.",
      ],
      midCta: {
        title: "Vous preparez un transfert prive Paris-Versailles ?",
        body: "Choisissez une excursion avec chauffeur, prise en charge a l'hotel, attente sur place et retour simple a Paris via le parcours de reservation existant.",
        button: "Planifier mon transfert",
      },
      visitOptionsTitle:
        "Demi-journee ou journee complete: quel format choisir",
      visitOptionsIntro:
        "Le bon choix depend moins de la distance que du niveau de confort souhaite sur place. Versailles est proche de Paris, mais la visite prend du temps une fois l'entree, la marche et l'etendue du domaine prises en compte.",
      halfDayTitle:
        "La demi-journee convient mieux si vous ciblez surtout le chateau",
      halfDayBody:
        "C'est le format le plus pratique pour les sejours courts, les agendas serres ou les visiteurs qui veulent privilegier les interieurs avec un retour plus rapide vers Paris.",
      fullDayTitle:
        "La journee complete convient mieux si vous voulez prendre votre temps",
      fullDayBody:
        "Elle laisse plus de place pour les jardins, le domaine du Trianon et une visite plus sereine. C'est souvent le meilleur choix pour eviter la sensation de course.",
      chauffeurTitle:
        "Pourquoi un chauffeur prive est pertinent pour Versailles",
      chauffeurIntro:
        "Le train reste une option, mais la difficulte se situe souvent dans le debut et la fin de journee: quitter l'hotel, gerer les correspondances, revenir fatigue et synchroniser le retour. Le chauffeur prive simplifie surtout ces moments-la.",
      chauffeurPoints: [
        "Prise en charge et retour a l'hotel a Paris, sans logistique de gare.",
        "Temps d'attente integre a l'excursion, pour garder de la souplesse sur le retour dans le cadre reserve.",
        "Solution plus confortable pour les familles, les visiteurs avec mobilite reduite ou les voyageurs charges.",
      ],
      gettingThereTitle: "Comment aller de Paris a Versailles",
      gettingThereIntro:
        "Les visiteurs hesitent generalement entre train, taxi/app et transfert prive reserve a l'avance. Le bon choix depend de votre niveau d'exigence sur la souplesse et le confort.",
      gettingThereOptions: [
        {
          title: "Transports publics",
          text: "Souvent l'option la plus economique, mais elle implique davantage de logistique de gares, d'horaires et de marche.",
        },
        {
          title: "Taxi ou application",
          text: "Pratique sur le papier, mais moins structure si vous voulez coordonner clairement l'attente et le retour.",
        },
        {
          title: "Transfert prive avec chauffeur",
          text: "Le plus simple si vous voulez une prise en charge a l'hotel, un service previsible et un retour direct sans nouvelle decision transport.",
        },
      ],
      practicalTitle: "Conseils pratiques avant la visite",
      practicalIntro:
        "Versailles se visite mieux avec des attentes realistes. Le domaine est grand, les files peuvent compter et les programmes saisonniers changent l'interet des jardins.",
      practicalTips: [
        {
          title: "Billets",
          text: "Verifiez la disponibilite officielle avant la visite et achetez uniquement via les canaux officiels. Notre prestation concerne le transport uniquement.",
        },
        {
          title: "Files et heure d'arrivee",
          text: "Un depart plus tot depuis Paris donne en general un debut de visite plus simple. Prevoyez davantage de marge les week-ends et jours feries, quand l'arrivee peut etre plus chargee.",
        },
        {
          title: "Jardins et marche",
          text: "Meme si vous visez surtout le chateau, prevoyez une vraie part de marche en exterieur. Chaussures confortables et tenue adaptee font une difference reelle.",
        },
        {
          title: "Fontaines et soirees",
          text: "Si vous visez les fontaines musicales ou les evenements du soir, consultez le programme officiel de Versailles avant le deplacement.",
        },
      ],
      faqTitle: "FAQ transfert Versailles",
      faqItems: [
        {
          question:
            "Combien de temps faut-il pour une sortie a Versailles depuis Paris ?",
          answer:
            "Le trajet reste court, mais la sortie complete prend generalement une demi-journee ou plus avec la prise en charge, l'entree et le temps reel sur place.",
        },
        {
          question: "Une demi-journee suffit-elle ?",
          answer:
            "Oui si votre priorite est le chateau avec un passage plus leger dans les jardins. Pour le domaine plus large, la journee complete est plus confortable.",
        },
        {
          question: "Les billets sont-ils inclus ?",
          answer:
            "Non. Le service couvre le transport uniquement. Les billets doivent etre verifies et reserves separement via les canaux officiels.",
        },
        {
          question: "Le chauffeur peut-il attendre pendant la visite ?",
          answer:
            "Oui, dans le cadre de la formule reservee. La demi-journee couvre une visite plus courte, la journee complete laisse davantage de temps sur place.",
        },
        {
          question: "Quel est le meilleur moment pour partir de Paris ?",
          answer:
            "Les departs matinaux sont en general les plus confortables. Prevoyez davantage de marge les week-ends, jours feries et periodes de forte affluence.",
        },
      ],
      finalCta: {
        title:
          "Vous preferez Versailles sans changements de train ni stress au retour ?",
        body: "Reservez un transfert prive Paris-Versailles et gardez votre energie pour la visite, pas pour la logistique.",
        button: "Reserver transfert Versailles",
      },
      sidebar: {
        title: "Options privees Versailles",
        note: "Transport uniquement. Billets, guide et repas non inclus.",
        cards: [
          {
            title: "Versailles Demi-Journee",
            duration: "5 heures",
            priceLabel: "A partir de 320 EUR",
            description:
              "Ideal pour une visite centree sur le chateau avec retour plus rapide.",
            includes: [
              "Prise en charge et retour a Paris",
              "Chauffeur prive et attente sur place",
              "Peages, parking et carburant inclus",
            ],
            button: "Reserver demi-journee",
          },
          {
            title: "Versailles Journee Complete",
            duration: "8 heures",
            priceLabel: "A partir de 480 EUR",
            description:
              "Ideal pour visiter jardins et domaine avec un rythme plus calme.",
            includes: [
              "Prise en charge et retour a Paris",
              "Fenetre d'attente plus longue",
              "Peages, parking et carburant inclus",
            ],
            button: "Reserver journee complete",
          },
        ],
      },
    },
    pt: {
      title: "Palacio de Versalhes",
      distance: "25 km de Paris",
      duration: "5-8 horas",
      navigation: {
        description: "Guia",
        tours: "Opcoes de visita",
        map: "Como chegar",
        events: "Dicas praticas",
        faq: "FAQ",
      },
      intro:
        "Versalhes e uma das melhores escapadas de um dia saindo de Paris, mas a visita pode ficar cansativa sem um plano claro. Palacio, jardins, Grand Trianon, Petit Trianon e a propriedade de Maria Antonieta pedem tempo. Este guia ajuda voce a decidir quanto tempo reservar, o que ver primeiro e quando um motorista privado torna o dia muito mais simples.",
      overviewTitle: "Por que visitar Versalhes saindo de Paris",
      whyVisitTitle:
        "Por que Versalhes merece espaco real no seu roteiro de Paris",
      whyVisitPoints: [
        "O contraste com Paris central e imediato: escala real, jardins formais e muito mais espaco aberto.",
        "O dominio e grande. Sem ritmo definido, voce perde tempo com orientacao e deslocamentos internos.",
        "Funciona muito bem para casais, familias e pequenos grupos quando o transporte porta a porta ja esta resolvido.",
      ],
      firstStopsTitle: "O que ver primeiro em Versalhes",
      firstStopsIntro:
        "Na primeira visita, vale comecar pelo essencial antes de ampliar o percurso. Em geral, isso significa palacio primeiro, depois jardins e por fim as areas mais amplas, se houver tempo.",
      firstStops: [
        {
          title: "Apartamentos de Estado e Galeria dos Espelhos",
          text: "Sao os espacos mais iconicos e o melhor ponto de partida para entender o cerimonial e a escala do complexo.",
        },
        {
          title: "Jardins e eixos principais",
          text: "As perspectivas, fontes e o eixo do Grande Canal mudam totalmente a sensacao de escala da visita.",
        },
        {
          title: "Trianon e propriedade de Maria Antonieta",
          text: "Fazem mais sentido num formato de dia inteiro ou para quem quer explorar alem do palacio principal com calma.",
        },
      ],
      itineraryTitle: "Itinerario sugerido saindo de Paris",
      itineraryIntro:
        "Um bom dia em Versalhes normalmente comeca com saida matinal de Paris. Chegar mais cedo ajuda a entrar com mais calma e deixa mais margem para o restante da visita.",
      itinerarySteps: [
        "Saia de Paris pela manha com busca ja organizada e trajeto confirmado.",
        "Comece pelos interiores do palacio enquanto a visita ainda esta mais estruturada e sua energia esta alta.",
        "Passe aos jardins antes do almoco e depois decida se quer retorno mais cedo ou mais tempo na area do Trianon.",
        "Num dia inteiro, deixe a tarde para o restante da propriedade e volte a Paris sem depender de horario de trem.",
      ],
      midCta: {
        title: "Planeja um transfer privado para Versalhes saindo de Paris?",
        body: "Escolha um dia com motorista, busca no hotel, tempo de espera e retorno simples para Paris pelo fluxo atual de booking.",
        button: "Planejar transfer para Versalhes",
      },
      visitOptionsTitle: "Meio dia ou dia inteiro: qual opcao faz mais sentido",
      visitOptionsIntro:
        "A escolha depende menos da distancia e mais do nivel de conforto que voce quer na visita. Versalhes e perto de Paris, mas nao e uma parada rapida quando se somam entrada, caminhada e tamanho do complexo.",
      halfDayTitle: "Meio dia funciona melhor para quem quer foco no palacio",
      halfDayBody:
        "E a opcao mais pratica para estadias curtas, agenda apertada ou visitantes que querem ver o principal e voltar a Paris mais cedo.",
      fullDayTitle:
        "Dia inteiro faz mais sentido para jardins e visita mais tranquila",
      fullDayBody:
        "Da espaco para palacio, jardins e areas do Trianon sem olhar para o relogio o tempo todo. Costuma ser a melhor escolha para evitar sensacao de correria.",
      chauffeurTitle: "Por que um motorista privado faz sentido para Versalhes",
      chauffeurIntro:
        "Ir de transporte publico e possivel, mas o desgaste normalmente aparece no comeco e no fim do dia: sair do hotel, lidar com estacoes, voltar cansado e sincronizar o retorno. O motorista privado simplifica exatamente esses momentos.",
      chauffeurPoints: [
        "Busca e retorno ao hotel em Paris, sem logistica de estacao.",
        "Tempo de espera incluido no formato da excursao, mantendo flexibilidade no retorno dentro da opcao reservada.",
        "Mais conforto para familias, visitantes com mobilidade reduzida ou quem leva carrinho, casacos extras ou compras.",
      ],
      gettingThereTitle: "Como ir de Paris a Versalhes",
      gettingThereIntro:
        "A maioria compara trem, taxi ou aplicativo e transfer privado reservado. A melhor escolha depende do quanto voce valoriza previsibilidade e conforto.",
      gettingThereOptions: [
        {
          title: "Transporte publico",
          text: "Geralmente e a opcao mais economica, mas exige mais logistica de estacoes, horarios e caminhada.",
        },
        {
          title: "Taxi ou aplicativo",
          text: "Pratico para um deslocamento, mas menos estruturado quando voce quer coordenar espera e retorno com clareza.",
        },
        {
          title: "Transfer privado com motorista",
          text: "A melhor opcao quando voce quer busca no hotel, servico previsivel e retorno direto sem novas decisoes de transporte.",
        },
      ],
      practicalTitle: "Dicas praticas antes da visita",
      practicalIntro:
        "Versalhes fica melhor com expectativas realistas. O dominio e grande, as filas podem influenciar bastante e a programacao sazonal muda o valor do tempo nos jardins.",
      practicalTips: [
        {
          title: "Ingressos",
          text: "Compre apenas por canais oficiais e confirme disponibilidade oficial antes da visita. Nosso servico cobre transporte, nao venda de ingressos.",
        },
        {
          title: "Filas e horario de chegada",
          text: "Chegar mais cedo costuma deixar o inicio do dia mais leve. Vale prever margem extra em fins de semana e feriados, quando a chegada pode ficar mais carregada.",
        },
        {
          title: "Jardins e caminhada",
          text: "Mesmo que o foco seja o interior do palacio, conte com boa parte do dia a pe em area externa. Sapatos confortaveis ajudam muito.",
        },
        {
          title: "Fontes e eventos noturnos",
          text: "Se quiser ver fontes musicais ou eventos noturnos, confira a programacao oficial de Versalhes antes da viagem.",
        },
      ],
      faqTitle: "FAQ transfer Versalhes",
      faqItems: [
        {
          question: "Quanto tempo leva um passeio a Versalhes saindo de Paris?",
          answer:
            "O deslocamento nao e longo, mas a saida completa costuma ocupar meio dia ou mais quando se somam busca, entrada e tempo real de visita.",
        },
        {
          question: "Meio dia e suficiente para Versalhes?",
          answer:
            "Pode ser suficiente para foco no palacio e uma parte dos jardins. Para ver a propriedade com mais calma, o dia inteiro costuma ser melhor.",
        },
        {
          question: "Os ingressos estao incluidos?",
          answer:
            "Nao. O servico e apenas de transporte. Ingressos devem ser verificados e comprados separadamente nos canais oficiais.",
        },
        {
          question: "O motorista pode esperar durante a visita?",
          answer:
            "Sim, dentro do formato reservado. A opcao de meio dia cobre uma visita mais curta; a de dia inteiro permite permanencia maior no local.",
        },
        {
          question: "Qual e o melhor horario para sair de Paris?",
          answer:
            "Saidas pela manha costumam ser as mais confortaveis. Vale prever margem extra em fins de semana, feriados e periodos de maior movimento.",
        },
      ],
      finalCta: {
        title: "Prefere Versalhes sem troca de trem nem estresse no retorno?",
        body: "Reserve um transfer privado Paris-Versalhes e deixe sua energia para a visita, nao para a logistica.",
        button: "Reservar transfer para Versalhes",
      },
      sidebar: {
        title: "Opcoes privadas para Versalhes",
        note: "Apenas transporte. Ingressos, guias e refeicoes nao incluidos.",
        cards: [
          {
            title: "Versalhes Meio Dia",
            duration: "5 horas",
            priceLabel: "A partir de EUR 320",
            description:
              "Melhor para visita focada no palacio com retorno mais cedo.",
            includes: [
              "Busca e retorno ao hotel em Paris",
              "Motorista privado e tempo de espera",
              "Pedagios, estacionamento e combustivel incluidos",
            ],
            button: "Reservar meio dia",
          },
          {
            title: "Versalhes Dia Inteiro",
            duration: "8 horas",
            priceLabel: "A partir de EUR 480",
            description:
              "Melhor para jardins e visita mais tranquila da propriedade.",
            includes: [
              "Busca e retorno ao hotel em Paris",
              "Janela de espera mais longa",
              "Pedagios, estacionamento e combustivel incluidos",
            ],
            button: "Reservar dia inteiro",
          },
        ],
      },
    },
  };

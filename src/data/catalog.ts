import { destinations, featuredTours } from "./homepage";
import { experiences } from "@/features/catalog/search";
import { includesAccommodation } from "@/features/catalog/accommodation";
import type {
  Attraction,
  CountrySlug,
  Destination,
  Experience,
  ExperienceSlug,
  Media,
  Tour,
  TourSummary,
} from "@/features/catalog/types";

// Read-only development content. These concepts are not confirmed AMAJO departures.
export const media = {
  rwanda: {
    src: "/images/rwanda-hills.jpg",
    alt: "Cultivated hills in Rwanda",
    caption: "Rwandan countryside · regional illustration",
  },
  uganda: {
    src: "/images/bwindi-gorilla.jpg",
    alt: "Mountain gorilla in Bwindi, Uganda",
    caption: "Bwindi, Uganda · Gabriel Schumacher",
  },
  kenya: {
    src: "/images/kenya-elephants.jpg",
    alt: "Elephants at a watering hole in Tsavo, Kenya",
    caption: "Tsavo, Kenya · Evans Dims",
  },
  mara: {
    src: "/images/mara-landscape.jpg",
    alt: "Open landscape in the Maasai Mara, Kenya",
    caption: "Maasai Mara, Kenya · Saad Khan",
  },
  sunrise: {
    src: "/images/mara-sunrise.jpg",
    alt: "Sunrise over the Maasai Mara",
    caption: "Maasai Mara, Kenya · Udara Karunarathna",
  },
  falls: {
    src: "/images/murchison-falls.jpg",
    alt: "A rainbow over Murchison Falls on the Nile in Uganda",
    caption: "Murchison Falls, Uganda · Jonathan Göhner",
  },
  kivu: {
    src: "/images/lake-kivu.jpg",
    alt: "Birds resting on a branch above Lake Kivu, Rwanda",
    caption: "Lake Kivu, Rwanda · Michael Muli",
  },
  akagera: {
    src: "/images/akagera.jpg",
    alt: "Woodland, hills and a lake in Akagera National Park",
    caption: "Akagera, Rwanda · Andrew Molo",
  },
  kigali: {
    src: "/images/kigali.jpg",
    alt: "The rooftops of Nyamirambo in Kigali",
    caption: "Kigali, Rwanda · Protais Benjamin MUGENZI",
  },
  nairobi: {
    src: "/images/nairobi.jpg",
    alt: "Nairobi skyline and the KICC tower",
    caption: "Nairobi, Kenya · Kenny Murgor",
  },
  kibale: {
    src: "/images/kibale.jpg",
    alt: "A chimpanzee resting in Kibale forest",
    caption: "Kibale, Uganda · 2H Media",
  },
  lions: {
    src: "/images/ishasha-lions.jpg",
    alt: "Lions resting in a tree in Ishasha",
    caption: "Queen Elizabeth National Park, Uganda · Ivan Sabayuki",
  },
  coast: {
    src: "/images/diani-beach.jpg",
    alt: "The shore and palms at Diani Beach in Kenya",
    caption: "Diani Beach, Kenya · Andrew Molo",
  },
  jinja: {
    src: "/images/jinja-nile.jpg",
    alt: "The source-of-the-Nile sign beside the river at Jinja",
    caption: "Jinja, Uganda · Dror Feitelson",
    sourceHref:
      "https://commons.wikimedia.org/wiki/File:Jinja_source_of_Nile.jpg",
    license: {
      name: "CC BY-SA 3.0 · resized/cropped",
      href: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
  nyungwe: {
    src: "/images/nyungwe-forest.jpg",
    alt: "Layers of trees in Nyungwe rainforest in Rwanda",
    caption: "Nyungwe, Rwanda · Brian Harries",
    sourceHref:
      "https://commons.wikimedia.org/wiki/File:Nyungwe_Forest_NP_20150928-DSCF4880.jpg",
    license: {
      name: "CC BY 2.0 · resized/cropped",
      href: "https://creativecommons.org/licenses/by/2.0/",
    },
  },
} satisfies Record<string, Media>;

function attractionGallery(country: CountrySlug, slug: string): Media[] {
  const specific: Record<string, Media> = {
    "rwanda/akagera": media.akagera,
    "rwanda/kigali": media.kigali,
    "rwanda/lake-kivu": media.kivu,
    "rwanda/nyungwe": media.nyungwe,
    "uganda/bwindi": media.uganda,
    "uganda/murchison-falls": media.falls,
    "uganda/queen-elizabeth": media.lions,
    "uganda/kibale": media.kibale,
    "uganda/jinja": media.jinja,
    "kenya/maasai-mara": media.mara,
    "kenya/tsavo": media.kenya,
    "kenya/nairobi": media.nairobi,
    "kenya/kenyan-coast": media.coast,
  };
  const first =
    specific[`${country}/${slug}`] ??
    (country === "uganda" ? media.falls : media[country]);
  const second =
    country === "rwanda"
      ? media.kivu
      : country === "uganda"
        ? media.kibale
        : media.sunrise;
  return [first, ...(first.src !== second.src ? [second] : [media[country]])];
}

const sources = {
  rwanda: {
    title: "Visit Rwanda destination guide",
    href: "https://visitrwanda.com/tourism/destinations/",
  },
  uganda: {
    title: "Uganda Wildlife Authority parks",
    href: "https://ugandawildlife.org/national-parks/",
  },
  kenya: {
    title: "Kenya Wildlife Service parks",
    href: "https://kws.go.ke/parks/",
  },
};
const countryContent: Record<
  CountrySlug,
  Pick<Destination, "headline" | "story" | "experiences">
> = {
  rwanda: {
    headline: "A thousand hills. A deeper connection.",
    story: [
      "Rwanda invites you to look a little closer. Follow the folds of its cultivated hills, spend time with the creative energy of Kigali and find a quieter pace beside Lake Kivu.",
      "The landscapes change as you travel: volcanic highlands, Nyungwe’s forest and Akagera’s lakes and savanna. Build a journey around a few places, with time to understand what makes each one distinct.",
    ],
    experiences: [
      "gorilla-trekking",
      "adventure-hiking",
      "cultural-experiences",
      "wildlife-safaris",
    ],
  },
  uganda: {
    headline: "Forests, flowing water & a sense of wonder.",
    story: [
      "Uganda’s story unfolds between forest and water. Bwindi’s tangled green slopes offer a different world from the open landscapes of Queen Elizabeth and the Nile at Murchison Falls.",
      "Leave room between the highlights. Long journeys can be part of the experience, with small towns, changing landscapes and opportunities to travel at a gentler rhythm.",
    ],
    experiences: [
      "gorilla-trekking",
      "wildlife-safaris",
      "adventure-hiking",
      "cultural-experiences",
    ],
  },
  kenya: {
    headline: "Wide horizons. Extraordinary possibilities.",
    story: [
      "Kenya is a country of contrasts: the open grasslands of the Maasai Mara, the elephants of Amboseli and Tsavo, the creative pulse of Nairobi and the Indian Ocean coast.",
      "Choose a small collection of places and give them time. A safari morning and a coastal afternoon belong to very different rhythms; a thoughtful route makes space for both.",
    ],
    experiences: [
      "wildlife-safaris",
      "luxury-experiences",
      "family-group-travel",
      "cultural-experiences",
    ],
  },
};
export const catalogDestinations: Destination[] = destinations.map(
  (destination) => ({
    ...destination,
    ...countryContent[destination.slug],
    practical: [
      {
        title: "A route with room to breathe",
        text: "Allow time for transfers and unhurried stops. Exact driving times depend on the route and current conditions.",
      },
      {
        title: "Entry & park access",
        text: "Check current entry requirements and park arrangements with the relevant authorities before making travel commitments. No permit or entry fee is included in this development preview.",
      },
      {
        title: "Travel thoughtfully",
        text: "Follow local guides, ask before photographing people and keep wildlife encounters at the distance required by park staff.",
      },
    ],
    seasons: [
      {
        title: "Drier periods",
        text: "Discuss the conditions for your particular route. Drier weather can make some trails easier, but rain and changing access remain possible.",
      },
      {
        title: "Greener periods",
        text: "Rain brings a different character to the landscape. Keep plans flexible and confirm which activities and access routes suit your dates.",
      },
      {
        title: "Your own travel window",
        text: "Seasonal patterns vary by region and year. Wildlife sightings and weather are never guaranteed; confirm local advice close to departure.",
      },
    ],
    faqs: [
      {
        question: `How much time should I spend in ${destination.name}?`,
        answer:
          "Choose the places that matter most to you, then leave room for transfers and rest. The sample journeys below illustrate different paces; a final itinerary needs individual planning.",
      },
      {
        question: "Are the journeys on this website available to book?",
        answer:
          "These are clearly labelled development concepts, not confirmed departures. Multi-day tours include accommodation; specific properties, prices, permits and availability remain to be confirmed. No booking or quote request is submitted here.",
      },
      {
        question: "Can I combine countries?",
        answer:
          "The sample catalog includes cross-country concepts. Any real combination requires checking transport, border requirements and sufficient transfer time.",
      },
    ],
    sources: [sources[destination.slug]],
  }),
);

type AttractionSeed = [
  CountrySlug,
  string,
  string,
  string,
  string,
  string[],
  string[],
];
const attractionSeeds: AttractionSeed[] = [
  [
    "rwanda",
    "volcanoes",
    "Volcanoes National Park",
    "Northern Rwanda · Virunga highlands",
    "Volcanic slopes and mountain forest define this corner of northern Rwanda. Gorilla tracking is a central draw, alongside guided exploration of the highland landscape.",
    ["Mountain forest", "Virunga landscape"],
    ["Gorilla tracking, subject to permits", "Guided highland walks"],
  ],
  [
    "rwanda",
    "akagera",
    "Akagera National Park",
    "Eastern Rwanda",
    "Akagera brings together savanna, woodland, wetland and lakes. Its open landscapes offer a change of scene from Rwanda’s forested highlands.",
    ["Savanna and woodland", "Lakes and wetland habitats"],
    ["Guided wildlife drives", "Birdwatching"],
  ],
  [
    "rwanda",
    "nyungwe",
    "Nyungwe National Park",
    "Southwestern Rwanda",
    "Nyungwe’s mountain rainforest is a world of layered green, birdsong and forest trails. Its canopy walkway and primate experiences offer different perspectives on the forest.",
    ["Mountain rainforest", "Canopy perspectives"],
    [
      "Guided forest walks",
      "Canopy walkway, subject to access",
      "Primate tracking, subject to arrangements",
    ],
  ],
  [
    "rwanda",
    "lake-kivu",
    "Lake Kivu",
    "Western Rwanda · Rift Valley",
    "Islands and inlets shape Lake Kivu’s shoreline. The lakeside towns offer a place to pause between forest and highland journeys, with walking and cycling possibilities along the shore.",
    ["Rift Valley shoreline", "Lakeside towns"],
    ["Lakeside walks", "Guided cycling", "Kayaking with a local operator"],
  ],
  [
    "rwanda",
    "kigali",
    "Kigali",
    "Central Rwanda",
    "Rwanda’s capital provides an introduction to the country’s contemporary life. Make time for art, food and a considered exploration of the city’s history.",
    ["Creative city life", "History and culture"],
    ["Art and gallery visits", "Guided city exploration"],
  ],
  [
    "uganda",
    "bwindi",
    "Bwindi Impenetrable National Park",
    "Southwestern Uganda",
    "Bwindi’s dense forest is a habitat for mountain gorillas and a rich variety of forest life. A visit asks for patience, curiosity and respect for the environment and nearby communities.",
    ["Mountain gorilla habitat", "Layered forest landscapes"],
    [
      "Gorilla tracking, subject to permits",
      "Guided birdwatching",
      "Forest walks where permitted",
    ],
  ],
  [
    "uganda",
    "murchison-falls",
    "Murchison Falls National Park",
    "Northwestern Uganda · Victoria Nile",
    "The Nile shapes the landscapes of Murchison Falls. River journeys and wildlife drives bring two different perspectives on this national park.",
    ["The Nile and the falls", "River and savanna habitats"],
    [
      "Boat excursions with authorized operators",
      "Guided wildlife drives",
      "Falls viewpoints where accessible",
    ],
  ],
  [
    "uganda",
    "queen-elizabeth",
    "Queen Elizabeth National Park",
    "Western Uganda",
    "Queen Elizabeth combines open landscapes, lakes and the Kazinga Channel. Its varied habitats invite an itinerary that balances time on the water with wildlife exploration on land.",
    ["Kazinga Channel", "A mosaic of habitats"],
    ["Guided wildlife drives", "Channel boat excursions", "Birdwatching"],
  ],
  [
    "uganda",
    "kibale",
    "Kibale National Park",
    "Western Uganda · near Fort Portal",
    "Kibale’s forest is associated with chimpanzee tracking and other primate encounters. A guided walk offers a chance to notice the smaller details of the forest as well as its larger inhabitants.",
    ["Primate-rich forest", "Guided forest encounters"],
    ["Chimpanzee tracking, subject to permits", "Forest birdwatching"],
  ],
  [
    "uganda",
    "jinja",
    "Jinja",
    "Eastern Uganda · Nile region",
    "Jinja brings a water-focused chapter to a Uganda journey. Explore the Nile region at a pace and activity level suited to your group, with arrangements made through qualified local operators.",
    ["Nile scenery", "Outdoor adventure"],
    [
      "River excursions",
      "Guided local exploration",
      "Rafting with specialist operators",
    ],
  ],
  [
    "kenya",
    "maasai-mara",
    "Maasai Mara",
    "Southwestern Kenya",
    "Open grasslands and broad horizons define the Mara. Spend time observing the landscape rather than chasing a checklist; wildlife encounters depend on the day and the season.",
    ["Open grasslands", "Savanna wildlife"],
    ["Guided wildlife drives", "Landscape photography"],
  ],
  [
    "kenya",
    "amboseli",
    "Amboseli National Park",
    "Southern Kenya",
    "Amboseli is known for its elephants and expansive landscapes. Its wetlands and open ground create a distinctive setting for a carefully paced wildlife journey.",
    ["Elephant encounters", "Wetland and open landscapes"],
    ["Guided wildlife drives", "Birdwatching", "Landscape photography"],
  ],
  [
    "kenya",
    "tsavo",
    "Tsavo National Park",
    "Southeastern Kenya · East and West parks",
    "Tsavo East and Tsavo West form distinct parts of a vast safari landscape. Build in time to explore a particular area rather than treating the parks as a quick stop on the way to the coast.",
    ["Two distinct national parks", "Large-scale wilderness landscapes"],
    ["Guided wildlife drives", "Birdwatching", "Landscape photography"],
  ],
  [
    "kenya",
    "nairobi",
    "Nairobi",
    "Southern Kenya · capital city",
    "Kenya’s capital combines city culture with access to Nairobi National Park. A considered city stay can connect food, art and wildlife interests without rushing straight into a longer safari.",
    ["City culture", "Nearby national park"],
    [
      "Guided city exploration",
      "Art and food experiences",
      "Nairobi National Park wildlife drives",
    ],
  ],
  [
    "kenya",
    "kenyan-coast",
    "Kenyan Coast",
    "Eastern Kenya · Indian Ocean",
    "Kenya’s Indian Ocean coastline adds another rhythm to a journey. Coastal towns, beach time and marine landscapes can form a quieter chapter after a safari.",
    ["Indian Ocean shoreline", "Coastal and marine landscapes"],
    [
      "Coastal walks",
      "Marine park visits where arranged",
      "Locally guided cultural exploration",
    ],
  ],
];
export const attractionKey = (a: Pick<Attraction, "country" | "slug">) =>
  `${a.country}/${a.slug}`;
export const catalogAttractions: Attraction[] = attractionSeeds.map(
  ([country, slug, name, location, introduction, special, activities]) => ({
    country,
    slug,
    name,
    location,
    introduction,
    description: `Make ${name} a considered part of a wider journey. Give the landscape time, plan activities with local expertise and balance exploration with space to rest. The ideas here are an introduction to the place, rather than a confirmed AMAJO service or an activity reservation.`,
    special,
    activities,
    guidance: [
      "Confirm opening arrangements, permits and activity eligibility directly before travel.",
      "Use authorized guides and operators; follow the on-site briefing and wildlife rules.",
      "Allow flexible time for weather and transfers. Activity duration, access and sightings cannot be promised.",
    ],
    gallery: attractionGallery(country, slug),
    faqs: [
      {
        question: `How can I include ${name} in a journey?`,
        answer:
          "Explore the related development concepts below, then use the quote link to carry the place into the upcoming planning form. No travel arrangements are made by this preview.",
      },
      {
        question: "Are permits, access and activities guaranteed?",
        answer:
          "No. Arrangements, eligibility, access and current fees must be checked with the relevant authority or operator. Nothing on this page reserves a place.",
      },
    ],
    source:
      country === "uganda" && slug === "jinja"
        ? {
            title: "Explore Uganda activities",
            href: "https://exploreuganda.com/",
          }
        : sources[country],
  }),
);

const experienceDescriptions: Record<ExperienceSlug, string> = {
  "wildlife-safaris":
    "Slow mornings, open horizons and the quiet anticipation of discovering wildlife in its own landscape.",
  "gorilla-trekking":
    "Forest journeys shaped around respectful encounters, local guidance and carefully arranged permits.",
  "cultural-experiences":
    "Time for creative cities, living traditions and conversations that deepen a sense of place.",
  "adventure-hiking":
    "Follow trails through changing landscapes, with a pace chosen for your interests and abilities.",
  "luxury-experiences":
    "Space, a considered pace and thoughtful accommodation preferences, tailored to an individual journey.",
  "family-group-travel":
    "Shared discoveries, flexible days and room for different ages and interests to travel together.",
};
export const catalogExperiences: Experience[] = experiences.map((e, index) => ({
  ...e,
  description: experienceDescriptions[e.slug],
  image: [
    media.mara,
    media.uganda,
    media.rwanda,
    media.rwanda,
    media.sunrise,
    media.kenya,
  ][index],
}));

type TourSeed = {
  summary: TourSummary;
  stops: string[];
  experiences: ExperienceSlug[];
  tier: Tour["budgetTier"];
};
function summary(
  slug: string,
  title: string,
  countries: CountrySlug[],
  durationDays: number,
  experience: ExperienceSlug,
  overview: string,
): TourSummary {
  return {
    slug,
    title,
    countries,
    durationDays,
    experience,
    overview,
    image: media[countries[0]].src,
    imageAlt: media[countries[0]].alt,
    contentSource: "development-fixture",
  };
}
const tourSeeds: TourSeed[] = [
  {
    summary: featuredTours[0],
    stops: ["rwanda/kigali", "rwanda/nyungwe", "rwanda/lake-kivu"],
    experiences: ["adventure-hiking", "cultural-experiences"],
    tier: "mid-range",
  },
  {
    summary: featuredTours[1],
    stops: ["uganda/kibale", "uganda/queen-elizabeth", "uganda/bwindi"],
    experiences: ["gorilla-trekking", "wildlife-safaris"],
    tier: "luxury",
  },
  {
    summary: featuredTours[2],
    stops: ["kenya/nairobi", "kenya/maasai-mara"],
    experiences: ["wildlife-safaris", "family-group-travel"],
    tier: "mid-range",
  },
  {
    summary: summary(
      "kigali-and-kivu",
      "City Light & Lakeside Days",
      ["rwanda"],
      4,
      "cultural-experiences",
      "Kigali’s creative pulse and a quieter chapter on Lake Kivu.",
    ),
    stops: ["rwanda/kigali", "rwanda/lake-kivu"],
    experiences: ["cultural-experiences", "family-group-travel"],
    tier: "budget",
  },
  {
    summary: summary(
      "rwanda-forest-and-savanna",
      "Forest, Volcanoes & Savanna",
      ["rwanda"],
      9,
      "gorilla-trekking",
      "An imagined passage between Volcanoes, Nyungwe and Akagera.",
    ),
    stops: [
      "rwanda/kigali",
      "rwanda/volcanoes",
      "rwanda/nyungwe",
      "rwanda/akagera",
    ],
    experiences: ["gorilla-trekking", "wildlife-safaris", "luxury-experiences"],
    tier: "luxury",
  },
  {
    summary: summary(
      "jinja-river-days",
      "A Little Time by the Nile",
      ["uganda"],
      3,
      "adventure-hiking",
      "A short concept built around Jinja, river scenery and outdoor exploration.",
    ),
    stops: ["uganda/jinja"],
    experiences: ["adventure-hiking", "family-group-travel"],
    tier: "budget",
  },
  {
    summary: summary(
      "uganda-river-and-forest",
      "The Nile & the Forest",
      ["uganda"],
      10,
      "wildlife-safaris",
      "Murchison’s river landscapes, Kibale’s forest and time in Queen Elizabeth.",
    ),
    stops: [
      "uganda/murchison-falls",
      "uganda/kibale",
      "uganda/queen-elizabeth",
    ],
    experiences: ["wildlife-safaris", "adventure-hiking"],
    tier: "mid-range",
  },
  {
    summary: summary(
      "kenya-savanna-and-sea",
      "Savanna to the Sea",
      ["kenya"],
      12,
      "family-group-travel",
      "A family-paced concept linking Nairobi, Amboseli, Tsavo and the coast.",
    ),
    stops: [
      "kenya/nairobi",
      "kenya/amboseli",
      "kenya/tsavo",
      "kenya/kenyan-coast",
    ],
    experiences: [
      "family-group-travel",
      "wildlife-safaris",
      "luxury-experiences",
    ],
    tier: "luxury",
  },
  {
    summary: summary(
      "east-africa-slow-journey",
      "Three Countries, One Slow Journey",
      ["rwanda", "uganda", "kenya"],
      16,
      "cultural-experiences",
      "A cross-country concept connecting Rwanda’s hills, Uganda’s forest and Kenya’s savanna.",
    ),
    stops: [
      "rwanda/kigali",
      "rwanda/lake-kivu",
      "uganda/bwindi",
      "kenya/nairobi",
      "kenya/maasai-mara",
    ],
    experiences: [
      "cultural-experiences",
      "gorilla-trekking",
      "wildlife-safaris",
      "luxury-experiences",
    ],
    tier: "luxury",
  },
];
export const catalogTours: Tour[] = tourSeeds.map(
  ({ summary: s, stops, experiences: themes, tier }, index) => {
    const places = stops.map((key) => {
      const attraction = catalogAttractions.find(
        (a) => attractionKey(a) === key,
      );
      if (!attraction)
        throw new Error("Invalid development attraction relationship");
      return attraction;
    });
    const cover =
      s.slug === "kigali-and-kivu"
        ? media.kivu
        : s.slug === "rwanda-forest-and-savanna"
          ? media.akagera
          : s.slug === "jinja-river-days"
            ? media.jinja
            : s.slug === "uganda-river-and-forest"
              ? media.falls
              : (Object.values(media).find((m) => m.src === s.image) ??
                media[s.countries[0]]);
    const gallery = Array.from(
      new Map(
        [cover, ...places.flatMap((p) => p.gallery)].map((m) => [m.src, m]),
      ).values(),
    );
    return {
      ...s,
      image: cover.src,
      imageAlt: cover.alt,
      coverMedia: cover,
      id: `concept-${s.slug}`,
      experiences: themes,
      attractionKeys: stops,
      budgetTier: tier,
      createdAt: `2026-10-${String(index + 1).padStart(2, "0")}T00:00:00Z`,
      story: `${s.overview} Explore how these places might fit together, with room for local discovery and a considered pace. ${includesAccommodation(s.durationDays) ? "Accommodation is included for the overnight stays on this multi-day tour." : "This day tour does not require an overnight stay."} Specific properties, transport, permits and departure availability are confirmed during planning; this sample itinerary does not make a reservation.`,
      highlights: places.map((p) => `${p.name} · ${p.special[0]}`),
      gallery,
      itinerary: Array.from({ length: s.durationDays }, (_, dayIndex) => {
        const placeIndex = Math.min(
          places.length - 1,
          Math.floor((dayIndex * places.length) / s.durationDays),
        );
        const place = places[placeIndex];
        const previous =
          dayIndex === 0
            ? undefined
            : Math.floor(((dayIndex - 1) * places.length) / s.durationDays);
        const transition = previous !== undefined && previous !== placeIndex;
        const last = dayIndex === s.durationDays - 1;
        return {
          day: dayIndex + 1,
          title:
            dayIndex === 0
              ? `Arrive & settle into ${place.name}`
              : last
                ? `A final morning around ${place.name}`
                : transition
                  ? `Journey towards ${place.name}`
                  : `Discover ${place.name} at your own pace`,
          description:
            dayIndex === 0
              ? "Begin with time to arrive, settle in and discuss the route. The starting point and arrival transfer remain to be confirmed for this concept."
              : transition
                ? `Allow this day for travel towards ${place.name}, with rest stops and a flexible arrival. The exact connection, border arrangements where relevant, and transfer time require individual planning.`
                : last
                  ? "Leave a little room for reflection before your onward journey. Departure logistics depend on confirmed transport and your next destination."
                  : `${place.introduction} Choose a small number of activities with your guide and leave room for weather, rest and unexpected discoveries.`,
          activities: transition
            ? [
                "Flexible transfer and rest stops",
                "Arrival orientation, if time allows",
              ]
            : last
              ? ["An unhurried morning", "Onward travel, to be arranged"]
              : [...place.activities],
          attractionKey: attractionKey(place),
          image: place.gallery[0],
          accommodation: last
            ? "Departure day; your included overnight stays are scheduled on the preceding days."
            : `Included overnight accommodation in the ${place.name} region. The specific property and room type will be confirmed in your tailored quote.`,
          meals: undefined,
        };
      }),
      inclusions: [
        "Proposed daily planning outline",
        "Suggested destinations and activity themes",
        ...(includesAccommodation(s.durationDays)
          ? ["Accommodation for all overnight stays on this multi-day tour"]
          : []),
      ],
      exclusions: [
        "Flights and transfers are not reserved",
        "Park fees, permits and activities are not included",
        "Meals, insurance and personal expenses are not included",
      ],
      accommodation: `${includesAccommodation(s.durationDays) ? "Accommodation is included for every overnight stay on this multi-day tour." : "This day tour does not include an overnight stay."} ${tier === "luxury" ? "Spacious, thoughtfully chosen stays" : tier === "budget" ? "Simple, locally focused stays" : "Comfortable, characterful stays"} guide the accommodation style. Specific lodges or hotels, room categories and rates will be confirmed in your tailored quote; no property has been reserved by this preview.`,
      difficulty: themes.includes("gorilla-trekking")
        ? "Variable · forest trekking can be demanding"
        : themes.includes("adventure-hiking")
          ? "Variable · adapt walks to your abilities"
          : "Flexible pace · activity demands vary",
      recommendations: [
        "Build in rest and transfer time between regions.",
        "Confirm access, activity eligibility and park arrangements with the appropriate operator.",
        "Choose a pace that suits everyone travelling.",
      ],
      packing: [
        "Comfortable footwear suited to the planned activities",
        "Layers and rain protection for changing conditions",
        "A reusable water bottle and sun protection",
        "Camera or binoculars, if useful to you",
      ],
      notes: [
        "Development concept only; operation and availability are unconfirmed.",
        "Wildlife sightings and weather are never guaranteed.",
        "Cross-country connections and border requirements require confirmation where applicable.",
      ],
      faqs: [
        {
          question: "Is accommodation included?",
          answer: includesAccommodation(s.durationDays)
            ? "Yes. All tours lasting more than one day include accommodation for the scheduled overnight stays. The specific properties and room types will be confirmed in your tailored quote."
            : "This is a day tour with no overnight stay scheduled.",
        },
        {
          question: "Is this a confirmed AMAJO departure?",
          answer:
            "No. This is development content for exploring the website. There is no confirmed departure, starting price, permit allocation or accommodation booking.",
        },
        {
          question: "Can the itinerary be adapted?",
          answer:
            "The concept illustrates a possible sequence and pace. A real itinerary would need to be tailored and checked by the planning team before it could be offered.",
        },
        {
          question: "What happens when I select Request a Quote?",
          answer:
            "The link carries this concept’s identifier to the clearly labelled Phase 4 planning preview. It does not submit an inquiry or reserve travel.",
        },
      ],
    };
  },
);

import { media } from "./catalog";
import type {
  AboutContent,
  BusinessPolicy,
  ContactInformation,
  Service,
} from "@/features/content/types";
import type {
  CountrySlug,
  ExperienceSlug,
  FAQ,
} from "@/features/catalog/types";

const allCountries: CountrySlug[] = ["rwanda", "uganda", "kenya"];
export const planningProcess = [
  {
    title: "Start with your curiosity",
    description:
      "Choose the places, experiences and little details that matter to you.",
  },
  {
    title: "Shape the route",
    description:
      "Balance travel time, time outdoors and unhurried moments along the way.",
  },
  {
    title: "Agree the details",
    description:
      "Review the proposed itinerary, accommodation, costs and conditions before any arrangements are confirmed.",
  },
];
type ServiceSeed = Pick<
  Service,
  "slug" | "name" | "introduction" | "overview" | "image" | "gallery"
> & {
  countries?: CountrySlug[];
  experiences?: ExperienceSlug[];
  highlights: [string, string][];
};
const seeds: ServiceSeed[] = [
  {
    slug: "wildlife-safari-planning",
    name: "Wildlife Safari Planning",
    introduction:
      "Wide horizons. Wildlife on its own terms. A safari with room to linger.",
    overview:
      "Build a journey around the landscapes that draw you in, from Rwanda’s Akagera to Uganda’s savannas and Kenya’s open plains. Game drives, time between parks and quieter pauses belong in the same conversation.",
    image: media.kenya,
    gallery: [media.mara, media.lions, media.akagera],
    experiences: ["wildlife-safaris"],
    highlights: [
      [
        "A considered route",
        "Connect the parks you love without making every day a transfer.",
      ],
      [
        "Time to observe",
        "Share your photography interests and preferred pace.",
      ],
      [
        "Your kind of comfort",
        "Discuss travel style and overnight preferences together.",
      ],
    ],
  },
  {
    slug: "gorilla-and-primate-trekking",
    name: "Gorilla and Primate Trekking",
    introduction:
      "Forest paths, patient observation and encounters that stay with you.",
    overview:
      "Explore primate-focused journey ideas in Rwanda and Uganda. A thoughtful plan leaves space for the forest, the approach and time to rest. Activity eligibility, permits and availability must be checked before confirmation.",
    countries: ["rwanda", "uganda"],
    image: media.uganda,
    gallery: [media.kibale, media.nyungwe, media.uganda],
    experiences: ["gorilla-trekking"],
    highlights: [
      [
        "Forest combinations",
        "Consider gorilla and chimpanzee interests in one route.",
      ],
      [
        "A manageable rhythm",
        "Describe your preferred walking pace when planning.",
      ],
      [
        "Clear arrangements",
        "Confirm the specific activity and permit conditions before committing.",
      ],
    ],
  },
  {
    slug: "cultural-experiences",
    name: "Cultural Experiences",
    introduction:
      "Meet a place through its everyday rhythms, food and stories.",
    overview:
      "Bring culture into your journey through city walks, local food and considered visits. Share what you would like to learn, leaving space for respectful conversation and the preferences of the people you meet.",
    image: media.kigali,
    gallery: [media.nairobi, media.rwanda, media.kigali],
    experiences: ["cultural-experiences"],
    highlights: [
      [
        "Follow your interests",
        "Architecture, food and everyday life can shape your route.",
      ],
      [
        "Make time for cities",
        "Give Kigali or Nairobi a place in the journey.",
      ],
      [
        "Respectful encounters",
        "Ask permission before photographs and follow local guidance.",
      ],
    ],
  },
  {
    slug: "adventure-and-hiking",
    name: "Adventure and Hiking",
    introduction:
      "For the paths worth taking slowly, and the views worth the climb.",
    overview:
      "Combine forest walks, scenic landscapes and active days with time to recover. Discuss terrain, experience and practical requirements before choosing any guided activity.",
    image: media.falls,
    gallery: [media.nyungwe, media.jinja, media.falls],
    experiences: ["adventure-hiking"],
    highlights: [
      ["An honest pace", "Choose activity levels that suit your group."],
      ["Room to recover", "Alternate active days with quieter stays."],
      [
        "Conditions checked",
        "Routes and activities depend on local access and confirmed arrangements.",
      ],
    ],
  },
  {
    slug: "luxury-travel",
    name: "Luxury Travel",
    introduction:
      "A little more space. A slower morning. Comfort that belongs to the setting.",
    overview:
      "Express what luxury means to you: privacy, beautiful surroundings, a restful room or a more spacious rhythm. Specific accommodation and transport options are proposed and confirmed individually.",
    image: media.coast,
    gallery: [media.kivu, media.sunrise, media.coast],
    experiences: ["luxury-experiences"],
    highlights: [
      [
        "Personal priorities",
        "Tell us which comforts make the greatest difference.",
      ],
      [
        "Thoughtful stays",
        "Discuss room style, setting and desired amenities.",
      ],
      [
        "Clear inclusions",
        "Review the proposed services and costs before confirmation.",
      ],
    ],
  },
  {
    slug: "family-and-group-travel",
    name: "Family and Group Travel",
    introduction:
      "Different generations. Shared discoveries. Time together, thoughtfully planned.",
    overview:
      "Create a journey around the people travelling with you. Consider group size, ages, activity eligibility and downtime together, without collecting children’s names or personal documents in your initial inquiry.",
    image: media.akagera,
    gallery: [media.kenya, media.kivu, media.akagera],
    experiences: ["family-group-travel"],
    highlights: [
      ["A shared rhythm", "Balance different interests and energy levels."],
      [
        "Room preferences",
        "Discuss family rooms or connected stays where available.",
      ],
      [
        "Suitable activities",
        "Check age and participation requirements before plans are confirmed.",
      ],
    ],
  },
  {
    slug: "corporate-retreats",
    name: "Corporate Retreats",
    introduction:
      "Step away from the everyday. Make room for a different conversation.",
    overview:
      "Explore an East African setting for time together as a team. Define your group’s priorities, desired balance of work and leisure, and practical space requirements. Venues and facilities require individual confirmation.",
    image: media.kivu,
    gallery: [media.kigali, media.nairobi, media.kivu],
    highlights: [
      [
        "Purpose first",
        "Start with what the group hopes to get from its time away.",
      ],
      [
        "Space requirements",
        "Describe meeting needs, room arrangements and group size.",
      ],
      [
        "A balanced schedule",
        "Leave breathing room between sessions and shared experiences.",
      ],
    ],
  },
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    introduction:
      "A considered beginning and a comfortable end to your journey.",
    overview:
      "Include airport-to-stay transport in your itinerary planning. Share arrival and departure windows, party size and luggage needs. Vehicle, meeting point and costs are agreed as part of the confirmed arrangements.",
    image: media.nairobi,
    gallery: [media.kigali, media.nairobi],
    highlights: [
      [
        "Join the dots",
        "Consider arrival, accommodation and onward travel together.",
      ],
      [
        "Group requirements",
        "Discuss passenger and luggage capacity in advance.",
      ],
      [
        "Confirmed instructions",
        "Meeting details are agreed before travel; this page is not a transfer booking.",
      ],
    ],
  },
  {
    slug: "accommodation-arrangements",
    name: "Accommodation Arrangements",
    introduction:
      "Somewhere to pause, settle in and feel part of the landscape.",
    overview:
      "All AMAJO tours longer than one day include accommodation for scheduled overnight stays. Tell us about your preferred setting, room arrangements and comfort level. Specific properties, room types, rates and availability are confirmed in your tailored quote.",
    image: media.sunrise,
    gallery: [media.kivu, media.coast, media.sunrise],
    highlights: [
      [
        "Included overnight stays",
        "Accommodation is included on every tour longer than one day.",
      ],
      [
        "Your preferences",
        "Choose the atmosphere and comfort that feel right for you.",
      ],
      [
        "Properties confirmed later",
        "Landscape photographs are setting inspiration, not promised or reserved lodges.",
      ],
    ],
  },
  {
    slug: "custom-itinerary-planning",
    name: "Custom Itinerary Planning",
    introduction:
      "Begin with a feeling. Build a journey that feels like yours.",
    overview:
      "Start with a country, a particular experience or simply a little curiosity. Bring together places, travel time and overnight stays in a route shaped around your priorities. Development journey concepts are a starting point for discussion.",
    image: media.rwanda,
    gallery: [media.mara, media.uganda, media.rwanda],
    highlights: [
      ["Across borders", "Explore Rwanda, Uganda, Kenya or a combination."],
      [
        "An individual rhythm",
        "Make room for your interests rather than filling every hour.",
      ],
      [
        "One clear outline",
        "Review route, inclusions and conditions together before committing.",
      ],
    ],
  },
];
export const services: Service[] = seeds.map((seed, i) => ({
  ...seed,
  countries: seed.countries ?? allCountries,
  experiences: seed.experiences ?? [],
  category: i < 6 ? "experiences" : "journey-details",
  contentSource: "development-fixture",
  benefits: seed.highlights.map(([title, description]) => ({
    title,
    description,
  })),
  process: planningProcess,
  faqs: [
    {
      question: "Can this be part of a longer journey?",
      answer:
        "Yes. Use this service as a starting preference when exploring a tailored itinerary across the relevant destinations. The final route and arrangements require confirmation.",
    },
    {
      question: "Is accommodation included?",
      answer:
        "All tours longer than one day include accommodation for scheduled overnight stays. Specific properties and room types are confirmed in the tailored quote. A standalone service does not automatically add overnight accommodation.",
    },
    {
      question: "Can I book this online?",
      answer:
        "Online booking and inquiry delivery are not available in this development website. You can explore the planning form, but no request or reservation is created.",
    },
  ],
}));

export const aboutContent: AboutContent = {
  introduction:
    "AMAJO — Essence of Africa is an invitation to discover Rwanda, Uganda and Kenya with curiosity, care and a sense of wonder.",
  story: {
    key: "story",
    title: "A journey begins with a connection.",
    paragraphs: [
      "Our story begins with a simple idea: the most memorable journeys leave room to feel a place. A forest in the morning. A conversation over food. The quiet before the plains wake up.",
      "Essence of Africa expresses that intention. The journeys imagined here bring landscapes, cultures and time together, with your own interests at the centre.",
    ],
  },
  mission: {
    key: "mission",
    title: "Make space for meaningful discovery.",
    paragraphs: [
      "Our purpose is to shape thoughtful East African travel around the people taking the journey and the places they hope to understand.",
    ],
  },
  vision: {
    key: "vision",
    title: "Travel that deepens connection.",
    paragraphs: [
      "We imagine journeys remembered for more than a checklist: time well spent, new perspectives and a lasting appreciation of East Africa.",
    ],
  },
  philosophy: [
    {
      key: "pace",
      title: "Less rushing. More noticing.",
      paragraphs: [
        "We value a route that gives each place time, with breathing room between its highlights.",
      ],
    },
    {
      key: "respect",
      title: "Curiosity, with respect.",
      paragraphs: [
        "Our travel philosophy starts with listening, respecting local guidance and observing wildlife without demanding an encounter.",
      ],
    },
    {
      key: "personal",
      title: "Your journey, your rhythm.",
      paragraphs: [
        "Different interests, ages and comfort preferences belong in the same planning conversation.",
      ],
    },
  ],
  team: [], // Verified biographies and portraits only. No identities copied from Stitch.
};
export const contactInformation: ContactInformation = { verified: true }; // No business contacts approved yet.
export const contactFAQs: FAQ[] = [
  {
    question: "Where can I travel with AMAJO?",
    answer:
      "The website covers Rwanda, Uganda and Kenya. You can choose one country or explore a combination in the quote planning form.",
  },
  {
    question: "Can I send an inquiry now?",
    answer:
      "Sending is not available yet. The contact and quote interfaces let you check your details, but do not store or deliver messages. Verified contact channels will be published when approved.",
  },
  {
    question: "Does a multi-day tour include accommodation?",
    answer:
      "Yes. Every tour longer than one day includes accommodation for scheduled overnight stays. Properties and room types are agreed in the tailored quote.",
  },
  {
    question: "Do I need to choose a tour first?",
    answer:
      "No. Start with your destinations and interests, or choose the option to ask for route recommendations. Journey concepts are inspiration rather than confirmed departures.",
  },
];
export const policies: BusinessPolicy[] = [
  {
    slug: "privacy",
    title: "Privacy",
    description:
      "How the inquiry interfaces currently handle the details you enter.",
    status: "draft",
    sections: [
      {
        key: "current",
        title: "What happens in this version",
        paragraphs: [
          "The planning and contact forms keep entered details in the current page’s memory while you use them. Sending is disabled. These interfaces do not save an inquiry or deliver a message. Reloading or leaving the page clears the form; ordinary browser autofill is controlled by your browser.",
        ],
      },
      {
        key: "care",
        title: "Only share what is needed",
        paragraphs: [
          "Do not enter passport numbers, payment information, medical records or children’s names into these forms. Initial travel planning needs only general preferences and contact details.",
        ],
      },
    ],
    reviewTopics: [
      "Business identity and privacy contact",
      "Legal basis, consent and processing purposes",
      "Hosting and service providers, transfers and retention",
      "Individual rights, cookies and release-specific disclosures",
    ],
  },
  {
    slug: "terms",
    title: "Travel terms",
    description:
      "The boundary between journey inspiration and confirmed travel arrangements.",
    status: "draft",
    sections: [
      {
        key: "concepts",
        title: "Explore before confirming",
        paragraphs: [
          "The catalog contains development journey concepts. Exploring a page or completing the planning interface does not create a booking, agreed itinerary or reservation.",
        ],
      },
      {
        key: "stays",
        title: "Accommodation on multi-day tours",
        paragraphs: [
          "All tours longer than one day include accommodation for scheduled overnight stays. Specific properties, room types, costs, availability and the final inclusions must be confirmed in the tailored quote.",
        ],
      },
    ],
    reviewTopics: [
      "Contracting business and applicable terms",
      "Quotes, payment and booking acceptance",
      "Changes, cancellation and refunds",
      "Supplier conditions, responsibilities and dispute process",
    ],
  },
  {
    slug: "permit-policy",
    title: "Permit planning",
    description:
      "A place for the business-approved activity and permit conditions.",
    status: "draft",
    sections: [
      {
        key: "availability",
        title: "No permit is reserved here",
        paragraphs: [
          "This development website does not procure permits or confirm activity access. A journey concept or selected preference is not proof of a permit or a guaranteed wildlife encounter.",
        ],
      },
      {
        key: "confirmation",
        title: "Confirm activity-specific conditions",
        paragraphs: [
          "The final proposal must identify any activity permits and the conditions that apply before arrangements are accepted. No fee, allocation, refund entitlement or eligibility guarantee is published here.",
        ],
      },
    ],
    reviewTopics: [
      "Authority and supplier conditions for each activity",
      "Eligibility, availability and procurement process",
      "Payment, changes and cancellation conditions",
      "Approved source links and review responsibilities",
    ],
  },
];

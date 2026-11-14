import type { Platform } from "@/common/types";

export type CreatorProfileIdentity = {
  id?: string;
  name?: string;
  handle?: string;
  city?: string;
  avatar?: string;
  match?: number;
  fee?: string;
  feeNote?: string;
  counter?: boolean;
  engagement?: number;
  views?: string;
  audience?: string;
  platforms?: Array<[Platform, string]>;
};

export type CreatorProfileDetails = Required<Omit<CreatorProfileIdentity, "id" | "platforms">> & {
  id: string;
  platforms: Array<[Platform, string]>;
  bio: string;
  niches: string[];
  category: string;
  rating: string;
  reviewCount: number;
  memberSince: string;
  responseTime: string;
  lastDelivery: string;
  languages: string;
  onTime: string;
};

type CreatorPreset = Omit<CreatorProfileDetails, "id">;

const presets: Record<string, CreatorPreset> = {
  diya: { name: "Diya Kapoor", handle: "@diyaglows", city: "Mumbai", avatar: "meera-iyer", match: 94, fee: "Counter offer ₹15,000", feeNote: "₹2,500 above your ₹12,500 fee", counter: true, engagement: 5.8, views: "64K", audience: "81%", platforms: [["Instagram", "1.2 L"], ["YouTube", "18K"], ["Pinterest", "9.4K"], ["Snapchat", "6.2K"]], bio: "Skincare and festive-makeup creator. Honest routines for Indian skin, filmed at home in natural light.", niches: ["Skincare", "Festive looks", "GRWM", "Budget beauty"], category: "Skincare & festive make-up", rating: "4.8", reviewCount: 23, memberSince: "Mar 2025", responseTime: "2 hours", lastDelivery: "22 Oct 2026", languages: "Hindi, English, Marathi", onTime: "96%" },
  shruti: { name: "Shruti Nair", handle: "@shrutiskin", city: "Kochi", avatar: "ishita-rao", match: 93, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 6.4, views: "41K", audience: "79%", platforms: [["Instagram", "86K"], ["YouTube", "12K"]], bio: "Dry-skin routines and ingredient-first product reviews with a practical, friendly approach.", niches: ["Dry skin", "Ingredients", "Reels", "Honest reviews"], category: "Dry-skin routines", rating: "4.9", reviewCount: 18, memberSince: "Jul 2025", responseTime: "3 hours", lastDelivery: "18 Oct 2026", languages: "Malayalam, English, Hindi", onTime: "98%" },
  aditi: { name: "Aditi Joshi", handle: "@aditiglow", city: "Pune", avatar: "kavya-reddy", match: 92, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 7.1, views: "33K", audience: "83%", platforms: [["Instagram", "64K"], ["Pinterest", "15K"]], bio: "Glow-focused skincare creator known for before-and-after routines and clear product education.", niches: ["Skincare", "Before & after", "Glow", "Tutorials"], category: "Glow & skincare", rating: "4.8", reviewCount: 16, memberSince: "Nov 2025", responseTime: "1 hour", lastDelivery: "27 Oct 2026", languages: "Marathi, Hindi, English", onTime: "97%" },
  prachi: { name: "Prachi Das", handle: "@prachidas", city: "Kolkata", avatar: "tara-bose", match: 91, fee: "Counter offer ₹22,000", feeNote: "₹9,500 above your ₹12,500 fee", counter: true, engagement: 4.9, views: "88K", audience: "72%", platforms: [["YouTube", "2.1 L"], ["Instagram", "40K"]], bio: "Festive beauty storyteller making polished, long-form YouTube reviews and GRWM videos.", niches: ["YouTube", "Festive beauty", "GRWM", "Reviews"], category: "Festive beauty & YouTube", rating: "4.7", reviewCount: 31, memberSince: "Feb 2025", responseTime: "5 hours", lastDelivery: "20 Oct 2026", languages: "Bengali, Hindi, English", onTime: "94%" },
  kritika: { name: "Kritika Sharma", handle: "@kritikaskincare", city: "Delhi", avatar: "meera-iyer", match: 89, fee: "Counter offer ₹18,000", feeNote: "₹5,500 above your ₹12,500 fee", counter: true, engagement: 4.6, views: "72K", audience: "76%", platforms: [["Instagram", "1.6 L"], ["YouTube", "30K"], ["Snapchat", "18K"]], bio: "Ingredient-first skincare creator with detailed routines for sensitive skin and Delhi NCR audiences.", niches: ["Ingredients", "Sensitive skin", "Carousels", "Reels"], category: "Ingredient-first skincare", rating: "4.8", reviewCount: 27, memberSince: "Jan 2025", responseTime: "4 hours", lastDelivery: "24 Oct 2026", languages: "Hindi, English", onTime: "95%" },
  neha: { name: "Neha Gupta", handle: "@nehagupta.reviews", city: "Bengaluru", avatar: "ishita-rao", match: 87, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 5.9, views: "47K", audience: "74%", platforms: [["Instagram", "92K"], ["YouTube", "9K"]], bio: "Practical skincare reviews for young professionals, with concise comparisons and routines.", niches: ["Reviews", "Professional skincare", "Comparisons", "Reels"], category: "Practical skincare reviews", rating: "4.7", reviewCount: 14, memberSince: "Sep 2025", responseTime: "3 hours", lastDelivery: "16 Oct 2026", languages: "Kannada, Hindi, English", onTime: "96%" },
  ritu: { name: "Ritu Chawla", handle: "@rituchawla", city: "Delhi", avatar: "kavya-reddy", match: 86, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 6.9, views: "24K", audience: "80%", platforms: [["Instagram", "1.1 L"], ["Pinterest", "9K"]], bio: "Small but loyal beauty community, focused on clear routines that drive product discovery.", niches: ["Beauty", "Product discovery", "Skincare", "Pinterest"], category: "Beauty & product discovery", rating: "4.9", reviewCount: 19, memberSince: "May 2025", responseTime: "2 hours", lastDelivery: "29 Oct 2026", languages: "Hindi, English", onTime: "99%" },
  lavanya: { name: "Lavanya Iyer", handle: "@lavanyaiyer", city: "Chennai", avatar: "tara-bose", match: 85, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 5.5, views: "35K", audience: "77%", platforms: [["Instagram", "78K"], ["Pinterest", "31K"]], bio: "Tamil and English beauty creator sharing approachable skincare and seasonal makeup ideas.", niches: ["Tamil beauty", "Skincare", "Makeup", "Pinterest"], category: "Tamil beauty & skincare", rating: "4.8", reviewCount: 15, memberSince: "Jun 2025", responseTime: "3 hours", lastDelivery: "21 Oct 2026", languages: "Tamil, English", onTime: "97%" },
  zoya: { name: "Zoya Ahmed", handle: "@zoyaahmed", city: "Hyderabad", avatar: "meera-iyer", match: 82, fee: "Counter offer ₹28,000", feeNote: "₹15,500 above your ₹12,500 fee", counter: true, engagement: 3.8, views: "96K", audience: "69%", platforms: [["Instagram", "2.4 L"], ["YouTube", "1.1 L"]], bio: "Bridal and festive looks creator with a high-reach audience across Instagram and YouTube.", niches: ["Bridal", "Festive looks", "YouTube", "Fashion"], category: "Bridal & festive beauty", rating: "4.7", reviewCount: 34, memberSince: "Dec 2024", responseTime: "6 hours", lastDelivery: "14 Oct 2026", languages: "Telugu, Hindi, English", onTime: "92%" },
  arjun: { name: "Arjun Pillai", handle: "@arjunpillai", city: "Bengaluru", avatar: "ishita-rao", match: 79, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 4.4, views: "28K", audience: "58%", platforms: [["Instagram", "61K"]], bio: "Men's grooming creator making straightforward skincare routines and gifting content.", niches: ["Men's grooming", "Skincare", "Gifting", "Reels"], category: "Men's grooming", rating: "4.6", reviewCount: 11, memberSince: "Oct 2025", responseTime: "4 hours", lastDelivery: "11 Oct 2026", languages: "Tamil, English, Hindi", onTime: "95%" },
  mehak: { name: "Mehak Sethi", handle: "@mehaksethi", city: "Chandigarh", avatar: "kavya-reddy", match: 68, fee: "Counter offer ₹40,000", feeNote: "₹27,500 above your ₹12,500 fee", counter: true, engagement: 2.4, views: "1.1 L", audience: "52%", platforms: [["Instagram", "3.1 L"], ["YouTube", "85K"], ["Snapchat", "40K"]], bio: "Lifestyle and travel creator who integrates skincare into aspirational day-in-the-life content.", niches: ["Lifestyle", "Travel", "Beauty", "YouTube"], category: "Lifestyle & travel", rating: "4.5", reviewCount: 29, memberSince: "Apr 2025", responseTime: "8 hours", lastDelivery: "8 Oct 2026", languages: "Hindi, English, Punjabi", onTime: "90%" },
  simran: { name: "Simran Kaur", handle: "@simrankaur", city: "Amritsar", avatar: "tara-bose", match: 64, fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, engagement: 3.1, views: "12K", audience: "61%", platforms: [["Instagram", "38K"]], bio: "Emerging fashion and skincare creator building a thoughtful community around everyday routines.", niches: ["Fashion", "Skincare", "Routines", "Reels"], category: "Fashion & skincare", rating: "4.5", reviewCount: 6, memberSince: "Jan 2026", responseTime: "7 hours", lastDelivery: "3 Oct 2026", languages: "Punjabi, Hindi, English", onTime: "89%" },
};

function keyFor(value: CreatorProfileIdentity | string) {
  if (typeof value === "string") return value.replace(/^@/, "").toLowerCase().replace(/[^a-z]/g, "");
  return (value.id ?? value.handle ?? "diya").replace(/^@/, "").toLowerCase().replace(/[^a-z]/g, "");
}

export function getCreatorProfile(value: CreatorProfileIdentity | string): CreatorProfileDetails {
  const key = keyFor(value);
  const matchedKey = Object.keys(presets).find((id) => id === key || keyFor(presets[id]) === key) ?? "diya";
  const preset = presets[matchedKey];
  if (typeof value === "string") return { ...preset, id: matchedKey };
  return { ...preset, ...value, id: value.id ?? matchedKey, platforms: value.platforms?.length ? value.platforms : preset.platforms };
}

export function followerFor(profile: CreatorProfileDetails, platform: Platform) {
  return profile.platforms.find(([name]) => name === platform)?.[1] ?? "—";
}

/** Owner-editable content. Null values must never be rendered as confirmed facts. */
export const brand = {
  name: "5 Diamonds Ranches",
  tagline: "BEEF • HAY • FAMILY",
  region: "Oregon",
  image: "/central-oregon-ranch.png",
  email: null as string | null,
  phone: null as string | null,
};
export const navigation = [
  { href: "/beef-pricing", label: "Beef & Pricing" },
  { href: "/standard", label: "The 5 Diamonds Standard" },
  { href: "/our-ranch", label: "Our Ranch" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];
export type PackageId = "quarter" | "half" | "whole";
export const packages: {
  id: PackageId;
  label: string;
  fraction: string;
  share: number;
  description: string;
  household: string;
  pounds: number | null;
  pricePerPound: number | null;
  freezer: string | null;
}[] = [
  {
    id: "quarter",
    label: "¼ Beef",
    fraction: "¼",
    share: 25,
    description: "A good place to begin.",
    household: "For smaller households or a first freezer order.",
    pounds: null,
    pricePerPound: null,
    freezer: null,
  },
  {
    id: "half",
    label: "½ Beef",
    fraction: "½",
    share: 50,
    description: "Make beef part of the routine.",
    household: "For regular family meals and room to stock up.",
    pounds: null,
    pricePerPound: null,
    freezer: null,
  },
  {
    id: "whole",
    label: "Whole Beef",
    fraction: "1",
    share: 100,
    description: "Think ahead. Fill the freezer.",
    household: "For frequent beef eaters, larger households or sharing.",
    pounds: null,
    pricePerPound: null,
    freezer: null,
  },
];
export const principles = [
  {
    title: "Room to roam",
    short: "Pasture comes first.",
    copy: "Open Oregon pasture is at the heart of the ranch story. We’re preparing a closer look at the land and how the cattle use it.",
  },
  {
    title: "Know your beef",
    short: "A connection to its source.",
    copy: "Buying direct creates room for real questions about the cattle, their care and the beef that reaches your freezer.",
  },
  {
    title: "Raised right",
    short: "Care in the everyday work.",
    copy: "Good animal husbandry is a daily commitment. Details of our care practices will be shared here after ranch review.",
  },
  {
    title: "Beef your way",
    short: "An offering you understand.",
    copy: "Choose a quarter, half or whole. Feeding and finishing options are being confirmed so you can make an informed choice.",
  },
  {
    title: "Fair by the pound",
    short: "The weight that comes home.",
    copy: "Our planned pricing is based on finished, packaged beef. Final rates and package estimates will be shared before reservations open.",
  },
];
export const ranchClaims = [
  {
    id: "cattle",
    draft: "Approximately 600–800 cattle at a time",
    status: "needs-owner-confirmation",
  },
  {
    id: "acres",
    draft: "Approximately 7,000 acres",
    status: "needs-owner-confirmation",
  },
  {
    id: "pasture",
    draft: "Open pasture; not confined or feedlot cattle",
    status: "needs-owner-confirmation",
  },
  {
    id: "dna",
    draft: "Cattle are DNA tested",
    status: "needs-owner-confirmation",
  },
  {
    id: "antibiotics",
    draft: "No antibiotics — confirm precise policy and allowed wording",
    status: "needs-owner-confirmation",
  },
  {
    id: "finishing",
    draft: "Grass-fed and/or grass-finished options — confirm offering",
    status: "needs-owner-confirmation",
  },
  {
    id: "processing",
    draft: "USDA-inspected beef — confirm processor and inspection",
    status: "needs-owner-confirmation",
  },
];
export const steps = [
  {
    title: "Choose your beef",
    copy: "Explore a quarter, half or whole and find the fit for your household.",
  },
  {
    title: "Reserve it",
    copy: "Reservation timing, deposits and payment details are coming soon.",
  },
  {
    title: "Your beef is processed",
    copy: "Butcher information, inspection details and processing timelines will be confirmed before ordering.",
  },
  {
    title: "We package it",
    copy: "Your order becomes finished, packaged cuts. Final cut selections and packaging details are coming soon.",
  },
  {
    title: "Fill your freezer",
    copy: "Pickup locations, delivery availability and service areas will be shared before reservations open.",
  },
];
export const faqs = [
  {
    question: "What does packaged-weight pricing mean?",
    answer:
      "It means pricing based on the finished, packaged beef you receive. Hanging weight is measured earlier, before the carcass is trimmed and cut. Those are different weights. Our final packaged-pound rates and any fees will be confirmed before ordering.",
  },
  {
    question: "Can I order beef today?",
    answer:
      "Reservations are not open yet. Package weights, prices, deposits and fulfillment details are still being finalized.",
  },
  {
    question: "Which cuts will I receive?",
    answer:
      "The cut guide shows examples and meal ideas. Your confirmed assortment, quantities and any customization will be provided before ordering.",
  },
  {
    question: "How much freezer space will I need?",
    answer:
      "Freezer requirements depend on your final packaged weight and how your freezer is arranged. Package-specific space estimates are coming soon; please confirm available space before reserving.",
  },
];
export const interestOptions = [
  ...packages.map((p) => ({ value: p.id, label: p.label })),
  { value: "hay", label: "Hay" },
  { value: "other", label: "Other" },
];
export const cuts = [
  {
    id: "ribeye",
    name: "Ribeye",
    category: "Steaks",
    method: "Grilling / cast iron",
    meal: "Steak night",
    preparation:
      "Sear over high heat, then finish to your preferred doneness and rest before slicing.",
  },
  {
    id: "strip",
    name: "New York strip",
    category: "Steaks",
    method: "Grilling / cast iron",
    meal: "A classic steak supper",
    preparation:
      "Season simply, sear both sides and slice across the grain after resting.",
  },
  {
    id: "sirloin",
    name: "Sirloin",
    category: "Steaks",
    method: "Grilling / skillet",
    meal: "Steak salads and fajitas",
    preparation: "Sear, rest and slice thinly across the grain.",
  },
  {
    id: "filet",
    name: "Tenderloin / filet",
    category: "Steaks",
    method: "Cast iron / oven",
    meal: "A special dinner at home",
    preparation: "Start with a hot sear and finish gently in the oven.",
  },
  {
    id: "chuck",
    name: "Chuck roast",
    category: "Roasts",
    method: "Slow cooker / Dutch oven",
    meal: "Pot roast, shredded beef and tacos",
    preparation:
      "Brown first, then cook slowly with a little liquid until tender.",
  },
  {
    id: "round",
    name: "Rump / round roast",
    category: "Roasts",
    method: "Roasting / braising",
    meal: "Sunday roast and sandwiches",
    preparation: "Cook gently and slice thinly across the grain for serving.",
  },
  {
    id: "ground",
    name: "Ground beef",
    category: "Ground beef",
    method: "Skillet / grill",
    meal: "Burgers, meatballs and weeknight tacos",
    preparation:
      "Shape into patties or brown in a skillet for a versatile meal base.",
  },
  {
    id: "ribs",
    name: "Short ribs",
    category: "Other cuts",
    method: "Braising",
    meal: "Slow Sunday dinners",
    preparation:
      "Brown the ribs, add braising liquid and cook slowly until tender.",
  },
  {
    id: "brisket",
    name: "Brisket",
    category: "Other cuts",
    method: "Smoking / slow roasting",
    meal: "A gathering around the table",
    preparation:
      "Give it low heat and plenty of time, then rest and slice across the grain.",
  },
  {
    id: "stew",
    name: "Stew meat",
    category: "Other cuts",
    method: "Slow cooker / Dutch oven",
    meal: "Hearty stews",
    preparation:
      "Brown in batches, then simmer gently with stock and vegetables.",
  },
];

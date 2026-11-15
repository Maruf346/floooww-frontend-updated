import type { Project } from "@/brand/data/projects";

export type ProjectObjective = "Sales" | "Awareness" | "Engagement" | "Traffic" | "Leads";

const objectives: Record<number, ProjectObjective> = {
  1: "Sales",
  2: "Engagement",
  3: "Awareness",
  4: "Awareness",
  5: "Engagement",
  6: "Leads",
  7: "Awareness",
  8: "Engagement",
  9: "Sales",
  10: "Awareness",
  11: "Traffic",
  12: "Awareness",
  13: "Engagement",
  14: "Awareness",
};

export function getProjectRules(project: Project) {
  const creatorType = project.projectType.toLowerCase();
  const partnership = project.partnership.toLowerCase();
  const duration = `${project.type} ${project.partnership}`.toLowerCase();
  const isAI = creatorType.includes("ai");
  const isUgc = creatorType.includes("ugc");
  const isAmbassador = creatorType.includes("ambassador");
  const isFileBased = isUgc || isAI;
  const isGift = partnership.includes("gift");
  const isLongTerm = duration.includes("long-term");
  const objective = objectives[project.id] ?? "Awareness";
  const item = isAI ? "video" : isUgc ? "file" : "post";
  const itemPlural = `${item}s`;
  const completedVerb = isFileBased ? "Delivered" : "Posted";
  const activeVerb = isFileBased ? "Delivering" : "Posting";

  return {
    objective,
    isAI,
    isUgc,
    isAmbassador,
    isFileBased,
    isGift,
    isPaid: !isGift,
    isLongTerm,
    item,
    itemPlural,
    completedVerb,
    activeVerb,
    deadlineLabel: isFileBased ? "Delivery deadline" : "Posting deadline",
    firstItemLabel: isFileBased ? `First ${item} delivered` : "First post live",
    liveColumnLabel: isFileBased ? "Delivery" : "Live post",
    progressNoun: isFileBased ? itemPlural : "posts",
    paymentBadge: isGift ? "Products sent" : "On track",
    resultLabel: {
      Sales: "Net sales",
      Awareness: "Reach",
      Engagement: "Engagements",
      Traffic: "Sessions",
      Leads: "Leads",
    }[objective],
    tracking:
      objective === "Sales"
        ? "Shopify + coupon code"
        : objective === "Traffic"
          ? "UTM + GA4"
          : objective === "Leads"
            ? "Quiz form + UTM"
            : "Connected accounts",
    hasTracking: objective === "Sales" || objective === "Traffic",
    hasCoupon: objective === "Sales",
    deliverableTypes: isAI
      ? ["AI video", "Product video", "Tutorial video"]
      : isUgc
        ? ["Product file", "Demo file", "Review file"]
        : ["Reel", "Story", "Carousel", "Static post"],
  };
}

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type ProjectObjective = "Awareness" | "Engagement" | "Traffic" | "Lead generation" | "Sales";
export type ProjectPartnership = "Paid" | "Gift exchange";
export type ProjectDuration = "One-time" | "Long-term";
export type ProjectType = "UGC" | "Influencer marketing";

type ProjectFlow = {
  objective: ProjectObjective;
  setObjective: (objective: ProjectObjective) => void;
  partnership: ProjectPartnership;
  setPartnership: (partnership: ProjectPartnership) => void;
  duration: ProjectDuration;
  setDuration: (duration: ProjectDuration) => void;
  projectType: ProjectType;
  setProjectType: (projectType: ProjectType) => void;
};

const ProjectFlowContext = createContext<ProjectFlow | null>(null);

export const paidProjectSteps = [
  "Objective",
  "Type",
  "Partnership",
  "Duration",
  "Details",
  "Creators",
  "Deliverables",
  "Budget",
  "Payment",
  "Review",
];

export const giftProjectSteps = [
  "Objective",
  "Type",
  "Partnership",
  "Duration",
  "Details",
  "Creators",
  "Deliverables",
  "Review",
];

export function getProjectSteps(partnership: ProjectPartnership) {
  return partnership === "Gift exchange" ? giftProjectSteps : paidProjectSteps;
}

export const targetByObjective: Record<ProjectObjective, string> = {
  Awareness: "12 L reach",
  Engagement: "48,000 engagements",
  Traffic: "18,000 sessions",
  "Lead generation": "1,200 qualified leads",
  Sales: "₹6,00,000 net sales",
};

export const trackingByObjective: Record<ProjectObjective, string> = {
  Awareness: "Connected Instagram and YouTube accounts",
  Engagement: "Connected platform insights",
  Traffic: "UTM links + GA4",
  "Lead generation": "Quiz form + UTM parameters",
  Sales: "Shopify · code + UTM link per deliverable",
};

export function getProjectTarget(
  projectType: ProjectType,
  partnership: ProjectPartnership,
  duration: ProjectDuration,
  objective?: ProjectObjective,
) {
  if (objective) {
    if (objective === "Sales") {
      return partnership === "Gift exchange" ? "₹2,50,000 net sales" : "₹6,00,000 net sales";
    }
    return targetByObjective[objective];
  }
  if (projectType === "Influencer marketing")
    return partnership === "Gift exchange" ? "30,000 engagements" : "₹6,00,000 net sales";
  return duration === "Long-term" ? "20 usable videos a cycle" : "20 usable videos";
}

export function getProjectDurationLabel(
  partnership: ProjectPartnership,
  duration: ProjectDuration,
) {
  if (partnership === "Gift exchange")
    return duration === "Long-term" ? "Long-term · 1 Dec – 28 Feb" : "One-time · 1 Dec – 31 Dec";
  return duration === "Long-term" ? "Long-term · 7 Oct – 6 Jan" : "One-time · 7 Oct – 7 Nov";
}

export function ProjectFlowProvider({ children }: { children: ReactNode }) {
  const [objective, setObjective] = useState<ProjectObjective>("Sales");
  const [partnership, setPartnership] = useState<ProjectPartnership>("Paid");
  const [duration, setDuration] = useState<ProjectDuration>("One-time");
  const [projectType, setProjectType] = useState<ProjectType>("UGC");

  const value = useMemo(
    () => ({
      objective,
      setObjective,
      partnership,
      setPartnership,
      duration,
      setDuration,
      projectType,
      setProjectType,
    }),
    [objective, duration, partnership, projectType],
  );

  return <ProjectFlowContext.Provider value={value}>{children}</ProjectFlowContext.Provider>;
}

export function useProjectFlow() {
  const context = useContext(ProjectFlowContext);
  if (!context) throw new Error("useProjectFlow must be used within ProjectFlowProvider");
  return context;
}

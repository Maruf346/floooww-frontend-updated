import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type ProjectPartnership = "Paid" | "Gift exchange";

type ProjectFlow = {
  partnership: ProjectPartnership;
  setPartnership: (partnership: ProjectPartnership) => void;
};

const ProjectFlowContext = createContext<ProjectFlow | null>(null);

export const paidProjectSteps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Budget", "Payment", "Review"];
export const giftProjectSteps = ["Type", "Partnership", "Duration", "Details", "Creators", "Deliverables", "Review"];

export function getProjectSteps(partnership: ProjectPartnership) {
  return partnership === "Gift exchange" ? giftProjectSteps : paidProjectSteps;
}

export function ProjectFlowProvider({ children }: { children: ReactNode }) {
  const [partnership, setPartnership] = useState<ProjectPartnership>("Paid");
  const value = useMemo(() => ({ partnership, setPartnership }), [partnership]);
  return <ProjectFlowContext.Provider value={value}>{children}</ProjectFlowContext.Provider>;
}

export function useProjectFlow() {
  const context = useContext(ProjectFlowContext);
  if (!context) throw new Error("useProjectFlow must be used within ProjectFlowProvider");
  return context;
}

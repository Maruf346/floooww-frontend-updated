import { BrandProjectPublishedPage } from "@/brand/pages/BrandProjectPublishedPage";

export {
  PerformanceReportBlocks,
  PERFORMANCE_VARIANTS,
  type ObjectiveType,
  type TypeCategory,
  type VariantData,
} from "@/brand/components/PerformanceReportBlocks";

export function CustomReportCard({ onMakeReport }: { onMakeReport?: () => void }) {
  return null;
}

/**
 * Route: /brand/projects/:projectId/performance
 * Renders the project page directly on the Performance tab with unified breadcrumb and tab counts.
 */
export function BrandProjectPerformancePage() {
  return <BrandProjectPublishedPage initialTab="Performance" />;
}

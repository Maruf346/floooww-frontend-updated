import { useLocation, useParams } from "react-router-dom";
import { BrandProjectPublishedPage } from "@/brand/pages/BrandProjectPublishedPage";

export function AgencyClientProjectPublishedPage() {
  const { clientId } = useParams<{ clientId?: string }>();
  const location = useLocation();
  const isPerformance = location.pathname.endsWith("/performance");
  return (
    <BrandProjectPublishedPage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
      initialTab={isPerformance ? "Performance" : undefined}
    />
  );
}

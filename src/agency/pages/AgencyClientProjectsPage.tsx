import { useParams } from "react-router-dom";
import { BrandProjectsPage } from "@/brand/pages/BrandProjectsPage";

export function AgencyClientProjectsPage() {
  const { clientId } = useParams<{ clientId?: string }>();
  return (
    <BrandProjectsPage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
    />
  );
}

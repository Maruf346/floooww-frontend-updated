import { useParams } from "react-router-dom";
import { BrandProjectPublishedPage } from "@/brand/pages/BrandProjectPublishedPage";

export function AgencyClientProjectPublishedPage() {
  const { clientId } = useParams<{ clientId?: string }>();
  return (
    <BrandProjectPublishedPage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
    />
  );
}

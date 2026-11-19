import { useParams } from "react-router-dom";
import { BrandInvitedCreatorPage } from "@/brand/pages/BrandInvitedCreatorPage";

export function AgencyClientInvitedCreatorPage() {
  const { clientId } = useParams<{ clientId?: string }>();
  return (
    <BrandInvitedCreatorPage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
    />
  );
}

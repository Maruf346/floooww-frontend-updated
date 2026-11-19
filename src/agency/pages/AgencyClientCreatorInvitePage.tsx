import { useParams } from "react-router-dom";
import { BrandCreatorInvitePage } from "@/brand/pages/BrandCreatorInvitePage";

export function AgencyClientCreatorInvitePage() {
  const { clientId } = useParams<{ clientId?: string }>();
  return (
    <BrandCreatorInvitePage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
    />
  );
}

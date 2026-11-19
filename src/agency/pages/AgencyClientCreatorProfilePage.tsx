import { useParams } from "react-router-dom";
import { BrandCreatorProfilePage } from "@/brand/pages/BrandCreatorProfilePage";

export function AgencyClientCreatorProfilePage() {
  const { clientId } = useParams<{ clientId?: string }>();
  return (
    <BrandCreatorProfilePage
      shell="agency-client"
      activeClientId={clientId || "minimalist"}
    />
  );
}

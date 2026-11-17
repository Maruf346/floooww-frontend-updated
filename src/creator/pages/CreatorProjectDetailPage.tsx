import { useParams, useSearchParams } from "react-router-dom";
import Cr03ProjectPageInfluencerPaidLongTerm from "./Cr03ProjectPageInfluencerPaidLongTerm";
import Cr03ProjectPageInfluencerPaidOneTime from "./Cr03ProjectPageInfluencerPaidOneTime";

export function CreatorProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (
    type === "one-time" ||
    projectId === "monsoon-sunscreen" ||
    projectId === "one-time" ||
    projectId === "cr-03-one-time" ||
    projectId === "influencer-paid-one-time"
  ) {
    return <Cr03ProjectPageInfluencerPaidOneTime />;
  }

  return <Cr03ProjectPageInfluencerPaidLongTerm />;
}

export default CreatorProjectDetailPage;

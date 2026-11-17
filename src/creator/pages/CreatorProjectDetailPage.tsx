import { useParams, useSearchParams } from "react-router-dom";
import Cr03ProjectPageInfluencerPaidLongTerm from "./Cr03ProjectPageInfluencerPaidLongTerm";
import Cr03ProjectPageInfluencerPaidOneTime from "./Cr03ProjectPageInfluencerPaidOneTime";
import Cr03ProjectPageInfluencerGiftOneTime from "./Cr03ProjectPageInfluencerGiftOneTime";
import Cr03ProjectPageUgcPaidOneTime from "./Cr03ProjectPageUgcPaidOneTime";

export function CreatorProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (
    type === "gift-one-time" ||
    type === "influencer-gift-one-time" ||
    type === "gift" ||
    projectId === "hydration-bundle" ||
    projectId === "influencer-gift-one-time" ||
    projectId === "gift-one-time" ||
    projectId === "gift"
  ) {
    return <Cr03ProjectPageInfluencerGiftOneTime />;
  }

  if (
    type === "ugc-paid-one-time" ||
    type === "ugc-one-time" ||
    type === "ugc" ||
    projectId === "festive-haircare" ||
    projectId === "ugc-paid-one-time" ||
    projectId === "ugc-one-time" ||
    projectId === "ugc"
  ) {
    return <Cr03ProjectPageUgcPaidOneTime />;
  }

  if (
    type === "one-time" ||
    type === "influencer-paid-one-time" ||
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

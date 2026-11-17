import { useParams, useSearchParams } from "react-router-dom";
import CreatorProjectPageInfluencerPaidLongTerm from "./CreatorProjectPageInfluencerPaidLongTerm";
import CreatorProjectPageInfluencerPaidOneTime from "./CreatorProjectPageInfluencerPaidOneTime";
import CreatorProjectPageInfluencerGiftOneTime from "./CreatorProjectPageInfluencerGiftOneTime";
import CreatorProjectPageUgcPaidOneTime from "./CreatorProjectPageUgcPaidOneTime";
import CreatorLiveProjectDetailPage from "./CreatorLiveProjectDetailPage";

export function CreatorProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  if (
    type === "live" ||
    type === "active" ||
    projectId === "vitamin-c-serum-live" ||
    projectId === "vitamin-c-serum" ||
    projectId === "live" ||
    projectId === "cr-05" ||
    projectId === "glow-squad-live"
  ) {
    return <CreatorLiveProjectDetailPage />;
  }

  if (
    type === "gift-one-time" ||
    type === "influencer-gift-one-time" ||
    type === "gift" ||
    projectId === "hydration-bundle" ||
    projectId === "influencer-gift-one-time" ||
    projectId === "gift-one-time" ||
    projectId === "gift"
  ) {
    return <CreatorProjectPageInfluencerGiftOneTime />;
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
    return <CreatorProjectPageUgcPaidOneTime />;
  }

  if (
    type === "one-time" ||
    type === "influencer-paid-one-time" ||
    projectId === "monsoon-sunscreen" ||
    projectId === "one-time" ||
    projectId === "cr-03-one-time" ||
    projectId === "creator-one-time" ||
    projectId === "influencer-paid-one-time"
  ) {
    return <CreatorProjectPageInfluencerPaidOneTime />;
  }

  return <CreatorProjectPageInfluencerPaidLongTerm />;
}

export default CreatorProjectDetailPage;

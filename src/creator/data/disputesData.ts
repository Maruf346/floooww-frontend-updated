export type DisputeStatus = "Waiting for you" | "Under review" | "Resolved";

export type DisputeTimelineEvent = {
  id: string;
  title: string;
  detail: string;
  date: string;
  status: "done" | "current" | "future";
};

export type DisputeEvidenceItem = {
  id: string;
  title: string;
  by: "You" | "Rohan" | "Tara" | "Auto";
  type: "screenshot" | "link" | "messages" | "video";
  url?: string;
  date?: string;
};

export type CreatorDisputeItem = {
  id: string;
  brand: string;
  brandCode: string;
  brandColor: string;
  project: string;
  deliverable: string;
  reason: string;
  amount: string;
  amountFrozenNumber: number;
  status: DisputeStatus;
  next: string;
  raisedDate: string;
  timeline: DisputeTimelineEvent[];
  evidence: DisputeEvidenceItem[];
  outcomesNote?: string;
};

export const CREATOR_DISPUTES: CreatorDisputeItem[] = [
  {
    id: "DSP-0418",
    brand: "Velvet Lip Co.",
    brandCode: "VL",
    brandColor: "bg-[#7c3aed]",
    project: "Lip Liner Collab",
    deliverable: "2 × Instagram Reel",
    reason: "Late delivery",
    amount: "₹7,500",
    amountFrozenNumber: 7500,
    status: "Waiting for you",
    next: "Reply by 30 Oct",
    raisedDate: "26 Oct 2026",
    timeline: [
      {
        id: "ev-1",
        title: "Velvet Lip Co. raised the dispute",
        detail: "Reason: late delivery · ₹7,500 frozen in escrow",
        date: "26 Oct",
        status: "done",
      },
      {
        id: "ev-2",
        title: "You replied",
        detail: "“The shoot moved due to rain: both Reels are now live.”",
        date: "27 Oct",
        status: "done",
      },
      {
        id: "ev-3",
        title: "Velvet’s reply",
        detail: "Accept your delivery or add evidence",
        date: "By 30 Oct",
        status: "current",
      },
      {
        id: "ev-4",
        title: "Kreyio decision",
        detail: "Release, partial release, refund or redo",
        date: "By 6 Nov",
        status: "future",
      },
    ],
    evidence: [
      {
        id: "evi-1",
        title: "Brief deadline: 20 Oct (screenshot)",
        by: "You",
        type: "screenshot",
        date: "26 Oct",
      },
      {
        id: "evi-2",
        title: "Instagram live links × 2 (posted 25 Oct)",
        by: "Rohan",
        type: "link",
        url: "instagram.com/reel/C89x12Abc",
        date: "27 Oct",
      },
      {
        id: "evi-3",
        title: "Message history (14 messages)",
        by: "Auto",
        type: "messages",
        date: "27 Oct",
      },
    ],
    outcomesNote:
      "Full release · partial release + partial refund · full refund · redo by a new date. Fees on refunded amounts are returned.",
  },
  {
    id: "DSP-0421",
    brand: "Dewdrop Naturals",
    brandCode: "DN",
    brandColor: "bg-[#0d9488]",
    project: "Mist launch",
    deliverable: "1 × Instagram Reel",
    reason: "Doesn’t match brief",
    amount: "₹7,500",
    amountFrozenNumber: 7500,
    status: "Under review",
    next: "Decision by 4 Nov",
    raisedDate: "24 Oct 2026",
    timeline: [
      {
        id: "ev-1",
        title: "Dewdrop Naturals raised the dispute",
        detail: "Reason: doesn’t match brief · ₹7,500 frozen in escrow",
        date: "24 Oct",
        status: "done",
      },
      {
        id: "ev-2",
        title: "You replied",
        detail: "“I have uploaded the revised cut with brand colors as requested.”",
        date: "25 Oct",
        status: "done",
      },
      {
        id: "ev-3",
        title: "Under review by Kreyio",
        detail: "Reviewing submitted video cut and brief parameters",
        date: "28 Oct",
        status: "current",
      },
      {
        id: "ev-4",
        title: "Kreyio decision",
        detail: "Release, partial release, refund or redo",
        date: "By 4 Nov",
        status: "future",
      },
    ],
    evidence: [
      {
        id: "evi-1",
        title: "Brief deadline: 18 Oct (screenshot)",
        by: "You",
        type: "screenshot",
        date: "24 Oct",
      },
      {
        id: "evi-2",
        title: "Instagram Reel link (posted 23 Oct)",
        by: "Tara",
        type: "link",
        url: "instagram.com/reel/D98a72Zkl",
        date: "25 Oct",
      },
      {
        id: "evi-3",
        title: "Message history (9 messages)",
        by: "Auto",
        type: "messages",
        date: "25 Oct",
      },
    ],
    outcomesNote:
      "Full release · partial release + partial refund · full refund · redo by a new date. Fees on refunded amounts are returned.",
  },
  {
    id: "DSP-0377",
    brand: "Strand Studio",
    brandCode: "SS",
    brandColor: "bg-[#3b5bff]",
    project: "Hair Oil UGC",
    deliverable: "1 × UGC Video (4K)",
    reason: "File not usable",
    amount: "₹5,000",
    amountFrozenNumber: 5000,
    status: "Resolved",
    next: "Resolved · released",
    raisedDate: "19 Oct 2026",
    timeline: [
      {
        id: "ev-1",
        title: "Strand Studio raised the dispute",
        detail: "Reason: file not usable · ₹5,000 frozen in escrow",
        date: "19 Oct",
        status: "done",
      },
      {
        id: "ev-2",
        title: "You replied",
        detail: "“The product was damaged in transit; re-uploaded new 4K raw take.”",
        date: "20 Oct",
        status: "done",
      },
      {
        id: "ev-3",
        title: "Brand verified replacement",
        detail: "Brand confirmed video was approved and usable",
        date: "22 Oct",
        status: "done",
      },
      {
        id: "ev-4",
        title: "Kreyio decision: Released",
        detail: "Funds released to Ishita Rao",
        date: "23 Oct",
        status: "done",
      },
    ],
    evidence: [
      {
        id: "evi-1",
        title: "Brief deadline: 16 Oct (screenshot)",
        by: "You",
        type: "screenshot",
        date: "19 Oct",
      },
      {
        id: "evi-2",
        title: "Replacement 4K master upload",
        by: "You",
        type: "video",
        date: "20 Oct",
      },
      {
        id: "evi-3",
        title: "Message history (11 messages)",
        by: "Auto",
        type: "messages",
        date: "22 Oct",
      },
    ],
    outcomesNote:
      "Dispute settled amicably. Total fee of ₹5,000 released to creator account on 23 Oct.",
  },
];

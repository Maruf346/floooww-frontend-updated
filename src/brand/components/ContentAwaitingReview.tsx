import { ChevronRight } from "lucide-react";
import { ASSETS } from "@/common/constants/assets";

const reviewItems = [
  {
    creator: "Meera Iyer",
    project: "Vitamin-C Serum",
    status: "Awaiting approval · 2 days",
    image: ASSETS.howItWorks.creatorMedia[1],
    avatar: ASSETS.howItWorks.avatarMeera,
  },
  {
    creator: "Nisha Verma",
    project: "Monsoon Sunscreen",
    status: "Awaiting approval · 1 day",
    image: ASSETS.howItWorks.brandMedia[3],
    avatar: ASSETS.howItWorks.avatarAditi,
  },
  {
    creator: "Tanvi Shah",
    project: "Lip Tint Drop",
    status: "Revision requested",
    image: ASSETS.howItWorks.creatorMedia[2],
    avatar: ASSETS.howItWorks.avatarIshita,
  },
  {
    creator: "Riya Sen",
    project: "Glow Squad",
    status: "Awaiting approval · 3 days",
    image: ASSETS.howItWorks.brandMedia[1],
    avatar: ASSETS.creators.avatarRiya,
  },
];

/** The review queue shown beneath the campaign overview cards. */
export function ContentAwaitingReview() {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[16px] font-semibold leading-6">Content awaiting review</h2>
          <p className="text-[12px] leading-4 text-secondary">
            4 of 9 items shown · oldest waiting 3 days
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 text-[12px] font-medium text-link"
        >
          Review all content <ChevronRight size={14} />
        </button>
      </div>
      <div className="mt-3 overflow-x-auto pb-1">
        <div className="grid min-w-[728px] grid-cols-4 gap-4">
          {reviewItems.map((item) => (
            <article key={item.creator} className="min-w-0">
              <img
                src={item.image}
                alt=""
                className="h-[208px] w-full rounded-[10px] object-cover"
              />
              <div className="mt-2 flex items-center gap-1.5">
                <img src={item.avatar} alt="" className="size-5 rounded-full object-cover" />
                <p className="truncate text-[12px] font-medium leading-4">{item.creator}</p>
              </div>
              <p className="mt-2 truncate text-[12px] leading-4 text-tertiary">{item.project}</p>
              <p className="mt-2 truncate text-[14px] font-medium leading-[22px]">{item.status}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

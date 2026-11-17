export function CreatorProjectReviewView() {
  const criteria = [
    "Content quality",
    "Professionalism",
    "On-time posting",
    "Engagement",
    "Communication",
    "Creativity",
    "Brand match",
    "Overall experience",
  ];

  const ratingBars = [
    { label: "Content quality", width: "100%", score: "5.0" },
    { label: "On-time posting", width: "98.33%", score: "4.9" },
    { label: "Communication", width: "98.33%", score: "4.9" },
    { label: "Creativity", width: "95.83%", score: "4.8" },
    { label: "Brand match", width: "98.33%", score: "4.9" },
  ];

  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-node-id="718:5507" data-name="Row">
      {/* Left Column (Sticky) */}
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative sticky top-[80px] self-start" data-node-id="718:5443" data-name="Left">
        <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] min-h-[452px] justify-between items-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="718:5377" data-name="Minimalist’s review of you">
          <div className="w-full flex flex-col gap-[14px]">
            {/* Card head */}
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="718:5378" data-name="Card head">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative" data-node-id="718:5379" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px] leading-[22px]" data-node-id="718:5380">
                  Minimalist’s review of you
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px] leading-[16px]" data-node-id="718:5381">
                  Unlocks when the project ends on 7 Nov
                </p>
              </div>
              <div className="bg-[#f4f6fb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-full shrink-0">
                <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#4a4a55] whitespace-nowrap">
                  Locked
                </p>
              </div>
            </div>

            {/* Locked Matrix Container */}
            <div className="bg-[#f8f9fb] content-stretch flex flex-col font-['Inter:Regular'] font-normal items-start p-[14px] relative rounded-[10px] shrink-0 w-full" data-node-id="718:5382" data-name="Locked">
              {criteria.map((item) => (
                <div
                  key={item}
                  className="content-stretch flex gap-[8px] items-center py-[7px] relative shrink-0 w-full"
                  data-name="r"
                >
                  <p className="flex-[1_0_0] min-w-px relative text-[#8491a3] text-[13px] leading-[18px]">
                    {item}
                  </p>
                  <p className="relative shrink-0 text-[#d5dae1] text-[16px] tracking-[2px] whitespace-nowrap select-none leading-none">
                    ☆☆☆☆☆
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="font-['Inter:Regular'] font-normal leading-[18px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="718:5407">
            Brands review every creator they work with. It shows on your profile and helps you get invited.
          </p>
        </div>
      </div>

      {/* Right Column (Scrolls naturally) */}
      <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[380px]" data-node-id="718:5506" data-name="Side">
        {/* Your reviews */}
        <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="718:5444" data-name="Your reviews">
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="718:5445" data-name="Card head">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative" data-node-id="718:5446" data-name="t">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px] leading-[22px]" data-node-id="718:5447">
                Your reviews
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px] leading-[16px]" data-node-id="718:5448">
                From 12 brand projects
              </p>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full whitespace-nowrap" data-node-id="718:5449" data-name="b">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#070b13] text-[32px] leading-none" data-node-id="718:5450">
              4.9
            </p>
            <div className="content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[2px] items-start relative shrink-0" data-node-id="718:5451" data-name="s">
              <p className="relative shrink-0 text-[#f5a524] text-[16px] leading-none tracking-[1px]" data-node-id="718:5452">
                ★★★★★
              </p>
              <p className="relative shrink-0 text-[#149d46] text-[12px] font-medium leading-none">
                100% would work again
              </p>
            </div>
          </div>

          {/* Category Bars */}
          <div className="content-stretch flex flex-col gap-[10px] w-full pt-1">
            {ratingBars.map((bar) => (
              <div key={bar.label} className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full" data-name="Bar row">
                <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px] w-[120px] shrink-0 leading-[18px]">
                  {bar.label}
                </p>
                <div className="bg-[#edeff3] flex-[1_0_0] h-[8px] min-w-px relative rounded-[4px] overflow-hidden" data-name="Bar">
                  <div
                    className="absolute bg-[#f5a524] h-[8px] left-0 top-0 rounded-[4px]"
                    style={{ width: bar.width }}
                    data-name="Frame"
                  />
                </div>
                <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px] text-right w-[44px] shrink-0 leading-[18px]">
                  {bar.score}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How reviews work */}
        <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="718:5499" data-name="How reviews work">
          <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="718:5500" data-name="Card head">
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-node-id="718:5501" data-name="t">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px] leading-[22px]" data-node-id="718:5502">
                How reviews work
              </p>
            </div>
          </div>
          <div className="space-y-2 text-[#394357] text-[13px] leading-[20px]">
            <p>·&nbsp; Both sides review after the project ends.</p>
            <p>·&nbsp; Reviews show once both are in, or after 14 days.</p>
            <p>·&nbsp; You can reply once to any review.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowLeft, ArrowRight, Info, X } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { Dropdown, MultiDropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectSteps,
  useProjectFlow,
} from "@/brand/context/ProjectFlowContext";
import {
  ProjectBreadcrumb,
  ProjectSetupSidebar,
  ProjectStepper,
} from "@/brand/components/ProjectWizardShared";

const niches = ["Beauty", "Skincare", "Fashion", "Lifestyle", "Wellness", "Fitness", "Other"];
const genderOptions = ["Any", "Mostly women", "Mostly men", "Balanced"];
const ageOptions = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"];
const locationOptions = ["Bengaluru", "Mumbai", "Delhi", "Andhra Pradesh", "Tamil Nadu", "Goa"];

export function BrandProjectCreatorsPage() {
  const navigate = useNavigate();
  const { objective, partnership, duration, projectType } = useProjectFlow();
  const stepsCount = getProjectSteps(partnership).length;
  const influencer = projectType === "Influencer marketing";
  const [saved, setSaved] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState(["Beauty", "Skincare"]);
  const [gender, setGender] = useState("Mostly women");
  const [ages, setAges] = useState(["18–24", "25–34"]);
  const [location, setLocation] = useState("Bengaluru");

  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <ProjectBreadcrumb
              step="creators"
              objective={objective}
              projectType={projectType}
              partnership={partnership}
              duration={duration}
            />
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Creator requirements
            </h1>
            <p className="text-[13px] leading-5 text-secondary">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>
            Exit
          </Button>
        </header>
        <ProjectStepper partnership={partnership} currentStepIndex={5} />
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.form
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
            initial={{ opacity: 0, y: 10 }}
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
            transition={{ duration: 0.26 }}
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 6 OF {stepsCount}
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
                Creator requirements
              </h2>
              <p className="mt-1.5 text-[14px] leading-[22px] text-secondary">
                We use this to rank creators by match score. Only “required” fields hide creators.
              </p>
            </div>
            {influencer ? <InfluencerMetrics /> : <UgcMetrics />}
            <section className="mt-5">
              <p className="text-[12px] font-medium leading-4 text-ink">
                Niche <span className="text-danger">*</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {niches.map((niche) => {
                  const active = selectedNiches.includes(niche);
                  return (
                    <button
                      aria-pressed={active}
                      className={
                        active
                          ? "inline-flex h-9 items-center gap-1.5 rounded-full border border-primary bg-primary-subtle px-3.5 text-[13px] leading-5 text-primary"
                          : "inline-flex h-9 items-center rounded-full border border-line bg-white px-3.5 text-[13px] leading-5 text-ink hover:bg-subtle"
                      }
                      key={niche}
                      onClick={() =>
                        setSelectedNiches((current) =>
                          active ? current.filter((item) => item !== niche) : [...current, niche],
                        )
                      }
                      type="button"
                    >
                      {active && <Check size={14} strokeWidth={2.5} />}
                      {niche}
                    </button>
                  );
                })}
              </div>
            </section>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <SelectField label="Audience gender">
                <Dropdown
                  ariaLabel="Audience gender"
                  className="w-full"
                  onChange={setGender}
                  options={genderOptions}
                  value={gender}
                />
              </SelectField>
              <SelectField label="Audience age">
                <MultiDropdown
                  ariaLabel="Audience age"
                  className="w-full"
                  hint="Pick one or more"
                  onChange={setAges}
                  options={ageOptions}
                  values={ages}
                />
              </SelectField>
            </div>
            <div className="mt-4">
              <SelectField label="Audience location">
                <Dropdown
                  ariaLabel="Audience location"
                  className="w-full"
                  onChange={setLocation}
                  options={locationOptions}
                  value={location}
                />
              </SelectField>
            </div>
            <div className="mt-5 flex gap-2.5 rounded-md bg-primary-subtle px-3.5 py-3 text-[14px] font-medium leading-[22px] text-ink">
              <Info size={18} className="mt-0.5 shrink-0 text-primary" />
              <span>214 creators match · stats from the last 30 days</span>
            </div>
            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brandNewProjectDetails)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                onClick={() => navigate(ROUTES.brandNewProjectDeliverables)}
                trailingIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </footer>
          </motion.form>
          <ProjectSetupSidebar
            objective={objective}
            projectType={projectType}
            partnership={partnership}
            duration={duration}
            stepIndex={5}
          />
        </div>
      </div>
    </BrandShell>
  );
}

function InfluencerMetrics() {
  const [minimum, setMinimum] = useState(10);
  const [maximum, setMaximum] = useState(50);
  const [engagement, setEngagement] = useState("3%+");
  const [customEngagement, setCustomEngagement] = useState<string[]>([]);
  const options = ["Any", "1%+", "2%+", "3%+", "4%+", "5%+", ...customEngagement];
  return (
    <>
      <section className="mt-5" aria-label="Follower range">
        <div className="flex items-center justify-between gap-4 text-[12px] font-medium leading-4">
          <span className="text-ink">Followers</span>
          <span className="whitespace-nowrap text-secondary">
            {minimum}K – {maximum === 50 ? "5 L" : `${maximum}K`}
          </span>
        </div>
        <DualRange
          minimum={minimum}
          maximum={maximum}
          onMinimum={setMinimum}
          onMaximum={setMaximum}
        />
        <div className="mt-2 flex justify-between text-[12px] leading-4 text-tertiary">
          <span>1K</span>
          <span>10K</span>
          <span>1 L</span>
          <span>10 L</span>
          <span>1 Cr</span>
        </div>
      </section>
      <div className="relative z-10 mt-5">
        <SelectField label="Minimum engagement rate">
          <Dropdown
            ariaLabel="Minimum engagement rate"
            className="w-full"
            displayValue={engagement === "3%+" ? "3.0%" : engagement}
            onChange={setEngagement}
            onOther={(value) =>
              setCustomEngagement((current) =>
                current.includes(value) ? current : [...current, value],
              )
            }
            options={options}
            otherLabel="Other, type your own %"
            otherPlaceholder="For example, 3.5%+"
            value={engagement}
          />
        </SelectField>
        <p className="mt-1.5 text-[12px] leading-4 text-tertiary">
          Median for beauty creators 10K–1L: 3.1%
        </p>
      </div>
    </>
  );
}
function UgcMetrics() {
  const [minimum, setMinimum] = useState(3);
  const [maximum, setMaximum] = useState(10);
  const [turnaround, setTurnaround] = useState("Within 5 days");
  return (
    <>
      <section className="mt-5">
        <div className="flex items-center justify-between gap-4 text-[12px] font-medium leading-4">
          <span className="text-ink">Portfolio</span>
          <span className="text-secondary">
            {minimum} – {maximum} UGC videos
          </span>
        </div>
        <DualRange
          minimum={minimum}
          maximum={maximum}
          onMinimum={setMinimum}
          onMaximum={setMaximum}
        />
      </section>
      <div className="relative z-10 mt-5">
        <SelectField label="Turnaround">
          <Dropdown
            ariaLabel="Turnaround"
            className="w-full"
            onChange={setTurnaround}
            options={[
              "Within 2 days",
              "Within 3 days",
              "Within 4 days",
              "Within 5 days",
              "Within 7 days",
            ]}
            value={turnaround}
          />
        </SelectField>
      </div>
    </>
  );
}
function DualRange({
  minimum,
  maximum,
  onMinimum,
  onMaximum,
}: {
  minimum: number;
  maximum: number;
  onMinimum: (value: number) => void;
  onMaximum: (value: number) => void;
}) {
  return (
    <div className="relative mt-2 h-4">
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 bg-primary"
        style={{ left: `${minimum}%`, right: `${100 - maximum}%` }}
      />
      <Range
        label="Minimum followers"
        value={minimum}
        onChange={(value) => onMinimum(Math.min(value, maximum))}
      />
      <Range
        label="Maximum followers"
        value={maximum}
        onChange={(value) => onMaximum(Math.max(value, minimum))}
      />
    </div>
  );
}
function Range({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      aria-label={label}
      className="pointer-events-none absolute inset-0 h-4 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
      max="100"
      min="1"
      onChange={(event) => onChange(Number(event.target.value))}
      type="range"
      value={value}
    />
  );
}
function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <p className="mb-1.5 text-[12px] font-medium leading-4 text-ink">{label}</p>
      {children}
    </div>
  );
}

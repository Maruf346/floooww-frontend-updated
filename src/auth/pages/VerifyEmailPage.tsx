import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";
import { OtpInput } from "@/auth/components/OtpInput";
import { parseRole } from "@/auth/data/roles";
import { Progress } from "./SignupPage";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = parseRole(params.get("role")) ?? "brand";
  const email = params.get("email") ?? "ananya@minimalist.in";
  const complete = () => navigate(`/onboarding/${role}`);
  return (
    <AuthLayout>
      <div className="w-full max-w-[440px]">
        <Progress step={3} />
        <p className="mt-3 text-[12px] font-semibold tracking-[1px] text-primary">
          SIGN UP · STEP 3 OF 3
        </p>
        <h1 className="mt-3 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">
          Check your email
        </h1>
        <p className="mt-2 text-[15px] leading-[22px] text-[#6b7280]">
          Enter the 6-digit code we sent to {email}.
        </p>
        <div className="mt-4">
          <OtpInput onComplete={complete} />
        </div>
        <Button
          fullWidth
          className="mt-4 rounded-[8px]"
          onClick={complete}
          trailingIcon={<ArrowRight size={16} />}
        >
          Verify and continue
        </Button>
        <p className="mt-4 text-[13px] text-[#4b5563]">
          Wrong email?{" "}
          <Link className="font-semibold text-link hover:underline" to={ROUTES.signup}>
            Go back and change it.
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

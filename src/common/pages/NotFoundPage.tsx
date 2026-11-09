import { ArrowLeft } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-gradient-to-b from-subtle to-white px-6 text-center">
      <Logo variant="nav" />
      <div>
        <p className="font-inter-semibold text-[12px] font-semibold uppercase leading-4 tracking-[1.68px] text-primary">
          404
        </p>
        <h1 className="mt-3 font-inter-bold text-[32px] font-bold leading-10 text-ink">
          This page doesn’t exist.
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-body">
          The link may be broken, or the page may have moved.
        </p>
      </div>
      <Button to={ROUTES.home} leadingIcon={<ArrowLeft size={16} strokeWidth={2} />}>
        Back to home
      </Button>
    </div>
  );
}

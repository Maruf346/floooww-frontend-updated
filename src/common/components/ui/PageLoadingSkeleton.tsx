import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { Footer } from "@/landing/components/layout/Footer";
import { Header } from "@/landing/components/layout/Header";

interface SkeletonProps {
  className?: string;
}

/** A neutral layout placeholder. It intentionally carries no content semantics. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <span aria-hidden="true" className={`skeleton-shimmer block bg-muted ${className}`} />;
}

/** WEB-L1: the responsive marketing-page loading layout. */
export function PageLoadingSkeleton() {
  return (
    <section aria-label="Loading page" aria-live="polite" className="flex flex-col items-center gap-10 px-5 py-16 sm:gap-14 sm:px-8 sm:py-24 lg:px-[120px] lg:py-24">
      <div className="flex w-full max-w-[720px] flex-col items-center gap-4">
        <Skeleton className="h-[22px] w-[140px] rounded-full" />
        <Skeleton className="h-10 w-full rounded-[10px] sm:h-12" />
        <Skeleton className="h-10 w-[72%] rounded-[10px] sm:h-12" />
        <Skeleton className="h-[18px] w-[78%] rounded-lg" />
        <Skeleton className="h-[18px] w-[58%] rounded-lg" />
        <div className="flex gap-3 pt-3">
          <Skeleton className="h-12 w-32 rounded-xl sm:w-40" />
          <Skeleton className="h-12 w-28 rounded-xl sm:w-[140px]" />
        </div>
      </div>

      <div className="grid w-full max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {[0, 1, 2].map((card) => (
          <div key={card} className="overflow-hidden rounded-[20px] border border-muted">
            <Skeleton className="h-44 w-full rounded-none sm:h-[200px]" />
            <div className="flex flex-col gap-2.5 px-[22px] pt-3.5 pb-[22px]">
              <Skeleton className="h-5 w-[90px] rounded-full" />
              <Skeleton className="h-5 w-[85%] rounded-lg" />
              <Skeleton className="h-5 w-[65%] rounded-lg" />
              <Skeleton className="mt-0.5 h-3.5 w-[78%] rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 text-[14px] font-medium leading-[21px] text-secondary">
        <span aria-hidden="true" className="spinner-arc size-[18px]" />
        <span>Loading…</span>
      </div>
    </section>
  );
}

/**
 * Router fallback that remains visually quiet for fast transitions. A skeleton
 * appears only when the pending page has exceeded the 300 ms design threshold.
 */
export function DelayedPageLoading() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return <div className="min-h-dvh bg-white" aria-hidden="true" />;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageLoadingSkeleton />
      </main>
      <Footer />
    </div>
  );
}

/** Displays the same fallback for lazy route transitions after the 300 ms threshold. */
export function NavigationLoadingOverlay() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 300);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <PageLoadingSkeleton />
        </main>
        <Footer />
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Footer } from "@/landing/components/layout/Footer";
import { Header } from "@/landing/components/layout/Header";

export function LandingLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

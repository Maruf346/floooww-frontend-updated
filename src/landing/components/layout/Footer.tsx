import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Container } from "@/common/components/ui/Container";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { ROUTES } from "@/common/constants/routes";
import { scrollToTop } from "@/common/utils/scroll";
import {
  FOOTER_COLUMNS,
  FOOTER_LEGAL,
  FOOTER_SOCIALS,
  FOOTER_TAGLINE,
  type FooterLink,
} from "@/landing/data/footer";

const LINK_CLASSES =
  "font-inter-medium text-[14px] font-medium leading-[22px] text-tertiary transition-colors duration-300 hover:text-white";

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.href) {
    return (
      <a href={link.href} className={LINK_CLASSES}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.to ?? ROUTES.home} className={LINK_CLASSES}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse text-white">
      <Container className="pb-8 pt-16 lg:pt-20">
        <RevealGroup
          stagger={0.08}
          amount={0.15}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]"
        >
          <RevealItem className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to={ROUTES.home} aria-label="Floooww home" className="inline-flex rounded-sm">
              <Logo theme="on-dark" />
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-[22px] text-tertiary">
              {FOOTER_TAGLINE}
            </p>
            <ul className="mt-6 flex gap-2.5" aria-label="Floooww on social media">
              {FOOTER_SOCIALS.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Floooww on ${social.platform}`}
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                  >
                    <PlatformLogo platform={social.platform} variant="White" size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {FOOTER_COLUMNS.map((column) => (
            <RevealItem key={column.title}>
              <p className="font-inter-semibold text-[12px] font-semibold uppercase leading-4 tracking-[1.68px] text-secondary">
                {column.title}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] leading-5 text-secondary">
            © {year} {FOOTER_LEGAL}
          </p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="group inline-flex items-center gap-2 font-inter-medium text-[13px] font-medium leading-[18px] text-tertiary transition-colors duration-300 hover:text-white"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-white/10 transition-[transform,border-color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-white/25">
              <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
            </span>
          </button>
        </div>
      </Container>
    </footer>
  );
}

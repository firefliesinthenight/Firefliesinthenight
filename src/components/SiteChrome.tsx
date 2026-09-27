"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// The memoir's chapter and appendix pages are a fully immersive, edge-to-edge
// cinematic reading experience in the original design — no site nav or
// footer, just the content and the floating soundtrack player. The book's
// own table-of-contents page keeps the normal site chrome.
const IMMERSIVE_PATTERN = /^\/sitting-with-buyahka\/buyahka-and-abrar\/(chapter-|preview-chapter-|preview-appendix-|appendix-)/;

export function SiteHeaderGate() {
  const pathname = usePathname();
  if (IMMERSIVE_PATTERN.test(pathname)) return null;
  return <SiteHeader />;
}

export function SiteFooterGate() {
  const pathname = usePathname();
  if (IMMERSIVE_PATTERN.test(pathname)) return null;
  return <SiteFooter />;
}

export function MainPaddingGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = IMMERSIVE_PATTERN.test(pathname);
  return (
    <main id="main-content" className={immersive ? "flex-1" : "flex-1 pt-24 sm:pt-28 lg:pt-36"}>
      {children}
    </main>
  );
}

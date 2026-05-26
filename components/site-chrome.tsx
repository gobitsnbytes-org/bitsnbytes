"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { PageBackground } from "@/components/page-background";
import { FloatingAiAssistant } from "@/components/client-only-components";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPosterRoute = pathname === "/fork";

  if (isPosterRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <PageBackground />
      <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden">
        <Navigation />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <FloatingAiAssistant />
        </Suspense>
      </div>
    </>
  );
}

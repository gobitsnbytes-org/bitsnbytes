"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import LumaSpin from "@/components/ui/luma-spin";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <LumaSpin />
            </div>
          }
        >
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}


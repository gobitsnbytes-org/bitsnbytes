import type { Metadata } from "next";

import { ForkScroll } from "./fork-scroll";

export const metadata: Metadata = {
  title: "Bits&Bytes Forks",
  description: "Apply to lead your city's Bits&Bytes fork.",
};

const applyUrl =
  "https://perfect-dinghy-781.notion.site/33a49ed2fc33800984e7c28ca3d7cd2a?pvs=105";

export default function ForkPage() {
  return <ForkScroll applyUrl={applyUrl} />;
}

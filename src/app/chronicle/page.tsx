import type { Metadata } from "next";
import TheChronicle from "@/components/folios/TheChronicle";

export const metadata: Metadata = {
  title: "The Chronicle",
  description:
    "Four years, charted — from a first production deploy in 2022 to the systems behind a regulated trading floor in Dubai.",
  alternates: { canonical: "/chronicle" },
};

export default function Page() {
  return <TheChronicle />;
}

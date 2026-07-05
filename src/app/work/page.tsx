import type { Metadata } from "next";
import TheWorks from "@/components/folios/TheWorks";

export const metadata: Metadata = {
  title: "The Works",
  description:
    "Selected works from four years of building — trading platforms, e-commerce, marketplaces, and operations systems. All still running.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <TheWorks />;
}

import type { Metadata } from "next";
import ThePractice from "@/components/folios/ThePractice";

export const metadata: Metadata = {
  title: "The Practice",
  description:
    "Six services, one way of working: discovery, proposal, development, delivery. The full price known upfront — and you own everything.",
  alternates: { canonical: "/practice" },
};

export default function Page() {
  return <ThePractice />;
}

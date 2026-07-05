import type { Metadata } from "next";
import TheCorrespondence from "@/components/folios/TheCorrespondence";

export const metadata: Metadata = {
  title: "Correspondence",
  description:
    "For CTO and partner-level conversations, senior engineering roles, and serious freelance work. Remote from Dubai, UTC+4. Replies within twenty-four hours.",
  alternates: { canonical: "/correspondence" },
};

export default function Page() {
  return <TheCorrespondence />;
}

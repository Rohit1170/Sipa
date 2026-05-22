import type { Metadata } from "next";
import PolicyClient from "./PolicyClient";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description:
    "Read SIPA Nutrition's return and refund policy. We offer hassle-free returns within 7 days of delivery for all orders.",
  alternates: { canonical: "https://www.sipanutrition.com/policy" },
};

export default function PolicyPage() {
  return <PolicyClient />;
}

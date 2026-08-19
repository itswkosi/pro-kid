import type { Metadata } from "next";

import { ProKidToolApp } from "@/components/tool/ProKidToolApp";

export const metadata: Metadata = {
  title: "PRO-KID Tool | PRO-KID",
  description:
    "A pediatric patient-reported outcome tool for children and youth with kidney disease.",
};

export default function ProKidToolPage() {
  return <ProKidToolApp />;
}
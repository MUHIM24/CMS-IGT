import type { Metadata } from "next";
import { AnalyticsView } from "@/components/admin/AnalyticsView";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Analitik" };

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analitik" subtitle="Data kunjungan dan performa website" />
      <AnalyticsView />
    </>
  );
}

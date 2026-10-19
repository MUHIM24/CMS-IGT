import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structured-data";

// Layout situs publik (route group, tidak memengaruhi URL). Dashboard /admin punya layout sendiri.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebsiteSchema()} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}

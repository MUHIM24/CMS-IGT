import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/content/page-seo";
import { LegalPage } from "@/components/shared/LegalPage";
import { termsOfService } from "@/lib/content/legal";

export const metadata = pageMetadata(pageSeo.terms);

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService} />;
}

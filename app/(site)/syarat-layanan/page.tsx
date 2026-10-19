import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/LegalPage";
import { termsOfService } from "@/lib/content/legal";

export const metadata = pageMetadata({
  title: `${termsOfService.title} | PT IGT`,
  description: termsOfService.description,
  path: termsOfService.path,
});

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService} />;
}

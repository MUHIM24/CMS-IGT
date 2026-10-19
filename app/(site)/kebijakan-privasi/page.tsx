import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/content/page-seo";
import { LegalPage } from "@/components/shared/LegalPage";
import { privacyPolicy } from "@/lib/content/legal";

export const metadata = pageMetadata(pageSeo.privacy);

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}

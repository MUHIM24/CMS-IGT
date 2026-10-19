import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/shared/LegalPage";
import { privacyPolicy } from "@/lib/content/legal";

export const metadata = pageMetadata({
  title: `${privacyPolicy.title} | PT IGT`,
  description: privacyPolicy.description,
  path: privacyPolicy.path,
});

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}

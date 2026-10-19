import { pageMetadata } from "@/lib/seo";
import { BlogExplorer } from "@/components/sections/blog/BlogExplorer";
import { CtaCard } from "@/components/shared/CtaCard";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = pageMetadata({
  title: "Blog dan Artikel | PT IGT",
  description:
    "Artikel seputar SLIK OJK, loan origination system, digitalisasi proses kredit, dan tips membangun sistem untuk bisnis pembiayaan.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        path="/blog"
        crumb="Artikel"
        titleLead="Blog"
        titleAccent="dan Artikel"
        subtitle="Insight seputar teknologi, regulasi, dan digitalisasi untuk mendukung pertumbuhan bisnis Anda."
        image={{
          src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=960&h=600&fit=crop&auto=format",
          alt: "Menulis artikel di laptop",
        }}
        withOverlap
      />
      <BlogExplorer />
      <CtaCard
        title="Punya Kebutuhan Sistem Serupa?"
        subtitle="Diskusikan kebutuhan Anda dengan tim kami, konsultasi gratis tanpa komitmen."
      />
    </>
  );
}

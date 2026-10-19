import { ogSize, renderOgImage } from "@/lib/og-image";
import { articles, getArticle } from "@/lib/content/articles";

export const alt = "Artikel PT IGT";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  return renderOgImage({
    label: article?.category ?? "Artikel",
    heading: article?.title ?? "Artikel PT IGT",
    subheading: "Artikel dari Tim PT IGT",
  });
}

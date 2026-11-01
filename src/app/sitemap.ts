// Required for metadata route generation with Next.js static export.
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { allArticles } from '@/lib/articles';
import { siteOrigin } from '@/lib/metadata';
import { locales } from '@/lib/validation';
export default function sitemap():MetadataRoute.Sitemap {
  const sections=['','about','sectors','process','insights','contact','sectors/natural-stone','sectors/food-products','sectors/industrial-materials'];
  const pages=locales.flatMap(l=>sections.map(section=>({url:`${siteOrigin}/${l}/${section?section+'/':''}`,changeFrequency:'monthly' as const,priority:section?0.6:1})));
  const articles=allArticles().map(article=>({url:`${siteOrigin}/${article.language}/insights/${article.slug}/`,lastModified:article.date,changeFrequency:'monthly' as const,priority:0.7}));
  return [...pages,...articles];
}

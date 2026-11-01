// Required for metadata route generation with Next.js static export.
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/metadata';
export default function robots():MetadataRoute.Robots {return {rules:{userAgent:'*',allow:'/'},sitemap:`${siteOrigin}/sitemap.xml`};}

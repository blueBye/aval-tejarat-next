import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { allArticles, articleBySlug, translatedArticle } from '@/lib/articles';
import { isLocale } from '@/lib/validation';
import { copy } from '@/lib/i18n';
import { siteOrigin } from '@/lib/metadata';
import { CtaSection } from '@/components/cta-section';
import type { Locale } from '@/lib/types';

type Props = {params: Promise<{locale:string;slug:string}>};
export const dynamicParams = false;
export function generateStaticParams({params}:{params:{locale:string}}) {
  return allArticles().filter(a => a.language === params.locale).map(({slug}) => ({slug}));
}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {locale,slug} = await params;
  if (!isLocale(locale)) return {};
  const article = articleBySlug(locale,slug);
  if (!article) return {};
  const languages = Object.fromEntries((['en','fa','ar'] as Locale[]).flatMap(l => {
    const translated = translatedArticle(article,l);
    return translated ? [[l,`/${l}/blog/${translated.slug}/`]] : [];
  }));
  return {title:article.title,description:article.description,
    alternates:{canonical:`/${locale}/blog/${slug}/`,languages},
    openGraph:{title:article.title,description:article.description,type:'article',
      url:`${siteOrigin}/${locale}/blog/${slug}/`,publishedTime:article.date,
      images:article.cover ? [{url:article.cover,alt:article.coverAlt || article.title}] : undefined}};
}
export default async function ArticlePage({params}:Props) {
  const {locale,slug} = await params;
  if (!isLocale(locale)) notFound();
  const article = articleBySlug(locale,slug);
  if (!article) notFound();
  const t = copy[locale];
  return <>
    <section className="article-header">
      <div className="container article-detail-inner">
        <div className="article-header-copy">
          <Link href={`/${locale}/blog/`} className="sector-back"><ArrowLeft size={16}/>{t.viewAll}</Link>
          <div className="section-eyebrow light">{article.category}</div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-meta"><time dateTime={article.date}>{article.date}</time><span aria-hidden="true">•</span><span>{locale==='fa'?'وبلاگ سنگ':locale==='ar'?'مدونة الحجر':'STONE BLOG'}</span></div>
        </div>
        <figure className="article-hero-photo">
          <img src={article.cover ?? '/illustrations/stone.svg'} alt={article.coverAlt || ''} loading="eager" decoding="async"/>
          {article.coverSource && <figcaption><a href={article.coverSource} target="_blank" rel="noopener noreferrer">{article.coverCredit || 'Photo: Wikimedia Commons'} <ArrowUpRight size={12}/></a></figcaption>}
        </figure>
      </div>
    </section>
    <article className="article-body" dir={locale==='en'?'ltr':'rtl'}>
      <div className="article-body-inner">
        <div className="prose" dangerouslySetInnerHTML={{__html:article.html}}/>
        <div className="article-end-link"><Link href={`/${locale}/blog/`} className="text-link">{t.viewAll}<ArrowUpRight size={16}/></Link></div>
      </div>
    </article>
    <CtaSection locale={locale}/>
  </>;
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { allArticles, articleBySlug, translatedArticle } from '@/lib/articles';
import { isLocale } from '@/lib/validation';
import { copy } from '@/lib/i18n';
import { siteOrigin } from '@/lib/metadata';
import { CtaSection } from '@/components/cta-section';
import type { Locale } from '@/lib/types';
type Props={params:Promise<{locale:string;slug:string}>};
export const dynamicParams=false;
export function generateStaticParams({params}:{params:{locale:string}}){return allArticles().filter(a=>a.language===params.locale).map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,slug}=await params;if(!isLocale(locale))return {};
  const article=articleBySlug(locale,slug);if(!article)return {};
  const languages=Object.fromEntries((['en','fa','ar'] as Locale[]).flatMap(l=>{const translated=translatedArticle(article,l);return translated?[[l,`/${l}/journal/${translated.slug}/`]]:[];}));
  return {title:article.title,description:article.description,alternates:{canonical:`/${locale}/journal/${slug}/`,languages},openGraph:{title:article.title,description:article.description,type:'article',url:`${siteOrigin}/${locale}/journal/${slug}/`,publishedTime:article.date}};
}
export default async function ArticlePage({params}:Props){
  const {locale,slug}=await params;if(!isLocale(locale))notFound();
  const article=articleBySlug(locale,slug);if(!article)notFound();
  const t=copy[locale];
  return <><section className="article-header"><div className="container article-head-inner"><Link href={`/${locale}/journal/`} className="sector-back"><ArrowLeft size={16}/>{t.viewAll}</Link><div className="section-eyebrow light">{article.category} / <time dateTime={article.date}>{article.date}</time></div><h1>{article.title}</h1><p>{article.description}</p></div></section><article className="container article-body">{article.cover&&<div className="article-cover"><img src={article.cover} alt=""/></div>}<div className="prose" dangerouslySetInnerHTML={{__html:article.html}}/></article><CtaSection locale={locale}/></>;
}

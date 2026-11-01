import Link from 'next/link';
import { ArrowUpRight, Compass } from 'lucide-react';
import { PageIntro } from '@/components/page-intro';
import { Reveal } from '@/components/reveal';
import { copy } from '@/lib/i18n';
import { articlesByLanguage } from '@/lib/articles';
import { isLocale } from '@/lib/validation';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};return {title:copy[locale].blogTitle,alternates:{canonical:`/${locale}/blog/`,languages:{en:'/en/blog/',fa:'/fa/blog/',ar:'/ar/blog/'}}};}
export default async function Blog({params}:Props){
  const {locale}=await params;if(!isLocale(locale))notFound();
  const t=copy[locale],articles=articlesByLanguage(locale);
  return <><PageIntro eyebrow={locale==="fa"?"وبلاگ سنگ / ۰۴":locale==="ar"?"مدونة الحجر / ٠٤":"STONE BLOG / 04"} title={t.blogTitle} text={t.blogText}/><section className="section"><div className="container">{articles.length?<div className="journal-grid">{articles.map((a,i)=><Reveal key={a.slug} delay={i%3*90}><Link href={`/${locale}/blog/${a.slug}/`} className="journal-card"><div className="journal-thumb"><img src={a.cover ?? '/illustrations/stone.svg'} alt={a.coverAlt || ""} loading="lazy" decoding="async"/><span>{a.category}</span><Compass className="journal-deco" size={44}/></div><div className="journal-text"><time dateTime={a.date}>{a.date}</time><h2>{a.title}</h2><p>{a.description}</p><span>{t.readStory}<ArrowUpRight size={16}/></span></div></Link></Reveal>)}</div>:<div className="empty-journal"><Compass size={38}/><h2>{t.articleEmpty}</h2></div>}</div></section></>;
}

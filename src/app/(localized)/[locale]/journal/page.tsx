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
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};return {title:copy[locale].journalTitle,alternates:{canonical:`/${locale}/journal/`,languages:{en:'/en/journal/',fa:'/fa/journal/',ar:'/ar/journal/'}}};}
export default async function Journal({params}:Props){
  const {locale}=await params;if(!isLocale(locale))notFound();
  const t=copy[locale],articles=articlesByLanguage(locale);
  return <><PageIntro eyebrow={locale==="fa"?"دانستنی‌ها / ۰۴":locale==="ar"?"مقالات تجارية / ٠٤":"FIELD NOTES / 04"} title={t.journalTitle} text={t.journalText}/><section className="section"><div className="container">{articles.length?<div className="journal-grid">{articles.map((a,i)=><Reveal key={a.slug} delay={i%3*90}><Link href={`/${locale}/journal/${a.slug}/`} className="journal-card"><div className="journal-thumb"><img src={a.cover ?? '/illustrations/industry.svg'} alt="" loading="lazy"/><span>{a.category}</span><Compass className="journal-deco" size={44}/></div><div className="journal-text"><time dateTime={a.date}>{a.date}</time><h2>{a.title}</h2><p>{a.description}</p><span>{t.readStory}<ArrowUpRight size={16}/></span></div></Link></Reveal>)}</div>:<div className="empty-journal"><Compass size={38}/><h2>{t.articleEmpty}</h2></div>}</div></section></>;
}

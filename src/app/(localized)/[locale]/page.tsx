import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, MoveUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HeroArt } from "@/components/hero-art";
import { SectorCard } from "@/components/sector-card";
import { CtaSection } from "@/components/cta-section";
import { copy,sectorIds } from "@/lib/i18n";
import { articlesByLanguage } from "@/lib/articles";
import { isLocale } from "@/lib/validation";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/types";

type Props={params:Promise<{locale:string}>};
export default async function Home({params}:Props){
  const {locale:raw}=await params;if(!isLocale(raw))notFound();const locale:Locale=raw;const t=copy[locale];
  const articles=articlesByLanguage(locale).slice(0,3);
  return <>
    <section className="hero"><div className="hero-bloom"/><div className="container hero-inner"><div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="eyebrow-line"/>{t.eyebrow}</div><h1>{t.hero1}<br/><em>{t.heroAccent}</em><br/>{t.hero2}</h1><p className="hero-description">{t.heroText}</p><div className="hero-buttons"><Link className="button button-gold" href={`/${locale}/contact`}>{t.primaryCTA}<ArrowUpRight size={19}/></Link><Link className="text-link light-link" href={`/${locale}/sectors`}>{t.secondaryCTA}<ArrowRight size={18}/></Link></div></div><HeroArt/></div><div className="container hero-bottom"><div className="hero-benefits">{t.heroSmall.map((b,i)=><span key={i}><span className="benefit-star">✳</span>{b}</span>)}</div><a className="scroll-indicator" href="#philosophy" aria-label="Scroll to next section"><ArrowDown size={19}/></a></div></section>
    <section className="philosophy-section section" id="philosophy"><div className="container philosophy-grid"><Reveal><div className="section-eyebrow">{t.introTag}</div><h2 className="section-title large-title">{t.introTitle}</h2></Reveal><Reveal delay={140}><div className="philosophy-copy"><p>{t.introText}</p><Link className="text-link" href={`/${locale}/about`}>{t.nav[1]}<ArrowUpRight size={18}/></Link><div className="philosophy-quote"><span>“</span><blockquote>{t.introQuote}</blockquote></div></div></Reveal></div></section>
    <section className="sectors-section section"><div className="container"><Reveal><div className="section-eyebrow">{t.sectorsTag}</div><div className="section-split"><h2 className="section-title">{t.sectorsTitle}</h2><p>{t.sectorsText}</p></div></Reveal><div className="sectors-grid">{sectorIds.map((id,i)=><Reveal delay={i*100} key={id}><SectorCard locale={locale} id={id} index={i}/></Reveal>)}</div></div></section>
    <section className="process-section section"><div className="container"><Reveal><div className="section-eyebrow">{t.processTag}</div><div className="section-split"><h2 className="section-title">{t.processTitle}</h2><p>{t.processText}</p></div></Reveal><div className="steps-grid">{t.steps.map((step,i)=><Reveal delay={i*75} key={i}><div className="step-card"><span className="step-index">0{i+1}<span className="step-stroke"/></span><h3>{step.title}</h3><p>{step.description}</p>{i<3&&<MoveUpRight className="step-arrow" size={20}/>}</div></Reveal>)}</div></div></section>
    {articles.length>0&&<section className="journal-section section"><div className="container"><Reveal><div className="section-eyebrow">{t.blogTag}</div><div className="section-split"><h2 className="section-title">{t.blogTitle}</h2><div><p>{t.blogText}</p><Link className="text-link" href={`/${locale}/blog`}>{t.viewAll}<ArrowUpRight size={18}/></Link></div></div></Reveal><div className="journal-grid">{articles.map((a,i)=><Reveal delay={i*90} key={a.slug}><Link className="journal-card" href={`/${locale}/blog/${a.slug}`}><div className="journal-thumb"><img src={a.cover ?? "/illustrations/stone.svg"} alt={a.coverAlt || ""} loading="lazy" decoding="async"/><span>{a.category}</span><Compass className="journal-deco" size={44}/></div><div className="journal-text"><time dateTime={a.date}>{a.date}</time><h3>{a.title}</h3><p>{a.description}</p><span>{t.readStory}<ArrowUpRight size={17}/></span></div></Link></Reveal>)}</div></div></section>}
    <CtaSection locale={locale}/>
  </>;
}

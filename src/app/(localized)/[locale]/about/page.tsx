import type { Metadata } from "next";
import { localizedPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { copy } from "@/lib/i18n";
import { isLocale } from "@/lib/validation";
import { notFound } from "next/navigation";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 return localizedPageMetadata(locale,"about",copy[locale].aboutTitle,copy[locale].aboutText);
}
export default async function About({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();const t=copy[locale];return <><PageIntro eyebrow={locale==="fa"?"درباره ما / ۰۱":locale==="ar"?"من نحن / ٠١":"ABOUT AVAL / 01"} title={t.aboutTitle} text={t.aboutText}/><section className="section"><div className="container"><div className="about-values">{t.aboutPoints.map((p,i)=><Reveal delay={i*90} key={i}><div className="value-card"><span className="value-icon"><Check size={24}/></span><span className="value-count">0{i+1}</span><h2>{p.title}</h2><p>{p.description}</p></div></Reveal>)}</div><div className="about-wide"><div className="about-wide-icon">✳</div><h2>{t.introQuote}</h2><Link href={`/${locale}/process`} className="text-link">{t.nav[3]}<ArrowUpRight size={18}/></Link></div></div></section><CtaSection locale={locale}/></>}

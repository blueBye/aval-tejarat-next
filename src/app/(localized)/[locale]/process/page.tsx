import type { Metadata } from "next";
import { localizedPageMetadata } from "@/lib/page-metadata";
import { PageIntro } from "@/components/page-intro";
import { CtaSection } from "@/components/cta-section";
import { Reveal } from "@/components/reveal";
import { copy } from "@/lib/i18n";
import { isLocale } from "@/lib/validation";
import { notFound } from "next/navigation";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 return localizedPageMetadata(locale,"process",copy[locale].servicesTitle,copy[locale].servicesText);
}
export default async function Process({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();const t=copy[locale];return <><PageIntro eyebrow={locale==="fa"?"فرآیند همکاری / ۰۳":locale==="ar"?"آلية العمل / ٠٣":"THE PROCESS / 03"} title={t.servicesTitle} text={t.servicesText}/><section className="section"><div className="container"><div className="process-timeline">{t.steps.map((s,i)=><Reveal key={i}><div className="timeline-step"><div className="timeline-num">0{i+1}<span/></div><div className="timeline-content"><h2>{s.title}</h2><p>{s.description}</p></div><span className="timeline-direction">↗</span></div></Reveal>)}</div></div></section><CtaSection locale={locale}/></>}

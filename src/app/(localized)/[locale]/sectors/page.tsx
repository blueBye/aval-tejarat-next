import type { Metadata } from "next";
import { localizedPageMetadata } from "@/lib/page-metadata";
import { PageIntro } from "@/components/page-intro";
import { CtaSection } from "@/components/cta-section";
import { SectorCard } from "@/components/sector-card";
import { Reveal } from "@/components/reveal";
import { copy,sectorIds } from "@/lib/i18n";
import { isLocale } from "@/lib/validation";
import { notFound } from "next/navigation";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 return localizedPageMetadata(locale,"sectors",copy[locale].sectorsTitle,copy[locale].sectorsText);
}
export default async function Sectors({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();const t=copy[locale];return <><PageIntro eyebrow={locale==="fa"?"انواع سنگ / ۰۲":locale==="ar"?"أنواع الحجر / ٠٢":"OUR STONE COLLECTION / 02"} title={t.sectorsTitle} text={t.sectorsText}/><section className="section"><div className="container"><div className="sectors-grid">{sectorIds.map((id,i)=><Reveal key={id} delay={i*90}><SectorCard id={id} locale={locale} index={i}/></Reveal>)}</div></div></section><CtaSection locale={locale}/></>}

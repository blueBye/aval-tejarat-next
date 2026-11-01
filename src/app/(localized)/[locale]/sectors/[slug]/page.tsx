import type { Metadata } from "next";
import { localizedPageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft,ArrowUpRight,CheckCircle2 } from "lucide-react";
import { copy, sectorArt, sectorIds } from "@/lib/i18n";
import { CtaSection } from "@/components/cta-section";
import { isLocale } from "@/lib/validation";
import type { SectorId } from "@/lib/types";
type Props={params:Promise<{locale:string;slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale,slug}=await params;
 if(!isLocale(locale)||!sectorIds.includes(slug as SectorId))return {};
 const item=copy[locale].sectors[slug as SectorId];
 return localizedPageMetadata(locale,`sectors/${slug}`,item.name,item.description);
}
export const dynamicParams=false;
export function generateStaticParams(){return sectorIds.map(slug=>({slug}));}
export default async function SectorDetail({params}:Props){const {locale,slug}=await params;if(!isLocale(locale)||!sectorIds.includes(slug as SectorId))notFound();const id=slug as SectorId,t=copy[locale],sector=t.sectors[id];return <><section className="sector-detail-hero"><div className="container sector-detail-inner"><div><Link href={`/${locale}/sectors`} className="sector-back"><ArrowLeft size={16}/>{t.nav[2]}</Link><div className="section-eyebrow light">{locale==="fa"?"انواع سنگ":locale==="ar"?"أنواع الحجر":"STONE COLLECTION"} / {String(sectorIds.indexOf(id)+1).padStart(2,"0")}</div><h1>{sector.name}</h1><p>{sector.description}</p><Link className="button button-gold" href={`/${locale}/contact`}>{t.primaryCTA}<ArrowUpRight size={18}/></Link></div><div className="sector-detail-art"><img src={sectorArt[id]} alt=""/></div></div></section><section className="section"><div className="container"><div className="section-eyebrow">{t.sectorsTag}</div><h2 className="section-title detail-heading">{sector.name}</h2><div className="detail-items">{sector.items.map((item,i)=><div className="detail-item" key={i}><span>0{i+1}</span><div><h3>{item.name}</h3><p>{item.desc}</p></div><ArrowUpRight size={21}/></div>)}</div><div className="details-checklist"><div><div className="section-eyebrow">{locale==="fa"?"اطلاعات درخواست":locale==="ar"?"متطلبات الطلب":"REQUIREMENTS"}</div><h2>{t.sectorDetailsTitle}</h2></div><ul>{t.sectorDetails.map(d=><li key={d}><CheckCircle2 size={18}/>{d}</li>)}</ul></div></div></section><CtaSection locale={locale}/></>}

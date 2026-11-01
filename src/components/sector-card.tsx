import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy,sectorArt } from "@/lib/i18n";
import type { Locale,SectorId } from "@/lib/types";
export function SectorCard({locale,id,index}:{locale:Locale;id:SectorId;index:number}){
  const c=copy[locale];const sector=c.sectors[id];
  return <Link className="sector-card" href={`/${locale}/sectors/${id}`}><div className={`sector-visual sector-${index}`}><img src={sectorArt[id]} alt="" loading="lazy"/><span className="sector-number">0{index+1} / 03</span></div><div className="sector-card-copy"><div><h3>{sector.name}</h3><p>{sector.description}</p></div><span className="sector-go" aria-label={c.explore}><ArrowUpRight/></span></div></Link>;
}

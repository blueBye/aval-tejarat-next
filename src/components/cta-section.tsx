import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Reveal } from "./reveal";
export function CtaSection({locale}:{locale:Locale}) {const t=copy[locale];return <section className="cta-section"><div className="container"><Reveal><div className="cta-panel"><span className="section-eyebrow light">{locale==="fa"?"گام بعدی شما":locale==="ar"?"خطوتك التالية":"YOUR NEXT MOVE"} ↗</span><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p><Link href={`/${locale}/contact`} className="button button-cream">{t.ctaButton}<ArrowUpRight size={18}/></Link><div className="cta-orbit one"/><div className="cta-orbit two"/></div></Reveal></div></section>}

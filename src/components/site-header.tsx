"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
const routes=["","/about","/sectors","/process","/journal","/contact"];
export function SiteHeader({locale,articleSwitchMap}:{locale:Locale;articleSwitchMap:Record<string,Partial<Record<Locale,string>>>}) {
  const t=copy[locale]; const [open,setOpen]=useState(false);const pathname=usePathname()||`/${locale}`;
  const switched=(target:Locale)=>{
    const suffix=pathname.replace(/^\/(?:en|fa|ar)(?=\/|$)/,"");
    const article=/^\/journal\/([^/]+)\/?$/.exec(suffix);
    if(article){
      const targetSlug=articleSwitchMap[`${locale}:${article[1]}`]?.[target];
      return targetSlug?`/${target}/journal/${targetSlug}/`:`/${target}/journal/`;
    }
    return `/${target}${suffix||'/'}`;
  };
  return <header className="site-header">
    <div className="container nav-row">
      <Link className="brand" href={`/${locale}`} onClick={()=>setOpen(false)} aria-label="Aval Tejarat Persian home"><span className="brand-symbol">A<span className="brand-dot">.</span></span><span className="brand-copy"><b>{t.brand}</b><small>{t.subtitle}</small></span></Link>
      <nav className={`main-nav ${open?"nav-open":""}`} aria-label="Main navigation">
        {routes.map((route,i)=><Link key={route} onClick={()=>setOpen(false)} href={`/${locale}${route}`} className={pathname===`/${locale}${route}`?"active":""}>{t.nav[i]}</Link>)}
        <div className="mobile-lang"><LanguageSwitch locale={locale} switched={switched}/></div>
      </nav>
      <div className="nav-actions"><div className="desktop-lang"><LanguageSwitch locale={locale} switched={switched}/></div><Link className="nav-cta" href={`/${locale}/contact`}>{t.getInTouch}<ArrowUpRight size={15}/></Link></div>
      <button className="menu-toggle" type="button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
  </header>;
}
function LanguageSwitch({locale,switched}:{locale:Locale;switched:(l:Locale)=>string}) {
  return <div className="language-switch" aria-label="Choose language">{(["en","fa","ar"] as Locale[]).map(l=><Link key={l} href={switched(l)} className={l===locale?"selected":""} hrefLang={l}>{l.toUpperCase()}</Link>)}</div>
}

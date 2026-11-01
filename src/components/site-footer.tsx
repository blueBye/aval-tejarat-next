import Link from "next/link";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
const routes=["","/about","/sectors","/process","/blog","/contact"];
export function SiteFooter({locale}:{locale:Locale}) {
  const t=copy[locale];return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link className="footer-logo" href={`/${locale}`}>AVAL<span>.</span></Link><p>{t.footerText}</p></div><div className="footer-links">{routes.map((r,i)=><Link href={`/${locale}${r}`} key={r}>{t.nav[i]}</Link>)}</div><Link href={`/${locale}/contact`} className="footer-connect"><Globe2 size={23}/><span>{locale==="fa"?"ارتباط با ما":locale==="ar"?"تواصل معنا":"LET’S CONNECT"}</span><ArrowUpRight size={21}/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Aval Tejarat Persian</span><span>{t.footerLegal}</span></div></div></footer>;
}

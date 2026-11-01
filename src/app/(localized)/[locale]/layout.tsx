import '../../globals.css';
import '../../globe.css';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { isLocale, locales } from '@/lib/validation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { copy } from '@/lib/i18n';
import { allArticles } from '@/lib/articles';
import type { Locale } from '@/lib/types';
import { siteOrigin } from '@/lib/metadata';
import { dirooz, miremad } from '@/app/fonts';

type Props = { params: Promise<{ locale: string }>; children: ReactNode };
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({locale})); }
export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) return {};
  const t=copy[locale];
  return {
    title: {default:`${t.brand} ${t.subtitle} | Sourcing & Export`, template: '%s | Aval Tejarat Persian'},
    description: t.heroText, metadataBase: new URL(siteOrigin),
    alternates: {canonical: `/${locale}/`, languages: { en: '/en/', fa: '/fa/', ar: '/ar/', 'x-default': '/en/' }},
    openGraph: {type:'website',siteName:'Aval Tejarat Persian',title:`${t.hero1} ${t.heroAccent}`,description:t.heroText,locale},
    robots: {index:true,follow:true}
  };
}
export default async function LocaleLayout({ params, children }: Props) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const items=allArticles();
  const switchMap:Record<string,Partial<Record<Locale,string>>>={};
  for (const article of items){
    switchMap[`${article.language}:${article.slug}`]=Object.fromEntries(items.filter(a=>a.translationKey===article.translationKey).map(a=>[a.language,a.slug]));
  }
  return <html lang={locale} dir={locale === 'en' ? 'ltr' : 'rtl'} className={`${dirooz.variable} ${miremad.variable}`}><body><a href="#main-content" className="skip-link">Skip to content</a><noscript><style>{'.reveal{opacity:1!important;transform:none!important}'}</style></noscript><SiteHeader locale={locale} articleSwitchMap={switchMap}/><main id="main-content">{children}</main><SiteFooter locale={locale}/></body></html>;
}

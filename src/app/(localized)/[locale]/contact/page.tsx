import type { Metadata } from "next";
import { localizedPageMetadata } from "@/lib/page-metadata";
import { MessageCircle, Globe2, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { InquiryForm } from "@/components/inquiry-form";
import { copy } from "@/lib/i18n";
import { isLocale } from "@/lib/validation";
import { notFound } from "next/navigation";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))return {};
 return localizedPageMetadata(locale,"contact",copy[locale].contactTitle,copy[locale].contactText);
}
export default async function Contact({params}:Props){const {locale}=await params;if(!isLocale(locale))notFound();const t=copy[locale];return <><PageIntro eyebrow={locale==="fa"?"ارتباط با ما / ۰۵":locale==="ar"?"تواصل معنا / ٠٥":"LET'S CONNECT / 05"} title={t.contactTitle} text={t.contactText}/><section className="section contact-section"><div className="container contact-grid"><div className="contact-side"><span className="section-eyebrow">{locale==="fa"?"شرح درخواست تأمین":locale==="ar"?"متطلبات التوريد":"YOUR SOURCING BRIEF"}</span><h2>{t.introTitle}</h2><p>{t.introText}</p><div className="contact-facts"><div><Globe2 size={23}/><span>{t.tradingNote}</span></div><div><ShieldCheck size={23}/><span>{t.footerLegal}</span></div><div><MessageCircle size={23}/><span>{locale==="fa"?"واتساپ؛ بدون ذخیره اطلاعات":locale==="ar"?"واتساب؛ دون تخزين البيانات":"WhatsApp — no stored inquiries"}</span></div></div></div><InquiryForm locale={locale}/></div></section></>}

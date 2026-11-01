'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { copy } from '@/lib/i18n';
import { whatsappLink } from '@/lib/whatsapp';
import type { Locale } from '@/lib/types';

type Values = {name:string;email:string;company:string;product:string;destination:string;quantity:string;message:string};
const initial: Values = {name:'',email:'',company:'',product:'',destination:'',quantity:'',message:''};
const headers = {
  en: ['Hello Aval Tejarat Persian, I would like to discuss a sourcing inquiry.','Name','Email','Company','Product','Destination','Approx. quantity','Details'],
  fa: ['سلام، می‌خواهم درباره تأمین کالا استعلام بگیرم.','نام','ایمیل','شرکت','کالا','کشور مقصد','مقدار تقریبی','توضیحات'],
  ar: ['مرحباً، أرغب في الاستفسار عن توريد منتج.','الاسم','البريد الإلكتروني','الشركة','المنتج','بلد الوجهة','الكمية التقريبية','التفاصيل']
} as const;
export function InquiryForm({locale}:{locale:Locale}){
  const [form,setForm]=useState<Values>(initial);
  const t=copy[locale].form;
  const fields: {key:keyof Values;label:string;required?:boolean;type?:string}[] = [
    {key:'name',label:t.name,required:true},{key:'email',label:t.email,type:'email'},
    {key:'company',label:t.company},{key:'product',label:t.product,required:true},
    {key:'destination',label:t.destination,required:true},{key:'quantity',label:t.quantity},
  ];
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const titles=headers[locale];
    const values=[form.name,form.email,form.company,form.product,form.destination,form.quantity,form.message];
    const message=[titles[0],'',...values.flatMap((value,i)=>value.trim()?[`${titles[i+1]}: ${value.trim()}`]:[])].join('\n');
    const link=whatsappLink(message);
    if(link) window.open(link,'_blank','noopener,noreferrer');
  }
  const available=Boolean(whatsappLink('Hi'));
  return <form className="inquiry-form" onSubmit={submit}>
    <div className="form-heading"><MessageCircle size={25}/><div><b>{t.submit}</b><span>WhatsApp</span></div></div>
    <div className="form-fields">{fields.map(f=><label className="field" key={f.key}><span>{f.label}{f.required&&<span aria-hidden="true" className="required"> *</span>}</span><input type={f.type||'text'} value={form[f.key]} required={f.required} maxLength={180} onChange={e=>setForm(s=>({...s,[f.key]:e.target.value}))} placeholder={f.label}/></label>)}<label className="field full"><span>{t.message}</span><textarea rows={5} maxLength={3000} placeholder={t.message} value={form.message} onChange={e=>setForm(s=>({...s,message:e.target.value}))}/></label></div>
    <div className="form-bottom"><p><ShieldCheck size={16}/>{locale==='en'?'No data is saved here. WhatsApp opens with your message.':locale==='fa'?'هیچ اطلاعاتی در سایت ذخیره نمی‌شود؛ پیام در واتساپ باز خواهد شد.':'لا يتم حفظ البيانات هنا؛ تُفتح الرسالة في واتساب.'}</p><button className="button button-dark" type="submit" disabled={!available}><MessageCircle size={18}/>{t.submit}<ArrowUpRight size={17}/></button></div>
    {!available&&<p className="setup-warning" role="status">{locale==='en'?'WhatsApp is not configured yet. The site owner must set NEXT_PUBLIC_WHATSAPP_NUMBER.':locale==='fa'?'شماره واتساپ هنوز تنظیم نشده است. مدیر سایت باید NEXT_PUBLIC_WHATSAPP_NUMBER را ثبت کند.':'رقم واتساب غير مُعدّ بعد. يجب على المدير ضبط NEXT_PUBLIC_WHATSAPP_NUMBER.'}</p>}
  </form>;
}

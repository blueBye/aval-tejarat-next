import type { Metadata } from 'next';
import type { Locale } from './types';

export function localizedPageMetadata(locale:Locale, suffix:string, title:string, description:string):Metadata {
  const rest=suffix.replace(/^\/|\/$/g,'');
  const ending=rest?`${rest}/`:'';
  return {
    title, description,
    alternates:{canonical:`/${locale}/${ending}`,languages:{en:`/en/${ending}`,fa:`/fa/${ending}`,ar:`/ar/${ending}`}},
    openGraph:{title,description,type:'website'},
  };
}

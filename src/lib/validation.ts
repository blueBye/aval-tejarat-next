import type { Locale } from './types';
export const locales = ['en', 'fa', 'ar'] as const;
export function isLocale(input: string): input is Locale {
  return locales.includes(input as Locale);
}

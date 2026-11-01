export type Locale = 'en' | 'fa' | 'ar';
export type SectorId = 'natural-stone' | 'travertine' | 'marble' | 'granite';
export interface Article {
  slug: string;
  language: Locale;
  translationKey: string;
  title: string;
  description: string;
  date: string;
  category: string;
  cover?: string;
  coverAlt?: string;
  coverCredit?: string;
  coverSource?: string;
  featured: boolean;
  body: string;
  html: string;
}

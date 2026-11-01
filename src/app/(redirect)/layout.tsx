import '../globals.css';
import type { ReactNode } from 'react';
import { dirooz, miremad } from '@/app/fonts';
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en" className={`${dirooz.variable} ${miremad.variable}`}><body>{children}</body></html>; }

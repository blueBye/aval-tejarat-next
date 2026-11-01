import Link from 'next/link';
export default function ChooseLanguage() {
  return <main className="language-landing">
    <meta httpEquiv="refresh" content="0;url=/en/" />
    <span className="landing-symbol">A<span>.</span></span>
    <p>Choose your language / زبان خود را انتخاب کنید / اختر لغتك</p>
    <nav><Link href="/en/">English</Link><Link href="/fa/">فارسی</Link><Link href="/ar/">العربية</Link></nav>
  </main>;
}

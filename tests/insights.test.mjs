import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = p => fs.readFileSync(p,'utf8');
const folder = 'content/articles';
const topics = ['stone-types-for-buyers','stone-finishes-explained','stone-testing-specifications','stone-lot-variation','stone-export-packing'];
test('five natural stone buyer guides exist in all three languages with licensed photographic credits', () => {
  const credits=JSON.parse(read('content/IMAGE_CREDITS.json'));
  assert.equal(credits.length,5);
  for (const topic of topics) {
    for (const lang of ['en','fa','ar']) {
      const source=read(path.join(folder,`${lang}-${topic}.md`));
      for (const field of ['cover','coverCredit','coverSource','coverAlt','translationKey'])
        assert.match(source,new RegExp(`^${field}:`, 'm'),`${lang}-${topic}.md missing ${field}`);
      assert.ok(source.length>750,`${lang}-${topic}.md must contain a substantive guide`);
    }
  }
});
test('article hero image precedes clean reading column and keeps padding symmetric',()=>{
  const article = read('src/app/(localized)/[locale]/blog/[slug]/page.tsx');
  const css=read('src/app/globals.css');
  assert.match(article,/article-hero-photo/);
  assert.match(article,/article-body-inner/);
  assert.doesNotMatch(article,/article-cover/);
  assert.match(css,/\.article-body\{[^}]*padding-inline:/);
  assert.match(css,/\.article-body-inner\{[^}]*padding-inline:/);
  assert.match(css,/\.journal-thumb img\{object-fit:cover;padding:0\}/);
});
test('Blog has a canonical route and old paths redirect',()=>{
  assert.ok(fs.existsSync('src/app/(localized)/[locale]/blog/page.tsx'));
  const rules=read('public/_redirects');
  for (const lang of ['en','fa','ar']) assert.ok(rules.includes(`/${lang}/journal/* /${lang}/blog/:splat 301`));
  for (const lang of ['en','fa','ar']) assert.ok(rules.includes(`/${lang}/insights/* /${lang}/blog/:splat 301`));
  const nav=read('src/components/site-header.tsx');
  assert.match(nav,/\/blog/);
  const sitemap=read('src/app/sitemap.ts');
  assert.match(sitemap,/blog/);
});

test('only natural-stone editorial content is published',()=>{
  const posts=fs.readdirSync(folder).filter(f=>f.endsWith('.md'));
  assert.equal(posts.length,18);
  for (const file of posts) {
    const text=read(path.join(folder,file));
    assert.match(text,/translationKey:\s*(natural-stone-checklist|stone-[a-z-]+)/);
    assert.doesNotMatch(text,/category:\s*(Food products|محصولات غذایی|المنتجات الغذائية)/);
  }
  for (const lang of ['en','fa','ar']) assert.equal(posts.filter(f=>f.startsWith(`${lang}-`)).length,6);
});
test('site markets only natural stone, not food or industrial material sectors',()=>{
  const i18n=read('src/lib/i18n.ts');
  for (const term of ['food-products', 'industrial-materials', 'محصولات غذایی', 'المنتجات الغذائية']) assert.ok(!i18n.includes(term),term);
  for (const term of ['travertine', 'marble', 'granite','natural-stone']) assert.ok(i18n.includes(`"${term}"`),term);
  const siteHeader=read('src/components/site-header.tsx');
  assert.match(siteHeader,/\/blog/);
});

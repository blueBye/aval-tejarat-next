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
  const article = read('src/app/(localized)/[locale]/insights/[slug]/page.tsx');
  const css=read('src/app/globals.css');
  assert.match(article,/article-hero-photo/);
  assert.match(article,/article-body-inner/);
  assert.doesNotMatch(article,/article-cover/);
  assert.match(css,/\.article-body\{[^}]*padding-inline:/);
  assert.match(css,/\.article-body-inner\{[^}]*padding-inline:/);
  assert.match(css,/\.journal-thumb img\{object-fit:cover;padding:0\}/);
});
test('Insights has a canonical route and legacy journal redirects',()=>{
  assert.ok(fs.existsSync('src/app/(localized)/[locale]/insights/page.tsx'));
  const rules=read('public/_redirects');
  for (const lang of ['en','fa','ar']) assert.ok(rules.includes(`/${lang}/journal/* /${lang}/insights/:splat 301`));
  const nav=read('src/components/site-header.tsx');
  assert.match(nav,/\/insights/);
  const sitemap=read('src/app/sitemap.ts');
  assert.match(sitemap,/insights/);
});

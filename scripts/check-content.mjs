import fs from 'node:fs';
import path from 'node:path';

// Dependency-free frontmatter check, runs before the full Next.js build.
const folder = path.resolve('content/articles');
const files = fs.readdirSync(folder).filter(f => f.endsWith('.md'));
const keys = ['title', 'description', 'language', 'slug', 'translationKey', 'date', 'category'];
let count = 0; const seen = new Set();
for (const file of files) {
  const source = fs.readFileSync(path.join(folder, file), 'utf8');
  if (!source.startsWith('---\n')) throw new Error(`${file}: frontmatter must begin with ---`);
  const end = source.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file}: missing frontmatter closing ---`);
  const meta = Object.fromEntries(source.slice(4, end).split(/\r?\n/).filter(Boolean).map(line => {
    const index = line.indexOf(':');
    if (index < 1) throw new Error(`${file}: bad field: ${line}`);
    return [line.slice(0,index).trim(),line.slice(index+1).trim().replace(/^['"]|['"]$/g, '')];
  }));
  for (const key of keys) if (!meta[key]) throw new Error(`${file}: missing ${key}`);
  if (!['en','fa','ar'].includes(meta.language)) throw new Error(`${file}: language must be en, fa or ar`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) throw new Error(`${file}: slug must be kebab-case`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) throw new Error(`${file}: invalid date`);
  if (!['true', 'false', undefined].includes(meta.draft)) throw new Error(`${file}: draft must be true or false`);
  const key = `${meta.language}/${meta.slug}`;
  if (seen.has(key)) throw new Error(`${file}: duplicate ${key}`);
  seen.add(key);count++;
}
if (!count) throw new Error('At least one article is required to test the pipeline');
console.log(`Validated ${count} Markdown articles.`);

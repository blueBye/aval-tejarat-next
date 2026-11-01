// Optional one-time photo caching: pnpm run images:cache
// Downloads the five Wikimedia Commons images referenced in content/IMAGE_CREDITS.json,
// then rewrites ONLY the five corresponding translated posts to use local files.
// License attribution remains in frontmatter and on the rendered page.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root,'content/IMAGE_CREDITS.json'),'utf8'));
const destination = path.join(root,'public/images/insights');
await fs.mkdir(destination,{recursive:true});
for (const entry of manifest) {
  const filename = `${entry.topic}.jpg`;
  const dest = path.join(destination,filename);
  const url = new URL(entry.source.replace('/wiki/File:', '/wiki/Special:FilePath/'));
  url.searchParams.set('width','1280');
  console.log(`Fetching ${entry.topic} from Wikimedia Commons...`);
  const response = await fetch(url,{signal:AbortSignal.timeout(90000),headers:{'User-Agent':'AvalTejaratPersian/1.0 (editorial photo caching)'}});
  if (!response.ok) throw new Error(`${entry.topic}: HTTP ${response.status}`);
  const mime = response.headers.get('content-type') ?? '';
  if (!mime.includes('image/jpeg')) throw new Error(`${entry.topic}: expected JPEG, got ${mime}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 10000 || bytes.length > 15_000_000) throw new Error(`${entry.topic}: unexpected size ${bytes.length}`);
  await fs.writeFile(dest,bytes);
  const newCover = `/images/insights/${filename}`;
  for (const lang of ['en','fa','ar']) {
    const p = path.join(root,'content/articles',`${lang}-${entry.topic}.md`);
    const source = await fs.readFile(p,'utf8');
    if (!/^cover: .+$/m.test(source)) throw new Error(`Missing cover field: ${p}`);
    await fs.writeFile(p,source.replace(/^cover: .+$/m,`cover: "${newCover}"`));
  }
}
console.log('Finished. Commit public/images/insights/ and the updated Markdown files to GitHub.');

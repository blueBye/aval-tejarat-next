import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const articleDir = path.join(process.cwd(), 'content', 'articles');
const files = fs.readdirSync(articleDir).filter(name => name.endsWith('.md'));

test('all markdown articles contain required frontmatter', () => {
  assert.ok(files.length > 0, 'expected at least one article');
  for (const file of files) {
    const raw = fs.readFileSync(path.join(articleDir, file), 'utf8');
    const { data, content } = matter(raw);
    for (const key of ['title', 'description', 'language', 'slug', 'translationKey', 'date', 'category']) {
      assert.ok(data[key], `${file} missing ${key}`);
    }
    assert.equal(typeof data.draft, 'boolean', `${file} draft must be boolean`);
    assert.ok(content.trim().length > 0, `${file} content is empty`);
  }
});

test('hero art references iran oriented logistics labels', () => {
  const hero = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'hero-art.tsx'), 'utf8');
  assert.match(hero, /Tehran/);
  assert.match(hero, /Bandar Abbas/);
  assert.match(hero, /Iran-focused sourcing/);
});

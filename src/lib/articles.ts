import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { Article, Locale } from './types';

const folder = path.join(process.cwd(), 'content', 'articles');
let cache: Article[] | undefined;

function requireText(value: unknown, field: string, filename: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${filename}: invalid or missing ${field}`);
  return value.trim();
}

export function allArticles(): Article[] {
  if (cache) return cache;
  const filenames = fs.readdirSync(folder).filter(f => f.endsWith('.md')).sort();
  const results: Article[] = [];
  const used = new Set<string>();
  for (const filename of filenames) {
    const { data, content } = matter(fs.readFileSync(path.join(folder, filename), 'utf8'));
    if (data.draft === true) continue;
    const language = requireText(data.language, 'language', filename);
    if (!['en', 'fa', 'ar'].includes(language)) throw new Error(`${filename}: unsupported language ${language}`);
    const slug = requireText(data.slug, 'slug', filename);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${filename}: slug must be lowercase kebab-case`);
    const identity = `${language}/${slug}`;
    if (used.has(identity)) throw new Error(`${filename}: duplicate article ${identity}`);
    used.add(identity);
    const dateValue = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : requireText(data.date, 'date', filename);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue) || Number.isNaN(Date.parse(dateValue))) throw new Error(`${filename}: invalid date`);
    const html = String(remark().use(remarkHtml, { sanitize: true }).processSync(content));
    results.push({
      language: language as Locale, slug,
      title: requireText(data.title, 'title', filename),
      description: requireText(data.description, 'description', filename),
      translationKey: requireText(data.translationKey, 'translationKey', filename),
      category: requireText(data.category, 'category', filename),
      date: dateValue, cover: typeof data.cover === 'string' ? data.cover : undefined,
      coverAlt: typeof data.coverAlt === 'string' ? data.coverAlt : undefined,
      coverCredit: typeof data.coverCredit === 'string' ? data.coverCredit : undefined,
      coverSource: typeof data.coverSource === 'string' ? data.coverSource : undefined,
      featured: data.featured === true, body: content, html,
    });
  }
  cache = results.sort((a,b) => b.date.localeCompare(a.date));
  return cache;
}

export function articlesByLanguage(language: Locale): Article[] {return allArticles().filter(a => a.language === language);}
export function articleBySlug(language: Locale, slug: string): Article | undefined {return allArticles().find(a => a.language === language && a.slug === slug);}
export function translatedArticle(article: Article, language: Locale): Article | undefined {return allArticles().find(a => a.translationKey === article.translationKey && a.language === language);}

import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { PublicationAccent, PublicationIconKey, PublicationItem } from "@/types/publication";

type RawFrontmatter = {
  title?: string;
  authors?: string[];
  journal?: string;
  year?: number;
  type?: string;
  topics?: string[];
  topic?: string;
  icon?: PublicationIconKey;
  iconTone?: PublicationAccent;
  accent?: PublicationAccent;
  pdfUrl?: string;
  citation?: string;
  citationUrl?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/publications");

const defaultIconByType: Record<string, PublicationIconKey> = {
  "Research Article": "file-text",
  "Review Article": "book-open",
  Protocol: "file-search",
  "Conference Abstract": "presentation",
};

function normalizeExternalUrl(url?: string): string {
  if (!url) {
    return "#";
  }

  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return "#";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (/^www\./i.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return "#";
}

function plainExcerpt(content: string): string {
  return content
    .replace(/^#+\s+/gm, "")
    .replace(/`/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[*_>~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function coercePublication(
  slug: string,
  frontmatter: RawFrontmatter,
  content: string,
): PublicationItem {
  const title = frontmatter.title?.trim() || "Untitled Publication";
  const authors = Array.isArray(frontmatter.authors) ? frontmatter.authors : ["Unknown author"];
  const journal = frontmatter.journal?.trim() || "Journal unavailable";
  const year = Number(frontmatter.year) || 2000;
  const type = frontmatter.type?.trim() || "Research Article";
  const topics =
    frontmatter.topics && frontmatter.topics.length > 0
      ? frontmatter.topics
      : frontmatter.topic
        ? [frontmatter.topic]
        : ["General"];

  const abstractRaw = plainExcerpt(content);

  return {
    slug,
    title,
    authors,
    journal,
    year,
    type,
    topics,
    abstract: abstractRaw,
    citation:
      frontmatter.citation?.trim() ||
      `${authors.join(", ")} (${year}). ${title}. ${journal}.`,
    pdfUrl: normalizeExternalUrl(frontmatter.pdfUrl),
    citationUrl: normalizeExternalUrl(frontmatter.citationUrl),
    icon: frontmatter.icon || defaultIconByType[type] || "file-text",
    accent: frontmatter.accent || frontmatter.iconTone || "lavender",
  };
}

export async function getPublications(): Promise<PublicationItem[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

  const items = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.mdx$/, "");
        const fullPath = path.join(CONTENT_DIR, entry.name);
        const source = await fs.readFile(fullPath, "utf-8");
        const { data, content } = matter(source);
        return coercePublication(slug, data as RawFrontmatter, content);
      }),
  );

  const sorted = items.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  const seen = new Set<string>();

  return sorted.filter((item) => {
    const key = item.title.toLowerCase().trim();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function getPublicationFilterOptions() {
  const items = await getPublications();
  const typeSet = new Set(items.map((item) => item.type));
  const topicSet = new Set(items.flatMap((item) => item.topics));
  const yearSet = new Set(items.map((item) => String(item.year)));

  return {
    types: ["All Types", ...Array.from(typeSet).sort((a, b) => a.localeCompare(b))],
    topics: ["All Topics", ...Array.from(topicSet).sort((a, b) => a.localeCompare(b))],
    years: ["All Years", ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))],
  };
}

export async function getPublicationBySlug(slug: string): Promise<PublicationItem | null> {
  const items = await getPublications();
  return items.find((item) => item.slug === slug) || null;
}

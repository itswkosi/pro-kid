export type PublicationIconKey =
  | "file-text"
  | "bar-chart"
  | "users"
  | "presentation"
  | "book-open"
  | "globe"
  | "monitor"
  | "line-chart"
  | "clipboard-check"
  | "building"
  | "map"
  | "baby"
  | "stethoscope"
  | "messages-square"
  | "file-search"
  | "message-circle"
  | "network";

export type PublicationAccent =
  | "lavender"
  | "periwinkle"
  | "mint"
  | "yellow"
  | "coral";

export type PublicationItem = {
  slug: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: string;
  topics: string[];
  abstract: string;
  citation: string;
  pdfUrl: string;
  citationUrl: string;
  icon: PublicationIconKey;
  accent: PublicationAccent;
};

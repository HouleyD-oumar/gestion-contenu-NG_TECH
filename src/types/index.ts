export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
}

export interface Content {
  id: string;
  title: string;
  body?: string;
  tags: string[];
  category?: string;
  authorId?: string;
  publishedAt?: string | null;
}

export interface LogEntry {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  details?: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

export interface ModalPayload<T = unknown> {
  type: string;
  data?: T | null;
}

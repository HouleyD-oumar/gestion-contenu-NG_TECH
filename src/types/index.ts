export type UserRole = "admin" | "editor" | "viewer";

export type ContentCategory = "technology" | "design" | "business" | "lifestyle" | "education";

export type LogAction = "create" | "update" | "delete" | "login" | "logout" | "publish";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Content {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
  tags: string[];
  category: ContentCategory;
  createdAt: string;
  updatedAt: string;
}

export interface LogEntry {
  id: string;
  performedBy: string;
  performedAt: string;
  action: LogAction;
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

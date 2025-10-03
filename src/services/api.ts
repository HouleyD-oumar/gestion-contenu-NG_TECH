import type { Content, User, LogEntry, Pagination } from "../types";

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export async function fetchContentsApi(params?: {
  page?: number;
  perPage?: number;
  tags?: string[];
  category?: string;
}): Promise<{ items: Content[]; pagination: Pagination }> {
  await wait(600);
  const items: Content[] = Array.from({ length: params?.perPage ?? 8 }).map((_, i) => ({
    id: `${(params?.page ?? 1) * 100 + i}`,
    title: `Article ${(params?.page ?? 1) * 100 + i}`,
    body: "Contenu de démonstration",
    tags: ["demo", "sample"],
    category: params?.category ?? "general",
    publishedAt: new Date().toISOString(),
  }));

  return {
    items,
    pagination: { page: params?.page ?? 1, perPage: params?.perPage ?? items.length, total: 200 },
  };
}

export async function fetchUsersApi(page = 1, perPage = 10): Promise<{ items: User[]; pagination: Pagination }> {
  await wait(400);
  const items: User[] = Array.from({ length: perPage }).map((_, i) => ({
    id: `${page}-${i}`,
    name: `User ${page}-${i}`,
    email: `user${page}-${i}@example.com`,
    role: i % 3 === 0 ? "admin" : i % 3 === 1 ? "editor" : "viewer",
  }));

  return { items, pagination: { page, perPage, total: 123 } };
}

export async function loginApi(email: string, password?: string): Promise<{ token: string; user: User }> {
  await wait(500);
  // reference password to avoid unused variable linting in the mock
  void password;
  // simple mock: accept any password but if email contains 'admin' give admin token
  if (email.includes("admin")) {
    const user: User = { id: "1", name: "Admin User", email, role: "admin" };
    return { token: "admintoken", user };
  }
  const user: User = { id: "2", name: "Normal User", email, role: "editor" };
  return { token: "usertoken", user };
}

export async function fetchLogsApi(): Promise<LogEntry[]> {
  await wait(300);
  return Array.from({ length: 20 }).map((_, i) => ({
    id: `${i}`,
    actor: `User ${i}`,
    action: i % 2 === 0 ? "create" : "update",
    timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    details: "Action details",
  }));
}

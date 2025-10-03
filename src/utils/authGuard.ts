import { store } from "../store/store";

export function requireAdminClient(redirectTo = "/auth/signin") {
  const state = store.getState();
  const user = state.auth?.user;
  if (!user || user.role !== "admin") {
    if (typeof window !== "undefined") {
      window.location.href = redirectTo;
    }
    return false;
  }
  return true;
}

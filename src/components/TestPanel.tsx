"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";
import { login } from "../store/slices/authSlice";
import { fetchContents, setFilters } from "../store/slices/contentSlice";
import { fetchUsers } from "../store/slices/userSlice";
import { fetchLogs } from "../store/slices/logSlice";
import { openModal, closeModal } from "../store/slices/uiSlice";

export default function TestPanel() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s: RootState) => s.auth);
  const content = useAppSelector((s: RootState) => s.content);
  const users = useAppSelector((s: RootState) => s.users);
  const logs = useAppSelector((s: RootState) => s.logs);
  const ui = useAppSelector((s: RootState) => s.ui);

  const doLogin = (email: string) => {
    dispatch(login({ email, password: "x" }));
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-2">Test Panel</h2>

      <div className="mb-2">
        <button onClick={() => doLogin("admin@example.com")} className="mr-2">Login as admin</button>
        <button onClick={() => doLogin("user@example.com")} className="mr-2">Login as user</button>
      </div>

      <div className="mb-2">
  <button onClick={() => dispatch(fetchContents({ page: 1, perPage: 5 }))} className="mr-2">Fetch contents</button>
        <button onClick={() => dispatch(setFilters({ category: "general" }))} className="mr-2">Set filter category=general</button>
      </div>

      <div className="mb-2">
        <button onClick={() => dispatch(fetchUsers({ page: 1, perPage: 5 }))} className="mr-2">Fetch users</button>
        <button onClick={() => dispatch(fetchLogs())} className="mr-2">Fetch logs</button>
      </div>

      <div className="mb-2">
        <button onClick={() => dispatch(openModal({ type: "TEST", data: { foo: "bar" } }))} className="mr-2">Open modal</button>
        <button onClick={() => dispatch(closeModal())} className="mr-2">Close modal</button>
      </div>

      <section className="mt-4">
        <h3>Auth</h3>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
        <h3>Content</h3>
        <pre>{JSON.stringify(content, null, 2)}</pre>
        <h3>Users</h3>
        <pre>{JSON.stringify(users, null, 2)}</pre>
        <h3>Logs</h3>
        <pre>{JSON.stringify(logs, null, 2)}</pre>
        <h3>UI</h3>
        <pre>{JSON.stringify(ui, null, 2)}</pre>
      </section>
    </div>
  );
}

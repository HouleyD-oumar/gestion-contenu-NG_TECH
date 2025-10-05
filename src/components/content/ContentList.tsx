"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import { fetchContents, setFilters } from "../../store/slices/contentSlice";
import type { Content } from "../../types";

export default function ContentList() {
  const dispatch = useAppDispatch();
  const { items, loading, filters, pagination } = useAppSelector((s: RootState) => s.content as {
    items: Content[];
    loading: boolean;
    filters: { tags: string[]; category?: string };
    pagination: { page: number; perPage: number; total: number };
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    dispatch(
      fetchContents({ page: pagination.page, perPage: pagination.perPage, tags: filters.tags, category: filters.category })
    );
  }, [dispatch, filters, pagination.page, pagination.perPage]);

  const applyTag = () => {
    const nextTags = tagInput ? tagInput.split(",").map((t) => t.trim()) : [];
    dispatch(setFilters({ tags: nextTags }));
  };

  return (
    <div>
      <div className="mb-4">
        <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="tags (comma)" />
        <button onClick={applyTag}>Apply</button>
      </div>

      {loading ? (
        <div>Loading skeleton...</div>
      ) : (
        <ul>
          {items.map((c: Content) => (
            <li key={c.id}>
              <strong>{c.title}</strong>
              <div>{c.category}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";
import { useCallback, useEffect, useState } from "react";
import type { Progress } from "./missions";
export async function api<T>(
  url: string,
  body?: unknown,
  method = body ? "POST" : "GET",
): Promise<T> {
  const response = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error("Pip couldn’t open the notebook. Please try again.");
  }
  if (!response.ok)
    throw new Error(
      (result as { error?: string }).error ||
        "Something went wrong. Please try again.",
    );
  return result as T;
}
export function useNotebook() {
  const [progress, setProgress] = useState<Progress>([]),
    [mode, setMode] = useState<"ai" | "practice">("practice"),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api<{ progress: Progress; mode: "ai" | "practice" }>(
        "/api/progress",
      );
      setProgress(data.progress);
      setMode(data.mode);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Notebook unavailable");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  return { progress, mode, loading, error, reload };
}

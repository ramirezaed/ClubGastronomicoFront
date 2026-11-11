import { getSession as nextAuthGetSession } from "next-auth/react";
import type { Session } from "next-auth";

let sessionPromise: Promise<Session | null> | null = null;
let lastFetchTime = 0;
const CACHE_MS = 5000; // 5 segundos de cache, ajustable

export function getSessionCached(): Promise<Session | null> {
  const now = Date.now();

  if (sessionPromise && now - lastFetchTime < CACHE_MS) {
    return sessionPromise;
  }

  lastFetchTime = now;
  sessionPromise = nextAuthGetSession().finally(() => {});

  return sessionPromise;
}

export function invalidateSessionCache() {
  sessionPromise = null;
  lastFetchTime = 0;
}

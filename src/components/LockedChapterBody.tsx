"use client";

import { useEffect, useState, type FormEvent } from "react";
import ChapterBody from "./ChapterBody";

const SESSION_KEY = "memoir-key";

function fromBase64(value: string): BufferSource {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0)) as BufferSource;
}

async function tryDecrypt(
  key: string,
  lock: { salt: string; iterations: number },
  chapter: { iv: string; ciphertext: string }
): Promise<string[] | null> {
  try {
    const baseKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    const aesKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: fromBase64(lock.salt), iterations: lock.iterations, hash: "SHA-256" },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: fromBase64(chapter.iv) },
      aesKey,
      fromBase64(chapter.ciphertext)
    );
    return JSON.parse(new TextDecoder().decode(plainBuf)) as string[];
  } catch {
    return null;
  }
}

export default function LockedChapterBody({
  lock,
  chapter,
}: {
  lock: { salt: string; iterations: number };
  chapter: { iv: string; ciphertext: string };
}) {
  const [paragraphs, setParagraphs] = useState<string[] | null>(null);
  const [checking, setChecking] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const remembered = sessionStorage.getItem(SESSION_KEY);
    if (!remembered) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    tryDecrypt(remembered, lock, chapter).then((result) => {
      if (cancelled) return;
      if (result) setParagraphs(result);
      setChecking(false);
    });
    return () => {
      cancelled = true;
    };
  }, [lock, chapter]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    const result = await tryDecrypt(key, lock, chapter);
    if (result) {
      sessionStorage.setItem(SESSION_KEY, key);
      setParagraphs(result);
    } else {
      setError(true);
    }
  }

  if (checking) return null;

  if (!paragraphs) {
    return (
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex max-w-sm flex-col gap-3 rounded-xl border border-night-600/50 bg-night-800/40 p-6"
      >
        <p className="font-body text-sm text-cream-200">
          This chapter is part of Abrar's Memoir, kept private. Enter the key to keep reading.
        </p>
        <input
          type="password"
          inputMode="text"
          autoComplete="off"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter key"
          className="rounded-md border border-night-600/50 bg-night-900/60 px-3 py-2 font-body text-cream-100 outline-none focus:border-gold-400"
        />
        <button
          type="submit"
          className="rounded-md bg-gold-400 px-4 py-2 font-body text-sm font-semibold text-night-900 hover:bg-gold-300"
        >
          Unlock
        </button>
        {error && <p className="font-body text-sm text-red-400">That key doesn&apos;t match. Try again.</p>}
      </form>
    );
  }

  return <ChapterBody paragraphs={paragraphs} />;
}

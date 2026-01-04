"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createPaste() {
    setError(null);
    setResult(null);

    const body: any = { content };

    if (ttl) body.ttl_seconds = Number(ttl);
    if (maxViews) body.max_views = Number(maxViews);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setError("Failed to create paste");
      return;
    }

    const data = await res.json();
    setResult(data.url);
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder="Enter paste content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        <input
          type="number"
          placeholder="TTL seconds (optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <input
          type="number"
          placeholder="Max views (optional)"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />
      </div>

      <button style={{ marginTop: "1rem" }} onClick={createPaste}>
        Create Paste
      </button>

      {result && (
        <p>
          Paste URL: <a href={result}>{result}</a>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}

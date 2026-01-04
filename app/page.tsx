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
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "520px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        animation: "fadeSlideUp 0.6s ease-out",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Pastebin Lite
      </h1>

      <textarea
        rows={6}
        placeholder="Enter your paste content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      <input
        type="number"
        placeholder="TTL (seconds) – optional"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        style={{
          width: "100%",
          marginTop: "0.75rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="number"
        placeholder="Max views – optional"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
        style={{
          width: "100%",
          marginTop: "0.5rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={createPaste}
        className="button-animate"
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "none",
          background: "#667eea",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Create Paste
      </button>

      {result && (
  <p
    style={{
      marginTop: "1rem",
      wordBreak: "break-all",
      animation: "popIn 0.4s ease-out",
    }}
  >

           Paste URL:
          <br />
          <a href={result} target="_blank">
            {result}
          </a>
        </p>
      )}

      {error && (
        <p style={{ marginTop: "1rem", color: "red" }}>{error}</p>
      )}
    </div>
  );
}

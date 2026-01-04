import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    notFound();
  }

  const now = new Date();

  // TTL check
  if (paste.expiresAt && paste.expiresAt <= now) {
    notFound();
  }

  // View limit check
  if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Paste</h1>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          background: "#f5f5f5",
          padding: "1rem",
        }}
      >
        {paste.content}
      </pre>
    </main>
  );
}

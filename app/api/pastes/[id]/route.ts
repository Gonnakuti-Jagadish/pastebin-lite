import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

function getNow(req: Request): Date {
  if (process.env.TEST_MODE === "1") {
    const header = req.headers.get("x-test-now-ms");
    if (header) {
      const ms = Number(header);
      if (!isNaN(ms)) {
        return new Date(ms);
      }
    }
  }
  return new Date();
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIX IS HERE

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return NextResponse.json({}, { status: 404 });
  }

  const now = getNow(req);

  // TTL check
  if (paste.expiresAt && paste.expiresAt <= now) {
    return NextResponse.json({}, { status: 404 });
  }

  // View limit check
  if (paste.maxViews !== null && paste.viewCount >= paste.maxViews) {
    return NextResponse.json({}, { status: 404 });
  }

  // Increment view count
  const updated = await prisma.paste.update({
    where: { id },
    data: {
      viewCount: { increment: 1 },
    },
  });

  return NextResponse.json({
    content: updated.content,
    remaining_views:
      updated.maxViews !== null
        ? Math.max(updated.maxViews - updated.viewCount, 0)
        : null,
    expires_at: updated.expiresAt,
  });
}

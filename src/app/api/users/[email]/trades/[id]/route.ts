import { tradesMessages } from "@/data/responseMessages";
import { checkUserAuth } from "@/lib/checkUserAuth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_req: NextRequest) {
  const pathname = _req.nextUrl.pathname;
  const idStr = pathname.split("/").pop();
  const tradeId = parseInt(idStr || "", 10);
  const auth = await checkUserAuth();
  if (!auth.authorized) return auth.response;

  if (isNaN(tradeId)) {
    return NextResponse.json(
      { error: tradesMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [currentTrade] = (await db.query(
      "SELECT e.from_user_id, u.email FROM exchange AS e JOIN user AS u ON u.id = e.from_user_id WHERE e.id = ?",
      [tradeId]
    )) as [Array<{ from_user_id: number; email: string }>, unknown];

    if (!currentTrade || currentTrade.length === 0) {
      return NextResponse.json(
        { error: tradesMessages.invalidData },
        { status: 404 }
      );
    }

    if (currentTrade[0].email !== auth.email) {
      return NextResponse.json(
        { error: tradesMessages.noUser },
        { status: 403 }
      );
    }

    await db.query("DELETE FROM exchange WHERE id = ?", [tradeId]);
    return NextResponse.json({ message: tradesMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}

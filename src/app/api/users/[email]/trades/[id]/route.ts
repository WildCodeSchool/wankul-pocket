import { tradesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { email: string; id: string } }
) {
  const tradeId = parseInt(params.id, 10);

  if (isNaN(tradeId)) {
    return NextResponse.json(
      { error: tradesMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    await db.query("DELETE FROM exchange WHERE id = ?", [tradeId]);
    return NextResponse.json({ message: tradesMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}

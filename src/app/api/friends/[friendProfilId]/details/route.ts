import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { friendsMessages } from "@/data/responseMessages";
import { FriendsModel } from "@/model/FriendsModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { friendProfilId: string } }
) {
  const { friendProfilId } = params;

  if (!friendProfilId) {
    return NextResponse.json({ error: friendsMessages.error }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      "SELECT u.username, pp.image_path as user_image_path, c.id AS card_id, c.rarity, c.image_path as card_image_path FROM user u JOIN profil_picture pp ON u.profil_picture_id = pp.id JOIN collection col ON col.user_id = u.id JOIN card c ON col.card_id = c.id WHERE u.profil_id = ? ;",
      [friendProfilId]
    );

    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      return NextResponse.json(
        { error: friendsMessages.notFound },
        { status: 404 }
      );
    }

    const friendDetails = Array.isArray(rows) ? (rows as FriendsModel[]) : [];

    return NextResponse.json(friendDetails);
  } catch (error) {
    console.error("Error fetching friend details:", error);
    return NextResponse.json({ error: friendsMessages.error }, { status: 500 });
  }
}

import { friendsMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { FriendsModel } from "@/model/FriendsModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_profil_id, friend_profil_id, status, acceptance } =
      await req.json();

    if (
      typeof user_profil_id !== "string" ||
      typeof friend_profil_id !== "string" ||
      typeof status !== "boolean" ||
      typeof acceptance !== "boolean" ||
      user_profil_id.trim() === "" ||
      friend_profil_id.trim() === ""
    ) {
      return NextResponse.json(
        { error: friendsMessages.invalidData },
        { status: 400 }
      );
    }

    const [friendExists] = (await db.query(
      "SELECT 1 FROM user WHERE profil_id = ? LIMIT 1",
      [friend_profil_id.trim()]
    )) as [FriendsModel[], unknown];

    if (friendExists.length === 0) {
      return NextResponse.json(
        { error: "Aucun utilisateur trouvé pour ce profil ID." },
        { status: 404 }
      );
    }

    const [existing] = (await db.query(
      `SELECT 1 FROM is_friend 
       WHERE (user_profil_id = ? AND friend_profil_id = ?)
          OR (user_profil_id = ? AND friend_profil_id = ?) 
       LIMIT 1`,
      [
        user_profil_id.trim(),
        friend_profil_id.trim(),
        friend_profil_id.trim(),
        user_profil_id.trim(),
      ]
    )) as [FriendsModel[], unknown];

    if (existing.length > 0) {
      return NextResponse.json(
        { error: friendsMessages.alreadyRequested },
        { status: 409 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO is_friend (user_profil_id, friend_profil_id, status, acceptance) VALUES (?, ?, ?, ?)",
      [user_profil_id.trim(), friend_profil_id.trim(), status, acceptance]
    )) as [any, unknown];

    return NextResponse.json({
      message: friendsMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json(
      { error: friendsMessages.server },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const isPending = url.searchParams.get("pending") === "true";
  const myId = url.searchParams.get("userProfilId");

  if (!myId) {
    return NextResponse.json(
      { error: "User ID is required in query parameters." },
      { status: 400 }
    );
  }

  try {
    if (isPending) {
      const [friendsRequests] = (await db.query(
        `SELECT 
        f.*, 
        u.username AS friend_username, 
        pp.image_path AS friend_image_path
     FROM is_friend f
     JOIN user u ON u.profil_id = f.user_profil_id
     LEFT JOIN profil_picture pp ON pp.id = u.profil_picture_id
     WHERE f.friend_profil_id = ? AND f.status = 1 AND f.acceptance = 0`,
        [myId]
      )) as [FriendsModel[], unknown];

      if (friendsRequests.length === 0) {
        return NextResponse.json(
          { message: friendsMessages.noRequests },
          { status: 200 }
        );
      }

      return NextResponse.json(friendsRequests, { status: 200 });
    } else {
      const [allFriends] = (await db.query(
        `SELECT 
      f.id,
      f.user_profil_id,
      f.friend_profil_id,
      u1.username AS user_username,
      u2.username AS friend_username,
      u1.id AS user_id,
      u2.id AS friend_id,
      u1.email AS user_email,
      u2.email AS friend_email,
      pp1.image_path AS user_image_path,
      pp2.image_path AS friend_image_path
   FROM is_friend f
   JOIN user u1 ON u1.profil_id = f.user_profil_id
   JOIN user u2 ON u2.profil_id = f.friend_profil_id
   LEFT JOIN profil_picture pp1 ON pp1.id = u1.profil_picture_id
   LEFT JOIN profil_picture pp2 ON pp2.id = u2.profil_picture_id
   WHERE 
     (f.user_profil_id = ? OR f.friend_profil_id = ?)
     AND f.status = 0 AND f.acceptance = 1`,
        [myId, myId]
      )) as [any[], unknown];

      return NextResponse.json(allFriends, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur MySQL (GET) :", error);
    return NextResponse.json(
      { error: friendsMessages.server },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = await req.json();
    const { id, status, acceptance } = payload;

    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: friendsMessages.invalidId },
        { status: 400 }
      );
    }
    if (typeof status !== "boolean" || typeof acceptance !== "boolean") {
      return NextResponse.json(
        { error: friendsMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE is_friend SET status = ?, acceptance = ? WHERE id = ?",
      [0, 1, id]
    )) as [any, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: friendsMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: friendsMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json(
      { error: friendsMessages.server },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const requestId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(requestId)) {
      return NextResponse.json(
        { error: friendsMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM is_friend WHERE id = ?", [requestId]);
    return NextResponse.json({ message: friendsMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json(
      { error: friendsMessages.server },
      { status: 500 }
    );
  }
}

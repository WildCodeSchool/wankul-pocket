import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { friendsMessages } from "@/data/responseMessages";
import { FriendsModel } from "@/model/FriendsModel";

export async function POST(req: Request) {
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
    )) as [any[], unknown];

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Une demande d'ami existe déjà entre ces deux profils." },
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

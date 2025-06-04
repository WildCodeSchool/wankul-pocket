import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { infoMessages } from "@/data/responseMessages"
import { InfoModel } from "@/model/InfoModel"

interface InsertResult {
  insertId: number
  affectedRows?: number
  warningStatus?: number
}

interface UpdateResult {
  affectedRows: number
  warningStatus?: number
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, title, content FROM info ORDER BY id DESC"
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Erreur MySQL :", error)
    return NextResponse.json({ error: infoMessages.server }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      title.trim() === "" ||
      content.trim() === "" ||
      title.length > 100
    ) {
      return NextResponse.json(
        { error: infoMessages.invalidData },
        { status: 400 }
      )
    }

    const [result] = (await db.query(
      "INSERT INTO info (title, content) VALUES (?, ?)",
      [title.trim(), content.trim()]
    )) as [InsertResult, unknown]

    return NextResponse.json({
      message: infoMessages.addSuccess,
      insertedId: result.insertId,
    })
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error)
    return NextResponse.json({ error: infoMessages.server }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as InfoModel
    const { id, title, content } = payload
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: infoMessages.invalidId },
        { status: 400 }
      )
    }
    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      title.trim() === "" ||
      content.trim() === "" ||
      title.length > 100
    ) {
      return NextResponse.json(
        { error: infoMessages.invalidData },
        { status: 400 }
      )
    }

    const [result] = (await db.query(
      "UPDATE info SET title = ?, content = ? WHERE id = ?",
      [title.trim(), content.trim(), id]
    )) as [UpdateResult, unknown]

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: infoMessages.notFound || "Info non trouvée" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: infoMessages.updateSuccess })
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error)
    return NextResponse.json({ error: infoMessages.server }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const idParam = url.searchParams.get("id")
    const infoId = idParam !== null ? parseInt(idParam, 10) : NaN

    if (isNaN(infoId)) {
      return NextResponse.json(
        { error: infoMessages.invalidId },
        { status: 400 }
      )
    }

    await db.query("DELETE FROM info WHERE id = ?", [infoId])
    return NextResponse.json({ message: infoMessages.deleted })
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error)
    return NextResponse.json({ error: infoMessages.server }, { status: 500 })
  }
}

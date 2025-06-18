import { NextRequest, NextResponse } from "next/server";
import { addCardToCollection } from "@/service/CollectionService";
import { getUserIdByEmail } from "@/service/UserService"; // Ajoute une fonction pour récupérer userId à partir de l'email

export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  try {
    const body = await request.json();
    console.log("Email reçu :", email); // Log l'email reçu
    console.log("Corps de la requête reçu :", body); // Log le corps de la requête

    const cardIds: number[] = body.cardIds;

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json(
        { error: "Aucune carte à ajouter." },
        { status: 400 }
      );
    }

    // Récupère userId à partir de l'email
    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    await Promise.all(
      cardIds.map((cardId) => addCardToCollection(userId, cardId))
    );

    return NextResponse.json(
      { message: "Cartes ajoutées à la collection." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur ajout collection :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

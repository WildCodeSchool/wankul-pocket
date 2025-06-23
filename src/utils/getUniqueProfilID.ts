import { db } from "@/lib/db";
import { RandomProfilID } from "@/utils/getRandomProfilID";

export async function getUniqueProfilID(): Promise<string> {
  const MAX_RETRIES = 10;
  let unique = false;
  let profilID = "";
  let attempts = 0;

  while (!unique) {
    if (attempts >= MAX_RETRIES) {
      throw new Error(
        "Failed to generate a unique profilID after maximum retries."
      );
    }
    profilID = await RandomProfilID();
    const result = await db.query(
      "SELECT 1 FROM user WHERE profil_id = ? LIMIT 1",
      [profilID]
    );
    const rows = Array.isArray(result[0]) ? result[0] : [];
    unique = rows.length === 0;
    attempts++;
  }

  return profilID;
}

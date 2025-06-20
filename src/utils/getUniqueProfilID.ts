import { db } from "@/lib/db";
import { RandomProfilID } from "@/utils/getRandomProfilID";

export async function getUniqueProfilID(): Promise<string> {
  let unique = false;
  let profilID = "";

  while (!unique) {
    profilID = await RandomProfilID();
    const result = await db.query(
      "SELECT 1 FROM user WHERE profil_id = ? LIMIT 1",
      [profilID]
    );
    const rows = Array.isArray(result[0]) ? result[0] : [];
    unique = rows.length === 0;
  }

  return profilID;
}

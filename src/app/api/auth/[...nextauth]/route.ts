import { db } from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUniqueProfilID } from "@/utils/getUniqueProfilID";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      const name = user.name ? user.name.split(" ")[0] : "Gilbert";

      try {
        const [rows]: any = await db.query(
          "SELECT * FROM user WHERE email = ?",
          [user.email]
        );

        if (rows.length === 0) {
          const profilID = await getUniqueProfilID();
          await db.query(
            `INSERT INTO user 
    (username, email, created_at, profil_picture_id, profil_id) 
   VALUES (?, ?, NOW(), ?, ?)`,
            [name, user.email, 1, profilID]
          );
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

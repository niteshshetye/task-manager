import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../db";

const genrateJWT = (option: any) => {
  const token = jwt.sign(
    option,
    process.env.NEXT_PUBLIC_TOKEN_SECRET as string
  );
  return token;
};

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<any> {
        const username = credentials?.username || "";
        const password = credentials?.password || "";

        try {
          const user = await prisma.user.findUnique({
            where: {
              username: username,
            },
          });

          if (!user) return null;

          const passwordValidation = await bcrypt.compare(
            password,
            user.password
          );

          const accessToken = genrateJWT({
            id: user.id,
            name: user.name,
            email: user.username || "",
          });

          return passwordValidation
            ? {
                id: user.id,
                name: user.name,
                email: user.username,
                accessToken,
                username: user.username,
              }
            : null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

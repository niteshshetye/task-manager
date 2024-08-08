import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../db";

const genrateJWT = (option: any) => {
  const token = jwt.sign(option, "fskdfsldfjsdklfjsdklfjsdkfsdjflskdf");
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
                email: user.username || "",
                accessToken,
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
      // console.log("abc jwt: ", { token, user });
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      // console.log("abc session: ", { token, session });
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

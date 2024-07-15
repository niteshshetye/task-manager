import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Username",
      credentials: {},
      async authorize(credentials, req) {
        return {
          id: "1",
          username: "Nitesh shetye",
          password: "niteshshetye",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
};

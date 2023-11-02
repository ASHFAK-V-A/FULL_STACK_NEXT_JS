import connectMongoDB from "@/app/lib/connection";
import UserModel from "@/app/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentilas: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          await connectMongoDB();
          const user = await UserModel.findOne({ email });
          if (!user) return null;
          const passworddMatch = await bcrypt.compare(password, user.password);
          if (!passworddMatch) return null;
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  sessions: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string };
        try {
          await connectMongoDB();

          const user = await User.findOne({ email });

          if (!user || !user.password)
            return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }
          return {
            id: "1",
            name: user.name,
            email: user.email
          };

        } catch (error) {
          console.log(error);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 5 * 60, // 5 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.insertOne({
            name: user.name,
            email: user.email
          });
        }
        return true
      } catch (error) {
        console.log("Error saving Google user:", error);
        return false;
      }
    },
    jwt({ token, trigger, session }) {
      // Allow name to be updated
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    }
  },
};

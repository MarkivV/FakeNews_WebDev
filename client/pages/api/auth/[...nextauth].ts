import { AdapterUser } from 'next-auth/adapters';
import NextAuth, { NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise, { loginUser } from "../../../utils/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";


// @ts-ignore
export const authOptions: NextAuthOptions = {


  

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile: any) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // @ts-ignore
        const { email, password } = credentials;
        // @ts-ignore
        const { user } = await loginUser(email, password);
        console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          id: token?.id,
          email: token?.email,
          role: token?.role,
          name: token?.name
        },
      };
    },
    async jwt({ token, user }) {
      // @ts-ignore
      if (user?.role) {
        // @ts-ignore
        token.role = user?.role;
        token.id = user?.id;
      }
      return token;
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
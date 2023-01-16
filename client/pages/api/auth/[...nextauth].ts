import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise, {loginUser} from "../../../utils/mongodb";
import CredentialsProvider from 'next-auth/providers/credentials'


// @ts-ignore
export const authOptions: NextAuthOptions ={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
            },
            async authorize(credentials, req) {
                // @ts-ignore
                const { email, password } = credentials
                // @ts-ignore
                const {user, error} = await loginUser(email, password)
                console.log(user)
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            // return token
            console.log(token, "token")
            console.log(user, "user")
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            // return session
            // @ts-ignore
            // session.user.email = user.email;
            console.log(token, "token ses")
            console.log(session, "session")
            return {
                ...session,
                user:{id: token.id, email: token.email, username: token?.name}
            }
        }
    },
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt",
        maxAge: 3000,
    },
    pages: {
        signIn: "/login"
    }
}

export default NextAuth(authOptions)

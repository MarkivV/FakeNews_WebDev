import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise, {loginUser} from "../../../utils/mongodb";
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60,
    },
    providers:[
        GoogleProvider({
            clientId: "254511680205-gv7vi2m337iffc9o1ofo3qrn4ojsotip.apps.googleusercontent.com",
            clientSecret: "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"
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'email'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                // @ts-ignore
                const { email, password } = credentials
                // @ts-ignore
                const {user, error} = await loginUser(email, password)
                if (error) throw new Error (error)
                if (user) {
                    console.log(user)
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
})

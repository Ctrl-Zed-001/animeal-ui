import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: "1085713202583-c1b6vqkoeur8hcv57srmv1nbp2hprd94.apps.googleusercontent.com",
            clientSecret: "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"
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
        // ...add more providers here
    ]
})
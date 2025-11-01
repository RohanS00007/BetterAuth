import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import client  from "@/lib/db"; // your mongodb client
import { admin, openAPI } from "better-auth/plugins";
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    database: mongodbAdapter(client.db("ganeshsingh37713_db_user")),

    user: {
      additionalFields: {
         isStudent: {
             type: "string",
             defaultValue: "yes",
             input: false
           } 
       }
   },

    emailAndPassword: { 
        enabled: true, 
      }, 
    
      advanced: {
        cookies: {
            session_token: {
                name: "custom_session_token"
            },
        }
    },  

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, 
      // 1 day (every 1 day the session expiration is updated
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },

      // social providers for OAuth SignIn & SignUp
    socialProviders: { 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
          clientId: process.env.GITHUB_CLIENT_ID as string, 
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
      },
      plugins: [
        admin(),
        openAPI(),
        username({ 
          minUsernameLength: 8,  
          maxUsernameLength: 20, 
          usernameValidator: (username) => {
            if (username === "admin") {
              return false
            } return true
    }
  }),

] 
});

export type Session = typeof auth.$Infer.Session;
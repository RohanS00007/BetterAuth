import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [ 
        usernameClient(),
        adminClient(),
        inferAdditionalFields<typeof auth>(),
    ],
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000"
})
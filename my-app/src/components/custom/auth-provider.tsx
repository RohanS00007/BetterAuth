"use client";
import { authClient } from "@/lib/auth-client";
import { createContext, useContext } from "react";
import type { Session } from "@/lib/auth";

const AuthContext = createContext<Session | null>(null);

export const useAuthInfo = (): Session | null => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

interface ChildProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: ChildProps) {
  const { data: session } = authClient.useSession();

  return (
    <AuthContext.Provider value={session ?? null}>
      {children}
    </AuthContext.Provider>
  );
}

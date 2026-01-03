"use client";
import { authClient } from "@/lib/auth-client";
import { createContext } from "react";
import { Session } from "@/lib/auth";

export const AuthContext = createContext<Session | null>(null);

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

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import ImpersonateUser from "./impersonate-user";
import type { Session } from "@/lib/auth";
import AdminRoleEdit from "./roleEdit";

type User = Session["user"];
type Alluser = Partial<User>;

export default function UsersTable() {
  const [users, setUsers] = useState<Alluser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);

        const response = await authClient.admin.listUsers({
          query: { sortBy: "name" },
        });
        if (response?.data) {
          setUsers(response.data.users as Alluser[]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch users"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span>Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center p-4">
        <span className="text-red-500">Error: {error.message}</span>
      </div>
    );
  }
  let counter = 1;
  return (
    <Table className="border-amber-700">
      <TableHeader>
        <TableRow>
          <TableHead>S.No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{counter++}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex w-30 place-content-center items-center justify-between px-2">
                <p
                  className={
                    user.role === "admin"
                      ? "after:content[] font-semibold text-blue-600 after:content-['👑']"
                      : "text-neutral-600"
                  }
                >
                  {user.role}
                </p>
                <AdminRoleEdit userID={user.id as string} className="flex" />
              </div>
            </TableCell>
            <TableCell
              className={user.emailVerified ? "text-green-600" : "text-red-600"}
            >
              {user.emailVerified ? "Yes" : "No"}
            </TableCell>
            <TableCell>
              {user.banned ? (
                <span className="text-red-500">Banned</span>
              ) : (
                <span className="text-green-500">Active</span>
              )}
            </TableCell>
            <TableCell>
              <ImpersonateUser userId={user.id as string} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

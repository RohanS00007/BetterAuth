"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { authClient } from "@/lib/auth-client";
import ImpersonateUser from "./impersonate-user";
import type { Session } from "@/lib/auth";
import AdminRoleEdit from "./roleEdit";
import DeleteUser from "./deleteUser";

import { useQuery } from "@tanstack/react-query";

type User = Session["user"];
type Alluser = Partial<User>;

export default function UsersTanstackTable() {
  let counter = 1;

  const usersData = useQuery<Alluser[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await authClient.admin.listUsers({
        query: { sortBy: "name" },
      });
      // return the users array directly (or an empty array if missing)
      return (response?.data?.users as Alluser[]) ?? [];
    },
    staleTime: 1 * 60 * 1000, // 5 minutes
  });

  if (usersData.isLoading) {
    return (
      <div className="flex justify-center p-4">
        <span>Loading users from database...</span>
      </div>
    );
  }
  if (usersData.isError) {
    return (
      <div>
        <p>{String(usersData.error)}</p>
      </div>
    );
  }

  //   if(data){
  //     setUsers(data.data.users as Alluser[]);
  //   }

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         setIsLoading(true);

  //         const response = await authClient.admin.listUsers({
  //           query: { sortBy: "name" },
  //         });
  //         if (response?.data) {
  //           setUsers(response.data.users as Alluser[]);
  //         }
  //       } catch (err) {
  //         setError(
  //           err instanceof Error ? err : new Error("Failed to fetch users"),
  //         );
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchUsers();
  //   }, []);

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
        {(usersData.data ?? []).map((user) => (
          <TableRow key={user.id}>
            <TableCell>{counter++}</TableCell>
            <TableCell>
              <div className="flex justify-evenly">
                <p className="flex-1">{user.name}</p>
                {user.role === "admin" ? null : (
                  <DeleteUser userId={user.id as string} />
                )}
              </div>
            </TableCell>
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

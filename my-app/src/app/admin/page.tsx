import UsersTable from "@/components/custom/adminTable";
import UsersTanstackTable from "@/components/custom/adminTanstackTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  return (
    <main className="mt-2.5 flex min-h-screen w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-center text-4xl font-bold tracking-widest">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-center">
            Manage users and view system statistics
          </p>
        </div>

        <Card className="mx-auto w-[95%]">
          <CardHeader>
            <CardTitle className="text-center text-3xl tracking-widest text-transparent [font-variant:small-caps]">
              <p className="bg-linear-to-br from-red-500 via-orange-300 to-yellow-300 bg-clip-text text-center text-shadow-md">
                Users List
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <UsersTable /> */}
            <UsersTanstackTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function DeleteUser({ userId }: { userId: string }) {
  const AdminDeleteUser = async (userId: string) => {
    try {
      await authClient.admin.removeUser(
        {
          userId,
        },
        {
          onRequest: () => {
            toast("Requesting...", {
              description: "Wait a little",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
          },
          onSuccess: () => {
            toast("User deleted by Admin", {
              description: "The user has been removed successfully.",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
            setInterval(() => {
              window.location.reload();
            }, 1500);
          },
          onError: (ctx) => {
            console.log("error", ctx);
            toast("Something went wrong while deleting user...", {
              description: "Try again",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
          },
        },
      );
    } catch (error) {
      console.error("Error deleting user via Admin Dashboard :", error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => AdminDeleteUser(userId)}
        variant="secondary"
        aria-label="button delete users"
        className="rounded-px cursor-pointer hover:ring"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Edit } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["user", "admin"]),
});

export default function AdminRoleEdit({ userID }: { userID: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userID,
      role: "user",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await authClient.admin.setRole(
      {
        userId: userID,
        role: values.role,
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
          toast("New Role setted by Admin", {
            description: "Have blast with role features.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
          router.refresh();
          setInterval(() => {
            window.location.reload();
          }, 1500);
        },
        onError: (ctx) => {
          console.log("error", ctx);
          toast("Something went wrong while setting up new role...", {
            description: "Try again",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
      },
    );
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <Edit className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="user/admin" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

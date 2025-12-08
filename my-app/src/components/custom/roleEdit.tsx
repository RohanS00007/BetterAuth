"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useQueryClient } from "@tanstack/react-query";

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

import { Check, Edit, Pencil } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(["user", "admin"]),
});

export default function AdminRoleEdit({
  userID,
  className,
}: {
  userID: string;
  className?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
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
          setIsSubmitting(true);
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
          // router.refresh();
          // setInterval(() => {
          //   window.location.reload();
          // }, 1500);
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setIsSubmitting(false);
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
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            disabled={isSubmitting}
            className="cursor-pointer opacity-100 disabled:opacity-20"
          >
            <Pencil className="size-[15px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex place-content-center rounded-md p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="-py-4 flex place-content-center gap-1"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex justify-evenly">
                      <FormLabel>New Role</FormLabel>
                      <FormControl>
                        <Input
                          // placeholder="user/admin"
                          {...field}
                          className="w-1/2 flex-1"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Edit Role Button"
                  className="opacity-100 disabled:opacity-20"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
